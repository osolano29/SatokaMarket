"use client";
export default function AcquireERC20({ product }) {
  const [usdAmount, setUsdAmount] = useState('');
  const [goAmount, setGoAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { dollarRate, fetchDollarRate, mintGo, loading } = useGhostToken();

  React.useEffect(() => {
    fetchDollarRate();
  }, [fetchDollarRate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUsdAmount(value);
    setGoAmount(value && dollarRate ? (parseFloat(value) * dollarRate).toFixed(2) : '');
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usdAmount || isNaN(usdAmount) || parseFloat(usdAmount) <= 0) {
      setError('Ingresa un monto válido en USD.');
      return;
    }
    if (!window.ethereum) {
      setError('MetaMask no detectado.');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // Aquí se asume que el usuario mintea GO para sí mismo
      const ok = await mintGo(await signer.getAddress(), ethers.parseUnits(goAmount, 18), signer);
      if (ok) {
        setSuccess(`Has adquirido ${goAmount} GO por ${usdAmount} USD.`);
        setUsdAmount('');
        setGoAmount('');
      } else {
        setError('Error al adquirir GO.');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-4 text-center">Adquirir {product.name} (GO)</h3>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Monto en USD</label>
        <input type="number" min="0" step="0.01" value={usdAmount} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={loading} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Recibirás (GO)</label>
        <input type="text" value={goAmount} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
      </div>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">{success}</div>}
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition" disabled={loading}>
        {loading ? 'Procesando...' : 'Adquirir'}
      </button>
    </form>
  );
}
