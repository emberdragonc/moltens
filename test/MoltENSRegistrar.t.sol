// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/MoltENSRegistrar.sol";

// Mock NameWrapper for testing
contract MockNameWrapper {
    mapping(bytes32 => bool) public created;
    
    function setSubnodeRecord(
        bytes32 node,
        string calldata label,
        address owner,
        address resolver,
        uint64 ttl,
        uint32 fuses,
        uint64 expiry
    ) external returns (bytes32) {
        bytes32 subnode = keccak256(abi.encodePacked(node, keccak256(bytes(label))));
        created[subnode] = true;
        return subnode;
    }
}

contract MoltENSRegistrarTest is Test {
    MoltENSRegistrar public registrar;
    MockNameWrapper public mockWrapper;
    
    address public partner = makeAddr("partner");
    address public treasury = makeAddr("treasury");
    uint256 public signerPrivateKey = 0x1234;
    address public signer;
    address public user = makeAddr("user");
    
    uint256 public constant FEE = 0.005 ether;
    address public constant RESOLVER = address(0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63);

    function setUp() public {
        signer = vm.addr(signerPrivateKey);
        mockWrapper = new MockNameWrapper();
        
        registrar = new MoltENSRegistrar(
            address(mockWrapper),
            RESOLVER,
            payable(partner),
            payable(treasury),
            signer,
            FEE
        );
    }

    function _signRegistration(
        address _user,
        string memory _label,
        uint256 _deadline,
        bytes32 _nonce
    ) internal view returns (bytes memory) {
        bytes32 messageHash = keccak256(abi.encodePacked(
            _user,
            _label,
            _deadline,
            _nonce,
            block.chainid,
            address(registrar)
        ));
        bytes32 ethSignedHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, ethSignedHash);
        return abi.encodePacked(r, s, v);
    }

    // ============ Happy Path Tests ============

    function test_Register_Success() public {
        string memory label = "ember";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("unique-nonce-1");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        // Verify registration
        assertFalse(registrar.isAvailable(label));
        
        // Verify payment split
        assertEq(partner.balance, FEE / 2);
        assertEq(treasury.balance, FEE - (FEE / 2));
    }

    function test_Register_WithExactFee() public {
        string memory label = "testbot";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-2");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, FEE);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    function test_Register_LabelWithNumbers() public {
        string memory label = "bot123";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-3");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    function test_Register_LabelWithUnderscore() public {
        string memory label = "cool_bot";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-4");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    function test_Register_LabelWithHyphen() public {
        string memory label = "my-bot";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-5");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    function test_Register_SingleCharacter() public {
        string memory label = "x";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-6");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    // ============ Failure Tests ============

    function test_Register_RevertWhen_InsufficientPayment() public {
        string memory label = "ember";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-fail-1");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, FEE - 1);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.InsufficientPayment.selector);
        registrar.register{value: FEE - 1}(label, deadline, nonce, sig);
    }

    function test_Register_RevertWhen_AlreadyRegistered() public {
        string memory label = "ember";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce1 = keccak256("nonce-1");
        bytes32 nonce2 = keccak256("nonce-2");
        bytes memory sig1 = _signRegistration(user, label, deadline, nonce1);
        bytes memory sig2 = _signRegistration(user, label, deadline, nonce2);

        vm.deal(user, 2 ether);
        
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce1, sig1);

        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(MoltENSRegistrar.AlreadyRegistered.selector, label));
        registrar.register{value: FEE}(label, deadline, nonce2, sig2);
    }

    function test_Register_RevertWhen_SignatureExpired() public {
        string memory label = "ember";
        uint256 deadline = block.timestamp - 1; // Already expired
        bytes32 nonce = keccak256("nonce-expired");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.SignatureExpired.selector);
        registrar.register{value: FEE}(label, deadline, nonce, sig);
    }

    function test_Register_RevertWhen_NonceReused() public {
        string memory label1 = "ember1";
        string memory label2 = "ember2";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("same-nonce");
        bytes memory sig1 = _signRegistration(user, label1, deadline, nonce);
        bytes memory sig2 = _signRegistration(user, label2, deadline, nonce);

        vm.deal(user, 2 ether);
        
        vm.prank(user);
        registrar.register{value: FEE}(label1, deadline, nonce, sig1);

        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.InvalidSignature.selector);
        registrar.register{value: FEE}(label2, deadline, nonce, sig2);
    }

    function test_Register_RevertWhen_WrongSigner() public {
        string memory label = "ember";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-wrong-signer");
        
        // Sign with wrong key
        uint256 wrongKey = 0x5678;
        bytes32 messageHash = keccak256(abi.encodePacked(
            user,
            label,
            deadline,
            nonce,
            block.chainid,
            address(registrar)
        ));
        bytes32 ethSignedHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(wrongKey, ethSignedHash);
        bytes memory wrongSig = abi.encodePacked(r, s, v);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.InvalidSignature.selector);
        registrar.register{value: FEE}(label, deadline, nonce, wrongSig);
    }

    function test_Register_RevertWhen_EmptyLabel() public {
        string memory label = "";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-empty");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.EmptyLabel.selector);
        registrar.register{value: FEE}(label, deadline, nonce, sig);
    }

    function test_Register_RevertWhen_LabelTooLong() public {
        // 64 characters is too long (max 63)
        string memory label = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-long");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.LabelTooLong.selector);
        registrar.register{value: FEE}(label, deadline, nonce, sig);
    }

    function test_Register_RevertWhen_InvalidCharacter() public {
        string memory label = "UPPERCASE"; // Not allowed
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-invalid");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.InvalidCharacter.selector);
        registrar.register{value: FEE}(label, deadline, nonce, sig);
    }

    function test_Register_RevertWhen_LabelStartsWithHyphen() public {
        string memory label = "-invalid";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-hyphen-start");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.InvalidCharacter.selector);
        registrar.register{value: FEE}(label, deadline, nonce, sig);
    }

    function test_Register_RevertWhen_LabelEndsWithHyphen() public {
        string memory label = "invalid-";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-hyphen-end");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        vm.expectRevert(MoltENSRegistrar.InvalidCharacter.selector);
        registrar.register{value: FEE}(label, deadline, nonce, sig);
    }

    // ============ View Function Tests ============

    function test_IsAvailable_True() public view {
        assertTrue(registrar.isAvailable("unregistered"));
    }

    function test_IsAvailable_False() public {
        string memory label = "taken";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256("nonce-available");
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    function test_GetNode() public view {
        bytes32 expectedNode = keccak256(abi.encodePacked(
            registrar.MOLTBOOK_NODE(),
            keccak256(bytes("ember"))
        ));
        assertEq(registrar.getNode("ember"), expectedNode);
    }

    // ============ Admin Function Tests ============

    function test_SetSigner_Success() public {
        address newSigner = makeAddr("newSigner");
        registrar.setSigner(newSigner);
        assertEq(registrar.signer(), newSigner);
    }

    function test_SetSigner_RevertWhen_NotOwner() public {
        address newSigner = makeAddr("newSigner");
        vm.prank(user);
        vm.expectRevert();
        registrar.setSigner(newSigner);
    }

    function test_SetFee_Success() public {
        uint256 newFee = 0.01 ether;
        registrar.setFee(newFee);
        assertEq(registrar.fee(), newFee);
    }

    function test_SetTreasury_Success() public {
        address newTreasury = makeAddr("newTreasury");
        registrar.setTreasury(payable(newTreasury));
        assertEq(registrar.treasury(), newTreasury);
    }

    // ============ Fuzz Tests ============

    function testFuzz_Register_AnyValidLabel(bytes32 seed) public {
        // Generate a valid label from seed
        bytes memory labelBytes = new bytes(10);
        for (uint i = 0; i < 10; i++) {
            uint8 charCode = uint8(uint256(keccak256(abi.encodePacked(seed, i))) % 26) + 97; // a-z
            labelBytes[i] = bytes1(charCode);
        }
        string memory label = string(labelBytes);
        
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256(abi.encodePacked(seed, "nonce"));
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, 1 ether);
        vm.prank(user);
        registrar.register{value: FEE}(label, deadline, nonce, sig);

        assertFalse(registrar.isAvailable(label));
    }

    function testFuzz_Register_ExcessPaymentStillWorks(uint256 excessAmount) public {
        vm.assume(excessAmount > 0 && excessAmount < 100 ether);
        uint256 totalPayment = FEE + excessAmount;
        
        string memory label = "fuzzlabel";
        uint256 deadline = block.timestamp + 1 hours;
        bytes32 nonce = keccak256(abi.encodePacked(excessAmount));
        bytes memory sig = _signRegistration(user, label, deadline, nonce);

        vm.deal(user, totalPayment);
        uint256 initialBalance = user.balance;
        
        vm.prank(user);
        registrar.register{value: totalPayment}(label, deadline, nonce, sig);

        // User loses exact payment, excess stays in contract... 
        // Actually, contract doesn't refund excess. That's intentional for simplicity.
        // Let me verify:
        assertFalse(registrar.isAvailable(label));
        assertEq(partner.balance, totalPayment / 2);
        assertEq(treasury.balance, totalPayment - (totalPayment / 2));
    }
}
