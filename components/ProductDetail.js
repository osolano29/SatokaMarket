"use client";

import Image from 'next/image';
import AcquireERC20 from './AcquireERC20';
import MintERC1155 from './MintERC1155';


export default function ProductDetail({ product }) {
  if (!product) return null;

  if (product.contractType === 1) {
    // ERC20 dinámico
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <Image src={product.image} alt={product.name} width={80} height={80} className="w-20 h-20 object-contain mb-2 mx-auto" />
        <h2 className="text-2xl font-bold mb-2 text-center">{product.name} {product.symbol ? `(${product.symbol})` : ''}</h2>
        <p className="text-gray-700 mb-2 text-center">{product.description || product.purpose}</p>
        {product.dollarRate && (
          <div className="text-center mb-2">Tasa de cambio: <span className="font-semibold">1 USD = {product.dollarRate} GO</span></div>
        )}
        <a href={product.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline block text-center mb-2">Sitio web</a>
        <div className="text-center text-sm text-gray-500">Estado: {product.status}</div>
        <AcquireERC20 product={product} />
      </div>
    );
  }

  if (product.contractType === 2) {
    // ERC1155 dinámico
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <Image src={product.image} alt={product.name} width={80} height={80} className="w-20 h-20 object-contain mb-2 mx-auto" />
        <h2 className="text-2xl font-bold mb-2 text-center">{product.name}</h2>
        <p className="text-gray-700 mb-2 text-center">{product.description || product.purpose}</p>
        <a href={product.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline block text-center mb-2">Sitio web</a>
        {product.nfts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {product.nfts.map((nft) => (
              <div key={nft.type} className="border rounded p-4 flex flex-col items-center">
                <Image src={nft.image} alt={nft.type} width={64} height={64} className="w-16 h-16 object-contain mb-2" />
                <div className="font-bold mb-1">{nft.type}</div>
                <div className="text-sm text-gray-700 mb-1">Máx. emitida: {nft.maxSupply}</div>
                <div className="text-sm text-gray-700 mb-1">Emitida: {nft.minted}</div>
                <div className="text-sm text-gray-700 mb-1">Precio: {nft.pricePOL} POL</div>
                <div className="text-sm text-gray-700 mb-1">Recompensa: {nft.rewardGO} GO</div>
                <div className="text-xs text-gray-500 mb-1">URI: {nft.uri}</div>
                <MintERC1155 nft={nft} />
              </div>
            ))}
          </div>
        )}
        <div className="text-center text-sm text-gray-500 mt-4">Estado: {product.status}</div>
      </div>
    );
  }

  return null;
}
