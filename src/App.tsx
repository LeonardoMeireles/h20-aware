import React, { useEffect, useRef, useState } from 'react';
import { Box, Image, Text } from 'grommet';
import DinoGame from './pages/dino-game/DinoGame';
import HomePage from './pages/home-page/HomePage';
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import Ocean from './pages/ocean/Ocean';
import Waves from './pages/ocean/components/Waves/Waves';
import smilingSun from './assets/gifs/ocean/smiling-sun.gif';
import ajAstronaut from './assets/images/aj/aj-astronaut.png';
import ajSplash from './assets/images/aj/aj-splash.png';
import ajBasic from './assets/images/aj/aj-basic.svg';
import fishAnimation from './assets/gifs/ocean/fish-animation.gif';
import AquaGlobe from './pages/home-page/utils/components/AquaGlobe';
import LoadingPage from './pages/loading-page/LoadingPage';

//There is a bug on React Spring that prevents sticking a component if its not within parent Parallax
//this has forced us to take several shortcuts, hence the big App component.

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showDinoGame] = useState<boolean>(false);
  const parallaxRef = useRef<IParallax>(null!);
  const [currentHeight, setCurrentHeight] = useState(0);

  //TODO: make proper loader detection for globe and assets
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <Box height={'100vh'} width={'100vw'}>
      <LoadingPage isLoading={isLoading}/>
      <Parallax
        onScrollCapture={(e) => {
          //Avoid re-render on particles, Parallax bug prevents rendering components separately
          if (parallaxRef.current.current > 1000 && parallaxRef.current.current < 2350) setCurrentHeight(() => parallaxRef.current.current);
        }}
        ref={parallaxRef}
        pages={10}
      >

        <HomePage/>

        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AquaGlobe/>
        </ParallaxLayer>

        <Ocean currentHeight={currentHeight}/>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{start: 1, end: 2}}
        >
          <Waves/>
        </ParallaxLayer>

        {currentHeight < 1300
          ? <ParallaxLayer
            speed={0.1}
            sticky={{start: 0, end: 1.25}}
          >
            <Image
              height={'10%'}
              margin={{left: '77.5vw', top: '60vh'}}
              src={ajAstronaut}
            />
          </ParallaxLayer>
          : <></>
        }

        <ParallaxLayer
          speed={0.1}
          sticky={{start: 1, end: 2}}
        >
          <Image
            //Avoid image loading on hosted web app
            opacity={(currentHeight > 1300 && currentHeight < 1550) ? '0.8' : '0'}
            height={'10%'}
            margin={{left: '74.5vw', top: '60vh'}}
            src={ajSplash}
          />
        </ParallaxLayer>

        <ParallaxLayer
          speed={1}
          sticky={{start: 1, end: 2}}
        >
          <Image
            height={'10%'}
            //Avoid image loading on hosted web app
            opacity={currentHeight > 1550 ? '0.8' : '0'}
            margin={{
              left: `${currentHeight > 1600 ? 50 : 77.5}vw`,
              top: `60vh`,
            }}
            style={{transition: 'margin-left 0.7s linear'}}
            src={ajBasic}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{start: 1, end: 2}}
        >
          <Image
            style={{
              borderRadius: '50%',
              boxShadow: 'inset 0px 0px 100px rgb(232, 218, 130, 0.1)'
            }}
            margin={{left: '3vw', top: '5vh'}}
            height={'15%'}
            src={smilingSun}
          />
        </ParallaxLayer>

        {currentHeight > 1200
          ? <ParallaxLayer
            offset={1}
            style={{
              display: 'flex',
              justifyContent: 'end',
              opacity: Math.min((currentHeight - 1400) / 400, 1)
            }}
            speed={0.1}
            sticky={{start: 1, end: 2}}
          >
            <Text
              margin={'11.5vh 25vw 0 0'}
              color={'#FFF'}
              size={'3.5vmin'}
              weight={600}
              style={{
                textShadow: '0 0 18px #000, 0 0 5px #282828',
              }}
            >
              Text goes here
            </Text>
          </ParallaxLayer>
          : <></>
        }

        <ParallaxLayer
          sticky={{start: 1, end: 2}}
          speed={-0.2}
          style={{opacity: 0.5}}
        >
          <Image
            margin={{left: '50vw', top: '85vh'}}
            style={{display: 'block', position: 'absolute'}}
            width={'128px'}
            src={fishAnimation}
          />
          <Image
            margin={{left: '10vw', top: '75vh'}}
            style={{display: 'block', position: 'absolute'}}
            width={'128px'}
            src={fishAnimation}
          />
          <Image
            style={{display: 'block', position: 'absolute'}}
            margin={{left: '85vw', top: '70vh'}}
            width={'128px'}
            src={fishAnimation}
          />
        </ParallaxLayer>

      </Parallax>
      {showDinoGame
        ? <DinoGame/>
        : <></>
      }
    </Box>
  );
}

export default App;
