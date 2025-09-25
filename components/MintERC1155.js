"use client";
import React, { useState } from 'react';
export default function MintERC1155({ nft }) {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { mintBatch, loading } = useSatokaNFT();

  const handleChange = (e) => {
    setAmount(e.target.value);
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
      setError('Ingresa una cantidad válida a mintear.');
      return;
    }
    if (parseInt(amount) > (nft.maxSupply - nft.minted)) {
      setError('No puedes mintear más de la cantidad disponible.');
      return;
    }
    if (!window.ethereum) {
      setError('MetaMask no detectado.');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // Se asume que el typeId es el índice del array de nfts
      const ok = await mintBatch(nft.type, parseInt(amount), signer);
      if (ok) {
        setSuccess(`Has minteado ${amount} NFT(s) tipo ${nft.type}.`);
        setAmount('');
      } else {
        setError('Error al mintear NFT.');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-4 mt-4" onSubmit={handleSubmit}>
      <h4 className="text-md font-bold mb-2 text-center">Mintear NFT {nft.type}</h4>
      <div className="mb-2">
        <label className="block mb-1 font-semibold">Cantidad a mintear</label>
        <input type="number" min="1" max={nft.maxSupply - nft.minted} value={amount} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading} />
      </div>
      <div className="mb-2 text-sm text-gray-700">Precio por unidad: {nft.pricePOL} POL</div>
      <div className="mb-2 text-sm text-gray-700">Recompensa por unidad: {nft.rewardGO} GO</div>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">{success}</div>}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition" disabled={loading}>
        {loading ? 'Procesando...' : 'Mintear'}
      </button>
    </form>
  );
}
