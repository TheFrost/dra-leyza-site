import { $$ } from '../tools/utils'
import { TimelineMax } from 'gsap'

export default class GridHover {
  static instance = null

  constructor () {
    // singleton pattern
    if (GridHover.instance !== null) {
      return GridHover.instance
    }
    GridHover.instance = this

    this.enterHandler = this.enterHandler.bind(this)
    this.leaveHandler = this.leaveHandler.bind(this)
  }

  init () {
    this.setupSelectors()
    this.dynamicBindEvents('add')
  }

  setupSelectors () {
    this.DOM = {
      items: $$('.grid__item'),
      floatLabels: $$('.grid__label.floated')
    }
  }

  dynamicBindEvents (action) {
    const { items } = this.DOM

    items.map(item => item[`${action}EventListener`](
      'mouseenter',
      this.enterHandler
    ))

    items.map(item => item[`${action}EventListener`](
      'mouseleave',
      this.leaveHandler
    ))
  }

  enterHandler ({ currentTarget }) { this.triggerTween(currentTarget, true) }

  leaveHandler ({ currentTarget }) { this.triggerTween(currentTarget, false) }

  triggerTween (currentTarget, isIn) {
    const label = currentTarget.querySelector('.grid__label:not(.floated)')
    const floatLabel = currentTarget.querySelector('.grid__label.floated')
    const svg = currentTarget.querySelector('svg')

    const tl = new TimelineMax()
    tl
      .to(floatLabel, 0.5, {
        y: isIn ? '0%' : '-100%',
        ease: 'Expo.easeInOut'
      })
      .to(svg, 0.5, {
        y: isIn ? label.offsetHeight : 0,
        ease: 'Expo.easeInOut'
      }, '-=0.5')
      .to(label, 0.5, {
        y: isIn ? '100%' : '0%',
        ease: 'Expo.easeInOut'
      }, '-=0.5')
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
