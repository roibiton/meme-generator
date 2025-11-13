'use strict'

function renderGallery() {
    const imgs = getImgs()
    const elGalleryContainer = document.querySelector('.gallery-container')
    
    const strHtmls = imgs.map(img => `
        <img src="${img.url}" 
             alt="Meme ${img.id}" 
             class="gallery-img" 
             onclick="onImgSelect(${img.id})">
    `)
    
    elGalleryContainer.innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    showEditor()
    renderMeme()
}

function onBackToGallery() {
    showGallery()
}

function showEditor() {
    document.querySelector('.gallery-section').classList.add('hidden')
    document.querySelector('.saved-memes-section').classList.add('hidden')
    document.querySelector('.editor').classList.add('editor-section')
    document.querySelector('.editor').classList.remove('hidden')
}

function showGallery() {
    document.querySelector('.gallery-section').classList.remove('hidden')
    document.querySelector('.saved-memes-section').classList.add('hidden')
    document.querySelector('.editor').classList.remove('editor-section')
    document.querySelector('.editor').classList.add('hidden')
}
