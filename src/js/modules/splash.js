import { TimelineMax } from 'gsap'
import { $, $$, pubsub } from '../tools/utils'

export default class Splash {
  constructor () {
    this.DOM = {
      splash: $('.splash'),
      svg: $('.splash__svg'),
      paths: $$('.splash__svg *')
    }
  }

  init () {
    const { splash, svg } = this.DOM

    const tl = new TimelineMax()
    tl
      .set(svg, { scale: 0.98 })
      .to(svg, 1, {
        opacity: 1,
        scale: 1,
        ease: 'Expo.easeInOut'
      })
      .to(splash, 1, {
        autoAlpha: 0,
        scale: 0.98,
        delay: 0.1,
        ease: 'Expo.easeInOut'
      })
      .eventCallback('onComplete', () => {
        pubsub.publish('entry:trigger')
      })
  }
}
