import Globe from 'react-globe.gl';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_GLOBE_CANVAS_SCALE } from '../utils/constants';
import clouds from '../../../assets/images/globe/clouds.png';
import * as THREE from 'three';
import { Box } from 'grommet';

const AquaGlobe = () => {
  const [globeSize, setGlobeSize] = useState(DEFAULT_GLOBE_CANVAS_SCALE);
  const globeEl = useRef();

  //Adds clouds to the globe
  function addGlobeClouds() {
    const CUSTOM_ACCELERATION = 1.2;
    const globe: any = globeEl.current;
    globe.controls().enableZoom = false;

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35 * CUSTOM_ACCELERATION;

    // Add clouds sphere
    const CLOUDS_IMG_URL = clouds; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006 * CUSTOM_ACCELERATION; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture: any) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({map: cloudsTexture, opacity: 0.5, transparent: true})
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
  }

  //Resizes globe properly
  useEffect(() => {
    function handleResize() {
      let worldPixelScale: number;
      if (window.innerWidth > window.innerHeight) {
        worldPixelScale = window.innerWidth;
      } else {
        worldPixelScale = window.innerHeight;
      }
      setGlobeSize(Math.min(worldPixelScale * DEFAULT_GLOBE_CANVAS_SCALE, 800));
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box margin={{top: '35vh'}}>
      <Globe
        width={globeSize}
        height={globeSize}
        ref={globeEl}
        backgroundColor={'rgba(0, 0, 0, 0)'}
        globeImageUrl={'//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'}
        bumpImageUrl={'//unpkg.com/three-globe/example/img/earth-topology.png'}
        onGlobeReady={() => addGlobeClouds()}
        waitForGlobeReady={true}
        animateIn={false}
      />
    </Box>
  );
};

export default AquaGlobe;