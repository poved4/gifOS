const getShortTitle = (title) => title.split(' ', 3).join(' ');

const addResearchButton = (title) => {
  document
    .getElementById(HTML_ELEMENT.GIF.BTN_AGAIN)
    .innerHTML += researchButton(title);
}

const buildSearchGif = async (query) => {

  addResearchButton(query);

  document.getElementById(HTML_ELEMENT.GIF.TITLE).textContent = query;

  const elementHTML = document.getElementById(HTML_ELEMENT.GIF.SEARCHS);
  elementHTML.innerHTML = '';

  const gifs = await giphySearch(query);

  gifs.forEach(gif => {

    elementHTML.innerHTML += gifSearch(
      getShortTitle(gif.title),
      gif.images.downsized_large.url
    );

  });

}

const buildTrendGif = async () => {

  const elementHTML = document.getElementById(HTML_ELEMENT.GIF.TRENDS);
  let gifs = JSON.parse(localStorage.getItem(STORAGE.TRENDS_KEY));

  if (!gifs) {
    gifs = await giphyTendences();
    localStorage.setItem(STORAGE.TRENDS_KEY, JSON.stringify(gifs));
  }

  gifs.forEach(gif => {

    elementHTML.innerHTML += gifTrend(
      getShortTitle(gif.title),
      gif.images.downsized_large.url
    );

  });

}

document
  .getElementById(HTML_ELEMENT.GIF.FORM)
  .addEventListener('submit', event => {

    event.preventDefault();

    const input = event.target.query.value.trim();
    if (input === '') {
      console.warn('El campo está vacío o solo tiene espacios.');
      return;
    }

    buildSearchGif(input);
    event.target.reset();

    const target = document.getElementById(HTML_ELEMENT.GIF.SEARCHS);
    if (target)
      target.scrollIntoView({ behavior: 'smooth' });

  });

(async () => {
  buildTrendGif();
  buildSearchGif('tendences');
})();