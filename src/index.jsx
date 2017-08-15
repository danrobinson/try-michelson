import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { typecheck } from './editing';

import store from './store'

import './static/css/bootstrap-darkly.min.css';

store.dispatch(typecheck())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'), (() => undefined));
registerServiceWorker();
