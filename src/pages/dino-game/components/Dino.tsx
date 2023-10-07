import { Image } from 'grommet';
import dinoStationary from '../../../assets/images/dino-game/dino-stationary.png';
import dinoRun0 from '../../../assets/images/dino-game/dino-run-0.png';
import dinoRun1 from '../../../assets/images/dino-game/dino-run-1.png';
import { DINO_FRAME_COUNT, FRAME_TIME, GRAVITY, JUMP_SPEED } from '../utils/dino-constants';

export interface Dinosaur {
  position: number,
  isJumping: boolean,
  dinoFrame: number,
  currentFrameTime: number,
  currentImage: string,
  yVelocity: number,
}

export interface DinoProps {
  position: number,
  dinoImage: string
}

export function handleRun(dino: Dinosaur, deltaTime: number, speed: number) {
  if (dino.isJumping) {
    dino.currentImage = dinoStationary;
  }

  if (dino.currentFrameTime >= FRAME_TIME) {
    const newDinoFrame = (dino.dinoFrame + 1) % DINO_FRAME_COUNT;
    dino.dinoFrame = newDinoFrame;
    dino.currentFrameTime -= FRAME_TIME;
    dino.currentImage = newDinoFrame === 0 ? dinoRun0 : dinoRun1;
  }
  dino.currentFrameTime += deltaTime * speed;
}

export function handleJump(dino: Dinosaur, deltaTime: number, speed: number) {
  if (!dino.isJumping) return;

  dino.position += dino.yVelocity * deltaTime;
  if (dino.position <= 0) {
    dino.yVelocity = 0;
    dino.position = 0;
    dino.isJumping = false;
  }

  dino.yVelocity -= GRAVITY * deltaTime;
}

export function onJump(e: KeyboardEvent, dino: Dinosaur) {
  if (e.code !== 'Space' || dino.isJumping) return;

  dino.yVelocity = JUMP_SPEED;
  dino.isJumping = true;
}

const Dino = ({position, dinoImage}: DinoProps) => {

  return (
    <Image
      className={'dino'}
      src={dinoImage}
      style={{
        position: 'absolute',
        zIndex: 1,
        left: '3%',
        height: '20%',
        bottom: `calc(${position} * 1%)`
      }}
    />
  );
};

export default Dino;