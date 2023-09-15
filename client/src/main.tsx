import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import dayjsLocal from 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import App from './app';

import 'antd/lib/style';

ConfigProvider.config({
  theme: {
    primaryColor: '#ff7626',
  },
});

dayjs.locale(dayjsLocal);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
