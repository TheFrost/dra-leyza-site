import { $, pubsub } from '../tools/utils'
import { TweenMax, TimelineMax } from 'gsap'

export default class EntryMob {
  constructor () {
    this.DOM = {
      header: $('.header'),
      headerInner: $('.header__inner'),
      contentLayout: $('.content__layout'),
      footer: $('.footer'),
      footerInner: $('.footer__inner'),
      nav: $('.nav')
    }
  }

  init () {
    this.setElements()
    this.bindEvents()
  }

  setElements () {
    const {
      headerInner,
      contentLayout,
      footerInner,
      nav,
      footer
    } = this.DOM

    TweenMax.set([nav, footer], { x: '-100%' })
    TweenMax.set([headerInner, footerInner], { y: '100%' })
    TweenMax.set(contentLayout, { opacity: 0 })
  }

  bindEvents () {
    pubsub.suscribe('entry:trigger', this.trigger, this)
  }

  trigger () {
    const {
      headerInner,
      contentLayout,
      footerInner,
      nav,
      footer
    } = this.DOM

    const tl = new TimelineMax()
    tl
      .staggerTo([nav, footer], 0.5, {
        x: '0%',
        ease: 'Expo.easeInOut'
      }, 0.1)
      .staggerTo([headerInner, footerInner], 0.8, {
        y: '0%',
        ease: 'Expo.easeInOut'
      }, 0.05)
      .eventCallback('onComplete', () => {
        pubsub.publish('overlayIn', 'right')
        pubsub.suscribe('inActionEnd', () => {
          TweenMax.set(contentLayout, { opacity: 1 })
          pubsub.publish('overlayOut')
        }, null, true)
      })
  }
}
