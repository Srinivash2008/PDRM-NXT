import React from 'react';
import { createRoot } from 'react-dom/client';
import '../src/assets/style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './StoreRedux/Store';
import Notification from './Components/Notifications/Notification.jsx';
import { Provider } from 'react-redux';
import MUILoader from 'components/Loader/LoaderMui';
const container = document.getElementById('root');
const root = createRoot(container);
const MainApp = () => {
  return (
    <>
      <MUILoader />
      <App />
      <Notification />
    </>
  );
};

root.render(
  <Provider store={Store}>
    <MainApp />
  </Provider>
);

reportWebVitals();
