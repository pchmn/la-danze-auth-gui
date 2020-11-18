import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './App.scss';
import { SignUp } from './features/SignUp/SignUp';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E74C3C',
    },
    secondary: {
      main: '#FFB74D',
    },
  },
  typography: {
    fontFamily: [
      '"Work Sans"',
      '"Open Sans"',
      'sans-serif',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignUp />
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Counter />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
          </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
          </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
          </a>
          ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
          </a>
          </span>
        </header>
      </div> */}
    </ThemeProvider>
  );
}

export default App;
