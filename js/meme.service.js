'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'TOP TEXT',
            size: 40,
            color: '#ffffff',
            strokeColor: '#000000',
            font: 'Impact',
            align: 'center',
            y: 50,
            x: 250,
            width: 0,
            height: 0
        },
        {
            txt: 'BOTTOM TEXT',
            size: 40,
            color: '#ffffff',
            strokeColor: '#000000',
            font: 'Impact',
            align: 'center',
            y: 450,
            x: 250,
            width: 0,
            height: 0
        }
    ]
}

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['celebrity', 'politics','funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'animals','funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'cute','funny'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'animals','funny'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'cute','funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['celebrity', 'movies','funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute','funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['celebrity', 'movies','funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'cute','funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics','celebrity'] },
    { id: 12, url: 'img/12.jpg', keywords: ['movies', 'celebrity'] },
    { id: 13, url: 'img/13.jpg', keywords: ['celebrity', 'movies'] },
    { id: 14, url: 'img/14.jpg', keywords: ['movies', 'celebrity'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'movies','celebrity'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'movies'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics','celebrity'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny','movies'] }
]

var gFilterKeyword = null

function getMeme() {
    return gMeme
}

function getImgs() {
    console.log('Current filter:', gFilterKeyword)
    if (!gFilterKeyword) return gImgs
    const filtered = gImgs.filter(img => img.keywords.includes(gFilterKeyword))
    console.log('Filtered images:', filtered.length)
    return filtered
}

function getAllKeywords() {
    const keywords = []
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!keywords.includes(keyword)) keywords.push(keyword)
        })
    })
    return keywords.sort()
}

function getKeywordCounts() {
    const keywordMap = {}
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            keywordMap[keyword] = (keywordMap[keyword] || 0) + 1
        })
    })
    return keywordMap
}

function setFilter(keyword) {
    console.log('Setting filter to:', keyword)
    gFilterKeyword = keyword
}

function getFilter() {
    return gFilterKeyword
}

function addUploadedImg(imgDataUrl) {
    const newId = gImgs.length > 0 ? Math.max(...gImgs.map(img => img.id)) + 1 : 1
    const newImg = {
        id: newId,
        url: imgDataUrl,
        keywords: ['uploaded']
    }
    gImgs.push(newImg)
    return newId
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineColor(color) {
    const line = getSelectedLine()
    if (!line) return
    line.color = color
}

function setLineStrokeColor(color) {
    const line = getSelectedLine()
    if (!line) return
    line.strokeColor = color
}

function setLineFont(font) {
    const line = getSelectedLine()
    if (!line) return
    line.font = font
}

function setLineAlign(align) {
    const line = getSelectedLine()
    if (!line) return
    line.align = align
}

function increaseFontSize() {
    const line = getSelectedLine()
    if (!line) return
    if (line.size < 80) {
        line.size += 5
    }
}

function decreaseFontSize() {
    const line = getSelectedLine()
    if (!line) return
    if (line.size > 15) {
        line.size -= 5
    }
}

function moveLineUp() {
    const line = getSelectedLine()
    if (!line) return
    if (line.y < line.size) return
    line.y -= 10
}

function moveLineDown() {
    const line = getSelectedLine()
    if (!line) return
    if (line.y > gElCanvas.height - line.size) return
    line.y += 10
}

function addLine() {
    const newLine = {
        txt: 'NEW LINE',
        size: 40,
        color: '#ffffff',
        font: 'Impact',
        align: 'center',
        y: 250,
        x: 250,
        width: 0,
        height: 0
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function deleteLine() {
    if (gMeme.lines.length > 1) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        if (gMeme.selectedLineIdx >= gMeme.lines.length) {
            gMeme.selectedLineIdx = gMeme.lines.length - 1
        }
    }
}

function setLinePos(lineIdx, x, y, width, height) {
    const line = gMeme.lines[lineIdx]
    line.x = x
    line.y = y
    line.width = width
    line.height = height
}

function selectLineByPos(clickX, clickY) {
    for (let i = gMeme.lines.length - 1; i >= 0; i--) {
        const line = gMeme.lines[i]
        if (clickX >= line.x - line.width / 2 &&
            clickX <= line.x + line.width / 2 &&
            clickY >= line.y - line.height / 2 &&
            clickY <= line.y + line.height / 2) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
    return false
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function resetMeme() {
    gMeme.selectedLineIdx = 0
    gMeme.lines = [
        {
            txt: 'TOP TEXT',
            size: 40,
            color: '#ffffff',
            strokeColor: '#000000',
            font: 'Impact',
            align: 'center',
            y: 50,
            x: 250,
            width: 0,
            height: 0
        },
        {
            txt: 'BOTTOM TEXT',
            size: 40,
            color: '#ffffff',
            strokeColor: '#000000',
            font: 'Impact',
            align: 'center',
            y: 450,
            x: 250,
            width: 0,
            height: 0
        }
    ]
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

// SAVED MEMES

const STORAGE_KEY = 'memesDB'

var gMemes = loadFromStorage(STORAGE_KEY) || []

function getSavedMemes() {
    return gMemes
}

function saveMeme(memeDataUrl) {
    const memeToSave = {
        imgDataUrl: memeDataUrl,
        memeData: JSON.parse(JSON.stringify(gMeme)) 
    }
    gMemes.push(memeToSave)
    saveToStorage(STORAGE_KEY, gMemes)
}

function deleteMeme(idx) {
    gMemes.splice(idx, 1)
    saveToStorage(STORAGE_KEY, gMemes)
}

function loadMeme(idx) {
    const savedMeme = gMemes[idx]
    if (savedMeme && savedMeme.memeData) {
        gMeme = JSON.parse(JSON.stringify(savedMeme.memeData))
        return true
    }
    return false
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}
