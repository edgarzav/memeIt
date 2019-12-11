let gKeywords = { 'happy': 12, 'funny puk': 1 }
let gImg;
let idx = 1;
let gImgs = [{ id: 0, url: './meme-imgs/005.jpg', keywords: ['happy'] }];
let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {
            line: '',
            size: 40,
            align: 'left',
            color: 'red'
        },
        {
            line: '',
            size: 40,
            align: 'left',
            color: 'red'
        }
    ]
}

function setImg(img) {
    gImg = img;
}

function getImg() {
    return gImg
}
function updateFontSize(value) {
    gMeme.txts[gMeme.selectedTxtIdx].size += value;
}

function getFontSize() {
    return gMeme.txts[gMeme.selectedTxtIdx].size
}


function getCurrTxtIdx() {
    return gMeme.selectedTxtIdx;
}

function setCurrTxtIdx(index) {
    gMeme.selectedTxtIdx = index;
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

function addTxtToMeme(ev, txt) {
    gMeme.txts[gMeme.selectedTxtIdx].line = txt;
}

function getTxtToRender() {
    return gMeme.txts[gMeme.selectedTxtIdx].line
}

function getImgIndexById(id) {
    return gImgs.findIndex(function (img) {
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