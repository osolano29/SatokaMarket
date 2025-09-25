import React, { useState } from 'react';

export default function AdminUpdateProductForm({ onUpdate }) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [purpose, setPurpose] = useState('');
  const [contractType, setContractType] = useState(1);
  const [status, setStatus] = useState(1);

  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!address) {
      setError('La dirección del producto es obligatoria.');
      return;
    }
    if (!name) {
      setError('El nombre es obligatorio.');
      return;
    }
    if (!website) {
      setError('El sitio web es obligatorio.');
      return;
    }
    if (!purpose) {
      setError('El propósito es obligatorio.');
      return;
    }
    if (![1,2].includes(contractType)) {
      setError('El tipo de contrato debe ser ERC20 o ERC1155.');
      return;
    }
    setError('');
    onUpdate({ address, name, website, purpose, contractType, status });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-2">Actualizar producto</h3>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Dirección del producto" value={address} onChange={e => setAddress(e.target.value)} />
      <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Sitio web" value={website} onChange={e => setWebsite(e.target.value)} />
      <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Propósito" value={purpose} onChange={e => setPurpose(e.target.value)} />
      <select className="w-full mb-2 p-2 border rounded" value={contractType} onChange={e => setContractType(Number(e.target.value))}>
        <option value={1}>ERC20 (Moneda)</option>
        <option value={2}>ERC1155 (NFT)</option>
      </select>
      <select className="w-full mb-2 p-2 border rounded" value={status} onChange={e => setStatus(Number(e.target.value))}>
        <option value={1}>Activo</option>
        <option value={0}>Inactivo</option>
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Actualizar</button>
    </form>
  );
}
