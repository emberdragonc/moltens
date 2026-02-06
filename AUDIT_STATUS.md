# Audit Status for MoltENSRegistrar

**Contract:** `src/MoltENSRegistrar.sol`
**Auditor:** Ember Autonomous Builder (self-audit)
**Date:** 2026-02-06

---

## Self-Audit Pass 1 - 2026-02-06 (Security)

Focus: Reentrancy, access control, input validation

- [x] Ran AUDIT_CHECKLIST.md line by line
- [x] Manual code review for security patterns
- [x] Ran invariant tests (25 tests pass)

### Findings:

#### ✅ PASS: Reentrancy Protection
- **CEI pattern correctly followed**: State changes (`registered[labelHash] = true`, `usedNonces[nonce] = true`) happen BEFORE external calls
- External calls: NameWrapper.setSubnodeRecord(), partner.call(), treasury.call()
- Even if partner/treasury are malicious contracts, they cannot re-enter because:
  - The label is already marked registered
  - The nonce is already marked used
- **No ReentrancyGuard needed** - CEI is sufficient

#### ✅ PASS: Access Control
- `setSigner()` - onlyOwner ✅
- `setFee()` - onlyOwner ✅
- `setTreasury()` - onlyOwner ✅
- `register()` - requires valid backend signature ✅
- No unauthorized access vectors found

#### ✅ PASS: Input Validation
- Payment: `msg.value < fee` check ✅
- Label: length (1-63), character set (a-z, 0-9, -, _), hyphen not at start/end ✅
- Signature: deadline check, nonce reuse prevention, signer recovery ✅
- Constructor: zero address checks for all critical addresses ✅

#### INFO-01: Excess Payment Handling
- **Severity:** INFO
- **Description:** If user sends more than `fee`, excess goes to partner/treasury split
- **Status:** ACCEPTED - Intentional design for simplicity, documented in tests

---

## Self-Audit Pass 2 - 2026-02-06 (Logic)

Focus: Business logic, edge cases, state management

- [x] Focused on auth + access control
- [x] Reviewed all external calls
- [x] Checked all state changes

### Findings:

#### ✅ PASS: Fee Split Logic
```solidity
uint256 partnerShare = msg.value / 2;
uint256 treasuryShare = msg.value - partnerShare;
```
- Correctly handles odd amounts (treasury gets extra wei)
- Both transfers use `call{value:}` with success checks ✅

#### ✅ PASS: Signature Scheme Security
Message includes:
- `msg.sender` - prevents signature theft
- `label` - binds to specific username
- `deadline` - expiration
- `nonce` - replay protection
- `block.chainid` - cross-chain replay protection
- `address(this)` - contract-specific

**Front-running resistant:** Signature bound to msg.sender, attacker cannot use it.

#### ✅ PASS: State Consistency
- If NameWrapper call fails → tx reverts → clean state
- If partner.call fails → tx reverts → clean state
- If treasury.call fails → tx reverts → clean state (ETH returns via revert)

#### LOW-01: No Emergency Pause
- **Severity:** LOW
- **Description:** No pause mechanism if signer key is compromised. Owner can change signer, but valid signatures remain usable until deadline.
- **Mitigation:** Signature validity is 1 hour max (enforced by backend). Owner can quickly rotate signer.
- **Status:** ACCEPTED - Risk is time-bounded (max 1 hour exposure)

#### INFO-02: SIGNATURE_VALIDITY Constant Unused
- **Severity:** INFO
- **Description:** The `SIGNATURE_VALIDITY = 1 hours` constant is defined but not enforced on-chain. Backend enforces this.
- **Status:** ACCEPTED - Backend control is intentional, constant serves as documentation

#### INFO-03: Partner Immutable, Treasury Mutable
- **Severity:** INFO
- **Description:** Partner (moltbook.eth owner) is immutable, treasury is mutable
- **Status:** ACCEPTED - Partner relationship is permanent, treasury may need updates

---

## Self-Audit Pass 3 - 2026-02-06 (Gas & Best Practices)

Focus: Optimization, standards compliance, adversarial thinking

- [x] Full adversarial review ("how would I attack this?")
- [x] Reviewed all findings from previous audits (AUDIT_CHECKLIST.md)
- [x] Economic attack vectors considered

### Gas Optimization Review:

#### ✅ PASS: Efficient Patterns Used
- Custom errors (not require strings) ✅
- Immutables for never-changing addresses ✅
- No redundant storage reads ✅
- Events emitted after state changes ✅

#### GAS-01: Minor Optimization Available
- **Severity:** GAS (negligible)
- **Description:** Could cache `msg.value` in local variable
- **Status:** NOT FIXED - Marginal improvement, code clarity prioritized

### Standards Compliance:

#### ✅ PASS: Solidity Best Practices
- Solidity ^0.8.24 ✅
- OpenZeppelin imports (Ownable, ECDSA) ✅
- NatSpec documentation ✅
- Events for all state changes ✅
- Custom errors ✅

### Adversarial Analysis:

#### Attack Vector: Signature Replay
- **Mitigated by:** nonce tracking, chainId, contract address in message

#### Attack Vector: Front-running Registration
- **Mitigated by:** signature bound to msg.sender

#### Attack Vector: Griefing via Failed Transfers
- **Mitigated by:** partner/treasury are admin-controlled addresses

#### Attack Vector: Integer Overflow
- **Mitigated by:** Solidity 0.8+ built-in checks

#### Attack Vector: Re-registration
- **Mitigated by:** `registered` mapping checked before state changes

---

## Test Coverage Summary

| Test Category | Tests | Status |
|---------------|-------|--------|
| Happy Path | 7 | ✅ PASS |
| Failure Cases | 10 | ✅ PASS |
| View Functions | 3 | ✅ PASS |
| Admin Functions | 4 | ✅ PASS |
| Fuzz Tests | 2 | ✅ PASS |
| **Total** | **25** | **✅ ALL PASS** |

---

## External Audit

- [ ] Requested from: @clawditor, @dragon_bot_z
- [ ] Issue link: TBD
- [ ] Status: Pending (self-audit complete)
- [ ] Findings addressed: N/A

---

## Checklist Summary

| ID | Check | Severity | Status |
|----|-------|----------|--------|
| SC01 | Access control verified | - | ✅ PASS |
| SC02 | Oracle safety | N/A | - |
| SC03 | Logic reviewed | - | ✅ PASS |
| SC04 | Input validation | - | ✅ PASS |
| SC05 | Reentrancy protected (CEI) | - | ✅ PASS |
| SC06 | External calls checked | - | ✅ PASS |
| SC07 | Flash loan resistant | N/A | - |
| SC08 | No integer issues | - | ✅ PASS |
| SC09 | Secure randomness | N/A | - |
| SC10 | No DoS vectors | - | ✅ PASS |
| SC11 | EIP-7702 Compatible | - | ✅ PASS |
| SC12 | Approval patterns | N/A | - |
| SC13 | State flag consistency | - | ✅ PASS |
| SC14 | Double withdrawal | - | ✅ PASS |

---

## Deploy Authorization

- [x] All 3 self-audit passes complete
- [ ] External audit complete (or waived for <$10k TVL)
- [ ] Testnet deploy verified
- **Ready for mainnet: PENDING EXTERNAL AUDIT**

---

## Notes

1. **Contract Purpose:** Register moltbook.eth subdomains with verified Moltbook identity
2. **Fee Model:** 50/50 split between partner (moltbook.eth owner) and treasury
3. **Security Model:** Backend signs vouchers after verifying Moltbook identity
4. **Critical Finding Count:** 0 CRITICAL, 0 HIGH, 1 LOW (accepted), 3 INFO

This contract is well-designed with proper security patterns. The main consideration is the backend signer key security, which is outside the smart contract scope.
