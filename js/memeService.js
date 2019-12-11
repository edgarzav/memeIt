var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 0, url: './meme-imgs/005.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {
            line: '',
            size: 20,
            align: 'left',
            color: 'red'
        },
        {
            line: '',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function updateFontSize(value) {
    gMeme.txts[selectedTxtIdx].size = value;
}

function getFontSize() {
    console.log(gMeme.txts[selectedTxtIdx].size);
    
    return gMeme.txts[selectedTxtIdx].size
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




// function loadCanvas() {
//     gCanvas = document.getElementById('my-canvas');
//     ctx = gCanvas.getContext('2d')
// }







let idx = 1;

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
    console.log(gImgs.length);
    console.log(gImgs);

    return gImgs
}