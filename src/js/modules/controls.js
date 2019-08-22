import { $$, pubsub } from '../tools/utils'

export default class Controls {
  constructor () {
    this.DOM = {
      controls: $$('.control-trigger')
    }
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    const { controls } = this.DOM

    controls.map(control => control.addEventListener('click', (e) => this.triggerControl(e)))
  }

  triggerControl ({ currentTarget }) {
    const { typeAction } = currentTarget.dataset
    console.log(typeAction)

    pubsub.publish(`controls:${typeAction}`)
  }
}
