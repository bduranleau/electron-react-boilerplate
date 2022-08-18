const info = document.getElementById('info')
info.innerText = `Chrome (v${versions.chrome()}), Node.js(${versions.node()}) Electron.js(${versions.electron()})`

const func = async() => {
    const res = await window.versions.ping()
    console.log(res)
}

func()