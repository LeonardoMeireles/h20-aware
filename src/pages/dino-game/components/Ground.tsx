import { Image } from 'grommet';
import groundImage from '../../../assets/images/dino-game/ground.svg';

interface GroundProps {
  groundPosition: number;
}

const Ground = ({groundPosition}: GroundProps) => {

  return (
    <Image
      src={groundImage}
      style={{
        position: 'absolute',
        width: '300%',
        bottom: '0',
        left: `calc(${groundPosition} * 1%)`
      }}
    />
  );
};

export default Ground;