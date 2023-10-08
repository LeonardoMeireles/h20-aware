import { Box, Text } from 'grommet';
import Space from './components/Space';
import { ParallaxLayer } from '@react-spring/parallax';
import React from 'react';

const HomePage = () => {

  return (
    <>
      <ParallaxLayer offset={0} factor={1.5}>
        <Space/>
      </ParallaxLayer>
      <ParallaxLayer
        offset={0}
        speed={0.1}
      >
        <Box justify={'center'} align={'center'} margin={{top: '30vh'}}>
          <Text
            color={'#f3f3f3'}
            style={{
              textShadow: '0 0 18px #000, 0 0 5px #282828',
            }}
            size={'5vmin'}
            weight={800}
          >
            Aqua Journey
          </Text>
          <Text
            margin={{top: '4px'}}
            color={'#d7d7d7'}
            style={{
              textShadow: '0 0 18px #000, 0 0 5px #282828',
            }}
            size={'2vmin'}
            weight={600}
          >
            Come explore the wonders of water with our friend AJ!
          </Text>
        </Box>
      </ParallaxLayer>
    </>
  );
};

export default HomePage;