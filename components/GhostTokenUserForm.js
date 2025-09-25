import React, { useState } from 'react';

export default function GhostTokenUserForm({ onAction }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('transfer');

  const handleSubmit = e => {
    e.preventDefault();
    onAction({ action, address, amount });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4 border-l-4 border-green-400" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2 text-green-700">Acción de usuario GhostToken</h3>
      <select className="w-full mb-2 p-2 border rounded" value={action} onChange={e => setAction(e.target.value)}>
        <option value="transfer">Transferir Go</option>
        <option value="transferFrom">Transferir Go desde cuenta autorizada</option>
        <option value="approve">Aprobar gasto de Go</option>
        <option value="mint">Mintear Go (si autorizado)</option>
      </select>
      {(action === 'transfer' || action === 'transferFrom' || action === 'approve' || action === 'mint') && (
        <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} />
      )}
      {(action === 'transfer' || action === 'transferFrom' || action === 'approve' || action === 'mint') && (
        <input type="number" className="w-full mb-2 p-2 border rounded" placeholder="Cantidad Go" value={amount} onChange={e => setAmount(e.target.value)} />
      )}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ejecutar acción</button>
    </form>
  );
}
