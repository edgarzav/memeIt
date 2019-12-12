'use strict'
const gCanvas = document.getElementById('my-canvas');
const gCtx = gCanvas.getContext('2d')

function init() {
    setImages()
    renderGallery()
}

function renderGallery() {
    let imgs = getImagesToRender();
    let divs = imgs.map(img => {
        return `<div class="image-container" onclick="loadCanvas(${img.id})">
                <img class="image-item" src="${img.url}" alt="">
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = divs.join('');
}

function loadCanvas(id) {
    setCurrImgId(id);
    drawImg()
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.meme-edit').style.display = 'block';
}

function onLineUp() {
    setLineUp()
    document.querySelector('.txt-input').value = ''
    document.querySelector('.txt-input').value = getSelectedLineTxt();
}

function onLineDown() {
    setNewLine();
    document.querySelector('.txt-input').value = ''
    document.querySelector('.txt-input').value = getSelectedLineTxt();
}

function onTxtLineToggle() {
    toggleTxtLines()
    document.querySelector('.txt-input').value = ''
    document.querySelector('.txt-input').value = getSelectedLineTxt();
}

function onSetTxtToMeme(evBtn, elTxt) {
    addTxtToMeme(elTxt.value);
    if (evBtn.keyCode === 8) {
        drawImg()
    }
    drawText()
}

function drawText() {
    let txtLines = getTxtLines()
    txtLines.forEach(txt => {
        let text = txt.line
        let x = txt.pos.posX
        let y = txt.pos.posY
        let fontSize = txt.size;

        gCtx.fillStyle = '#fff'
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2.5
        gCtx.font = `${fontSize}rem impact`;
        gCtx.fillText(text, x, y);
        gCtx.strokeText(text, x, y);
    })
}

function onChangeFont(elBtn) {
    let value = +elBtn.dataset.id;
    updateFontSize(value);
    drawImg();
}

function drawImg() {
    let memeId = getCurrMemeId()
    let imgIndex = getImgIndexById(memeId);
    let imgs = getImagesToRender()
    let img = getSelectedImg();

    img = new Image()
    img.src = imgs[imgIndex].url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
    };
    setSelectedImg(img)
}


