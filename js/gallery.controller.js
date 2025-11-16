'use strict'

function renderGallery() {
    renderKeywordFilter()
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

function renderKeywordFilter() {
    const keywords = getAllKeywords()
    const keywordCounts = getKeywordCounts()
    const elFilterContainer = document.querySelector('.filter-container')
    const currentFilter = getFilter()
    
    const strHtmls = keywords.map(keyword => {
        const count = keywordCounts[keyword]
        const fontSize = 16 + (count*2.2)
        const isActive = currentFilter === keyword
        
        return `<span class="keyword-word ${isActive ? 'active' : ''}" 
                     style="font-size: ${fontSize}px" 
                     onclick="onSetFilter('${keyword}')">${keyword}</span>`
    })
    
    elFilterContainer.innerHTML = `
        <span class="keyword-word ${!currentFilter ? 'active' : ''}" 
              style="font-size: 20px" 
              onclick="onSetFilter(null)">All</span>
        ${strHtmls.join('')}
    `
}

function onSetFilter(keyword) {
    setFilter(keyword)
    renderGallery()
}

function onImgSelect(imgId) {
    const editorNavBtn=document.querySelector('.editor-btn')
    highlightNavBtn(editorNavBtn)
    setImg(imgId)
    resetMeme()
    showEditor()
    updateEditorInputs()
    renderMeme()
}

function onBackToGallery() {
    const galleryNavBtn=document.querySelector('.gallery-btn')
    highlightNavBtn(galleryNavBtn)
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
