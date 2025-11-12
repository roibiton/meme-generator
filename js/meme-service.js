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
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'animals'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'animals'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'movies'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'movies'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics'] },
    { id: 12, url: 'img/12.jpg', keywords: ['movies', 'celebrity'] },
    { id: 13, url: 'img/13.jpg', keywords: ['celebrity', 'movies'] },
]

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setLineFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setLineAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function decreaseFontSize() {
    if (gMeme.lines[gMeme.selectedLineIdx].size > 10) {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }
}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].y -= 10
}

function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].y += 10
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
    gMeme.lines[lineIdx].x = x
    gMeme.lines[lineIdx].y = y
    gMeme.lines[lineIdx].width = width
    gMeme.lines[lineIdx].height = height
}

function selectLineByPos(clickX, clickY) {
    for (let i = gMeme.lines.length-1; i >= 0; i--) {
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

function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

