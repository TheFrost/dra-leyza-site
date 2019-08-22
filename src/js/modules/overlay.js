import TweenMax from 'gsap'
import { $, pubsub } from '../tools/utils'

export default class Overlay {
  constructor () {
    this.DOM = {
      overlay: $('.content__overlay'),
      content: $('.content__scroll')
    }

    this.directionValues = {
      right: {
        from: '-100%',
        to: '100%'
      },
      left: {
        from: '100%',
        to: '-100%'
      }
    }
  }

  init () {
    this.setupOverlay()
    this.bindEvents()
  }

  setupOverlay () {
    const { overlay } = this.DOM
    TweenMax.set(overlay, { x: '-100%' })
  }

  bindEvents () {
    pubsub.suscribe('overlayIn', (direction) => this.controlHandler('in', direction))
    pubsub.suscribe('overlayOut', () => this.controlHandler('out'))
  }

  controlHandler (action, direction) {
    const { overlay, content } = this.DOM

    if (action === 'in') {
      this.currentDirection = direction

      TweenMax.set(overlay, {
        x: this.directionValues[this.currentDirection].from
      })
    }

    TweenMax.to(overlay, 0.6, {
      x: action === 'in' ? '0%' : this.directionValues[this.currentDirection].to,
      ease: 'Expo.easeInOut'
    }).eventCallback('onComplete', () => {
      if (action === 'in') content.scrollTop = 0
      pubsub.publish(`${action}ActionEnd`)
    })
  }
}
