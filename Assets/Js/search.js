var searchss = "";
const apiKey = 'K5rZZsf7Ywd7hBttsBwU2RZn3odQfNBK';//apikey
const resultsEl = document.getElementById("results");//Div add Gif
const formSearch = document.getElementById('searchForm');//form of search
const searchTitle = document.getElementById("titleSearch");//change title
const inputSearch = document.getElementById("searchInput");//thing to search
const gifTendences = document.getElementById("tendeciaGifs");//div tendence Gifs
const suggestionBox = document.getElementById('suggestiions');//Div suggestion Box

suggestionBox.style.visibility = 'hidden';
formSearch.addEventListener('keyup',() => { suggestionBox.style.visibility = 'visible'; });

formSearch.addEventListener('submit', function(e){
    e.preventDefault();
    if (inputSearch.value != ''){ 
        if (searchss != null) { document.getElementById('searchs').innerHTML += `<button class="searchBack" onclick="search('${searchss}')">#${searchss}</button>`; }
        search(inputSearch.value);
    }   
})

function search(q) {
    searchss = q;
    inputSearch.value = ''; 
    searchTitle.textContent = q;
    if (inputSearch.value = '') { suggestionBox.style.visibility = 'hidden'; }
    //const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}`;
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=40`;

    fetch(path)
    .then(function(res) {
        return res.json();
    })
    .then(function (json) {
        //console.log(json.data[0].images);
        
        let resultsHtml = '';
        json.data.forEach(function(obj) {
            
            //console.log(obj);
            
            let shortTitle = '';
            const longTitle = obj.title;
            
            for (let value of longTitle) {
                if (value == ' ') { break; }
                if(value != ' ') { shortTitle += value; }
            }
            
            const titleObj = shortTitle;
            const urlObj = obj.images.downsized_large.url; 
            const widthObj = obj.images.downsized_large.width; 
            const heightObj = obj.images.downsized_large.height;

            resultsHtml += `
            <div class="containerResults">
                <img
                src = "${urlObj}" 
                alt = "${titleObj}"
                class = "gifResult"
                width = "${widthObj}"
                height = "${heightObj}">
                <p>#${titleObj}</p>
            </div>`;
        });
        resultsEl.innerHTML = resultsHtml;
        suggestionBox.style.visibility = 'hidden';
        
        if(resultsHtml == 0) { 
            resultsEl.innerHTML = "";
            resultsEl.textContent = 'NOT FOUND';
            searchTitle.textContent += ' NOT FOUND';
        }
    })
    .catch(function(err) {
        console.error(err.message);
    });
}

function searchTendences() {

    //const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=tendences&limit=4`;
    const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=4&rating=G`;

    fetch(path)
    .then(function(res) {
        return res.json();
    })
    .then(function (json) {
        json.data.forEach(function(obj) 
        {
            let shortTitle = '';
            const longTitle = obj.title;

            for (let value of longTitle) {
                if (value == ' ') { break; }
                if(value != ' ') { shortTitle += value; }
            }
            
            let titleObj = shortTitle; 
            const urlObj = obj.images.downsized_large.url; 
        
            gifTendences.innerHTML += `
                <div class="gifTendence">
                    <div class="infoGif">
                        <p>#${titleObj}</p>
                        <img src="Assets/Images/buttonClose.svg" alt="close">
                    </div>
                    <div class="gif">
                        <img src = "${urlObj}" alt = "${titleObj}">
                        <button class="bntMore" onclick="search('${titleObj}')");>Ver más…</button>
                    </div>
                </div>
            `;
        });
    });
}

searchTendences();
search('Tendencias');