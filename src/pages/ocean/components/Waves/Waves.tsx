import { useEffect, useRef } from 'react';
import { WaveGroup } from './waveClasses';

const Waves = () => {
  const wavesRef = useRef<any>();
  const stageHeight = useRef<any>();
  const stageWidth = useRef<any>();

  useEffect(() => {
    const waves = wavesRef.current;
    const ctx = waves.getContext('2d');
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const waveGroup = new WaveGroup();

    window.addEventListener('resize', () => resize(waves, ctx, waveGroup, pixelRatio));
    window.requestAnimationFrame(() => animate(waves, ctx, waveGroup, pixelRatio));
    resize(waves, ctx, waveGroup, pixelRatio);
  }, []);

  function resize(waves: any, ctx: any, waveGroup: WaveGroup, pixelRatio: number) {
    stageWidth.current = document.body.clientWidth;
    stageHeight.current = document.body.clientHeight;

    waves.width = stageWidth.current * pixelRatio;
    waves.height = stageHeight.current * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    waveGroup.resize(stageWidth.current, stageHeight.current);
  }

  function animate(waves: any, ctx: any, waveGroup: WaveGroup, pixelRatio: number) {
    ctx.clearRect(0, 0, stageWidth.current, stageHeight.current);
    waveGroup.draw(ctx);
    window.requestAnimationFrame(() => animate(waves, ctx, waveGroup, pixelRatio));
  }

  return (
    <canvas ref={wavesRef}/>
  );
};

export default Waves;