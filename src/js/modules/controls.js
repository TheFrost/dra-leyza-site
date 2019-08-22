import { $, $$, pubsub } from '../tools/utils'

export default class Controls {
  constructor () {
    this.DOM = {
      content: $('.content'),
      controls: $$('.control-trigger')
    }
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    const { controls } = this.DOM

    controls.map(control => control.addEventListener('click', (e) => this.triggerControl(e)))

    pubsub.suscribe('controls:toggle', this.toggleControls, this)
  }

  triggerControl ({ currentTarget }) {
    const { typeAction } = currentTarget.dataset

    pubsub.publish(`controls:${typeAction}`)
  }

  toggleControls (areActive) {
    const { content } = this.DOM

    content.classList.toggle('controls', areActive)
  }
}
