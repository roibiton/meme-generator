'use strict'

function onInit() {
    renderGallery()
}

function onShowGallery() {
    showGallery()
    closeMenu()
}

function onShowEditor() {
    showEditor()
    closeMenu()
}

function onShowSavedMemes() {
    showSavedMemes()
    closeMenu()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    document.body.classList.remove('menu-open');
}