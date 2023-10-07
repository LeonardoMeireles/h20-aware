import React from 'react';
import { Box } from 'grommet';
import H2OHeader from './components/H2OHeader';
import DinoGame from './pages/dino-game/DinoGame';

function App() {
  return (
    <Box height={'100vh'} background={'#282828'}>
      {/*<H2OHeader/>*/}
      <DinoGame/>
    </Box>
  );
}

export default App;
