import { Box, Text } from 'grommet';
import { useEffect, useRef, useState } from 'react';
import Ground from './components/Ground';
import Dino, { Dinosaur, handleJump, handleRun, onJump } from './components/Dino';
import Cactus, { CactusConfig, updateCactus } from './components/Cactus';
import { DEFAULT_SPEED, SPEED_SCALE_INCREASE, WORLD_DEFAULT_DIMENSIONS, WorldDimension } from './utils/world-constants';
import { DEFAULT_DINO } from './utils/dino-constants';
import dinoLose from '../../assets/images/dino-game/dino-lose.svg';
import dinoRun0 from '../../assets/images/dino-game/dino-run-0.svg';
import background from '../../assets/images/dino-game/background.png';
import { DEFAULT_CACTUS } from './utils/cactus-constants';

const DinoGame = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [worldSize, setWorldSize] = useState<WorldDimension>(WORLD_DEFAULT_DIMENSIONS);
    const [groundPosition, setGroundPosition] = useState(0);
    const score = useRef(0);
    const cactusConfig = useRef<CactusConfig>(DEFAULT_CACTUS);
    const dino = useRef<Dinosaur>(DEFAULT_DINO);
    const speed = useRef(DEFAULT_SPEED);
    const lastTime = useRef<number | undefined>();
    const frame = useRef(0);
    const deltaTime = useRef(0);

    function startGame() {
      speed.current = DEFAULT_SPEED;
      score.current = 0;
      setGroundPosition(0);
      dino.current = DEFAULT_DINO;
      cactusConfig.current.cacti = [];
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

    function handleWin() {
      setGameWon(true);
      dino.current.currentImage = dinoRun0;
    }

    function animate(time: number) {
      if (!lastTime.current) {
        lastTime.current = time;
        requestAnimationFrame(animate);
        return;
      }

      deltaTime.current = time - lastTime.current;
      speed.current = speed.current + SPEED_SCALE_INCREASE;
      score.current = score.current + (deltaTime.current * 0.001) + speed.current;

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

      if (score.current >= 10) {
        return handleWin();
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
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `100% 100%`,
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
          <Text
            color={'#282828'}
            weight={600}
            style={{
              textShadow: 'rgb(255 255 255) 0px 1px 1px, rgb(255 255 255) 0px 3px 1px',
              whiteSpace: 'nowrap'
            }}
            margin={{right: '5vw'}}
            size={'3vmin'}
          >
            Score: {parseInt(score.current.toString())}
          </Text>
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
            <Text
              color={'#f3f3f3'}
              style={{
                textShadow: '0 0 18px #000, 0 0 5px #282828',
                whiteSpace: 'nowrap'
              }}
              size={'3vmin'}
            >
              Press Any Key to Start
            </Text>
          </Box>
          : <></>
        }
        {gameWon
          ? <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'fit-content',
              justifyItems: 'center',
              alignItems: 'center',
              //Makes it so text is centered instead of starting inline at center
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Text
              weight={800}
              color={'#f3f3f3'}
              style={{
                textShadow: '0 0 18px #000, 0 0 5px #282828',
              }}
              size={'3vmin'}
            >
              Congratulations!
            </Text>
            <Text
              weight={800}
              color={'#f3f3f3'}
              style={{
                textShadow: '0 0 18px #000, 0 0 5px #282828',
              }}
              size={'2vmin'}
            >
              You won!
            </Text>
          </Box>
          : <></>
        }
        {cactusConfig.current.cacti.map((cactus) => {
          return <Cactus key={cactus.position} position={cactus.position} image={cactus.image}/>;
        })}
        <Dino dinoImage={dino.current.currentImage} position={dino.current.position}/>
        <Ground groundPosition={groundPosition}/>
        <Ground groundPosition={groundPosition + 300}/>
      </Box>
    );
  }
;

export default DinoGame;