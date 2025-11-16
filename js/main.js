'use strict'

function onInit() {
    renderGallery()
}

function onShowGallery(elNavBtn) {
    highlightNavBtn(elNavBtn)
    showGallery()
    closeMenu()
}

function onShowEditor(elNavBtn) {
    highlightNavBtn(elNavBtn)
    showEditor()
    closeMenu()
}

function onShowSavedMemes(elNavBtn) {
    highlightNavBtn(elNavBtn)
    showSavedMemes()
    closeMenu()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    document.body.classList.remove('menu-open');
}

function highlightNavBtn(elNavBtn) {
    const elNavBtns = document.querySelectorAll('.main-nav a')
    elNavBtns.forEach(btn => btn.classList.remove('chosen'))
    elNavBtn.classList.add('chosen')
}