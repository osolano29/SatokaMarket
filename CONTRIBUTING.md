# Contribuir al Satoka dApp Marketplace

Estas especificaciones deben guiar la generación de componentes React, hooks personalizados, validaciones y vistas condicionales según el rol del usuario.

## 🧭 Estructura del Proyecto

- `src`: Código fuente React + TypeScript
- `src/components/`: Componentes visuales del dApp
- `src/hooks/`: Hooks personalizados por contrato
- `docs/`: Documentación técnica de contratos
- `.vscode/`: Configuración de entorno (settings.json, extensions.json)
- `contracts`: Archivos ABIs, funciones de conexión, Interfaces y direcciones de contratos
- `assets`: Imágenes y metadatos NFT
- `assets/satokanft/`: Imágenes y metadatos NFT de Satoka
- `assets/ghost/`: Imágenes de Ghost
- `assets/prjsatoka/`: Imágenes de ProductManager
- `utils`: Funciones auxiliares para conversión, validación, formato y conexión Web3

## Archivos ABI y direcciones de contratos
- [`abiManager.json`](contracts/ProductManager.abi.json): Especifica el ABI del contrato manager.sol llamado ProductManager
- [`abiGhost.json`](contracts/GhostToken.abi.json): Especifica el ABI del contrato GhostToken.sol llamado GhostToken
- [`abiSatokaNFT.json`](contracts/SatokaNFT.abi.json): Especifica el ABI del contrato SATOKA.sol llamado SatokaNFT
- [`adrsProductManager.json`](contracts/ProductManager.adrs.json): Especifica las direcciones del contrato ProdcutManager en las diferentes redes desplegado.
- [`adrsGhostToken.json`](contracts/GhostToken.adrs.json): Especifica las direcciones del contrato GhostToken en las diferentes redes desplegado.
- [`adrsSatokaNFT.json`](contracts/SatokaNFT.adrs.json): Especifica las direcciones del contrato SatokaNFT en las diferentes redes desplegado.
- [`redBnb.json`](contracts/Bnb.red.json): Especifica datos conexión a la red BNB.
- [`redPolygon-amoy.json`](contracts/Amoy.red.json): Especifica datos conexión a la red Amoy para pruebas antes de lanzamiento.
- [`redPolygon-mainnet.json`](contracts/Polygon.red.json): Especifica datos conexión de la primera red de despliegue, Polygon. 

## 📚 Referencia técnica de contratos

Para colaborar de forma efectiva y generar código que respete la lógica del sistema, consulta los siguientes archivos en la carpeta `docs/`:

- [`ProductManager.md`](contracts/ProductManager.contrato.md): Define cómo se registran y mantienen los productos del marketplace.
- [`GhostToken.md`](contracts/GhostToken.contrato.md): Explica la lógica de recompensas, minteo y transferencias de la moneda Go.
- [`SatokaNFT.md`](cosntracts/SatokaNFT.contrato.md): Detalla los tipos de NFTs, sus metadatos, recompensas y funciones de adquisición.

## Imagenes empleadas en el Market Satoka

- [`assets.md`](assets/assets.md): Especificaciones de las imagenes empleadas en el proyecto de Satoka Market

## 🧙‍♂️ Roles

- **Administrador**: Detectado por `esAdmin()` en `ProductManager`, En `satokaNFT` usa `isAuthorized`. En `GhostToken` usa `isOwner`
- **Usuario común**: Acceso limitado a funciones de visualización y adquisición

## 🧠 Reglas de generación de código (React + Node.js)

Este proyecto sigue prácticas modernas para asegurar calidad, seguridad y claridad en el desarrollo:

- Todos los contratos tienen administradores (dueños del contrato) y usuarios comunes. La lógica debe respetar esta distinción y adapte la interfaz.
- Se usa sintaxis ES6+ (arrow functions, async/await, destructuring).
- La estructura del proyecto debe tener clara separación por carpetas (e.g., `components/`, `hooks/`, `contracts/`, `utils/`).
- Validar entradas y manejar errores con claridad en todas las funciones críticas.
- Usar variables de entorno para configuración (`.env`).
- Incluir comentarios explicativos en funciones no triviales y documentación básica.
- Documentar cómo correr el proyecto y cómo usar los componentes.
- Instalar todas las dependencias necesarias (`npm install`).
- Incluir `.gitignore` para Node.js y evitar subir archivos innecesarios.
- Emplear componentes funcionales con hooks (`useState`, `useEffect`, `useContext`, `useReducer`).
- Evitar lógica compleja en JSX; extraer funciones auxiliares.
- Usar tipado estricto en TypeScript (`noImplicitAny`, `strictNullChecks`).
- Mantener consistencia en nombres de variables y funciones (camelCase).
- Genere interfaces simbólicas que reflejen evolución del usuario (NFTs, recompensas)
- Interactúe con MetaMask usando `ethers.js`
- Consulte funciones clave de cada contrato según los archivos en `docs/`

## 🧠 IA y Issues

Los issues están redactados para facilitar el trabajo de IA. Por favor, mantén este estilo al crear nuevos.

## 🧪 Tests

Usamos Jest para pruebas unitarias. Cada componente debe tener cobertura mínima del 80%.

## 🧼 Estilo de Código

- TypeScript estricto
- Hooks funcionales
- Componentes desacoplados
- Validación de props y estados

## 🛡️ Seguridad

- Validar direcciones antes de transacciones
- Evitar hardcoded keys
- Usar try/catch en llamadas Web3

## 📬 Contacto

Para dudas filosóficas, técnicas o simbólicas, busca contacto en https://sites.google.com/view/proyecto-satoka/satoka.
