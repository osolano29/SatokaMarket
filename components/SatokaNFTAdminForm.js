import React, { useState } from 'react';

export default function SatokaNFTAdminForm({ onAction, selectedAction }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [nftType, setNftType] = useState('PIONEER');
  const [active, setActive] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    onAction({ action: selectedAction, address, amount, nftType, active });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4 border-l-4 border-purple-400" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2 text-purple-700">Acción administrativa SatokaNFT</h3>
      {(selectedAction === 'setAuthorizedWallet' || selectedAction === 'setWithdrawWallet' || selectedAction === 'mintBatch') && (
        <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} />
      )}
      {selectedAction === 'mintBatch' && (
        <input type="number" className="w-full mb-2 p-2 border rounded" placeholder="Cantidad" value={amount} onChange={e => setAmount(e.target.value)} />
      )}
      {selectedAction === 'updateGhostReward' && (
        <>
          <select className="w-full mb-2 p-2 border rounded" value={nftType} onChange={e => setNftType(e.target.value)}>
            <option value="PIONEER">PIONEER</option>
            <option value="EARLY_ADOPTER">EARLY_ADOPTER</option>
            <option value="COMMUNITY">COMMUNITY</option>
            <option value="RENOWN">RENOWN</option>
            <option value="INCOGNITO">INCOGNITO</option>
          </select>
          <input type="number" className="w-full mb-2 p-2 border rounded" placeholder="Cantidad Go" value={amount} onChange={e => setAmount(e.target.value)} />
        </>
      )}
      {(selectedAction === 'toggleGhostRewards' || selectedAction === 'setFundingActive' || selectedAction === 'pause' || selectedAction === 'unpause') && (
        <select className="w-full mb-2 p-2 border rounded" value={active ? 'true' : 'false'} onChange={e => setActive(e.target.value === 'true')}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      )}
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Ejecutar acción</button>
    </form>
  );
}
