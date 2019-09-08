import { $$, pubsub } from '../tools/utils'

export default class Textarea {
  static instance = null

  constructor () {
    // singleton pattern
    if (Textarea.instance !== null) {
      return Textarea.instance
    }
    Textarea.instance = this

    this.keyupHandler = this.keyupHandler.bind(this)
  }

  init () {
    this.setupSelectors()
    this.setContainersSizes()
    this.setupInputs()
    this.setupScroll()
    this.dynamicBindEvents('add')
  }

  setupSelectors () {
    this.DOM = {
      containers: $$('.textarea'),
      textareas: $$('.textarea textarea')
    }
  }

  dynamicBindEvents (action) {
    const { textareas } = this.DOM

    textareas.map(textarea => {
      textarea[`${action}EventListener`]('keyup', this.keyupHandler)
    })
  }

  /**
   * This method is based on the example of Yair Even Or from codepen
   * demo: https://codepen.io/vsync/pen/frudD?editors=0010
   */
  keyupHandler ({ currentTarget }) {
    const minRows = currentTarget.getAttribute('data-min-rows') | 0
    currentTarget.rows = minRows

    const { scrollHeight, baseScrollHeight } = currentTarget
    currentTarget.rows = minRows + Math.ceil((scrollHeight - baseScrollHeight) / 16)
    pubsub.publish('ps:update')
  }

  setContainersSizes () {
    const { containers } = this.DOM

    containers.map(container => {
      container.style.height = `${container.offsetHeight}px`
    })
  }

  setupInputs () {
    const { textareas } = this.DOM

    textareas.map(textarea => {
      textarea.baseScrollHeight = textarea.scrollHeight
    })
  }

  setupScroll () {
    const { containers } = this.DOM

    containers.map(container => {
      pubsub.publish('ps:setup', container)
    })
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
