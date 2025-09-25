import React, { useState } from 'react';

export default function ProductManagerUserForm({ onAction, selectedAction }) {
  const [address, setAddress] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAction({ action: selectedAction, address });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4 border-l-4 border-indigo-400" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2 text-indigo-700">Acción de usuario ProductManager</h3>
      {(selectedAction === 'getProductInfo' || selectedAction === 'updateProductStatus') && (
        <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección del producto" value={address} onChange={e => setAddress(e.target.value)} />
      )}
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Ejecutar acción</button>
    </form>
  );
}
