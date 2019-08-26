import { pubsub } from '../tools/utils'

export default class Home {
  static instance = null

  constructor () {
    // singleton pattern
    if (Home.instance !== null) {
      return Home.instance
    }
    Home.instance = this

    this.controlsSettings = {
      doc: {
        area: 'bottom',
        controls: ['back']
      }
    }

    this.bindEvents()
  }

  bindEvents () {
    pubsub.suscribe('controls:back', this.backTrigger, this)
    pubsub.suscribe('anchor:controls', this.setUpControls, this)
  }

  backTrigger () {
    pubsub.publish('manualNav', {
      from: '#home-doc',
      to: '#home-intro',
      direction: 'left'
    })
  }

  setUpControls (scope) {
    pubsub.publish('controls:setup', this.controlsSettings[scope])
  }
}
