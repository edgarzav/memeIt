const gCanvas = document.getElementById('my-canvas');
const gCtx = gCanvas.getContext('2d')
let gImg, gtxtLine = 0;

function init() {
    setImages()
    renderGallery()
}


function onLineUp() {
    gMeme.selectedTxtIdx = 0
    document.querySelector('.txt-input').value = ''
}
function onLineDown() {
    gMeme.selectedTxtIdx = 1
    document.querySelector('.txt-input').value = ''
}



function txtLineToggle() {
    gMeme.selectedTxtIdx = gMeme.selectedTxtIdx === 1 ? 0 : 1
    document.querySelector('.txt-input').value = ''
}

function loadCanvas(id) {
    setCurrImgId(id);
    drawImg(id)// <=
    setCurrImgId(id);
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.meme-edit').style.display = 'block';

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
    updateFont(value)
 
}

function onSetTxtToMeme(ev, elTxt) {
    if (ev.which === 8) {
        let memeId = getCurrMemeId();
        drawImg(memeId)

    }
    addTxtToMeme(ev, elTxt.value);
    let txt = getTxtToRender();
    if (gImg) {
        if (gMeme.selectedTxtIdx === 0) {
            drawText(txt, 20, 80)
        } else {
            drawText(txt, 20, 400)
        }
    }
}

function drawImg(id) {
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
}






function renderGallery() {
    let imgs = getImagesToRender();

    let divs = imgs.map(function (img) {
        return `<div class="" onclick="loadCanvas(${img.id})">
                <img class="image-item" src="${img.url}" alt="">
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = divs.join('');
}