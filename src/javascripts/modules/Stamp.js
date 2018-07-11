import * as PIXI from 'pixi.js'

export default class Stamp extends PIXI.Container {
  constructor(opts={}) {
    super()

    this.target = null
    this.sprite = new PIXI.Sprite.fromImage(opts.image)
    this.sprite.interactive = true
    this.sprite.x = 0
    this.sprite.y = 0
    this.sprite.width = 100
    this.sprite.height = 100
    this.sprite.anchor.set(0.5, 0.5)
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
