import Highway from '@dogstudio/highway'
import { $$ } from '../tools/utils'
import Transition from './transition'

export default class HighwayNav {
  constructor () {
    this.DOM = {
      navLinks: $$('.nav__item .link')
    }
  }

  init () {
    this.setupHighway()
    this.updateNavLinks(window)
    this.bindEvents()
  }

  setupHighway () {
    this.H = new Highway.Core({
      transitions: {
        default: Transition
      }
    })
  }

  bindEvents () {
    this.H.on('NAVIGATE_IN', data => this.updateNavLinks(data))
  }

  updateNavLinks ({ location }) {
    const { navLinks } = this.DOM

    navLinks.map(link => {
      link.classList.remove('active')

      if (link.href === location.href) {
        link.classList.add('active')
      }
    })
  }
}
