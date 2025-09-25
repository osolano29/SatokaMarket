"use client";
import ProductManagerUserForm from './ProductManagerUserForm';
import SatokaNFTUserForm from './SatokaNFTUserForm';
import GhostTokenUserForm from './GhostTokenUserForm';
import SatokaNFTAdminForm from './SatokaNFTAdminForm';
import GhostTokenAdminForm from './GhostTokenAdminForm';
import React, { useState, useEffect } from 'react';
import useWeb3Network from '../hooks/useWeb3Network';
import { ethers } from 'ethers';
import ProductManagerABI from '../contracts/ProductManager.abi.json';
import GhostTokenABI from '../contracts/GhostToken.abi.json';
import SatokaNFTABI from '../contracts/SatokaNFT.abi.json';
import { getContractAddress } from '../utils/contractAddresses';
import AdminProductForm from './AdminProductForm';
import AdminUpdateProductForm from './AdminUpdateProductForm';
import AdminProductStatusForm from './AdminProductStatusForm';
import ProductList from './ProductList';
import AdminUserMenu from './AdminUserMenu';
import ActionPlaceholder from './ActionPlaceholder';

export default function MarketplaceView() {
  // Componente reutilizable para feedback visual
  function FeedbackStatus({ status }) {
    if (!status) return null;
    if (status.loading) return <div className="text-blue-600 text-sm mt-2">Procesando transacción...</div>;
    if (status.success) return <div className="text-green-600 text-sm mt-2">¡Transacción exitosa!</div>;
    if (status.error) return <div className="text-red-600 text-sm mt-2">Error: {status.error}</div>;
    return null;
  }

  // Estados de feedback para cada tipo de formulario
  const [pmTxStatus, setPmTxStatus] = useState({ loading: false, success: false, error: '' });
  const [satokaTxStatus, setSatokaTxStatus] = useState({ loading: false, success: false, error: '' });
  const [adminTxStatus, setAdminTxStatus] = useState({ loading: false, success: false, error: '' });

  // Handlers genéricos para cada contrato
  async function handleProductManagerAction(data) {
    setPmTxStatus({ loading: true, success: false, error: '' });
    setTimeout(() => setPmTxStatus({ loading: false, success: true, error: '' }), 1200);
  }
  async function handleSatokaNFTAction(data) {
      // Validaciones por acción
    switch (data.action) {
      case 'setAuthorizedWallet':
      case 'setWithdrawWallet':
        return (
            <div className="flex h-screen">
              <AdminUserMenu selectedContract={selectedContract} onSelectAction={handleSelectAction} adminRoles={adminRoles} />
              <main className="flex-1 p-4 overflow-y-auto">
                {/* Modal bloqueante para mostrar resultado raw de esAdmin */}
                {showAdminModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center">
                      <h2 className="text-xl font-bold mb-4">Resultado crudo de esAdmin()</h2>
                      <pre className="bg-gray-100 p-3 rounded mb-4 text-xs overflow-x-auto">{JSON.stringify(rawAdminResult, null, 2)}</pre>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700" onClick={() => setShowAdminModal(false)}>
                        OK
                      </button>
                    </div>
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-6 text-center">Satoka Marketplace</h1>
                {loading && <div className="text-center text-gray-500 mb-4">Verificando permisos de administrador...</div>}
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
                {/* Panel de diagnóstico ProductManager */}
                <DiagnosticoPanel
                  titulo="Diagnóstico ProductManager"
                  direccion={diagnostic.pmAddr}
                  chainId={diagnostic.chainId}
                  billetera={address}
                  resultado={diagnostic.pmAdmin}
                  labelResultado="¿esAdmin?"
                />
                {/* Panel de diagnóstico SatokaNFT */}
                <DiagnosticoPanel
                  titulo="Diagnóstico SatokaNFT"
                  direccion={diagnostic.snAddr}
                  chainId={diagnostic.chainId}
                  billetera={address}
                  resultado={diagnostic.snAdmin}
                  labelResultado="¿isAuthorized?"
                />
                {/* Renderiza el placeholder de acción seleccionada */}
                <ActionPlaceholder contract={selectedContract} action={selectedAction} />
                {/* Formularios de usuario */}
                {/* ...aquí siguen los formularios y componentes como antes... */}
                <ProductList />
              </main>
            </div>
          );
    }}

  const [ghostTokenTxStatus, setGhostTokenTxStatus] = useState({ loading: false, success: false, error: '' });

  async function handleGhostTokenAdminAction(data) {
      // Validaciones por acción
    switch (data.action) {
        case 'updateOwner':
        case 'setAllowedContract':
          if (!data.address) {
            setGhostTokenTxStatus({ loading: false, success: false, error: 'La dirección es obligatoria.' });
            return;
          }
          break;
        case 'setContractMintLimit':
          if (!data.address) {
            setGhostTokenTxStatus({ loading: false, success: false, error: 'La dirección es obligatoria.' });
            return;
          }
          if (!data.mintLimit || isNaN(data.mintLimit) || Number(data.mintLimit) <= 0) {
            setGhostTokenTxStatus({ loading: false, success: false, error: 'El límite de minteo debe ser mayor a 0.' });
            return;
          }
          break;
        case 'setDollarPriceInGo':
          if (!data.usdRate || isNaN(data.usdRate) || Number(data.usdRate) <= 0) {
            setGhostTokenTxStatus({ loading: false, success: false, error: 'La tasa USD → Go debe ser mayor a 0.' });
            return;
          }
          break;
        default:
          // Acciones que no requieren validación extra
          break;
    }
    setGhostTokenTxStatus({ loading: true, success: false, error: '' });
    const { action, address: targetAddress, amount, mintLimit, usdRate, active } = data;
    const contractAddress = getContractAddress('GhostToken', chainId);
    if (!window.ethereum || !contractAddress) {
        setGhostTokenTxStatus({ loading: false, success: false, error: 'MetaMask o dirección de contrato no disponible' });
        return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, GhostTokenABI, signer);
    try {
        let tx;
        switch (action) {
          case 'updateOwner':
            tx = await contract.updateOwner(targetAddress, true);
            break;
          case 'setActive':
            tx = await contract.setActive(active);
            break;
          case 'setAllowedContract':
            tx = await contract.setAllowedContract(targetAddress, true);
            break;
          case 'setContractMintLimit':
            tx = await contract.setContractMintLimit(targetAddress, mintLimit);
            break;
          case 'setDollarPriceInGo':
            tx = await contract.setDollarPriceInGo(usdRate);
            break;
          default:
            setGhostTokenTxStatus({ loading: false, success: false, error: 'Acción no soportada' });
            return;
      }
        await tx.wait();
        setGhostTokenTxStatus({ loading: false, success: true, error: '' });
      } catch (err) {
        console.error('Error GhostToken:', err);
        setGhostTokenTxStatus({ loading: false, success: false, error: err.reason || err.message });
      }
    }

  const { address, chainId } = useWeb3Network();
  const [selectedContract, setSelectedContract] = useState('ProductManager');
  const [selectedAction, setSelectedAction] = useState(null);
  const [adminRoles, setAdminRoles] = useState({
    ProductManager: false,
    GhostToken: false,
    SatokaNFT: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [rawAdminResult, setRawAdminResult] = useState(null);

  const [diagnostic, setDiagnostic] = useState({ pmAddr: '', chainId: '', pmAdmin: null, snAddr: '', snAdmin: null });
  useEffect(() => {
    async function checkRawAdmin() {
      if (!address || !chainId || !window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum, false);
      const pmAddr = getContractAddress('ProductManager', chainId);
      let rawResult = null;
      if (pmAddr && ProductManagerABI.find(f => f.name === 'esAdmin')) {
        try {
          const pmContract = new ethers.Contract(pmAddr, ProductManagerABI, provider);
          rawResult = await pmContract.esAdmin();
        } catch (err) {
          rawResult = err;
        }
      }
      setRawAdminResult(rawResult);
      setShowAdminModal(true);
    }
    checkRawAdmin();
  }, [address, chainId]);

  // El resto de la lógica de roles y diagnóstico se ejecuta solo si el modal fue aceptado
  useEffect(() => {
    if (!showAdminModal) {
      // ...existing code for checkRoles (copiar el useEffect original aquí, pero solo si showAdminModal es false)...
      async function checkRoles() {
        setLoading(true);
        setError('');
        let pmAddr = '';
        let pmAdmin = null;
        try {
          if (!address || !chainId || !window.ethereum) {
            setAdminRoles({ ProductManager: false, GhostToken: false, SatokaNFT: false });
            setLoading(false);
            setDiagnostic({ pmAddr: '', chainId: chainId || '', pmAdmin: null });
            return;
          }
          const provider = new ethers.BrowserProvider(window.ethereum, false);
          // ProductManager: esAdmin()
          pmAddr = getContractAddress('ProductManager', chainId);
          if (pmAddr && ProductManagerABI.find(f => f.name === 'esAdmin')) {
            try {
              const pmContract = new ethers.Contract(pmAddr, ProductManagerABI, provider);
              pmAdmin = await pmContract.esAdmin();
            } catch (err) {
              if (err.code === 'CALL_EXCEPTION') {
                setError('No tienes permisos de administrador en ProductManager o la función esAdmin no está disponible.');
              } else {
                setError('Error al consultar ProductManager: ' + (err.reason || err.message));
              }
              pmAdmin = false;
            }
          }
          // GhostToken: isOwner(address)
          const gtAddr = getContractAddress('GhostToken', chainId);
          let gtAdmin = false;
          if (gtAddr && GhostTokenABI.find(f => f.name === 'isOwner')) {
            try {
              const gtContract = new ethers.Contract(gtAddr, GhostTokenABI, provider);
              gtAdmin = await gtContract.isOwner(address);
            } catch (err) {
              if (err.code === 'CALL_EXCEPTION') {
                setError('No tienes permisos de administrador en GhostToken o la función isOwner no está disponible.');
              } else {
                setError('Error al consultar GhostToken: ' + (err.reason || err.message));
              }
              gtAdmin = false;
            }
          }
          // SatokaNFT: isAuthorized(address)
          const snAddr = getContractAddress('SatokaNFT', chainId);
          let snAdmin = false;
          if (snAddr && SatokaNFTABI.find(f => f.name === 'isAuthorized')) {
            try {
              const snContract = new ethers.Contract(snAddr, SatokaNFTABI, provider);
              snAdmin = await snContract.isAuthorized(address);
            } catch (err) {
              if (err.code === 'CALL_EXCEPTION') {
                setError('No tienes permisos de administrador en SatokaNFT o la función isAuthorized no está disponible.');
              } else {
                setError('Error al consultar SatokaNFT: ' + (err.reason || err.message));
              }
              snAdmin = false;
            }
          }
          setAdminRoles({ ProductManager: pmAdmin, GhostToken: gtAdmin, SatokaNFT: snAdmin });
          setDiagnostic({ pmAddr, chainId, pmAdmin, snAddr, snAdmin });
        } catch (err) {
          setError('Error general: ' + (err.reason || err.message));
          setAdminRoles({ ProductManager: false, GhostToken: false, SatokaNFT: false });
          setDiagnostic({ pmAddr, chainId, pmAdmin });
        }
        setLoading(false);
      }
      checkRoles();
    }
  }, [showAdminModal, address, chainId]);

  const handleSelectAction = (action, contract) => {
    setSelectedContract(contract);
    setSelectedAction(action);
  };

  return (
  <div className="flex h-screen">
    <AdminUserMenu selectedContract={selectedContract} onSelectAction={handleSelectAction} adminRoles={adminRoles} />
    <main className="flex-1 p-4 overflow-y-auto">
      {/* Modal bloqueante para mostrar resultado raw de esAdmin */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">Resultado crudo de esAdmin()</h2>
            <pre className="bg-gray-100 p-3 rounded mb-4 text-xs overflow-x-auto">{JSON.stringify(rawAdminResult, null, 2)}</pre>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700" onClick={() => setShowAdminModal(false)}>
              OK
            </button>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center">Satoka Marketplace</h1>
      {loading && <div className="text-center text-gray-500 mb-4">Verificando permisos de administrador...</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
      {/* Panel de diagnóstico ProductManager */}
      <DiagnosticoPanel
        titulo="Diagnóstico ProductManager"
        direccion={diagnostic.pmAddr}
        chainId={diagnostic.chainId}
        billetera={address}
        resultado={diagnostic.pmAdmin}
        labelResultado="¿esAdmin?"
      />
      {/* Panel de diagnóstico SatokaNFT */}
      <DiagnosticoPanel
        titulo="Diagnóstico SatokaNFT"
        direccion={diagnostic.snAddr}
        chainId={diagnostic.chainId}
        billetera={address}
        resultado={diagnostic.snAdmin}
        labelResultado="¿isAuthorized?"
      />
      {/* Renderiza el placeholder de acción seleccionada */}
      <ActionPlaceholder contract={selectedContract} action={selectedAction} />
      {/* Formularios de usuario */}
      <ProductList />
    </main>
  </div>
  );
}
// Componente reutilizable para diagnóstico
function DiagnosticoPanel({ titulo, direccion, chainId, billetera, resultado, labelResultado }) {
  return (
    <div className="bg-gray-100 border p-3 rounded mb-4 text-xs">
      <div><strong>{titulo}:</strong></div>
      <div><b>Dirección contrato:</b> {direccion || 'No detectada'}</div>
      <div><b>ChainId:</b> {chainId || 'No detectado'}</div>
      <div><b>Billetera conectada:</b> {billetera || 'No detectada'}</div>
      <div><b>{labelResultado}:</b> {resultado === null ? 'Sin consultar' : resultado ? 'Sí' : 'No'}</div>
    </div>
  );
}