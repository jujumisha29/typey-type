import { init } from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import ErrorBoundary from './components/ErrorBoundary'
import App from './App';
import withAnalyticsTracker from './utils/withAnalyticsTracker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.scss';

if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_QA) {
  init({
    dsn: 'https://50e71fa7abea49288b136cb517fc55be@o180165.ingest.sentry.io/1268615',
    release: process.env.REACT_APP_TYPEY_TYPE_RELEASE || "development",
    beforeSend(event) {
      if (event?.message?.match((/(ResizeObserver loop limit exceeded|ResizeObserver loop completed with undelivered notifications.)/i))) {
        return null;
      }
      return event;
    },
  });
}

ReactDOM.render(
  <DocumentTitle title='Typey Type for Stenographers'>
    <Router basename="/typey-type">
      <ErrorBoundary>
        <Route component={withAnalyticsTracker(App)} />
      </ErrorBoundary>
    </Router>
  </DocumentTitle>,
  document.getElementById('root')
);
