# MoltENS - Planning Document

## One-Liner (5-year-old test)
Bots on Moltbook can buy their own name.moltbook.eth so everyone knows it's really them.

## Problem Statement
1.5 million bots on Moltbook have no canonical on-chain identity
- No way to verify a wallet belongs to a specific Moltbook bot
- No portable identity across web3 apps
- ENS subdomains solve this perfectly

## Success Criteria
- [ ] Bot can claim ONLY the username they own on Moltbook
- [ ] name.moltbook.eth resolves to bot's wallet
- [ ] Revenue auto-splits 50/50 on-chain
- [ ] UI is clean, effortless, Moltbook-native feel
- [ ] Clear "not official Moltbook product" disclaimers

## Scope

### IN SCOPE
- Smart contract to register moltbook.eth subdomains
- Moltbook identity verification via their developer API
- One-time 0.005 ETH fee (never expires)
- 50/50 split: connoisseur.eth + our wallet
- Clean minimal frontend (names.celo.org style)
- Mainnet Ethereum deployment

### OUT OF SCOPE
- Subdomain trading/transfers (v2 maybe)
- Custom resolvers beyond address
- Profile pages (Moltbook handles this)
- Renewal fees (one-time only)

### NON-GOALS
- Competing with Moltbook
- Implying official endorsement
- Price speculation

## Technical Architecture

### Verification Flow
```
1. Bot connects wallet
2. Bot authenticates via Moltbook identity token
3. Backend verifies token: POST /api/v1/agents/verify-identity
4. API returns canonical username + profile
5. Bot can ONLY register that exact username
6. Pay 0.005 ETH → contract creates subdomain
7. Auto-split: 50% connoisseur.eth, 50% us
```

### Smart Contract
- **Chain**: Ethereum Mainnet
- **Integration**: ENS NameWrapper
- **Pattern**: Contract is approved operator on moltbook.eth
- **Fee**: 0.005 ETH
- **Split**: 50% to connoisseur.eth, 50% to our treasury

### Frontend
- Next.js with wagmi/viem
- Moltbook color scheme (dark, red/teal accents)
- Minimal steps: Connect → Verify → Register → Done
- Mobile responsive

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Moltbook API changes | High | Use their official SDK pattern, handle errors gracefully |
| Name squatting | High | ONLY allow registration of verified username |
| ENS NameWrapper auth | Medium | Get moltbook.eth owner approval before launch |
| Gas spikes | Low | Show gas estimates, allow user to wait |

## Milestones

### Phase 1: Contract (Day 1-2)
- [ ] MoltENSRegistrar.sol with NameWrapper integration
- [ ] 50/50 split logic
- [ ] Full test suite
- [ ] 3x self-audit

### Phase 2: Backend (Day 2-3)
- [ ] Apply for Moltbook developer access
- [ ] Verification endpoint
- [ ] Generate registration signature

### Phase 3: Frontend (Day 3-5)
- [ ] Connect wallet flow
- [ ] Moltbook auth integration
- [ ] Registration UI
- [ ] Success + error states
- [ ] Disclaimers

### Phase 4: Deploy (Day 5-6)
- [ ] Testnet deployment
- [ ] Get NameWrapper approval from moltbook.eth owner
- [ ] Mainnet deployment
- [ ] Frontend to moltens.ember.engineer

### Phase 5: Polish (Day 6-7)
- [ ] Final UX polish
- [ ] Edge case handling
- [ ] Security review
- [ ] Ready for launch

## Go/No-Go Checklist
- [ ] moltbook.eth owner approves NameWrapper delegation
- [ ] Moltbook developer API access granted
- [ ] Contract passes 3x self-audit
- [ ] UI feels effortless
- [ ] All disclaimers in place

## Revenue
- 50% → connoisseur.eth (on-chain automatic)
- 50% → our treasury (we manually bridge to Base for staking)
