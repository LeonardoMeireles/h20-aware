import React, { useRef, useState } from 'react';
import { Box, Image, Text } from 'grommet';
import DinoGame from './pages/dino-game/DinoGame';
import HomePage from './pages/home-page/HomePage';
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import Ocean from './pages/ocean/Ocean';
import Waves from './pages/ocean/components/Waves/Waves';
import smilingSun from './assets/gifs/smiling-sun.gif';
import mist from './assets/gifs/mist.gif';
import ajAstronaut from './assets/images/aj/aj-astronaut.png';
import ajSplash from './assets/images/aj/aj-splash.png';
import ajBasic from './assets/images/aj/aj-basic.svg';
import AquaGlobe from './pages/home-page/utils/components/AquaGlobe';
import fishAnimation from './assets/gifs/fish-animation.gif';

{/*There is a bug on React Spring that prevents sticking a component if its not within parent Parallax*/}
{/*this has forced us to take several shortcuts, hence the big App component.*/}

function App() {
  const [showDinoGame] = useState<boolean>(false);
  const parallaxRef = useRef<IParallax>(null!);
  const [currentHeight, setCurrentHeight] = useState(0);

  return (
    <Box height={'100vh'}>
      <Parallax
        onScrollCapture={(e) => {
          //Avoid re-render on particles, Parallax bug prevents rendering components separately
          if (parallaxRef.current.current > 1250 && parallaxRef.current.current < 2350) setCurrentHeight(parallaxRef.current.current);
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

        <Ocean/>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{start: 1, end: 2}}
        >
          <Waves/>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{start: 1, end: 2}}
          speed={-0.6}
          style={{opacity: 0.5}}
        >
          <Image
            margin={{left: '50%', top: '120%'}}
            style={{display: 'block', position: 'absolute'}}
            width={'128px'}
            src={fishAnimation}
          />
          <Image
            margin={{left: '10%', top: '105%'}}
            style={{display: 'block', position: 'absolute'}}
            width={'128px'}
            src={fishAnimation}
          />
          <Image
            style={{display: 'block', position: 'absolute'}}
            margin={{left: '90%', top: '115%'}}
            width={'128px'}
            src={fishAnimation}
          />
        </ParallaxLayer>

        {currentHeight < 1300
          ? <ParallaxLayer
            speed={0.1}
            sticky={{start: 0, end: 1.25}}
          >
            <Image
              height={'10%'}
              margin={{left: '79.5%', top: '60%'}}
              src={ajAstronaut}
            />
          </ParallaxLayer>
          : <></>
        }

        {currentHeight > 1300 && currentHeight < 1650
          ? <ParallaxLayer
            speed={0.1}
            sticky={{start: 1, end: 2}}
          >
            <Image
              height={'10%'}
              margin={{left: '77%', top: '60%'}}
              src={ajSplash}
            />
          </ParallaxLayer>
          : <></>
        }

        {currentHeight > 1650
          ? <ParallaxLayer
            speed={-50}
            sticky={{start: 1.15, end: 2}}
          >
            <Image
              height={'10%'}
              margin={{left: `${163.5 - (currentHeight * 0.05)}%`, top: `60%`}}
              src={ajBasic}
            />
          </ParallaxLayer>
          : <></>
        }

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
            margin={{left: '2vh', top: '5vh'}}
            height={'15%'}
            src={smilingSun}
          />
        </ParallaxLayer>


        {currentHeight > 1200
          ? <ParallaxLayer
            offset={1}
            speed={0.1}
            sticky={{start: 1, end: 2}}
          >
            <Image
              margin={{left: '2vh', top: '35vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          : <></>
        }

        {currentHeight > 1200
          ? <ParallaxLayer
            offset={1}
            speed={0.1}
            sticky={{start: 1, end: 2}}
          >
            <Image
              margin={{left: '25vh', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          : <></>
        }

        {currentHeight > 1200
          ? <ParallaxLayer
            offset={1}
            speed={0.1}
            sticky={{start: 1, end: 2}}
          >
            <Image
              margin={{left: '45vh', top: '35vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          : <></>
        }

        {currentHeight > 1200
          ? <ParallaxLayer
            offset={1}
            speed={0.1}
            sticky={{start: 1, end: 2}}
          >
            <Image
              margin={{left: '65vh', top: '40vh'}}
              height={'15%'}
              style={{opacity: Math.min((currentHeight - 1400) / 1000, 0.2)}}
              src={mist}
            />
          </ParallaxLayer>
          : <></>
        }

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


      </Parallax>
      {showDinoGame
        ? <DinoGame/>
        : <></>
      }
    </Box>
  );
}

export default App;
