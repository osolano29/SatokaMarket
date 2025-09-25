# 🧱 ProductManager

Contrato central que registra y mantiene productos simbólicos dentro del ecosistema Satoka. Cada producto representa un criptoactivo con propósito narrativo y técnico.

## 🔐 Roles

- **Administrador**: Dueño del contrato, con permisos para registrar y modificar productos.
- **Usuario común**: Puede consultar productos, pero no modificarlos.

## 🧩 Funciones públicas

### `esAdmin() → bool`
Determina si la dirección que invoca es el dueño del contrato.

### `getTotal() → uint256`
Devuelve el total de productos registrados.

### `getProducts() → address[]`
Lista todas las direcciones de productos registrados.

### `getProductInfo(address)`
Devuelve:
- `name`: Nombre del producto
- `website`: Sitio web asociado
- `purpose`: Propósito simbólico
- `contractType`: Tipo de contrato (0: Unknown, 1: ERC20, 2: ERC1155)
- `status`: Estado operativo

## 🔁 Funciones administrativas

### `setProduct(...) → bool`
Registra un nuevo producto con su información completa.

### `updateProduct(...) → bool`
Actualiza la información de un producto existente.

### `updateProductStatus(...) → bool`
Activa o desactiva un producto. El estado desactivado indica que no está operativo.

## Prompt para Copilot: 
### Prompt para generar un componente React que interactúe con ProductManager
- Crear un componente React que muestre todos los productos registrados en el contrato ProductManager.
- Usar el hook useGetProducts() para obtener direcciones.
- Para cada dirección, usar useGetProductInfo(address) y renderizar nombre, propósito, tipo y estado.
- Si el usuario es admin (useIsAdmin()), mostrar botón de edición.
- El componente debe ser responsivo y mostrar loader mientras carga.

### Prompt para generar vista de administrador. Crear una vista exclusiva para administradores que permita:
- Registrar nuevos productos con setProduct()
- Actualizar estado con updateProductStatus()
- Configurar recompensas en GhostToken con updateGhostReward()
- Retirar fondos con withdrawPolyGo()
- Autorizar billeteras con setAuthorizedWallet()
- Usar validación de inputs y mostrar mensajes simbólicos en cada acción.

### Prompt para generar conexión con MetaMask y detección de red:
- Crear un componente que conecte MetaMask y valide si el usuario está en la red.
- Usar ethers.js para obtener el signer y address
- Validar CHAIN_ID contra .env
- Guardar dirección en contexto global
- Mostrar ícono de conexión y mensaje simbólico al conectar

### Prompt para generar hook de balances
- Crear un hook useContractBalances() que consulte los balances de POL, Go y NFTs para una dirección.
- Usar getContractBalances(address) del contrato SatokaNFT
- Devolver un objeto con los valores formateados
- Usar en AdminPanel y vistas de usuario
  
