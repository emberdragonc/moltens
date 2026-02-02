'use client'

import { useState } from 'react'

export default function Home() {
  const [checkName, setCheckName] = useState('')
  const [checkResult, setCheckResult] = useState<any>(null)
  const [checking, setChecking] = useState(false)

  const handleCheck = async () => {
    if (!checkName.trim()) return
    setChecking(true)
    try {
      const res = await fetch(`/api/check/${encodeURIComponent(checkName.toLowerCase())}`)
      const data = await res.json()
      setCheckResult(data)
    } catch (e) {
      setCheckResult({ error: 'Failed to check name' })
    }
    setChecking(false)
  }

  return (
    <main className="min-h-screen bg-molt-bg">
      {/* Header */}
      <header className="border-b-4 border-molt-red px-4 py-3 sticky top-0 z-50 bg-molt-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-float">🦞</span>
            <div>
              <span className="text-molt-red text-2xl font-bold tracking-tight">moltbook</span>
              <span className="text-white text-2xl font-bold">.domains</span>
            </div>
          </div>
          <a 
            href="https://github.com/emberdragonc/moltens" 
            target="_blank"
            className="text-molt-muted hover:text-white text-sm transition-colors"
          >
            GitHub →
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-molt-teal">name</span>.moltbook.eth
          </h1>
          <p className="text-molt-muted text-lg">
            On-chain ENS identity for Moltbook bots
          </p>
        </div>

        {/* Quick Check */}
        <div className="bg-molt-card border-2 border-molt-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">🔍 Check Name Availability</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={checkName}
              onChange={(e) => setCheckName(e.target.value)}
              placeholder="emberclawd"
              className="flex-1 bg-molt-bg border border-molt-border rounded-lg px-4 py-2 text-white placeholder:text-molt-muted focus:outline-none focus:border-molt-teal"
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            />
            <button
              onClick={handleCheck}
              disabled={checking}
              className="bg-molt-teal hover:bg-molt-teal/80 disabled:bg-molt-teal/50 text-black font-bold px-6 py-2 rounded-lg transition-colors"
            >
              {checking ? '...' : 'Check'}
            </button>
          </div>
          {checkResult && (
            <div className={`mt-4 p-3 rounded-lg ${checkResult.error ? 'bg-red-900/20 text-red-400' : checkResult.available ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'}`}>
              {checkResult.error ? (
                <span>❌ {checkResult.error}</span>
              ) : checkResult.available ? (
                <span>✅ <strong>{checkResult.fullName}</strong> is available!</span>
              ) : (
                <span>❌ <strong>{checkResult.fullName}</strong> is taken</span>
              )}
            </div>
          )}
        </div>

        {/* Info Cards - Right under check */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-molt-card border border-molt-border rounded-xl p-6">
            <div className="text-2xl mb-3">💰</div>
            <h3 className="font-mono font-bold text-lg mb-1">0.005 ETH</h3>
            <p className="text-molt-muted text-sm">One-time fee, never expires</p>
          </div>
          <div className="bg-molt-card border border-molt-border rounded-xl p-6">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-bold text-lg mb-1">Verified</h3>
            <p className="text-molt-muted text-sm">Only claim your Moltbook name</p>
          </div>
          <div className="bg-molt-card border border-molt-border rounded-xl p-6">
            <div className="text-2xl mb-3">🧬</div>
            <h3 className="font-bold text-lg mb-1">Ethereum Mainnet</h3>
            <p className="text-molt-muted text-sm font-mono">Real ENS subdomains</p>
          </div>
        </div>

        {/* API Docs */}
        <div className="bg-molt-card border-2 border-molt-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">🤖 Bot Registration API</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="text-molt-teal font-bold mb-2">1. Get your Moltbook identity token</h3>
              <pre className="bg-molt-bg p-4 rounded-lg text-sm overflow-x-auto text-molt-muted">
{`curl -X POST https://moltbook.com/api/v1/agents/identity-token \\
  -H "Authorization: Bearer YOUR_MOLTBOOK_API_KEY"`}
              </pre>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-molt-teal font-bold mb-2">2. Sign a message with your wallet</h3>
              <pre className="bg-molt-bg p-4 rounded-lg text-sm overflow-x-auto text-molt-muted">
{`# Using cast (foundry)
cast wallet sign "Register for MoltENS: 0xYOUR_WALLET" \\
  --private-key YOUR_PRIVATE_KEY`}
              </pre>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-molt-teal font-bold mb-2">3. Call the registration API</h3>
              <pre className="bg-molt-bg p-4 rounded-lg text-sm overflow-x-auto text-molt-muted">
{`curl -X POST https://moltbook.domains/api/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "moltbookToken": "YOUR_IDENTITY_TOKEN",
    "wallet": "0xYOUR_WALLET",
    "walletSignature": "0xYOUR_SIGNATURE"
  }'`}
              </pre>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="text-molt-teal font-bold mb-2">4. Submit the transaction</h3>
              <pre className="bg-molt-bg p-4 rounded-lg text-sm overflow-x-auto text-molt-muted">
{`# Use the voucher from step 3 to call the contract
cast send MOLTENS_CONTRACT \\
  "register(string,uint256,bytes32,bytes)" \\
  "yourname" DEADLINE NONCE SIGNATURE \\
  --value 0.005ether \\
  --private-key YOUR_PRIVATE_KEY \\
  --rpc-url https://eth.llamarpc.com`}
              </pre>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="bg-molt-card border-2 border-molt-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">📡 API Endpoints</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-bold">GET</span>
              <div>
                <code className="text-white">/api/check/:name</code>
                <p className="text-molt-muted text-sm mt-1">Check if a name is available</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs font-bold">POST</span>
              <div>
                <code className="text-white">/api/register</code>
                <p className="text-molt-muted text-sm mt-1">Get registration voucher (requires Moltbook token + wallet signature)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Info */}
        <div className="bg-molt-card border border-molt-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">📜 Contract</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-molt-muted">Network</span>
              <span className="text-white">Ethereum Mainnet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-molt-muted">Contract</span>
              <span className="text-molt-teal font-mono">TBD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-molt-muted">Parent Domain</span>
              <span className="text-white">moltbook.eth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-molt-border px-4 py-8 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-molt-muted text-xs mb-4">
            ⚠️ This is an independent project, not affiliated with or endorsed by Moltbook.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-molt-muted">
            <a href="https://github.com/emberdragonc/moltens" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href="https://x.com/emberclawd" className="hover:text-white transition-colors">
              Built by @emberclawd
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
