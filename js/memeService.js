'use strict'
let gKeywords = { 'happy': 12, 'funny puk': 1 }
let gImg;
let gPosLine = 80;
let idx = 1;
let gImgs = [{ id: 0, url: './meme-imgs/005.jpg', keywords: ['happy'] }];
let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {
            line: '',
            size: 3.2,
            align: 'left',
            color: 'red',
            pos: {
                posX: 20,
                posY: gPosLine
            }
        }
    ]
}

function getSelectedLineTxt() {
    return gMeme.txts[gMeme.selectedTxtIdx].line;
}

function getTxtLines() {
    return gMeme.txts;
}

function setNewLine() {
    gMeme.txts.push(createNewLine())
    gMeme.selectedTxtIdx++;
}

function getLinePos() {
    let txtIdx = gMeme.selectedTxtIdx;
    return gMeme.txts[txtIdx].pos;
}

function createNewLine() {
    return {
        line: '',
        pos: {
            posX: 20,
            posY: (gPosLine += 80)
        },
        size: 3.2
    }
}

function addTxtToMeme(txt) {
    gMeme.txts[gMeme.selectedTxtIdx].line = txt
}

function getMeme() {
    return gMeme;
}

function updateFontSize(value) {
    gMeme.txts[gMeme.selectedTxtIdx].size += value;
}


function setLineUp() {
    if (gMeme.selectedTxtIdx)
        gMeme.selectedTxtIdx--;
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
function setSelectedImg(img) {

}

function getSelectedImg() {
    let img = gImgs.find(img => {
        return img.id === gMeme.selectedImgId
    })
    return img.url
}


function getContext() {
    return gCtx;
}

function setCurrImgId(imgId) {
    gMeme.selectedImgId = imgId;
}

function getCurrMemeId() {
    return gMeme.selectedImgId;
}

function getTxtToRender() {
    return gMeme.txts[gMeme.selectedTxtIdx].line
}

function getImgIndexById(id) {
    return gImgs.findIndex(img => {
        return img.id === id
    })
}

function setImage(url) {
    return {
        id: idx++,
        url
    }
}

function setImages() {
    let zerosStr = '00';
    for (let i = 1; i < 18; i++) {
        if (i % 10 === 0) zerosStr -= '0'
        gImgs.push(setImage(`./meme-imgs/${zerosStr}${i}.jpg`));
    }
}

function getImagesToRender() {
    return gImgs
}