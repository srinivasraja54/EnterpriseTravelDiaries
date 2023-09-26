import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'react-redux';
import store  from './store/store';
// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

const msalInstance = new PublicClientApplication(msalConfig);

const root = createRoot(document.getElementById('root'));

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
        <Provider store={store}>
                <App />
                </Provider>
        </MsalProvider>
    </React.StrictMode >
);
registerServiceWorker();