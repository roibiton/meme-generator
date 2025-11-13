'use strict'


function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const container = document.querySelector('.saved-memes-container .memes-grid')
    container.innerHTML = ''
    savedMemes.forEach(meme => {
        const memeEl = document.createElement('div')
        memeEl.classList.add('meme')
        memeEl.innerHTML = `
            <img src="${meme.url}" alt="Meme ${meme.id}">
            <button onclick="onDeleteMeme(${meme.id})">Delete</button>
        `
        container.appendChild(memeEl)
    })
}

function showSavedMemes() {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.add('hidden')
    document.querySelector('.saved-memes-container').classList.remove('hidden')
}
