import { createRoot } from 'react-dom/client';
import './help.scss';
import AppContainer from './Index';


document.addEventListener('DOMContentLoaded', () => {
  const helpEl = document.getElementById('bplAdminHelpPage');
  const isPremium = helpEl.dataset.isPremium;
  createRoot(helpEl).render(<AppContainer version={helpEl.dataset.version} isPremium={isPremium} />);
});