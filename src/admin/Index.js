import React from 'react';
import { HashRouter } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import App from './App';

const AppContainer = ({version}) => {
  return (
    <HashRouter>
      <App version={version} />
    </HashRouter>
  );
}

export default AppContainer;