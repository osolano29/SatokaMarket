import { useState } from 'react';
import { ethers } from 'ethers';
import SatokaNFTABI from '../contracts/SatokaNFT.abi.json';

const SATOKA_NFT_ADDRESS = '0xSATOKANFT'; // Reemplazar por la dirección real

export default function useSatokaNFT() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Consulta info de tipo de NFT
  const getTypeInfo = async (typeId) => {
    setLoading(true);
    setError('');
    try {
      if (!window.ethereum) throw new Error('MetaMask no detectado');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(SATOKA_NFT_ADDRESS, SatokaNFTABI, provider);
      const info = await contract.getTypeInfo(typeId);
      setLoading(false);
      return info;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // Mintea NFTs
  const mintBatch = async (typeId, amount, signer) => {
    setLoading(true);
    setError('');
    try {
      const contract = new ethers.Contract(SATOKA_NFT_ADDRESS, SatokaNFTABI, signer);
      const tx = await contract.mintBatch(typeId, amount);
      await tx.wait();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getTypeInfo, mintBatch };
}
