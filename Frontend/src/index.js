import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={store} >

        <LandingPage />

    </Provider>
    

    , document.getElementById('root'));




