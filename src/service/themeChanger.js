const isDarkModeActive = () => {
  return document.body.classList.contains('dark-mode');
}

const darkModeOn = () => {

  if (isDarkModeActive())
    return;

  document.body.classList.add('dark-mode');

}

const darkModeOff = () => {

  if (!isDarkModeActive())
    return;

  document.body.classList.remove('dark-mode');

}

const changeNavbarLogo = () => {

  const logo = document.getElementById(HTML_ELEMENT.LOGO);
  if (logo === null) return;

  const uri = isDarkModeActive()
    ? 'img/gifOF_logo_dark.png'
    : 'img/gifOF_logo.png';

  logo.src = uri;

}

document
  .getElementById(HTML_ELEMENT.THEME.LIGHT)
  .addEventListener('click', event => {

    event.preventDefault();

    darkModeOff();
    changeNavbarLogo();

  });

document
  .getElementById(HTML_ELEMENT.THEME.DARK)
  .addEventListener('click', event => {

    event.preventDefault();

    darkModeOn();
    changeNavbarLogo();

  });