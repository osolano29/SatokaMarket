import React from 'react';

const productManagerAdmin = [
  { key: 'setProduct', label: 'Registrar nuevo producto' },
  { key: 'updateProduct', label: 'Actualizar producto' }
];
const productManagerUser = [
  { key: 'getTotal', label: 'Ver total de productos' },
  { key: 'getProducts', label: 'Listar productos' },
  { key: 'getProductInfo', label: 'Ver información de producto' },
  { key: 'updateProductStatus', label: 'Cambiar estado de producto' }
];

const ghostTokenAdmin = [
  { key: 'updateOwner', label: 'Gestionar dueños' },
  { key: 'setActive', label: 'Activar/desactivar contrato' },
  { key: 'setAllowedContract', label: 'Autorizar contratos para minteo' },
  { key: 'setContractMintLimit', label: 'Definir límite de minteo' },
  { key: 'setDollarPriceInGo', label: 'Establecer tasa USD → Go' }
];
const ghostTokenUser = [
  { key: 'getActive', label: 'Ver estado del contrato' },
  { key: 'getDollarPriceInGo', label: 'Consultar tasa USD → Go' },
  { key: 'transfer', label: 'Transferir Go' },
  { key: 'transferFrom', label: 'Transferir Go desde cuenta autorizada' },
  { key: 'approve', label: 'Aprobar gasto de Go' },
  { key: 'mint', label: 'Mintear Go (si autorizado)' }
];

const satokaNFTAdmin = [
  { key: 'toggleGhostRewards', label: 'Activar/desactivar recompensas Go' },
  { key: 'updateGhostReward', label: 'Definir recompensa Go por NFT' },
  { key: 'withdrawPolyGo', label: 'Retirar fondos POL/Go' },
  { key: 'setWithdrawWallet', label: 'Definir billetera de retiro' },
  { key: 'setAuthorizedWallet', label: 'Autorizar billetera para minteo' },
  { key: 'mintBatch', label: 'Mintear NFTs masivos' },
  { key: 'setTypeURI', label: 'Actualizar metadatos NFT' },
  { key: 'setFundingActive', label: 'Activar/desactivar donaciones' },
  { key: 'pause', label: 'Pausar contrato' },
  { key: 'unpause', label: 'Reactivar contrato' },
  { key: 'setConversionPolGoRates', label: 'Definir tasa POL/Go' },
  { key: 'setGhostTokenAddress', label: 'Actualizar dirección GhostToken' }
];
const satokaNFTUser = [
  { key: 'getContractBalances', label: 'Consultar balances POL/Go/NFTs' }
];


export default function AdminUserMenu({ selectedContract, onSelectAction, adminRoles }) {
  const isAdmin = adminRoles?.[selectedContract] || false;
  const contractOptions = {
    ProductManager: isAdmin ? productManagerAdmin.concat(productManagerUser) : productManagerUser,
    GhostToken: isAdmin ? ghostTokenAdmin.concat(ghostTokenUser) : ghostTokenUser,
    SatokaNFT: isAdmin ? satokaNFTAdmin.concat(satokaNFTUser) : satokaNFTUser
  };
  const actions = contractOptions[selectedContract] || [];

  return (
    <aside className="w-64 bg-gray-50 border-r h-full p-4">
      <h2 className="text-lg font-bold mb-4">Menú de acciones</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Contrato:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedContract}
          onChange={e => onSelectAction(null, e.target.value)}
        >
          <option value="ProductManager">ProductManager</option>
          <option value="GhostToken">GhostToken</option>
          <option value="SatokaNFT">SatokaNFT</option>
        </select>
      </div>
      <ul>
        {actions.map(action => (
          <li key={action.key} className="mb-2">
            <button
              className="w-full text-left p-2 rounded hover:bg-indigo-100"
              onClick={() => onSelectAction(action.key, selectedContract)}
            >
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
