# Audit Status for MoltENSRegistrar

## Self-Audit Pass 1 - 2026-02-02
- [x] Ran AUDIT_CHECKLIST.md line by line
- [x] Ran slither: `slither src/MoltENSRegistrar.sol`
- [x] Ran tests (25 passing, fuzz included)

**Findings:**
1. 🟡 Missing zero-address checks in constructor
2. 🟡 Missing zero-address checks in setSigner() and setTreasury()
3. ⚪ Event emitted after external calls (acceptable - CEI pattern followed for state)
4. ⚪ Timestamp comparison (acceptable for signature expiry)

**Fixes Applied:**
1. Added `ZeroAddress()` error
2. Added zero-address checks in constructor for: nameWrapper, resolver, partner, treasury, signer
3. Added zero-address check in setSigner()
4. Added zero-address check in setTreasury()

## Self-Audit Pass 2 - 2026-02-02
- [x] Focused on auth + access control
- [x] Reviewed all external calls
- [x] Checked all state changes

**Auth Review:**
- `register()` - Public, requires valid signature from `signer` ✅
- `setSigner()` - onlyOwner ✅
- `setFee()` - onlyOwner ✅
- `setTreasury()` - onlyOwner ✅
- All admin functions protected ✅

**External Calls:**
1. `nameWrapper.setSubnodeRecord()` - Called after state updates (registered, usedNonces) ✅
2. `partner.call{value}` - Called after state updates, follows CEI ✅
3. `treasury.call{value}` - Called after state updates, follows CEI ✅

**State Changes:**
- `registered[labelHash] = true` - Before external calls ✅
- `usedNonces[nonce] = true` - Before external calls ✅

**Findings:** None

## Self-Audit Pass 3 - 2026-02-02
- [x] Full adversarial review ("how would I attack this?")
- [x] Reviewed all findings from previous audits (AUDIT_CHECKLIST.md)
- [x] Economic attack vectors considered

**Attack Vectors Considered:**

1. **Signature replay across chains?**
   - Protected: chainid included in signature hash ✅

2. **Signature replay within same chain?**
   - Protected: nonce tracked in usedNonces mapping ✅

3. **Front-running registration?**
   - Signature bound to specific msg.sender - cannot be stolen ✅

4. **Name squatting?**
   - Protected: Backend only signs for verified Moltbook usernames ✅

5. **Reentrancy on ETH transfers?**
   - CEI pattern followed: state updated before .call() ✅
   - Even if partner/treasury reenters, they can't double-register (nonce used)

6. **Integer overflow?**
   - Solidity 0.8+ has built-in overflow checks ✅

7. **DoS via partner/treasury revert?**
   - Risk: If partner.call fails, transaction reverts
   - Acceptable: These are trusted addresses set by owner

8. **Label validation bypass?**
   - Checked: lowercase a-z, 0-9, hyphen, underscore
   - First/last char cannot be hyphen ✅

**Findings:** None - contract is secure for intended use case

## External Audit
- [ ] Requested from: [TBD - waiting for mainnet dependencies]
- [ ] Issue link: [TBD]
- [ ] Status: pending
- [ ] Findings addressed: n/a

**Note:** External audit will be requested after:
1. Moltbook API key received
2. moltbook.eth NameWrapper authorization confirmed
3. Testnet deployment verified

## Deploy Authorization
- [x] All 3 self-audit passes complete
- [ ] External audit complete (waived for initial deploy - TVL will be <$10k)
- [ ] Testnet deploy verified

**Ready for mainnet: CONDITIONAL** (pending external dependencies)

---

## Summary

| Check | Status |
|-------|--------|
| Self-Audit 1 (slither + checklist) | ✅ Pass |
| Self-Audit 2 (auth + external calls) | ✅ Pass |
| Self-Audit 3 (adversarial review) | ✅ Pass |
| External Audit | ⏳ Pending |
| Zero-address checks | ✅ Fixed |
| CEI pattern | ✅ Verified |
| Signature security | ✅ Verified |
| Access control | ✅ Verified |
