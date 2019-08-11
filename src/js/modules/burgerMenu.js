import { TimelineMax } from 'gsap'
import { $, $$ } from '../tools/utils'

export default class BurguerMenu {
  constructor () {
    this.DOM = {
      burger: $('.header__burger'),
      lines: $$('.header__burger .burger__line')
    }
  }

  init () {
    this.setupTimeline()
    this.bindEvents()
  }

  setupTimeline () {
    const { lines } = this.DOM

    this.timeline = new TimelineMax()
    this.timeline
      .to(lines[0], 0.17, {
        y: 10
      })
      .to(lines[2], 0.17, {
        y: -10
      }, '-= 0.17')
      .to(lines[0], 0.17, {
        rotation: 45,
        ease: 'Power4.easeInOut'
      })
      .to([lines[1], lines[2]], 0.17, {
        rotation: -45,
        ease: 'Power4.easeInOut'
      }, '-= 0.17')
      .pause()
  }

  bindEvents () {
    const { burger } = this.DOM

    burger.addEventListener('click', (e) => {
      e.preventDefault()
      this.clickHandler()
    })
  }

  clickHandler () {
    const { burger } = this.DOM

    burger.classList.toggle('active')

    const isActive = burger.classList.contains('active')
    this.timeline[isActive ? 'play' : 'reverse']()
  }
}
