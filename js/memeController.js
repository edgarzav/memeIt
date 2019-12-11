const gCanvas = document.getElementById('my-canvas');
const gCtx = gCanvas.getContext('2d')

function init() {
    setImages()
    renderGallery()
}


function onLineUp() {
    gMeme.selectedTxtIdx = 0
    document.querySelector('.txt-input').value = ''
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
    drawImg(id)
    setCurrImgId(id);
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.meme-edit').style.display = 'block';
}


function onLineDown() {
    gMeme.selectedTxtIdx = 1
    document.querySelector('.txt-input').value = ''
}

function txtLineToggle() {
    let currIdx = getCurrTxtIdx()
    let idx = currIdx === 1 ? 0 : 1;

    setCurrTxtIdx(idx)
    document.querySelector('.txt-input').value = ''
}

function drawText(txt, x, y) {
    let fontSize = getFontSize()
    gCtx.fillStyle = '#fff'
    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 2
    gCtx.font = `${fontSize}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}


function onChangeFont(elBtn) {
    let value = +elBtn.dataset.id;
    updateFontSize(value)
}

function onSetTxtToMeme(ev, elTxt) {
    let img = getImg()
    if (ev.which === 8) {
        let memeId = getCurrMemeId();
        drawImg(memeId)
    }
    addTxtToMeme(ev, elTxt.value);
    let txt = getTxtToRender();
    if (img) {
        if (gMeme.selectedTxtIdx === 0) {
            drawText(txt, 20, 80)
        } else {
            drawText(txt, 20, 400)
        }
    }
}

function drawImg(id) {
    let imgIndex = getImgIndexById(id);
    let img;
    if (img)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    else {
        img = new Image()
        img.src = gImgs[imgIndex].url
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        };
    }
    setImg(img)
}
