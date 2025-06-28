//Test Theme
const themeSquare = document.getElementById("ThemeSquare"); themeSquare.style.display ="none";
const themebtn = document.getElementById("theme").addEventListener(`click`, () => { themeSquare.style.display ="block"; })
const themeDay = document.getElementById("dayTheme").addEventListener('click', () => { document.body.classList.remove('dark'); themeSquare.style.display = "none"; });
const themeNight = document.getElementById("nightTheme").addEventListener('click', () => { document.body.classList.add('dark'); themeSquare.style.display = "none"; });