import { $, $$, pubsub } from '../tools/utils'
import { TweenMax, TimelineMax } from 'gsap'

export default class EntryDesk {
  constructor () {
    this.DOM = {
      header: $('.header'),
      headerInner: $('.header__inner'),
      navLinks: $$('.nav__item .link'),
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
      header,
      headerInner,
      navLinks,
      contentLayout,
      footerInner,
      nav,
      footer
    } = this.DOM

    TweenMax.set([header, footer], { x: '-100%' })
    TweenMax.set([headerInner, ...navLinks, footerInner], { y: '100%' })
    TweenMax.set(nav, { y: '-100%', opacity: 0 })
    TweenMax.set(contentLayout, { opacity: 0 })
  }

  bindEvents () {
    pubsub.suscribe('entry:trigger', this.trigger, this)
  }

  trigger () {
    const {
      header,
      headerInner,
      navLinks,
      contentLayout,
      footerInner,
      nav,
      footer
    } = this.DOM

    const tl = new TimelineMax()
    tl
      .to([header, footer], 0.5, {
        x: '0%',
        ease: 'Expo.easeInOut'
      })
      .to(nav, 0.5, {
        y: '0%',
        ease: 'Expo.easeInOut',
        onStart: () => TweenMax.set(nav, { opacity: 1 })
      }, '-=0.28')
      .staggerTo([headerInner, ...navLinks, footerInner], 0.8, {
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
