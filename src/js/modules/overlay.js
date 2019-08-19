import TweenMax from 'gsap'
import { $, $$, pubsub } from '../tools/utils'

export default class Overlay {
  constructor () {
    this.DOM = {
      overlay: $('.content__overlay'),
      triggers: $$('.overlay-trigger'),
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
    this.dynamicBindEvents('add')
  }

  setupOverlay () {
    const { overlay } = this.DOM
    TweenMax.set(overlay, { x: '-100%' })
  }

  bindEvents () {
    pubsub.suscribe('overlayIn', () => this.controlHandler('in'))
    pubsub.suscribe('overlayOut', () => this.controlHandler('out'))
  }

  dynamicBindEvents (mode) {
    const { triggers } = this.DOM
    triggers.map(trigger => {
      trigger[`${mode}EventListener`]('click', (e) => this.triggerHandler(e))
    })
  }

  triggerHandler (e) {
    e.preventDefault()

    const { direction } = e.currentTarget.dataset
    this.currentDirection = direction
    this.controlHandler(
      'in',
      direction
    )
  }

  controlHandler (action) {
    const { overlay, content } = this.DOM

    if (action === 'in') {
      TweenMax.set(overlay, {
        x: this.directionValues[this.currentDirection].from
      })
    }

    TweenMax.to(overlay, 1, {
      x: action === 'in' ? '0%' : this.directionValues[this.currentDirection].to,
      ease: 'Expo.easeInOut'
    }).eventCallback('onComplete', () => {
      if (action === 'in') content.scrollTop = 0
      pubsub.publish(`${action}ActionEnd`)
    })
  }
}
