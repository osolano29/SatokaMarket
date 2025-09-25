import { useState } from 'react';
import { ethers } from 'ethers';
import GhostTokenABI from '../contracts/GhostToken.abi.json';

const GHOST_TOKEN_ADDRESS = '0xGHOSTTOKEN'; // Reemplazar por la dirección real

export default function useGhostToken() {
  const [dollarRate, setDollarRate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Consulta la tasa de cambio USD -> GO
  const fetchDollarRate = async () => {
    setLoading(true);
    setError('');
    try {
      if (!window.ethereum) throw new Error('MetaMask no detectado');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(GHOST_TOKEN_ADDRESS, GhostTokenABI, provider);
      const rate = await contract.getDollarPriceInGo();
      setDollarRate(Number(rate));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Mintea tokens GO
  const mintGo = async (to, amount, signer) => {
    setLoading(true);
    setError('');
    try {
      const contract = new ethers.Contract(GHOST_TOKEN_ADDRESS, GhostTokenABI, signer);
      const tx = await contract.mint(to, amount);
      await tx.wait();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { dollarRate, loading, error, fetchDollarRate, mintGo };
}
