'use strict'

var gElCanvas
var gCtx

function initMemeEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onColorChange(color) {
    setLineColor(color)
    renderMeme()
}

function onStrokeColorChange(color) {
    setLineStrokeColor(color)
    renderMeme()
}

function onFontChange(font) {
    setLineFont(font)
    renderMeme()
}

function onAlignText(align) {
    setLineAlign(align)
    renderMeme()
}

function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}

function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}

function onMoveLineUp() {
    moveLineUp()
    renderMeme()
}

function onMoveLineDown() {
    moveLineDown()
    renderMeme()
}

function onAddLine() {
    addLine()
    updateEditorInputs()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    updateEditorInputs()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    updateEditorInputs()
    renderMeme()
}

function onCanvasClick(event) {
    const rect = gElCanvas.getBoundingClientRect()
    const clickX = (event.clientX - rect.left) * (gElCanvas.width / rect.width)
    const clickY = (event.clientY - rect.top) * (gElCanvas.height / rect.height)
    
    if (selectLineByPos(clickX, clickY)) {
        updateEditorInputs()
        renderMeme()
    }
}

function updateEditorInputs() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    
    document.querySelector('.text-input').value = selectedLine.txt
    document.querySelector('.color-input').value = selectedLine.color
    document.querySelector('.font-select').value = selectedLine.font
}

function renderMeme() {
    if (!gElCanvas) initMemeEditor()
    
    const meme = getMeme()
    const img = new Image()
    const imgData = getImgById(meme.selectedImgId)
    img.src = imgData.url
    
    img.onload = () => {
        // Clear canvas
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        
        // Draw the image
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        
        // Draw all lines
        meme.lines.forEach((line, idx) => {
            drawText(line, idx === meme.selectedLineIdx)
        })
    }
}

function drawText(line, isSelected) {
    const meme = getMeme()
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = line.strokeColor || 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'middle'
    
    // Calculate text position based on alignment
    let x = line.x
    if (line.align === 'center') {
        x = gElCanvas.width / 2
    } else if (line.align === 'left') {
        x = 50
    } else if (line.align === 'right') {
        x = gElCanvas.width - 50
    }
    
    const y = line.y
    
    // Draw text
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
    
    // Store position and size for click detection
    const textMetrics = gCtx.measureText(line.txt)
    console.log(textMetrics);
    
    const width = textMetrics.width
    const height = line.size
    
    setLinePos(meme.lines.indexOf(line), x, y, width, height)
    
    // Draw frame around selected line
    if (isSelected) {
        gCtx.strokeStyle = '#ff6b6b'
        gCtx.lineWidth = 3
        gCtx.setLineDash([8, 8])
        const padding = 10
        
        let rectX = x - width / 2 - padding
        if (line.align === 'left') {
            rectX = x - padding
        } else if (line.align === 'right') {
            rectX = x - width - padding
        }
        
        gCtx.strokeRect(
            rectX,
            y - height / 2 - padding,
            width + padding * 2,
            height + padding * 2
        )
        gCtx.setLineDash([])
    }
}
// SAVED MEMES
function onSaveMeme() {
    const dataURL = gElCanvas.toDataURL('image/png')
    saveMeme(dataURL)
}

function showSavedMemes() {
    document.querySelector('.gallery-section').classList.add('hidden')
    document.querySelector('.editor').classList.remove('editor-section')
    document.querySelector('.editor').classList.add('hidden')
    document.querySelector('.saved-memes-section').classList.remove('hidden')
    const savedMemes = getSavedMemes()
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    elSavedMemesContainer.innerHTML = ''
    if (savedMemes.length === 0) {
        elSavedMemesContainer.innerHTML = '<p>No saved memes yet.</p>'
        return
    }
    savedMemes.forEach((memeDataURL, index) => {
        const elImg = document.createElement('img')
        elImg.src = memeDataURL
        elSavedMemesContainer.appendChild(elImg)
    })
}
