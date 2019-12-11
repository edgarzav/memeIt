let gImages = [];
let idx = 0;

function setImage(url) {
    return {
        id: idx++,
        url
    }
}


function setImages(){
   gImages.push(setImage('../meme-imgs/003.jpg'));
   gImages.push(setImage('/meme-imgs/004.jpg'));

}

function getImagesToRender(){
    console.log(gImages.length);
    console.log(gImages);
    
    return gImages
}