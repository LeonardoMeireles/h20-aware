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
import AquaGlobe from './pages/home-page/components/AquaGlobe';
import LoadingPage from './pages/loading-page/LoadingPage';
import AJChatBot from './pages/bot-page/AJChatBot';

//There is a bug on React Spring that prevents sticking a component if its not within parent Parallax
//this has forced us to take several shortcuts, hence the big App component.

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [displayCena4, setDisplayCena4] = React.useState('flex');
  const parallaxRef = useRef<IParallax>(null!);
  const [currentHeight, setCurrentHeight] = useState(0);
  const updatePosition = [1200, 1300, 1450, 1650, 2500];

  //TODO: make proper loader detection for globe and assets
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <Box background={'#282828'} height={'100vh'} width={'100vw'}>
      <LoadingPage isLoading={isLoading} />
      <AJChatBot />
      <Parallax
        onScrollCapture={(e) => {
          //Avoid re-render on particles, Parallax bug prevents rendering components separately
          if (updatePosition.some((position) => (parallaxRef.current.current > position && currentHeight < position) || (parallaxRef.current.current < position && currentHeight > position)))
            setCurrentHeight(parallaxRef.current.current);
        }}
        ref={parallaxRef}
        pages={3.8}
      >

        <HomePage />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AquaGlobe />
        </ParallaxLayer>

        <Ocean currentHeight={currentHeight} />

        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{ start: 1, end: 2 }}
        >
          <Waves />
        </ParallaxLayer>

        <ParallaxLayer
          speed={0.1}
          sticky={{ start: 0, end: 1.25 }}
        >
          <Image
            height={'30%'}
            opacity={(currentHeight < 1300) ? '0.8' : '0'}
            margin={{ left: '77.5vw', top: '60vh' }}
            src={ajAstronaut}
            style={{ transition: '0.01s linear' }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          speed={0.1}
          sticky={{ start: 1, end: 2 }}
        >
          <Image
            //Avoid image loading on hosted web app
            opacity={(currentHeight > 1300 && currentHeight < 1450) ? '0.8' : '0'}
            height={'30%'}
            margin={{ left: '74.5vw', top: '60vh' }}
            style={{ transition: '0.01s linear' }}
            src={ajSplash}
          />
        </ParallaxLayer>

        <ParallaxLayer
          speed={1}
          sticky={{ start: 1, end: 2 }}
        >
          <Image
            height={'20%'}
            //Avoid image loading on hosted web app
            opacity={currentHeight > 1450 ? '0.8' : '0'}
            margin={{
              left: `${currentHeight > 1650 ? 50 : 76}vw`,
              top: `${currentHeight > 1650 ? 70 : 60}vh`,
            }}
            style={{ transition: '0.2s linear' }}
            src={ajBasic}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{ start: 2, end: 3 }}
        >
          <Image
            style={{
              borderRadius: '50%',
              boxShadow: 'inset 0px 0px 100px rgb(232, 218, 130, 0.1)'
            }}
            margin={{ left: '3vw', top: '5vh' }}
            height={'35%'}
            src={smilingSun}
          />
        </ParallaxLayer>

        {/* Narrador */}
        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{ start: 1, end: 1.2 }}
        >
          <Text
            margin={'11.5vh 25vw 0 0'}
            color={'#FFF'}
            size={'3.5vmin'}
            weight={600}
            style={{
              textShadow: '0 0 18px #000, 0 0 5px #282828'
            }}
          >
            In a vast and mysterious universe, our blue planet shines like a beacon of life.
          </Text>
        </ParallaxLayer>

        {/* AJ */}
        <ParallaxLayer
          offset={1}
          style={{
            display: 'flex',
            justifyContent: 'end',
            // opacity: currentHeight > 1500 ? 1 : 0,
            transition: 'opacity 0.2s linear'
          }}
          speed={0.1}
          sticky={{ start: 1.5, end: 1.7 }}
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
            "Hi! Are you ready to join me on this aquatic journey?"
          </Text>
        </ParallaxLayer>

        {/* AJ */}
        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{ start: 2, end: 2.5 }}
        >
          <Text
            margin={'11.5vh 25vw 0 0'}
            color={'#FFF'}
            size={'3.5vmin'}
            weight={600}
            style={{
              textShadow: '0 0 18px #000, 0 0 5px #282828'
            }}
          >
            Ah, the warmth of the Smiling Sun! I feel so light and free!
          </Text>
        </ParallaxLayer>

        {/* Sun */}
        <ParallaxLayer
          offset={1}
          speed={0.1}
          sticky={{ start: 2.5, end: 3 }}
        >
          <Text
            margin={'11.5vh 25vw 0 0'}
            color={'#FFF'}
            size={'3.5vmin'}
            weight={600}
            style={{
              textShadow: '0 0 18px #000, 0 0 5px #282828'
            }}
          >
            Time to rise, little droplet!
          </Text>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          sticky={{ start: 3, end: 4 }}
          style={{
            alignItems: 'center',
            display: 'flex',
            backgroundImage: 'linear-gradient(#007EC7, #383838, #383838, #383838)'
          }}
          onAnimationEndCapture={() => setDisplayCena4('none')}
        >
          <iframe
            src="/SkyJump/index.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          ></iframe>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          sticky={{ start: 4, end: 5 }}
          style={{
            alignItems: 'center',
            display: 'flex',
            backgroundImage: 'linear-gradient(#007EC7, #383838, #383838, #383838)'
          }}
          onAnimationEndCapture={() => setDisplayCena4('none')}
        >
          <iframe
            src="/Cena%204/index.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          ></iframe>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 1, end: 2 }}
          speed={-0.2}
          style={{ opacity: 0.5 }}
        >
          <Image
            margin={{ left: '50vw', top: '85vh' }}
            style={{ display: 'block', position: 'absolute' }}
            width={'128px'}
            src={fishAnimation}
          />
          <Image
            margin={{ left: '10vw', top: '75vh' }}
            style={{ display: 'block', position: 'absolute' }}
            width={'128px'}
            src={fishAnimation}
          />
          <Image
            style={{ display: 'block', position: 'absolute' }}
            margin={{ left: '85vw', top: '70vh' }}
            width={'128px'}
            src={fishAnimation}
          />
        </ParallaxLayer>

        <ParallaxLayer
          // offset={4}
          sticky={{ start: 5, end: 6 }}
          style={{
            alignItems: 'center',
            display: 'flex',
            backgroundImage: 'linear-gradient(#007EC7, #383838, #383838, #383838)'
          }}
        >
          <DinoGame />
        </ParallaxLayer>
      </Parallax>
    </Box>
  );
}

export default App;
