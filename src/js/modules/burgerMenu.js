import { TimelineMax, TweenMax } from 'gsap'
import { $, $$ } from '../tools/utils'

export default class BurgerMenu {
  constructor () {
    this.DOM = {
      burger: $('.header__burger'),
      lines: $$('.header__burger .burger__line'),
      nav: $('.nav'),
      navLinks: $$('.nav__item a')
    }
  }

  init () {
    this.setupBurger()
    this.setupNav()
    this.bindEvents()
  }

  setupBurger () {
    const { lines } = this.DOM

    this.burgerTimeline = new TimelineMax()
    this.burgerTimeline
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

  setupNav () {
    const { nav, navLinks } = this.DOM

    TweenMax.set(nav, {
      y: '-100%'
    })
    TweenMax.set(navLinks, {
      opacity: 0,
      y: 100
    })

    this.navTimeline = new TimelineMax()
    this.navTimeline
      .to(nav, 1, {
        y: '0%',
        ease: 'Expo.easeInOut'
      })
      .staggerTo(navLinks, 1, {
        y: 0,
        opacity: 1,
        ease: 'Expo.easeInOut'
      }, 0.05, '-=0.8')
      .pause()
  }

  triggerTween (action) {
    this.burgerTimeline[action]()
    this.navTimeline[action]()
  }

  bindEvents () {
    const { burger, navLinks } = this.DOM

    burger.addEventListener('click', (e) => {
      e.preventDefault()
      this.clickHandler()
    })

    navLinks.map(link => {
      link.addEventListener('click', () => this.clickHandler())
    })
  }

  clickHandler () {
    const { burger } = this.DOM

    burger.classList.toggle('active')

    const isActive = burger.classList.contains('active')
    const action = isActive ? 'play' : 'reverse'

    this.triggerTween(action)
  }
}
