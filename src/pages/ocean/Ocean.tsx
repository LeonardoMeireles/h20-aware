import { Box, Image } from 'grommet';
import { ParallaxLayer } from '@react-spring/parallax';
import cloudAnimation from '../../assets/gifs/cloud-animation.gif';
import fishAnimation from '../../assets/gifs/fish-animation.gif';
import sunRay from '../../assets/gifs/sun-ray.gif';
import React, { useRef, useState } from 'react';
import { CLOUD_HEIGHT, CLOUD_LEFT } from './utils/constants';

const Ocean = () => {

  const clouds = useRef(
    Array(20).fill(0).map((cloudGroup, index) => {
      return <ParallaxLayer
        key={`sky-group-${index}`}
        horizontal={true}
        style={{
          top: '100vh'
        }}
        offset={0}
        speed={numBetween(-0.5, -0.1)}
      >
        <Image
          style={{display: 'block'}}
          opacity={`${numBetween(0.01, 0.1)}`}
          width={'128px'}
          src={cloudAnimation}
          margin={{left: `${CLOUD_LEFT[index]}%`, top: `${CLOUD_HEIGHT[index]}%`}}
        />
        <Image
          style={{display: 'block'}}
          opacity={`${numBetween(0.01, 0.1)}`}
          width={'128px'}
          src={cloudAnimation}
          margin={{left: `${CLOUD_LEFT[index + 1]}%`, top: `${CLOUD_HEIGHT[index + 1]}%`}}
        />
      </ParallaxLayer>;
    })
  );

  function numBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  return (
    <>
      <ParallaxLayer
        offset={1}
        factor={2}
      >
        <Box height={'200vh'} style={{backgroundImage: 'linear-gradient(#151515, rgba(0,87,185), #007fc8)'}}/>
      </ParallaxLayer>
      {clouds.current}
    </>
  );
};

export default Ocean;