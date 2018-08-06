import * as PIXI from 'pixi.js'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from './Constants'

export default class Stamp extends PIXI.Container {
  constructor(opts={}) {
    super()

    this.target = null
    this.sprite = new PIXI.Sprite.fromImage(opts.image)
    this.sprite.interactive = true
    this.sprite.buttonMode = true
    this.sprite.width = 100
    this.sprite.height = 100
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.x = CANVAS_WIDTH / 2
    this.sprite.y = CANVAS_HEIGHT /2
    this.addChild(this.sprite)

    this.sprite
      .on('pointerdown',      this.onDragStart.bind(this))
      .on('pointermove',      this.onDragMove.bind(this))
      .on('pointerup',        this.onDragEnd.bind(this))
      .on('pointerupoutside', this.onDragEnd.bind(this))
  }

  onDragStart(e) {
    this.target = e.target
  }

  onDragMove(e) {
    if (!this.target) return

    const pos = e.data.getLocalPosition(this.target.parent)
    this.target.x = pos.x
    this.target.y = pos.y
  }

  onDragEnd(e) {
    this.target = null
  }
}
