function init(){
    setImages()
    renderGallery()
}
function renderGallery() {
    let images = getImagesToRender();

    let divs = images.map(function (image) {
        return `<div class="">
                <img class="image-item" src="${image.url}" alt="">
                </div>`
    });  
    document.querySelector('.gallery-container').innerHTML = divs.join()
}