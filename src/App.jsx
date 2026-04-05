import { useScrollProgress } from './hooks/useScrollProgress';
import Navbar from './components/Navbar';
import ProgressIndicator from './components/ProgressIndicator';
import Hero from './components/Hero';
import SceneOcean from './components/SceneOcean';
import SceneCloud from './components/SceneCloud';
import SceneRain from './components/SceneRain';
import SceneRiver from './components/SceneRiver';
import SceneSoil from './components/SceneSoil';
import ScenePlant from './components/ScenePlant';
import SceneOceanReturn from './components/SceneOceanReturn';
import './App.css';

function App() {
  const { activeScene } = useScrollProgress();

  return (
    <div className="relative">
      <Navbar activeScene={activeScene} />
      <ProgressIndicator activeScene={activeScene} />

      <main>
        <Hero />
        <SceneOcean />
        <SceneCloud />
        <SceneRain />
        <SceneRiver />
        <SceneSoil />
        <ScenePlant />
        <SceneOceanReturn />
      </main>
    </div>
  );
}

export default App;
