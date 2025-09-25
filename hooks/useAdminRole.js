import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ProductManagerABI from '../contracts/ProductManager.abi.json';
import { getContractAddress } from '../utils/contractAddresses';
import useWeb3Network from './useWeb3Network';

export default function useAdminRole() {
  const { address, chainId } = useWeb3Network();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAdmin() {
      setLoading(true);
      setError('');
      try {
        if (!address || !chainId) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }
        if (!window.ethereum) throw new Error('MetaMask no detectado');
        const provider = new ethers.BrowserProvider(window.ethereum, false);
        const contractAddress = getContractAddress('ProductManager', chainId);
        if (!contractAddress) throw new Error('No se encontró la dirección del contrato ProductManager para la red seleccionada.');
        const contract = new ethers.Contract(contractAddress, ProductManagerABI, provider);
  const result = await contract.esAdmin();
        setIsAdmin(result);
      } catch (err) {
        setError(err.message);
        setIsAdmin(false);
      }
      setLoading(false);
    }
    checkAdmin();
  }, [address, chainId]);

  return { isAdmin, loading, error };
}
