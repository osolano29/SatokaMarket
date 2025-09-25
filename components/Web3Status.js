"use client";
import React from 'react';
import useWeb3Network from '../hooks/useWeb3Network';

export default function Web3Status() {
  const { address, chainId, networkName, isCorrectNetwork, error } = useWeb3Network();

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
        {error}
      </div>
    );
  }

  if (!address) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-4 text-center">
        Conecta tu billetera MetaMask para continuar.
      </div>
    );
  }

  return (
    <div className={`p-4 rounded mb-4 text-center ${isCorrectNetwork ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
      <div className="font-bold">Billetera conectada:</div>
      <div className="break-all">{address}</div>
      <div className="mt-2">Red: <span className="font-semibold">{networkName}</span></div>
      {!isCorrectNetwork && (
        <div className="mt-2 font-bold">⚠️ Cambia a Polygon Amoy, Polygon Mainnet o BNB Chain para operar.</div>
      )}
    </div>
  );
}
