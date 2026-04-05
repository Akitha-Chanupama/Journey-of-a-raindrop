import { useState, useEffect, useCallback } from 'react';

const SCENE_COUNT = 8;

export function useScrollProgress() {
  const [state, setState] = useState({ activeScene: 0, sceneProgress: 0, globalProgress: 0 });

  const update = useCallback(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const g = max > 0 ? Math.min(y / max, 1) : 0;
    const f = g * SCENE_COUNT;
    const scene = Math.min(Math.floor(f), SCENE_COUNT - 1);
    setState({ activeScene: scene, sceneProgress: f - scene, globalProgress: g });
  }, []);

  useEffect(() => {
    let raf;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [update]);

  return state;
}
