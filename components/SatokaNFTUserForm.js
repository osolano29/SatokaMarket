import React, { useState } from 'react';

export default function SatokaNFTUserForm({ onAction, selectedAction }) {
  const [address, setAddress] = useState('');
  const [nftType, setNftType] = useState('PIONEER');
  const [amount, setAmount] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAction({ action: selectedAction, address, nftType, amount });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4 border-l-4 border-purple-400" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2 text-purple-700">Acción de usuario SatokaNFT</h3>
      {(selectedAction === 'getContractBalances' || selectedAction === 'mintBatch') && (
        <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} />
      )}
      {selectedAction === 'mintBatch' && (
        <>
          <select className="w-full mb-2 p-2 border rounded" value={nftType} onChange={e => setNftType(e.target.value)}>
            <option value="PIONEER">PIONEER</option>
            <option value="EARLY_ADOPTER">EARLY_ADOPTER</option>
            <option value="COMMUNITY">COMMUNITY</option>
            <option value="RENOWN">RENOWN</option>
            <option value="INCOGNITO">INCOGNITO</option>
          </select>
          <input type="number" className="w-full mb-2 p-2 border rounded" placeholder="Cantidad" value={amount} onChange={e => setAmount(e.target.value)} />
        </>
      )}
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Ejecutar acción</button>
    </form>
  );
}
