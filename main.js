const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')                // allow node to access machine paths
const isDev = require('electron-is-dev')    // utility to check for dev environment
require('dotenv').config()                  // utility for handling .env config files
require('colors')                           // console colors

// -- app:              control the application lifecycle
// -- BrowserWindow:    create and manage app windows
// -- ipcMain:          interprocess communication handler

const PORT = process.env.PORT || 3000                                   // read in port or 3000
const NODE_ENV = (process.env.NODE_ENV || "development").toUpperCase()  // read in environment
const APP_NAME = (process.env.APP_NAME || "erb").toUpperCase()          // read in app name

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')
}

// create BrowserWindow after `ready` event is fired
app.whenReady().then(() => {
    createWindow()

    // listen for `activate` event and call createWindow()
    // if no open BrowserWindows
    app.on('activate', () => {
        if (0 === BrowserWindow.getAllWindows().length) {
            createWindow()
        }
    })
})

// exit app on `window-all-closed` event (non-Mac)
app.on('window-all-closed', () => {
    if ('darwin' !== process.platform) {
        app.quit()
    }
})

console.log(`[ %s ] started in %s mode`, APP_NAME.green.bold, NODE_ENV === "DEVELOPMENT" ? NODE_ENV.cyan : NODE_ENV.red)