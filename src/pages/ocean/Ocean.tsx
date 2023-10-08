import { Box, Image } from 'grommet';
import { ParallaxLayer } from '@react-spring/parallax';
import cloudAnimation from '../../assets/gifs/ocean/cloud-animation.gif';
import React, { useRef } from 'react';
import { CLOUD_HEIGHT, CLOUD_LEFT } from './utils/constants';
import mist from '../../assets/gifs/ocean/mist.gif';

const Ocean = ({currentHeight}: { currentHeight: number }) => {

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
      {currentHeight > 1200
        ? <>
          <ParallaxLayer
            offset={1.75}
            speed={0.2}
          >
            <Image
              margin={{left: '23vw', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.75}
            speed={0.1}
          >
            <Image
              margin={{left: '45vw', top: '50vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.75}
            speed={0.4}
          >
            <Image
              margin={{left: '55vw', top: '50vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.55}
            speed={0.3}
          >
            <Image
              margin={{left: '73vw', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.85}
            speed={0.2}
          >
            <Image
              margin={{left: '3vw', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.95}
            speed={0.2}
          >
            <Image
              margin={{left: '22vw', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.8}
            speed={0.2}
          >
            <Image
              margin={{left: '10vw', top: '50vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.85}
            speed={0.1}
          >
            <Image
              margin={{left: '60vw', top: '50vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.80}
            speed={0.4}
          >
            <Image
              margin={{left: '55vw', top: '70vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.95}
            speed={0.3}
          >
            <Image
              margin={{left: '88vw', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.1}
            speed={0.1}
          >
            <Image
              margin={{left: '11vw', top: '50vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.3}
            speed={0.4}
          >
            <Image
              margin={{left: '55vw', top: '50vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={2}
            speed={0.3}
          >
            <Image
              margin={{left: '88vw', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
        </>
        : <></>
      }
    </>
  );
};

export default Ocean;