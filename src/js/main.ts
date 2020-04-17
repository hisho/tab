import Tab from './modules/Tab';

const basic = document.getElementById('basic') ? new Tab('basic', ) : null;
const hash1 = document.getElementById('hash1') ? new Tab('hash1', {
  hash: true
}) : null;

const hash2 = document.getElementById('hash2') ? new Tab('hash2', {
  id: 'myHash',
  hash: true
}) : null;