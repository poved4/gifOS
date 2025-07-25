const giphyTendences = async (limit = 12) => {

  const uri = GIPHY.URI + `/trending?api_key=${GIPHY.API_KEY}&limit=${limit}&rating=G`;

  return await fetch(uri)
    .then(response => response.json())
    .then(json => json.data)
    .catch(error => {
      console.error(error.message);
    });

}

const giphySearch = async (searchQuery, limit = 48) => {

  const uri = GIPHY.URI + `/search?api_key=${GIPHY.API_KEY}&q=${searchQuery}&limit=${limit}`;

  return await fetch(uri)
    .then(response => response.json())
    .then(json => json.data)
    .catch(error => {
      console.error(error.message);
    });

}

const giphyUploadGif = async (blob) => {

  return await fetch(
    GIPHY.URI_UPLOAD,
      {
        method: 'POST',
        body: {
          'api_key': GIPHY.API_KEY,
          'file': blob
        }
      }
    )
    .then(response => response.json())
    .then(json => json.data)
    .catch(error => {
      console.error(error.message);
    });

}