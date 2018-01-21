import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';

import { LocaleProvider } from 'antd';
import esES from 'antd/lib/locale-provider/es_ES';

import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

ReactDOM.render(
    <LocaleProvider  locale={esES}>
        <App />
    </LocaleProvider>
, document.getElementById('root'));
registerServiceWorker();
