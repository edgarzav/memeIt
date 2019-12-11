var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 2, url: './meme-imgs/005.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [{
        line: 'I never eat Falafel', size: 20,
        align: 'left',
        color: 'red'
    }]
}
function getContext() {
    return gCtx;
}


function addTxtToMeme(txt) {
    gMeme.selectedImgId = 0
    gMeme.txts[0].line = txt;
}

function getImgIndexById(id){
    return gImgs.findIndex(function(img){
    return img.id === id
    })
}




// function loadCanvas() {
//     gCanvas = document.getElementById('my-canvas');
//     ctx = gCanvas.getContext('2d')
// }

























let idx = 0;

function setImage(url) {
    return {
        id: idx++,
        url
    }
}


function setImages() {
    gImgs.push(setImage('./meme-imgs/003.JPG'));
    gImgs.push(setImage('./meme-imgs/004.JPG'));

}

function getImagesToRender() {
    console.log(gImgs.length);
    console.log(gImgs);

    return gImgs
}