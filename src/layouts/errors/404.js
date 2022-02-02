import error404Template from './404.hbs';
import * as styles from './errors.css';

// eslint-disable-next-line no-undef
const root = document.querySelector('#root');

const data = { styles };

root.innerHTML = error404Template(data);
