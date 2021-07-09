const searchBtn = document.querySelector(".searchButton");
const serachInput = document.querySelector("#inputText");

var page = 1

function showImage(imgurl) {
    let image = `<div class="text-center" style=" margin-top: 40px;">
  <img src="${imgurl}" class="rounded" alt="...">
</div>`
    document.querySelector('#divInfoPhoto').innerHTML = image
}


let svg1 = document.querySelector('#svg1')
svg1.addEventListener('click', function (e) {
    console.log('svg1')
    if (page === 1) return
    document.querySelector('#photos').innerHTML = ""
    page--;
    document.querySelector(".divCount").textContent = page
    getImages();
})

let svg2 = document.querySelector('#svg2')
svg2.addEventListener('click', function (e) {
    document.querySelector('#photos').innerHTML = ""
    page++;
    document.querySelector(".divCount").textContent = page
    getImages();
})


document.querySelector(".divCount").textContent = page

function getImages() {
    const text = document.querySelector('#inputText').value
    let URL = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
    let API = "api_key=4b53c35d166569f04bc7aa69c53dc8cf";
    var PATH = `${URL}&${API}&format=json&nojsoncallback=1&tags=${document.querySelector('#inputText').value}&per_page=6&page=${page}`

    fetch(PATH)
        .then(response => {
            return response.json()
        })
        .then((images) => {
            document.getElementById("photos").innerHTML = "";
            for (let i = 0; i < images.photos.photo.length; i++) {
                let photo_server = images.photos.photo[i].server;
                let photo_id = images.photos.photo[i].id;
                let photo_secret = images.photos.photo[i].secret;
                var title = images.photos.photo[i].title;
                var photo_url = `https://live.staticflickr.com/${photo_server}/${photo_id}_${photo_secret}.jpg`;

                let img = `<div class="col-2">
                  <img id="expandedImg" src="${photo_url}" class="img-rounded" alt="${title}" height="300" width="300"  onclick="showImage('${photo_url}')"></div>`
                document.getElementById('photos').innerHTML += img;
                document.querySelector('.divArrows').style.display = 'block'
            }
        })
}

