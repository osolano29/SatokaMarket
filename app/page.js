


import Web3Status from "../components/Web3Status";
import MarketplaceView from "../components/MarketplaceView";


export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <Web3Status />
      <MarketplaceView />
    </div>
  );
}
