'use strict'

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}