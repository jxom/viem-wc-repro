import 'viem/window';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Address, createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

const provider = await EthereumProvider.init({
  projectId: '2d8155e8754dd573bb58a45c3f4ec083',
  chains: [mainnet.id],
  showQrModal: true,
});

const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(provider),
});

function Example() {
  const [account, setAccount] = useState<Address>();

  const connect = async () => {
    await provider.connect();
    const [address] = await walletClient.getAddresses();
    setAccount(address);
  };

  const sendTransaction = async () => {
    if (!account) return;

    // Simulate a long-running async task.
    await new Promise(res => setTimeout(() => res(''), 1000))

    await walletClient.sendTransaction({
      account,
      value: 0n
    });
  };

  if (account)
    return (
      <>
        <div>Connected: {account}</div>
        <button onClick={sendTransaction}>Send Transaction</button>
      </>
    );
  return <button onClick={connect}>Connect Wallet</button>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Example />);
