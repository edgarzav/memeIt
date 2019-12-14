'use strict'
const gCanvas = document.getElementById('my-canvas');
const gCtx = gCanvas.getContext('2d')
let gOnMouseDown = false

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
    renderSearched()
    document.querySelector('.gallery-container').innerHTML = divs.join('');
}

function onSearch(keyWord) {
    if (keyWord.innerHTML) {
        setSearchedKeyword(keyWord.innerHTML);
    } else {
        let searchTxt = document.querySelector('.search-input').value
        setSearchedKeyword(searchTxt);
    }
    renderGallery()
}

function renderSearched() {
    let keyWords = getKeyWordsToRender();
    let lis = keyWords.map(key => {
        let fontSize = 14;
        if (key[1] > 14 && key[1] < 30) fontSize
        return `<li class="searched-item" onclick="onSearch(this)"  style="font-size: ${key[1] + 14}px;">${key[0]}</li>`
    }).join('');
    lis += `<li class="searched-item more-btn" onclick="onShowAllKeyWords()" >more...</li>`
    document.querySelector('.searched').innerHTML = lis;

}

function renderCreatedMems() {
    let imgs = getMemsFromStorage();
    let divs = imgs.map(img => {
        return `<div class="image-container">
                <img class="meme-item" src="${img}" alt="">
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = divs.join('');
}

function renderStickers() {
    let stickers = getStickersToRender();
    let strHtml
    strHtml = stickers.map(sticker => {
        return `  <div draggable="true" ondragstart="dragSticker(this)">
                       <svg class="${sticker.title}-st sticker" src="${sticker.url}"
                          data-id="${sticker.url}" onclick="onDrawSticker(this)"></svg>
                  </div>`
    }).join('')


    document.querySelector('.sticker-box').innerHTML = strHtml;
}

function loadCanvas(id) {
    setCurrImgId(id);
    setNewLine();
    drawImg()
    renderStickers()
    setTimeout(drawRect, 100)

    document.querySelector('.upload-input').style.visibility = 'hidden';
    document.querySelector('.txt-input').value = '';
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.search-bar').style.display = 'none';
    document.querySelector('.meme-edit').style.display = 'flex';
}

function onShowAllKeyWords(){
    setkeysOnPageAll();
    renderSearched();
}

function onPagination(elDiff) {
    let diff = elDiff.dataset.id;
    changeStickersPage(diff);
    renderStickers()
}

function onShowGallery() {
    renderGallery()
    resetMemeData();
    document.querySelector('.upload-input').style.visibility = 'visible';
    document.querySelector('.search-bar').style.display = 'flex';
    document.querySelector('.gallery-container').style.display = 'grid';
    document.querySelector('.meme-edit').style.display = 'none';
}

function onShowSavedMemes() {
    renderCreatedMems()
    resetMemeData();
    document.querySelector('.upload-input').style.visibility = 'hidden';
    document.querySelector('.search-bar').style.display = 'none';
    document.querySelector('.gallery-container').style.display = 'grid';
    document.querySelector('.meme-edit').style.display = 'none';
}

function onSaveMeme() {
    saveMemeToLocal(gCanvas)
    onCloseModal()
}

function onTxtAlign(elAlignDir) {
    let diraction = elAlignDir.dataset.id;
    setTxtAlign(diraction)
    drawImg();
    drawText();
}

function onAddLine() {
    setNewLine();
    document.querySelector('.txt-input').value = ''
    document.querySelector('.txt-input').value = getSelectedLineTxt();
    drawImg()
    setTimeout(drawRect, 100)

}

function onTxtLineToggle() {
    toggleTxtLines()
    document.querySelector('.txt-input').value = ''
    document.querySelector('.txt-input').value = getSelectedLineTxt();
    drawImg()
    setTimeout(drawRect, 100)
}

function onSetTxtToMeme(elTxt) {
    addTxtToMeme(elTxt.value);
    drawImg()
    drawText()
}

function onMouseDown(elPos) {
    const offsetX = elPos.offsetX
    const offsetY = elPos.offsetY

    selectLineByPos(offsetX, offsetY)
    gOnMouseDown = true;
}

function onMouseUp() {
    gOnMouseDown = false;
}

function onDeleteLine() {
    document.querySelector('.txt-input').value = ''
    drawImg()
    deleteSelectedLine();
}

function onDrawSticker(elEmoji) {
    createNewSticker(elEmoji.dataset.id)
}

function drawSticker(sticker, posX, posY) {
    let img = new Image()
    img.onload = () => {
        gCtx.drawImage(img, posX, posY, gCanvas.width / 4, gCanvas.height / 4);
    };
    img.src = sticker

}

function drawStickers() {
    let stickers = getMemeStickers()
    if (stickers) {
        stickers.forEach(sticker => {
            drawSticker(sticker.url, sticker.pos.posX, sticker.pos.posY)
        });
    }
}

function allowStickerDrop(ev) {
    ev.preventDefault();
}

function dragSticker(elSticker) {
    setCurrSticker(elSticker.childNodes[0].nextSibling.dataset.id)
}

function dropSticker(ev) {
    let posX = ev.offsetX - gCanvas.offsetLeft;
    let posY = ev.offsetY - gCanvas.offsetTop;

    setNewSticker(posX, posY)
    drawStickers()
}

function onMoveLine(elPos) {
    if (gOnMouseDown) {
        const offsetX = elPos.offsetX
        const offsetY = elPos.offsetY
        moveText(offsetX, offsetY);
    }
}

function moveText(offsetX, offsetY) {
    setPosToLine(offsetX, offsetY)
    drawImg()
}

function onColorChange(elColor) {
    setFilledColor(elColor.target.value);
    drawImg()
}

function drawText() {
    let txtLines = getTxtLines()
    txtLines.forEach(txt => {
        let text = txt.line
        let x = txt.pos.posX
        let y = txt.pos.posY
        let fontSize = txt.size;
        let txtDir = txt.align;
        let font = txt.font;
        let color = txt.color;


        gCtx.textAlign = txtDir;
        gCtx.fillStyle = color
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2.5
        gCtx.font = `${fontSize}rem ${font}`;

        gCtx.fillText(text, x, y);
        if (txt.stroke)
            gCtx.strokeText(text, x, y);
    })
    drawStickers()

}

function onDownloadMeme(elLink) {
    downloadImg(elLink, gCanvas)

}

function onTxtStroke() {
    setLineStroke()
    drawImg()
}

function drawRect() {
    let selectedPos = getLinePos();

    if (selectedPos) {
        gCtx.beginPath();
        gCtx.rect(selectedPos.posX, selectedPos.posY - 50, 450, 70)
        gCtx.fillStyle = '#e7e5e570'
        gCtx.fill()
    }
    gCtx.closePath()
}

function onChangeFontSize(elBtn) {
    let value = +elBtn.dataset.id;
    updateFontSize(value);
    drawImg();
}

function onSetFont(elSelected) {
    setTxtFont(elSelected.value)
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
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}
function onCloseModal() {
    document.querySelector('.share-modal').style.visibility = 'hidden';
    document.querySelector('.main-container').classList.remove('blur');
}

function onShare(elForm, ev) {
    document.querySelector('.main-container').classList.add('blur');
    uploadImg(elForm, ev)
}

function onImgInput(ev) {
    loadImageFromInput(ev, updateGallery)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function updateGallery(img) {
    setUploadedImg(img)
    renderGallery()
}

