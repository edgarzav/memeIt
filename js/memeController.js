const gCanvas = document.getElementById('my-canvas');
const gCtx = gCanvas.getContext('2d')
let gImg;

function init() {
    setImages()
    renderGallery()
    // drawText('Coding Academy', 20, 80)
}

function loadCanvas(id){
    drawImg(id)// <=
console.log(id);
document.querySelector('.gallery-container').style.display = 'none';
document.querySelector('.meme-edit').style.display = 'block';

}


function onSetTxtToMeme(elTxt) {
    console.log(elTxt.value);
    addTxtToMeme(elTxt.value);
    if (gImg) {
        drawText(gMeme.txts[0].line, 20, 80)
    }

}

function drawImg(id) {
    // const img = document.querySelector('img');
    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    //let ctx = getContext();
    let imgIndex = getImgIndexById(id);

    if (gImg)
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gImg = new Image()
        gImg.src = gImgs[imgIndex].url
        gImg.onload = () => {
            gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)

        };
    }
    // NOTE: the proportion of the image - should be as the canvas,
    // otherwise the image gets distorted
}

function drawText(txt, x, y) {
    console.log(x, ' ', y);

    gCtx.fillStyle = '#fff'
    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 2
    gCtx.font = "40px Arial";
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

























function renderGallery() {
    let imgs = getImagesToRender();

    let divs = imgs.map(function (img) {
        return `<div class="" onclick="loadCanvas(${img.id})">
                <img class="image-item" src="${img.url}" alt="">
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = divs.join()
}