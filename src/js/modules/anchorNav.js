import { $, $$, pubsub } from '../tools/utils'

export default class AnchorNav {
  constructor () {
    this.DOM = {
      content: $('.content'),
      from: null,
      to: null
    }

    this.bindEvents()
  }

  init () {
    this.setupSelectors()
    this.dynamicBindEvents('add')
  }

  setupSelectors () {
    this.DOM.triggers = $$('.anchor-trigger')
  }

  bindEvents () {
    pubsub.suscribe('inActionEnd', this.triggerChangeView, this)
  }

  dynamicBindEvents (action) {
    const { triggers } = this.DOM

    triggers.forEach(trigger => {
      trigger[`${action}EventListener`]('click', (e) => this.triggerHandler(e))
    })
  }

  triggerHandler ({ currentTarget }) {
    const { from, to, direction, controls } = currentTarget.dataset

    this.DOM.from = $(from)
    this.DOM.to = $(to)

    this.uiControlsActive = !!controls

    pubsub.publish('overlayIn', direction)
  }

  triggerChangeView () {
    const { from, to, content } = this.DOM

    from.style.display = 'none'
    to.style.display = 'block'

    content.classList.toggle('controls', this.uiControlsActive)

    pubsub.publish('psUpdate')
    pubsub.publish('overlayOut')
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
