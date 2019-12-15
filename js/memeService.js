'use strict'
let gKeyWords = { 'happy': 16, 'funny puk': 1, 'books': 20, 'lorem': 28, 'ipsum': 12, 'comics': 5 }
let gStickers = [{ title: 'gift', url: '../imgs/stickers/gift-sticker.svg' },
{ title: 'hat', url: './imgs/stickers/hat-sticker.svg' },
{ title: 'glasses', url: '../imgs/stickers/glasses-sticker.svg' },
{ title: 'funny', url: '../imgs/stickers/funny-sticker.svg' }]

let gCurrStickerPage = 0, gStickersOnPage = 3;
let gKeyWordsOnPage = 4;
let gPosLine = 80;
let idx = 1;
let gCurrSticker = '';
let gSearchedKeyWord = '';
const KEY = 'meme';
let gImgs = [];
let gMeme = {
    selectedImgId: 0,
    selectedTxtIdx: 0,
    txts: [],
    stickers: []
}

function selectLineByPos(offsetX, offsetY) {
    let pos = gMeme.txts.findIndex(txt => {
        return txt.pos.posX < offsetX &&
            txt.pos.posY > offsetY && txt.pos.posY < offsetY + gPosLine
    })
    if (pos !== -1) gMeme.selectedTxtIdx = pos
}

function downloadImg(elLink, canvas) {
    const data = canvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}

function getSelectedLineTxt() {
    return gMeme.txts[gMeme.selectedTxtIdx].line;
}
function getStickersToRender() {
    let startAt = gCurrStickerPage * gStickersOnPage;
    return gStickers.slice(startAt, startAt + gStickersOnPage);
}

function changeStickersPage(diff) {
    gCurrStickerPage = (Math.ceil(gStickers.length / gStickersOnPage)
        + gCurrStickerPage + (+diff)) % Math.ceil(gStickers.length / gStickersOnPage)
}

function getKeyWordsToRender() {
    let keys = Object.entries(gKeyWords);
    return keys.slice(0, gKeyWordsOnPage);
}
function setkeysOnPageAll() {
    gKeyWordsOnPage = Object.entries(gKeyWords).length - 1;
}


function getTxtLines() {
    return gMeme.txts;
}

function deleteSelectedLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
    if (!gMeme.length) gMeme.selectedTxtIdx = 0
}

function setNewLine() {
    if (gMeme.txts.length)
        gMeme.selectedTxtIdx++;
    gMeme.txts.push(createNewLine())
}

function setNewSticker(posX, posY) {
    gMeme.stickers.push(createNewSticker(gCurrSticker, posX, posY))
}

function createNewSticker(url, posX, posY) {
    return {
        url,
        pos: {
            posX,
            posY
        }
    }
}

function getMemeStickers() {
    return gMeme.stickers;
}

function saveMemeToLocal(ctx) {
    let memsFromStorage = getMemsFromStorage();
    let imgs = [];
    let imgData = "data:image/png;base64," + getBase64Image(ctx);

    if (memsFromStorage) imgs = memsFromStorage;

    imgs.push(imgData)
    saveToStorage(KEY, imgs)
}

function getBase64Image(canvas) {
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function setCurrSticker(url) {
    gCurrSticker = url;
}

function getMemsFromStorage() {
    return loadFromStorage(KEY)
}

function setLineStroke() {
    if (gMeme.txts[gMeme.selectedTxtIdx].stroke) {
        gMeme.txts[gMeme.selectedTxtIdx].stroke = false;
    } else gMeme.txts[gMeme.selectedTxtIdx].stroke = true
}

function setPosToLine(posX, posY) {
    gMeme.txts[gMeme.selectedTxtIdx].pos.posX = posX
    gMeme.txts[gMeme.selectedTxtIdx].pos.posY = posY
}

function getLinePos() {
    let txtIdx = gMeme.selectedTxtIdx;
    if (gMeme.txts.length) {
        return gMeme.txts[txtIdx].pos;
    }
}

function checkIfTxtIsEmpty() {
    return gMeme.txts
}

function createNewLine() {
    return {
        line: '',
        pos: {
            posX: 20,
            posY: (gPosLine += 60)
        },
        size: 3.2,
        align: 'left',
        stroke: true,
        font: 'impact',
        color: '#fff'
    }
}

function saveMeme() {
    saveToStorage(CANVASKEY)
}

function setTxtAlign(dir) {
    gMeme.txts[gMeme.selectedTxtIdx].align = dir;
}

function addTxtToMeme(txt) {
    if (gMeme.txts.length)
        gMeme.txts[gMeme.selectedTxtIdx].line = txt
}

function updateFontSize(value) {
    gMeme.txts[gMeme.selectedTxtIdx].size += value;
}

function toggleTxtLines() {
    if (gMeme.selectedTxtIdx === gMeme.txts.length - 1) {
        gMeme.selectedTxtIdx = 0;
    } else gMeme.selectedTxtIdx++
}

function getCurrTxt() {
    let txtIdx = gMeme.selectedTxtIdx
    return gMeme.txts[txtIdx].line;
}

function getSelectedImg() {
    let img = gImgs.find(img => {
        return img.id === gMeme.selectedImgId
    })
    return img.url
}

function setTxtFont(selectedFont) {
    gMeme.txts[gMeme.selectedTxtIdx].font = selectedFont;
}

function setFilledColor(color) {
    gMeme.txts[gMeme.selectedTxtIdx].color = color;
}

function setCurrImgId(imgId) {
    gMeme.selectedImgId = imgId;
}

function getCurrMemeId() {
    return gMeme.selectedImgId;
}

function getTxtToRender() {
    return gMeme.txts[gMeme.selectedTxtIdx]
}

function getImgIndexById(id) {
    return gImgs.findIndex(img => {
        return img.id === id
    })
}

function setImage(url, keywords) {
    return {
        id: idx++,
        url,
        keywords
    }
}

function setUploadedImg(img) {
    gImgs.unshift(setImage(img.src, ['books']));
}

function setImages() {
    let zerosStr = '00';
    gImgs.push(setImage(`./meme-imgs/${zerosStr}${1}.jpg`, ['books']));
    gImgs.push(setImage(`./meme-imgs/${zerosStr}${5}.jpg`, ['books']));
    gImgs.push(setImage(`./meme-imgs/${zerosStr}${7}.jpg`, ['books']));
    for (let i = 2; i < 18; i++) {
        if (i % 10 === 0) zerosStr -= '0'
        gImgs.push(setImage(`./meme-imgs/${zerosStr}${i}.jpg`, ['happy']));
    }
}

function setSearchedKeyword(searchedKeyWord) {
    gSearchedKeyWord = searchedKeyWord;
    updateKeyWords(searchedKeyWord)
}

function updateKeyWords(searchedKeyWord) {
    if (searchedKeyWord) {
        if (!gKeyWords[searchedKeyWord]) gKeyWords[searchedKeyWord] = 0;
        gKeyWords[searchedKeyWord]++
    }
}

function getImagesToRender() {
    if (!gSearchedKeyWord) return gImgs
    return gImgs.filter(img => {
        return img.keywords[0] === gSearchedKeyWord;
    })
}

function resetMemeData() {
    gMeme.txts.splice(0, gMeme.txts.length);
    gMeme.stickers.splice(0, gMeme.stickers.length);
    gMeme.selectedImgId = 0;
    gMeme.selectedTxtIdx = 0
    gPosLine = 80;
}