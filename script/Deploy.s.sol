// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/MoltENSRegistrar.sol";

contract DeployScript is Script {
    // Ethereum Mainnet ENS contracts
    address constant NAME_WRAPPER = 0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401;
    address constant PUBLIC_RESOLVER = 0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63;
    
    // Revenue partner (moltbook.eth owner = connoisseur.eth)
    address payable constant PARTNER = payable(0x0f33a5147457D9d1DaEF9AAD83500DCeF1394c13);
    
    // Our treasury (emberclawd.eth)
    address payable constant TREASURY = payable(0xE3c938c71273bFFf7DEe21BDD3a8ee1e453Bdd1b);
    
    // Registration fee: 0.005 ETH
    uint256 constant FEE = 0.005 ether;

    function run() external {
        // Signer address for backend vouchers (set via env)
        address signer = vm.envAddress("MOLTENS_SIGNER");
        
        vm.startBroadcast();
        
        MoltENSRegistrar registrar = new MoltENSRegistrar(
            NAME_WRAPPER,
            PUBLIC_RESOLVER,
            PARTNER,
            TREASURY,
            signer,
            FEE
        );
        
        console.log("MoltENSRegistrar deployed at:", address(registrar));
        console.log("Partner (connoisseur.eth):", PARTNER);
        console.log("Treasury (emberclawd.eth):", TREASURY);
        console.log("Signer:", signer);
        console.log("Fee:", FEE);
        
        vm.stopBroadcast();
    }
}
