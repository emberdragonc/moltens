// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@ens/wrapper/INameWrapper.sol";

/**
 * @title MoltENSRegistrar
 * @notice Register moltbook.eth subdomains for verified Moltbook bots
 * @dev This is NOT an official Moltbook product. Independent identity platform.
 * 
 * Flow:
 * 1. Bot authenticates via Moltbook identity token on our backend
 * 2. Backend verifies and signs a registration voucher for that exact username
 * 3. Bot calls register() with the voucher
 * 4. Contract creates subdomain and splits payment 50/50
 */
contract MoltENSRegistrar is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // ============ Errors ============
    error AlreadyRegistered(string label);
    error InsufficientPayment();
    error InvalidSignature();
    error SignatureExpired();
    error TransferFailed();
    error LabelTooShort();
    error LabelTooLong();
    error InvalidCharacter();
    error EmptyLabel();

    // ============ Events ============
    event SubdomainRegistered(
        string indexed labelIndexed,
        string label,
        address indexed owner,
        bytes32 node
    );
    event SignerUpdated(address indexed oldSigner, address indexed newSigner);
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);

    // ============ Constants ============
    /// @notice moltbook.eth namehash
    bytes32 public constant MOLTBOOK_NODE = 0xf2e4aa28ae0ab9f953bea0fa057564f239196ce7f3e7cd7a62f15f42b7311878;
    
    /// @notice Minimum label length (1 character)
    uint256 public constant MIN_LABEL_LENGTH = 1;
    
    /// @notice Maximum label length (63 characters per DNS spec)
    uint256 public constant MAX_LABEL_LENGTH = 63;
    
    /// @notice Signature validity period (1 hour)
    uint256 public constant SIGNATURE_VALIDITY = 1 hours;

    // ============ Immutables ============
    /// @notice ENS NameWrapper contract
    INameWrapper public immutable nameWrapper;
    
    /// @notice ENS Public Resolver
    address public immutable resolver;
    
    /// @notice Revenue recipient (moltbook.eth owner: connoisseur.eth)
    address payable public immutable partner;

    // ============ State ============
    /// @notice Address that signs registration vouchers (our backend)
    address public signer;
    
    /// @notice Registration fee in wei
    uint256 public fee;
    
    /// @notice Our treasury address
    address payable public treasury;
    
    /// @notice Track registered labels to prevent double registration
    mapping(bytes32 => bool) public registered;
    
    /// @notice Track used nonces to prevent replay
    mapping(bytes32 => bool) public usedNonces;

    // ============ Constructor ============
    constructor(
        address _nameWrapper,
        address _resolver,
        address payable _partner,
        address payable _treasury,
        address _signer,
        uint256 _fee
    ) Ownable(msg.sender) {
        nameWrapper = INameWrapper(_nameWrapper);
        resolver = _resolver;
        partner = _partner;
        treasury = _treasury;
        signer = _signer;
        fee = _fee;
    }

    // ============ External Functions ============
    
    /**
     * @notice Register a moltbook.eth subdomain
     * @param label The subdomain label (must match Moltbook username exactly)
     * @param deadline Timestamp when signature expires
     * @param nonce Unique nonce to prevent replay
     * @param signature Backend signature authorizing this registration
     */
    function register(
        string calldata label,
        uint256 deadline,
        bytes32 nonce,
        bytes calldata signature
    ) external payable {
        // Validate payment
        if (msg.value < fee) revert InsufficientPayment();
        
        // Validate label
        _validateLabel(label);
        
        // Check not already registered
        bytes32 labelHash = keccak256(bytes(label));
        if (registered[labelHash]) revert AlreadyRegistered(label);
        
        // Check signature validity
        if (block.timestamp > deadline) revert SignatureExpired();
        if (usedNonces[nonce]) revert InvalidSignature();
        
        // Verify signature
        bytes32 messageHash = keccak256(abi.encodePacked(
            msg.sender,
            label,
            deadline,
            nonce,
            block.chainid,
            address(this)
        ));
        bytes32 ethSignedHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedHash.recover(signature);
        if (recoveredSigner != signer) revert InvalidSignature();
        
        // Mark as used
        registered[labelHash] = true;
        usedNonces[nonce] = true;
        
        // Create subdomain via NameWrapper
        // Subdomain never expires (max uint64), no fuses burned
        bytes32 node = nameWrapper.setSubnodeRecord(
            MOLTBOOK_NODE,
            label,
            msg.sender,
            resolver,
            0,                      // TTL
            0,                      // No fuses
            type(uint64).max        // Never expires
        );
        
        // Split payment 50/50
        uint256 partnerShare = msg.value / 2;
        uint256 treasuryShare = msg.value - partnerShare;
        
        // Transfer to partner (connoisseur.eth)
        (bool success1, ) = partner.call{value: partnerShare}("");
        if (!success1) revert TransferFailed();
        
        // Transfer to treasury
        (bool success2, ) = treasury.call{value: treasuryShare}("");
        if (!success2) revert TransferFailed();
        
        emit SubdomainRegistered(label, label, msg.sender, node);
    }

    /**
     * @notice Check if a label is available
     * @param label The label to check
     * @return available True if label can be registered
     */
    function isAvailable(string calldata label) external view returns (bool) {
        bytes32 labelHash = keccak256(bytes(label));
        return !registered[labelHash];
    }

    /**
     * @notice Get the full node hash for a subdomain
     * @param label The subdomain label
     * @return node The namehash of label.moltbook.eth
     */
    function getNode(string calldata label) external pure returns (bytes32) {
        return keccak256(abi.encodePacked(MOLTBOOK_NODE, keccak256(bytes(label))));
    }

    // ============ Admin Functions ============
    
    /**
     * @notice Update the signer address
     * @param newSigner New signer address
     */
    function setSigner(address newSigner) external onlyOwner {
        emit SignerUpdated(signer, newSigner);
        signer = newSigner;
    }

    /**
     * @notice Update the registration fee
     * @param newFee New fee in wei
     */
    function setFee(uint256 newFee) external onlyOwner {
        emit FeeUpdated(fee, newFee);
        fee = newFee;
    }

    /**
     * @notice Update the treasury address
     * @param newTreasury New treasury address
     */
    function setTreasury(address payable newTreasury) external onlyOwner {
        emit TreasuryUpdated(treasury, newTreasury);
        treasury = newTreasury;
    }

    // ============ Internal Functions ============
    
    /**
     * @notice Validate label follows ENS rules
     * @param label The label to validate
     */
    function _validateLabel(string calldata label) internal pure {
        bytes memory labelBytes = bytes(label);
        uint256 len = labelBytes.length;
        
        if (len == 0) revert EmptyLabel();
        if (len < MIN_LABEL_LENGTH) revert LabelTooShort();
        if (len > MAX_LABEL_LENGTH) revert LabelTooLong();
        
        // ENS allows lowercase letters, numbers, and hyphens
        // First and last character cannot be hyphen
        for (uint256 i = 0; i < len; i++) {
            bytes1 char = labelBytes[i];
            
            // Check valid characters: a-z, 0-9, hyphen, underscore
            bool isLowercase = (char >= 0x61 && char <= 0x7a); // a-z
            bool isNumber = (char >= 0x30 && char <= 0x39);     // 0-9
            bool isHyphen = (char == 0x2d);                      // -
            bool isUnderscore = (char == 0x5f);                  // _
            
            if (!isLowercase && !isNumber && !isHyphen && !isUnderscore) {
                revert InvalidCharacter();
            }
            
            // First and last cannot be hyphen
            if ((i == 0 || i == len - 1) && isHyphen) {
                revert InvalidCharacter();
            }
        }
    }
}
