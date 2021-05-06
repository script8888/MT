import axios from 'axios';
axios.defaults.baseURL = 'https://api.myverigo.com'
axios.defaults.headers.common = {'Authorization': `Bearer `+ window.localStorage.getItem('token')}
export default axios;