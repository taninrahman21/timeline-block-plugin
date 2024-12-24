import React from 'react';
import { HashRouter } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import App from './App';

const AppContainer = ({version, isPremium}) => {
  return (
    <HashRouter>
      <App version={version} isPremium={isPremium} />
    </HashRouter>
  );
}

export default AppContainer;