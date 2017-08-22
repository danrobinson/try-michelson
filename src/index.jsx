import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import { store, history } from './store'

import './static/css/bootstrap-darkly.min.css';

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" exact={true} component={App} />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'), (() => undefined));
registerServiceWorker();
