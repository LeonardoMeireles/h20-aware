import React from 'react';
import { Grommet } from 'grommet';
import theme from './config/groometTheme';

function App() {
  return (
    <Grommet theme={theme} full>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Grommet>
  );
}

export default App;
