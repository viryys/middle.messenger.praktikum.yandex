import signupTemplate from './signup.hbs';
import * as styles from '../signin/signin.css';

const root = document.querySelector('#root');

const data = { styles };

root.innerHTML = signupTemplate(data);
