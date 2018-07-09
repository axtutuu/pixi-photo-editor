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
