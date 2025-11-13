'use strict'

function downloadCanvas(elLink) {
    const canvas = document.querySelector('canvas')
    if (!canvas) {
        alert('No meme to download!')
        return
    }
    
    // Temporarily deselect line to render clean image
    const meme = getMeme()
    const originalSelectedIdx = meme.selectedLineIdx
    meme.selectedLineIdx = -1
    
    // Render without selection frame
    renderMeme()
    
    // Wait for render to complete, then capture
    setTimeout(() => {
        const canvasContent = canvas.toDataURL('image/jpeg')
        elLink.href = canvasContent
        elLink.download = 'my-meme.jpg'
        
        // Restore selection and re-render
        meme.selectedLineIdx = originalSelectedIdx
        renderMeme()
    }, 500)
}

function onImgInput(ev) {
    loadImageFromInput(ev, onUploadedImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function onUploadedImg(img) {
    // Convert image to data URL
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const imgDataUrl = canvas.toDataURL()
    
    // Add to gallery
    const newImgId = addUploadedImg(imgDataUrl)
    
    // Set as active meme and switch to editor
    setImg(newImgId)
    resetMeme()
    showEditor()
    updateEditorInputs()
    renderMeme()
}

function onShareImg(ev) {
    ev.preventDefault()
    const canvas = document.querySelector('canvas')
    if (!canvas) {
        alert('No meme to share!')
        return
    }
    
    // Temporarily deselect line to upload clean image
    const meme = getMeme()
    const originalSelectedIdx = meme.selectedLineIdx
    meme.selectedLineIdx = -1
    
    // Render without selection frame
    renderMeme()
    
    // Wait for render to complete, then capture and upload
    setTimeout(() => {
        const canvasData = canvas.toDataURL('image/jpeg')
        
        // After a successful upload, allow the user to share on Facebook
        function onSuccess(uploadedImgUrl) {
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
        }
        
        uploadImg(canvasData, onSuccess)
        
        // Restore selection and re-render
        meme.selectedLineIdx = originalSelectedIdx
        renderMeme()
    }, 100)
}
// on submit call to this function

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}


