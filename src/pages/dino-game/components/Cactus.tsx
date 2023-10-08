import { Image } from 'grommet';
import cactus0 from '../../../assets/images/dino-game/cactus-0.svg';
import cactus1 from '../../../assets/images/dino-game/cactus-1.svg';
import { CACTUS_INTERVAL_MAX, CACTUS_INTERVAL_MIN } from '../utils/cactus-constants';

export interface CactusConfig {
  nextCactusTime: number;
  cacti: { position: number, image: string }[];
}

export function updateCactus(cactusConfig: CactusConfig, delta: number, speed: number) {
  cactusConfig.cacti = cactusConfig.cacti.flatMap((cactus) => {
    if (cactus.position <= -100) return [];
    return [{position: cactus.position + (delta * speed * -1), image: cactus.image}];
  });

  if (cactusConfig.nextCactusTime <= 0) {
    cactusConfig.cacti.push({
      position: 100,
      image: Math.random() < 0.5 ? cactus0 : cactus1
    });
    //Gets random time between two intervals
    cactusConfig.nextCactusTime = Math.floor(Math.random() * (CACTUS_INTERVAL_MAX - CACTUS_INTERVAL_MIN + 1) + CACTUS_INTERVAL_MIN) / speed;
  }
  cactusConfig.nextCactusTime -= delta;
}

const Cactus = ({position, image}: { position: number, image: string }) => {

  return (
    <Image
      className={'cactus'}
      src={image}
      style={{
        position: 'absolute',
        zIndex: 1,
        left: `calc(${position} * 1%)`,
        height: '20%',
        bottom: 0.5
      }}
    />
  );
};

export default Cactus;