import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.js';

// ReactDOM.render(<App />, document.getElementById('app'));

createRoot(document.getElementById('app')).render(<App/>)