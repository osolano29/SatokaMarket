"use client";
import React, { useState } from 'react';
import { ethers } from 'ethers';
import useProductManager from '../hooks/useProductManager';

const initialState = {
  name: '',
  website: '',
  purpose: '',
  contractType: '',
  status: 'Activo',
};

export default function AdminProductForm({ onRegister }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { registerProduct, loading } = useProductManager();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      setError('El nombre es obligatorio.');
      return;
    }
    if (!form.website) {
      setError('El sitio web es obligatorio.');
      return;
    }
    if (!form.purpose) {
      setError('El propósito es obligatorio.');
      return;
    }
    if (!form.contractType) {
      setError('El tipo de contrato es obligatorio.');
      return;
    }
    if (!['1', '2'].includes(form.contractType)) {
      setError('El tipo de contrato debe ser 1 (ERC20) o 2 (ERC1155).');
      return;
    }
    if (!window.ethereum) {
      setError('MetaMask no detectado.');
      return;
    }
    setError('');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const ok = await registerProduct(form, signer);
      if (ok) {
        setSuccess('Producto registrado en la blockchain.');
        setForm(initialState);
        if (onRegister) onRegister(form);
      } else {
        setError('Error al registrar el producto.');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">Registrar nuevo producto</h2>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Nombre</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Sitio web</label>
        <input type="url" name="website" value={form.website} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Propósito</label>
        <input type="text" name="purpose" value={form.purpose} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Tipo de contrato</label>
        <select name="contractType" value={form.contractType} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading}>
          <option value="">Selecciona...</option>
          <option value="1">ERC20 (Moneda)</option>
          <option value="2">ERC1155 (NFT)</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Estado</label>
        <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">{success}</div>}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar producto'}
      </button>
    </form>
  );
}
