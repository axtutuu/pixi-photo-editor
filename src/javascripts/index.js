import '../stylesheets/index.scss'
import App from './modules/App'
const canvas = document.querySelector('.js-canvas')
const app = new App({
  canvas
})

const fileInput = document.querySelector('.js-file-input')
fileInput.addEventListener('change', (e) => {
  const url = URL.createObjectURL(e.target.files[0])
  const img = new Image()
  img.src = url
  img.onload = () => {
    app.setImage(url, img.width, img.height)
  }
})

const filter = document.querySelector('.js-filter')
filter.addEventListener('click', (e) => {
  const type = e.target.getAttribute('data-filter')
  if (!type) return

  app.setFilter(type)
})

const stampBtn = document.querySelector('.js-stamp')
stampBtn.addEventListener('click', (e) => {
  const url = e.target.src
  app.addStamp(url)
})

const exportBtn = document.querySelector('.js-export')
exportBtn.addEventListener('click', () => {
  const base64 = app.export()

  if (!base64) return
  const win = window.open()
  win.document.write(`<iframe src="${base64}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
})
