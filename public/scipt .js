const btnPopup = document.querySelector('.btnlogin-popup'); // Fix class name
const coverBox = document.querySelector('.cover_box'); // Fix class name
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector('.icon-close');

function showRegister() {
    coverBox.classList.add('active'); // Show popup
    document.querySelector('.form-box.login').style.transform = 'translateX(-400px)';
    document.querySelector('.form-box.register').style.transform = 'translateX(0)';
}

function showLogin() {
    coverBox.classList.add('active'); // Ensure popup stays open
    document.querySelector('.form-box.login').style.transform = 'translateX(0)';
    document.querySelector('.form-box.register').style.transform = 'translateX(400px)';
}

function activatePopup() {
    coverBox.classList.add('active-popup');
}

function closePopup() {
    coverBox.classList.remove('active-popup');
}

registerLink.addEventListener('click', showRegister);
loginLink.addEventListener('click', showLogin);
btnPopup.addEventListener('click', activatePopup);
iconClose.addEventListener('click', closePopup);