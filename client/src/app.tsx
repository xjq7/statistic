import Router from './router';
import '../../sdk/index.js';
const referrer = document.referrer;
const ua = window.navigator.userAgent;
const hostname = window.location.hostname;
window.fetch('http://127.0.0.1:3000/v1/visit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    referrer,
    ua,
    app_id: hostname,
  }),
});
export default function App() {
  return <Router />;
}
