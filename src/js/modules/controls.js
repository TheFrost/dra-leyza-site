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
    pubsub.suscribe('controls:href', this.setHref, this)
    pubsub.suscribe('controls:reset', this.resetControlsState, this)
  }

  triggerControl ({ currentTarget }) {
    // validate anchor navigation, if not stop
    if (currentTarget.href !== '#') return

    const { typeAction } = currentTarget.dataset

    pubsub.publish(`controls:${typeAction}`)
  }

  toggleControls (areActive) {
    const { content } = this.DOM

    content.classList.toggle('controls', areActive)
  }

  setHref ({ href, controlInstance }) {
    const { controls } = this.DOM

    controls.map(control => {
      const { typeAction } = control.dataset
      if (typeAction === controlInstance) {
        control.href = href
      }
    })
  }

  resetControlsState () {
    const { controls } = this.DOM

    controls.map(control => (control.href = '#'))

    this.toggleControls(false)
  }
}
