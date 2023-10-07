import { Box, Text } from 'grommet';
import { useEffect, useRef, useState } from 'react';
import Ground from './components/Ground';
import Dino, { Dinosaur, handleJump, handleRun, onJump } from './components/Dino';
import Cactus, { CactusConfig, updateCactus } from './components/Cactus';
import { DEFAULT_SPEED, SPEED_SCALE_INCREASE, WORLD_DEFAULT_DIMENSIONS, WorldDimension } from './utils/world-constants';
import { DEFAULT_DINO } from './utils/dino-constants';
import dinoLose from '../../assets/images/dino-game/dino-lose.png';
import { DEFAULT_CACTUS } from './utils/cactus-constants';

const DinoGame = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [worldSize, setWorldSize] = useState<WorldDimension>(WORLD_DEFAULT_DIMENSIONS);
    const [score, setScore] = useState(0);
    const [groundPosition, setGroundPosition] = useState(0);
    const cactusConfig = useRef<CactusConfig>(DEFAULT_CACTUS);
    const dino = useRef<Dinosaur>(DEFAULT_DINO);
    const speed = useRef(DEFAULT_SPEED);
    const lastTime = useRef<number | undefined>();
    const frame = useRef(0);
    const deltaTime = useRef(0);

    function startGame() {
      speed.current = DEFAULT_SPEED;
      setScore(0);
      setGroundPosition(0);
      dino.current = DEFAULT_DINO;
      cactusConfig.current.cactiPosition = [];
      setGameStarted(true);
    }

    function checkLose() {
      const dinoRect = document.getElementsByClassName('dino')[0].getBoundingClientRect();
      const allCactus = document.getElementsByClassName('cactus');
      for (let i = 0; i < allCactus.length; i++) {
        const cactusRect = allCactus[i].getBoundingClientRect();
        if (
          dinoRect.left < cactusRect.right &&
          dinoRect.top < cactusRect.bottom &&
          dinoRect.right > cactusRect.left &&
          dinoRect.bottom > cactusRect.top
        ) return true;
      }
      return false;
    }

    function handleLose() {
      setGameStarted(false);
      dino.current.currentImage = dinoLose;
      setTimeout(() => {
        document.addEventListener('keydown', startGame, {once: true});
      }, 100);
    }

    function animate(time: number) {
      if (!lastTime.current) {
        lastTime.current = time;
        requestAnimationFrame(animate);
        return;
      }

      deltaTime.current = time - lastTime.current;
      speed.current = speed.current + SPEED_SCALE_INCREASE;
      setScore((score) => score + (deltaTime.current * 0.001) + speed.current);

      //Animate entities
      setGroundPosition((groundPosition) => {
        if (groundPosition <= -300) return 0;
        return groundPosition - (deltaTime.current * speed.current);
      });
      handleRun(dino.current, deltaTime.current, speed.current);
      handleJump(dino.current, deltaTime.current, speed.current);
      updateCactus(cactusConfig.current, deltaTime.current, speed.current);

      if (checkLose()) {
        return handleLose();
      }
      lastTime.current = time;
      requestAnimationFrame(animate);
    }

    //Game animation
    useEffect(() => {
      if (gameStarted) {
        lastTime.current = performance.now();
        frame.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(frame.current);
      }

      return () => cancelAnimationFrame(frame.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStarted]);

    //TODO: add a debounce to this resize
    //Resizes game properly
    useEffect(() => {
      function handleResize() {
        let worldPixelScale: number;
        if ((window.innerWidth / window.innerHeight) < (WORLD_DEFAULT_DIMENSIONS.width / WORLD_DEFAULT_DIMENSIONS.height)) {
          worldPixelScale = window.innerWidth / WORLD_DEFAULT_DIMENSIONS.width;
        } else {
          worldPixelScale = window.innerHeight / WORLD_DEFAULT_DIMENSIONS.height;
        }

        setWorldSize({
          width: WORLD_DEFAULT_DIMENSIONS.width * worldPixelScale,
          height: WORLD_DEFAULT_DIMENSIONS.height * worldPixelScale,
        });
      }

      window.addEventListener('resize', handleResize);
      window.addEventListener('keydown', startGame, {once: true});
      window.addEventListener('keydown', (e) => onJump(e, dino.current));
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', startGame);
        window.removeEventListener('keydown', (e) => onJump(e, dino.current));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
      <Box
        justify={'center'}
        alignContent={'center'}
        overflow={'hidden'}
        width={worldSize.width + 'px'}
        height={worldSize.height + 'px'}
        style={{
          userSelect: 'none',
          minHeight: '20%',
          position: 'relative'
        }}
        className={'world'}
        pad={'8px'}
      >
        <Box
          style={{
            position: 'absolute',
            right: '1vmin',
            top: '1vmin'
          }}
        >
          <Text size={'3vmin'}>Score: {parseInt(score.toString())}</Text>
        </Box>
        {!gameStarted
          ? <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'fit-content',
              //Makes it so text is centered instead of starting inline at center
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Text style={{whiteSpace: 'nowrap'}} size={'3vmin'}>Press Any Key to Start</Text>
          </Box>
          : <></>
        }
        {cactusConfig.current.cactiPosition.map((cactusPosition) => {
          return <Cactus key={cactusPosition} cactusPosition={cactusPosition}/>;
        })}
        <Dino dinoImage={dino.current.currentImage} position={dino.current.position}/>
        <Ground groundPosition={groundPosition}/>
        <Ground groundPosition={groundPosition + 300}/>


      </Box>
    );
  }
;

export default DinoGame;