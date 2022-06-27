/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

//Element
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logInBtn = document.querySelector('.btn--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const userDataSaveBtn = document.querySelector('.btn--save-settings');
const userPasswordSaveBtn = document.querySelector('.btn--save-password');

//Delegation
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}
//On Login Submit
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    logInBtn.textContent = 'Waiting...'; //update Btn Text
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    logInBtn.textContent = 'Login'; //update Btn Text
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

//On UpdateMe Submit
if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userDataSaveBtn.textContent = 'Updating...'; //update Btn Text
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
    userDataSaveBtn.textContent = 'Save settings'; //update Btn Text
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    userPasswordSaveBtn.textContent = 'Updating...'; //update Btn Text
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    userPasswordSaveBtn.textContent = 'Save password'; //update Btn Text
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
