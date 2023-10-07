import { Image } from 'grommet';
import cactus from '../../../assets/images/dino-game/cactus.png';
import { CACTUS_INTERVAL_MAX, CACTUS_INTERVAL_MIN } from '../utils/cactus-constants';

export interface CactusConfig {
  nextCactusTime: number;
  cactiPosition: number[];
}

export function updateCactus(cactusConfig: CactusConfig, delta: number, speed: number) {
  cactusConfig.cactiPosition = cactusConfig.cactiPosition.flatMap((cactusPosition) => {
    if (cactusPosition <= -100) return [];
    return [cactusPosition + (delta * speed * -1)];
  });

  if (cactusConfig.nextCactusTime <= 0) {
    cactusConfig.cactiPosition.push(100);
    //Gets random time between two intervals
    cactusConfig.nextCactusTime = Math.floor(Math.random() * (CACTUS_INTERVAL_MAX - CACTUS_INTERVAL_MIN + 1) + CACTUS_INTERVAL_MIN) / speed;
  }
  cactusConfig.nextCactusTime -= delta;
}

interface CactusProps {
  cactusPosition: number;
}

const Cactus = ({cactusPosition}: CactusProps) => {

  return (
    <Image
      className={'cactus'}
      src={cactus}
      style={{
        position: 'absolute',
        zIndex: 1,
        left: `calc(${cactusPosition} * 1%)`,
        height: '20%',
        bottom: 0.5
      }}
    />
  );
};

export default Cactus;