# 👻 GhostToken (Go)

Moneda utilitaria del ecosistema Satoka. Representa energía simbólica que puede ser minteada, transferida o usada como recompensa.

## 🔐 Roles

- **Dueño**: Puede registrar contratos autorizados, establecer límites y modificar parámetros.
- **Contratos autorizados**: Pueden mintear Go dentro de límites definidos.
- **Usuarios comunes**: Pueden transferir, aprobar y consultar balances.

## 🧩 Funciones administrativas

### `updateOwner(address, bool)`
Agrega o remueve dueños del contrato.

### `setActive(bool)`
Activa o desactiva el contrato.

### `setAllowedContract(address, bool)`
Autoriza o bloquea contratos para mintear Go.

### `setContractMintLimit(address, uint256)`
Define el límite de minteo para un contrato autorizado.

### `setDollarPriceInGo(uint256)`
Establece la tasa de cambio USD → Go.

## 🔍 Consultas públicas

### `getActive() → bool`
Indica si el contrato está operativo.

### `isOwner(address) → bool`
Verifica si una dirección es dueña del contrato.

### `getContractMintInfo(address)`
Devuelve:
- `mintLimit`
- `mintedCount`
- `remaining`

### `getDollarPriceInGo() → uint256`
Valor actual de 1 USD en Go.

## 🔁 Transacciones abiertas

### `transfer(address, uint256)`
Transfiere Go a otra cuenta.

### `transferFrom(address, address, uint256)`
Transfiere Go desde una cuenta autorizada.

### `approve(address, uint256)`
Aprueba gasto máximo de Go para una dirección.

### `mint(address, uint256)`
Mintea Go a una dirección (solo dueños o contratos autorizados).