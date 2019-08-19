import { $, pubsub, toggleClass } from '../tools/utils'

export default class Home {
  constructor () {
    this.DOM = {
      home: $('.home')
    }
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    pubsub.suscribe('inActionEnd', () => this.changeHandler())
  }

  changeHandler () {
    const { home } = this.DOM

    toggleClass(home, 'doc', 'controls')
    pubsub.publish('overlayOut')
  }
}
