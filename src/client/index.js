import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import styles from './scss/application.scss';
import { Provider } from 'mobx-react';
import stores from './stores';

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
