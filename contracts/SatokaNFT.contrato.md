# 🧬 SatokaNFT

Contrato ERC1155 que representa NFTs simbólicos otorgados por contribuciones al proyecto SATOKA. Cada NFT refleja un nivel de conciencia y participación.

## 🧠 Tipos de NFT

- `PIONEER`
- `EARLY_ADOPTER`
- `COMMUNITY`
- `RENOWN`
- `INCOGNITO`

Ordenados de mayor a menor valor simbólico.

## 🔐 Roles

- **Dueño**: Control total sobre parámetros, recompensas y fondos.
- **Autorizados**: Pueden mintear NFTs en nombre del contrato.
- **Usuarios comunes**: Pueden adquirir NFTs mediante donación.

## 🧩 Funciones administrativas

### `toggleGhostRewards(bool)`
Activa o desactiva recompensas en Go por donación.

### `updateGhostReward(nftType, amount)`
Define recompensa en Go por tipo de NFT.

### `withdrawPolyGo(polAmount, goAmount)`
Retira fondos acumulados en POL y Go.

### `setWithdrawWallet(address)`
Define billetera de retiro para gastos del proyecto.

### `setAuthorizedWallet(address, bool)`
Autoriza billeteras para minteo masivo.

### `mintBatch(address, types[], amounts[])`
Mintea múltiples NFTs a una dirección.

### `setTypeURI(nftType, uri)`
Actualiza metadatos de un tipo de NFT.

### `setFundingActive(bool)`
Activa o desactiva la recepción de donaciones.

### `pause()` / `unpause()`
Pausa o reactiva el contrato.

### `setConversionPolGoRates(polRate, goRate)`
Define tasa de cambio POL y Go respecto al USD.

### `setGhostTokenAddress(address)`
Actualiza la dirección del contrato GhostToken.

### `getContractBalances(address)`
Consulta balances de POL, Go y NFTs para una dirección.

## 🔍 Consultas públicas

### `uri(tokenType)`
Devuelve URI del metadato del NFT.

### `getBalanceNFTs(address)`
Consulta cuántos NFTs tiene una dirección.

### `getNFTInfo(nftType)`
Devuelve:
- `maxSupply`
- `minted`
- `price`
- `uriWeb`
- `ghostReward`

### `isFundingActive()` / `isRewardsActive()`
Consulta si están activas las donaciones y recompensas.

## 🔁 Transacciones abiertas

### `receive() payable`
Recibe donaciones en POL y asigna NFTs automáticamente.

### `depositTokenGo(amount)`
Donación en Go para adquirir NFTs.

### `getMyRewardBalance()`
Consulta recompensas acumuladas en Go.

### `claimMyGhostRewards()`
Reclama recompensas en Go.

### `safeTransferFrom(from, to, id, amount, data)`
Transfiere NFTs entre direcciones.

// Crear un componente que permita al usuario adquirir NFTs mediante donación en POL o Go.
// Mostrar tipos de NFT disponibles con getNFTInfo()
// Calcular cuántos puede adquirir según monto ingresado
// Usar receive() para POL y depositTokenGo() para Go
// Mostrar recompensas disponibles con getMyRewardBalance() y claimMyGhostRewards()
// Validar si isFundingActive() y isRewardsActive() están activos
// Mostrar metadatos desde uri(tokenType)