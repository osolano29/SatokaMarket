# Satoka dApp Marketplace

Una aplicación descentralizada moderna, responsiva y fácil de usar para visualizar y adquirir criptoactivos registrados ProductsManager, sobre el que se registran como productos contratos inteligentes como `GhostToken` (moneda utilitaria) y `SatokaNFT` (NFTs simbólicos). El sistema reconoce automáticamente si el usuario es administrador y adapta la interfaz según su rol. Detalles del proyecto en: https://sites.google.com/view/proyecto-satoka/satoka. Motivaciones del proyecto: https://sites.google.com/d/1fnS8tUX-A9FpYbMBbplkk3rXflnh5Wkf/p/1cY6xIurZVaxU1TETATaVNcOjTjZHv-ex/edit

## 🚀 Características

- Visualización dinámica de productos registrados en `ProductManager`
- Integración con MetaMask para autenticación y transacciones
- Interfaz adaptativa para administradores y usuarios comunes
- Registro y mantenimiento de contratos desde la interfaz
- Adquisición de NFTs mediante donaciones en POL o Go
- Recompensas automáticas en GhostToken por contribuciones
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): Mayores especificaciones del Market.

## 🧱 Contratos Integrados

- `ProductManager`: Registro y mantenimiento de productos
- `GhostToken`: Moneda utilitaria (Go)
- `SatokaNFT`: NFTs simbólicos con recompensas

## 📚 Documentación de contratos inteligentes

Este proyecto se basa en tres contratos clave que definen la lógica simbólica y funcional del dApp. Para comprender su estructura y funciones disponibles, consulta los siguientes documentos:

- [`docs/ProductManager.md`](docs/ProductManager.md): Registro y mantenimiento de productos simbólicos
- [`docs/GhostToken.md`](docs/GhostToken.md): Moneda utilitaria Go y sistema de recompensas
- [`docs/SatokaNFT.md`](docs/SatokaNFT.md): NFTs rituales, niveles de conciencia y lógica de adquisición

Estas referencias son esenciales para generar componentes, hooks y servicios Web3 que interactúen correctamente con los contratos.

## Imagenes empleadas en el Market Satoka

- [`assets/assets.md`](assets/assets.md): Especificaciones de las imagenes empleadas en el proyecto de Satoka Market

## 🛠️ Tecnologías

- React + TypeScript
- Ethers.js
- MetaMask
- GitHub Actions
- IPFS (para metadatos NFT)

## 🧠 Buenas prácticas

Este proyecto sigue estándares modernos de desarrollo:

- Sintaxis ES6+ y componentes funcionales con hooks
- Validación de entradas, manejo de errores y uso de `.env`
- Tipado estricto con TypeScript
- Estructura modular por carpetas
- Documentación clara y comentarios explicativos

## 📦 Instalación

```bash
git clone https://github.com/satoka-dao/marketplace.git
cd marketplace
npm install
npm run dev
