import React, { useState } from 'react';

export default function GhostTokenAdminForm({ onAction, selectedAction }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [mintLimit, setMintLimit] = useState('');
  const [usdRate, setUsdRate] = useState('');
  const [active, setActive] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    onAction({ action: selectedAction, address, amount, mintLimit, usdRate, active });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4 border-l-4 border-green-400" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2 text-green-700">Acción administrativa GhostToken</h3>
      {(selectedAction === 'updateOwner' || selectedAction === 'setAllowedContract' || selectedAction === 'setContractMintLimit') && (
        <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} />
      )}
      {selectedAction === 'setContractMintLimit' && (
        <input type="number" className="w-full mb-2 p-2 border rounded" placeholder="Límite de minteo" value={mintLimit} onChange={e => setMintLimit(e.target.value)} />
      )}
      {selectedAction === 'setDollarPriceInGo' && (
        <input type="number" className="w-full mb-2 p-2 border rounded" placeholder="Tasa USD → Go" value={usdRate} onChange={e => setUsdRate(e.target.value)} />
      )}
      {selectedAction === 'setActive' && (
        <select className="w-full mb-2 p-2 border rounded" value={active ? 'true' : 'false'} onChange={e => setActive(e.target.value === 'true')}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      )}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ejecutar acción</button>
    </form>
  );
}
