import { Box, Text } from 'grommet';
import AquaGlobe from '../home-page/components/AquaGlobe';

const GlobeDataPage = () => {
  return (
    <Box
      style={{
        backgroundImage: 'linear-gradient(bottom, #03EABF , #2187FF)'
      }}
    >
      <Box>
        <Text>Hey buddy! Thanks for helping me out!</Text>
        <Text>Now that we know how the water cycle works, let's look into some interesting data directly from
          space!</Text>
      </Box>
      <AquaGlobe/>
    </Box>
  );
};

export default GlobeDataPage;