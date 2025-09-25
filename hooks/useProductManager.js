import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import ProductManagerABI from '../contracts/ProductManager.abi.json';

// Dirección del contrato en Polygon Amoy (mock, reemplazar por la real)
import { getContractAddress } from '../utils/contractAddresses';
import useWeb3Network from './useWeb3Network';
const PRODUCT_MANAGER_ADDRESS = '0xPRODUCTMANAGER'; // This line remains for backward compatibility

export default function useProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { chainId, address } = useWeb3Network();

  // Obtiene productos registrados
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (!window.ethereum) throw new Error('MetaMask no detectado');
  const provider = new ethers.BrowserProvider(window.ethereum, false);
      const contractAddress = getContractAddress('ProductManager', chainId);
      if (!contractAddress) throw new Error('No se encontró la dirección del contrato ProductManager para la red seleccionada.');
      const contract = new ethers.Contract(contractAddress, ProductManagerABI, provider);
      const addresses = await contract.getProducts();
      const productInfos = await Promise.all(
        addresses.map(async (addr) => {
          const info = await contract.getProductInfo(addr);
          return { address: addr, ...info };
        })
      );
      setProducts(productInfos);
    } catch (err) {
      if (err.code === 'UNSUPPORTED_OPERATION' && err.message.includes('ENS')) {
        setError('La red seleccionada no soporta ENS. Puedes operar normalmente, pero algunas funciones avanzadas pueden no estar disponibles.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  }, [chainId]);

  // Registra un nuevo producto
  const registerProduct = async (product, signer) => {
    setLoading(true);
    setError('');
    try {
      const contractAddress = getContractAddress('ProductManager', chainId);
      if (!contractAddress) throw new Error('No se encontró la dirección del contrato ProductManager para la red seleccionada.');
      const contract = new ethers.Contract(contractAddress, ProductManagerABI, signer);
      const tx = await contract.setProduct(
        product.name,
        product.website,
        product.purpose,
        Number(product.contractType),
        product.status
      );
      await tx.wait();
      await fetchProducts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, fetchProducts, registerProduct };
}
