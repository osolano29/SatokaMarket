import React from 'react';
import useWeb3Network from '../hooks/useWeb3Network';
import useUserRole from '../hooks/useUserRole';

export default function RoleBanner() {
  const { address } = useWeb3Network();
  const role = useUserRole(address);

  if (role === 'guest') {
    return (
      <div className="bg-gray-100 text-gray-700 p-3 rounded mb-4 text-center">
        Accede con MetaMask para operar en el marketplace.
      </div>
    );
  }
  // El rol de admin se verifica vía contrato, no por lógica local
  return (
    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center font-bold">
      Modo usuario: puedes consultar y adquirir criptoactivos.
    </div>
  );
}
