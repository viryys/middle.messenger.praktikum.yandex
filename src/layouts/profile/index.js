import backSvg from 'bundle-text:../../../static/img/back.svg';
import profileTemplate from './profile.hbs';
import * as styles from './profile.css';

const root = document.querySelector('#root');

const data = {
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'чатИван',
  login: 'ivanivanov',
  email: 'pochta@yandex.ru',
  phone: '+7(919)111-22-34',
  styles,
};

root.innerHTML = profileTemplate(data);

const logo = document.getElementById('backSVG');
logo.innerHTML = backSvg;
