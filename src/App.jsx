import { Provider } from 'react-redux';

import store from 'store';
import WithAuth from 'components/WithAuth';

import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <WithAuth>
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </WithAuth>
    </Provider>
  );
}

export default App;
