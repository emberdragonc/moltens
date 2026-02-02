import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// WalletConnect project ID - get one at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})

// Contract addresses
export const MOLTENS_CONTRACT = {
  address: '0x0000000000000000000000000000000000000000' as `0x${string}`, // TBD after deploy
  abi: [
    {
      name: 'register',
      type: 'function',
      stateMutability: 'payable',
      inputs: [
        { name: 'label', type: 'string' },
        { name: 'deadline', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' },
        { name: 'signature', type: 'bytes' },
      ],
      outputs: [],
    },
    {
      name: 'isAvailable',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'label', type: 'string' }],
      outputs: [{ name: '', type: 'bool' }],
    },
    {
      name: 'fee',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }],
    },
  ] as const,
}

export const REGISTRATION_FEE = BigInt('5000000000000000') // 0.005 ETH
