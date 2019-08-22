import { pubsub } from '../tools/utils'

export default class Home {
  init () {
    this.bindEvents()
  }

  bindEvents () {
    pubsub.suscribe('controls:back', this.backTrigger, this)
  }

  backTrigger () {
    pubsub.publish('manualNav', {
      from: '#home-doc',
      to: '#home-intro',
      direction: 'left'
    })
  }
}
