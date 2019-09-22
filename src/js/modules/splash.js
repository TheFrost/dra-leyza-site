import '../lib/DrawSVGPlugin'
import { TimelineMax } from 'gsap'
import { $, $$ } from '../tools/utils'

export default class Splash {
  constructor () {
    this.DOM = {
      splash: $('.splash'),
      svg: $('.splash__svg'),
      paths: $$('.splash__svg *')
    }
  }

  init () {
    const { splash, svg, paths } = this.DOM

    const tl = new TimelineMax()
    tl
      .set(svg, { scale: 0.98 })
      .set(paths, { drawSVG: '0%' })
      .to(svg, 1, {
        opacity: 1,
        scale: 1,
        ease: 'Expo.easeInOut'
      })
      .staggerTo(paths, 1, {
        drawSVG: '100%'
      }, 0.05)
      .to(splash, 1, {
        autoAlpha: 0,
        scale: 0.98,
        delay: 1,
        ease: 'Expo.easeInOut'
      })
  }
}
