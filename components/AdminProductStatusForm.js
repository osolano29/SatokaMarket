import React, { useState } from 'react';

export default function AdminProductStatusForm({ onUpdateStatus }) {
  const [address, setAddress] = useState('');
  const [newStatus, setNewStatus] = useState(1);

  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!address) {
      setError('La dirección del producto es obligatoria.');
      return;
    }
    setError('');
    onUpdateStatus({ address, newStatus });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4 border-l-4 border-indigo-400" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2 text-indigo-700">Cambiar estado de producto</h3>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección del producto" value={address} onChange={e => setAddress(e.target.value)} />
      <select className="w-full mb-2 p-2 border rounded" value={newStatus} onChange={e => setNewStatus(Number(e.target.value))}>
        <option value={1}>Activo</option>
        <option value={0}>Inactivo</option>
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Actualizar estado</button>
    </form>
  );
}
