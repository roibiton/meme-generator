'use strict'

var gElCanvas
var gCtx
var gIsDragging = false
var gDragLineIdx = -1
var gDragStartPos = { x: 0, y: 0 }

function initMemeEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addCanvasListeners()
}

function addCanvasListeners() {
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
    gElCanvas.addEventListener('mouseleave', onMouseUp)
    
    // Touch events for mobile
    gElCanvas.addEventListener('touchstart', onTouchStart)
    gElCanvas.addEventListener('touchmove', onTouchMove)
    gElCanvas.addEventListener('touchend', onTouchEnd)
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
    setLineAlign(align, gElCanvas.width)
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

function onMouseDown(event) {
    const rect = gElCanvas.getBoundingClientRect()
    const mouseX = (event.clientX - rect.left) * (gElCanvas.width / rect.width)
    const mouseY = (event.clientY - rect.top) * (gElCanvas.height / rect.height)

    const lineIdx = getLineIdxByPos(mouseX, mouseY)
    if (lineIdx !== -1) {
        gIsDragging = true
        gDragLineIdx = lineIdx
        gDragStartPos = { x: mouseX, y: mouseY }
        setSelectedLine(lineIdx)
        updateEditorInputs()
        renderMeme()
        gElCanvas.style.cursor = 'grabbing'
    }
}

function onMouseMove(event) {
    const rect = gElCanvas.getBoundingClientRect()
    const mouseX = (event.clientX - rect.left) * (gElCanvas.width / rect.width)
    const mouseY = (event.clientY - rect.top) * (gElCanvas.height / rect.height)

    if (gIsDragging && gDragLineIdx !== -1) {
        const dx = mouseX - gDragStartPos.x
        const dy = mouseY - gDragStartPos.y
        moveLineTo(gDragLineIdx, dx, dy, gElCanvas.width, gElCanvas.height)
        gDragStartPos = { x: mouseX, y: mouseY }
        renderMeme()
    } else {
        const lineIdx = getLineIdxByPos(mouseX, mouseY)
        gElCanvas.style.cursor = lineIdx !== -1 ? 'grab' : 'default'
    }
}

function onMouseUp() {
    gIsDragging = false
    gDragLineIdx = -1
    gElCanvas.style.cursor = 'default'
}

function onTouchStart(event) {
    event.preventDefault() 
    const rect = gElCanvas.getBoundingClientRect()
    const touch = event.touches[0]
    const touchX = (touch.clientX - rect.left) * (gElCanvas.width / rect.width)
    const touchY = (touch.clientY - rect.top) * (gElCanvas.height / rect.height)

    const lineIdx = getLineIdxByPos(touchX, touchY)
    if (lineIdx !== -1) {
        gIsDragging = true
        gDragLineIdx = lineIdx
        gDragStartPos = { x: touchX, y: touchY }
        setSelectedLine(lineIdx)
        updateEditorInputs()
        renderMeme()
    }
}

function onTouchMove(event) {
    event.preventDefault() 
    const rect = gElCanvas.getBoundingClientRect()
    const touch = event.touches[0]
    const touchX = (touch.clientX - rect.left) * (gElCanvas.width / rect.width)
    const touchY = (touch.clientY - rect.top) * (gElCanvas.height / rect.height)

    if (gIsDragging && gDragLineIdx !== -1) {
        const dx = touchX - gDragStartPos.x
        const dy = touchY - gDragStartPos.y
        moveLineTo(gDragLineIdx, dx, dy, gElCanvas.width, gElCanvas.height)
        gDragStartPos = { x: touchX, y: touchY }
        renderMeme()
    }
}

function onTouchEnd(event) {
    event.preventDefault()
    gIsDragging = false
    gDragLineIdx = -1
}

function updateEditorInputs() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    document.querySelector('.text-input').value = selectedLine.txt || ''
    document.querySelector('.color-input').value = selectedLine.color || '#ffffff'
    document.querySelector('.stroke-color-input').value = selectedLine.strokeColor || '#000000'
    document.querySelector('.font-select').value = selectedLine.font || 'Impact'
}

function renderMeme() {
    if (!gElCanvas) initMemeEditor()

    const meme = getMeme()
    const img = new Image()
    const imgData = getImgById(meme.selectedImgId)
    img.src = imgData.url

    img.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

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

    const x = line.x
    const y = line.y

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)

    const textMetrics = gCtx.measureText(line.txt)
    const width = textMetrics.width
    const height = line.size

    setLinePos(meme.lines.indexOf(line), x, y, width, height)

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
    showSavedMemes()
}

function showSavedMemes() {
    document.querySelector('.gallery-section').classList.add('hidden')
    document.querySelector('.editor').classList.remove('editor-section')
    document.querySelector('.editor').classList.add('hidden')
    document.querySelector('.saved-memes-section').classList.remove('hidden')
    const savedMemes = getSavedMemes()
    const strHTMLs = savedMemes.map((savedMeme, idx) => {
        const imgSrc = savedMeme.imgDataUrl || savedMeme 
        return `<section class="saved-meme">
        <img src="${imgSrc}" class="saved-meme-img" onclick="onSavedImgSelect(${idx})" />
        <button class="delete-meme-btn" onclick="onDeleteSavedMeme(event, ${idx})"><i class="fa-solid fa-trash"></i></button>
    </section>`
    })

    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    elSavedMemesContainer.innerHTML = strHTMLs.join('')

    if (savedMemes.length === 0) {
        elSavedMemesContainer.innerHTML = '<p>No saved memes yet.</p>'
    }
}

function onSavedImgSelect(idx) {
    const success = loadMeme(idx)
    if (success) {
        showEditor()
        updateEditorInputs()
        renderMeme()
    } else {
        alert('Failed to load saved meme')
    }
}

function onDeleteSavedMeme(ev, idx) {
    ev.stopPropagation() 
    deleteMeme(idx)
    showSavedMemes()

}