
"use client";
import React from 'react';

import useProductManager from '../hooks/useProductManager';
import useWeb3Network from '../hooks/useWeb3Network';
import useUserRole from '../hooks/useUserRole';
import Image from 'next/image';
import ProductDetail from './ProductDetail';

const contractTypeLabel = {
  1: 'ERC20 (Moneda)',
  2: 'ERC1155 (NFT)',
};


export default function ProductList() {
  const { products, loading, error } = useProductManager();
  const { address, chainId, networkName, error: web3Error, isCorrectNetwork } = useWeb3Network();
  const role = useUserRole(address);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Mensaje si MetaMask no está instalado
  if (web3Error === 'MetaMask no está instalado.') {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4 text-center">
        <strong>MetaMask no está instalado.</strong><br />
        Por favor, instala MetaMask para interactuar con la dapp.<br />
        <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Descargar MetaMask</a>
      </div>
    );
  }

  // Mensaje si no hay sesión iniciada (solo en cliente)
  if (!address && !web3Error && isClient && window.ethereum) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4 text-center">
        <strong>No has iniciado sesión en MetaMask.</strong><br />
        Conecta tu billetera para operar con la dapp.
      </div>
    );
  }

  // Advertencia si la red no tiene contrato configurado
  if (error && error.includes('No se encontró la dirección del contrato ProductManager')) {
    // Obtener la dirección que se intentó usar
    const { getContractAddress } = require('../utils/contractAddresses');
    const contractAddress = getContractAddress('ProductManager', chainId);
    return (
      <div className="bg-orange-100 text-orange-800 p-4 rounded mb-4 text-center">
        <strong>Advertencia:</strong> La red <span className="font-bold">{networkName}</span> no tiene el contrato ProductManager configurado.<br />
        <span className="text-xs">
          Dirección de billetera: {address ? address : 'No conectada'}<br />
          chainId: {chainId ? chainId.toString() : 'No detectado'}<br />
          {contractAddress && <>Dirección de contrato intentada: {contractAddress}<br /></>}
        </span>
        Puedes ver los productos, pero no podrás operar sobre ellos en esta red.<br />
        <span className="text-xs">(Contacta al administrador si necesitas soporte para esta red)</span>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div>
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setSelectedProduct(null)}
        >
          ← Volver al listado
        </button>
        <ProductDetail product={selectedProduct} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Image src="/assets/default-product.png" alt="Imagen por defecto de producto" width={96} height={96} className="w-24 h-24 object-contain mb-2" />
        <span className="text-lg text-gray-700">Próximo a exhibir nuevos productos</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {products.map((product) => {
        let imageSrc = product.image;
        let altText = product.name ? `Imagen de ${product.name}` : "Imagen de producto";
        if (!imageSrc) {
          if (product.contractType === 1) {
            imageSrc = "/assets/ghost/g_GhostManosOro.png";
            altText = "Imagen representativa de token ERC20";
          } else if (product.contractType === 2) {
            imageSrc = `/assets/prjsatoka/prjSATOKA${product.name}.png`;
            altText = `Imagen NFT ${product.name}`;
          } else {
            imageSrc = "/assets/default-product.png";
            altText = "Imagen por defecto de producto";
          }
        }
        return (
          <div
            key={product.address}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedProduct(product)}
          >
            <Image src={imageSrc} alt={altText} width={96} height={96} className="w-24 h-24 object-contain mb-2" />
            <h2 className="text-xl font-bold mb-1">{product.name}</h2>
            <a href={product.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-1">Sitio web</a>
            <p className="text-gray-700 mb-1">Propósito: {product.purpose}</p>
            <p className="text-gray-700 mb-1">Tipo: {contractTypeLabel[product.contractType]}</p>
            <p className="text-gray-700 mb-1">Estado: {product.status}</p>
          </div>
        );
      })}
    </div>
  );
}
