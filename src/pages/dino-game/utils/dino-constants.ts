import dinoStationary from '../../../assets/images/dino-game/dino-stationary.svg';
import { Dinosaur } from '../components/Dino';

export const JUMP_SPEED = 0.40;

export const GRAVITY = 0.0013;

export const DINO_FRAME_COUNT = 2;

export const FRAME_TIME = 10;

export const DEFAULT_DINO: Dinosaur = {
  position: 0,
  isJumping: false,
  dinoFrame: 0,
  currentFrameTime: 0,
  currentImage: dinoStationary,
  yVelocity: 0,
};