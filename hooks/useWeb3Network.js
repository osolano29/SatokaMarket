import { useState, useEffect } from 'react';

const POLYGON_AMOY_CHAIN_ID = '0x13882'; // 80002
const POLYGON_MAINNET_CHAIN_ID = '0x89'; // 137
const BNB_CHAIN_ID = '0x38'; // 56

const NETWORKS = {
  [POLYGON_AMOY_CHAIN_ID]: 'Polygon Amoy',
  [POLYGON_MAINNET_CHAIN_ID]: 'Polygon Mainnet',
  [BNB_CHAIN_ID]: 'BNB Chain',
};

export default function useWeb3Network() {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [networkName, setNetworkName] = useState('');
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask no está instalado.');
      return;
    }

    async function checkNetwork() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        setNetworkName(NETWORKS[chainId] || 'Red desconocida');
        setIsCorrectNetwork(
          chainId === POLYGON_AMOY_CHAIN_ID ||
          chainId === POLYGON_MAINNET_CHAIN_ID ||
          chainId === BNB_CHAIN_ID
        );
      } catch (err) {
        setError('Error al conectar con MetaMask.');
      }
    }

    checkNetwork();

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }, []);

  return { address, chainId, networkName, isCorrectNetwork, error };
}
