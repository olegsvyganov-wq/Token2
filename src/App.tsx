import { Calculator } from "./components/Calculator";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LiveFlow } from "./components/LiveFlow";
import { Opening } from "./components/Opening";
import { Rates } from "./components/Rates";
import { Ticker } from "./components/Ticker";
import { Usage } from "./components/Usage";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg font-body text-ink">
      {/* фоновые слои */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-vignette" />
      </div>
      <div
        className="noise pointer-events-none fixed inset-0 z-[70]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Ticker />
        <Header />
        <main>
          <Opening />
          <LiveFlow />
          <Rates />
          <Usage />
          <Calculator />
        </main>
        <Footer />
      </div>
    </div>
  );
}
