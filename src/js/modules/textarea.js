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

    this.bindEvents()
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

  bindEvents () {
    pubsub.suscribe('textarea:reset', this.resetInstance, this)
  }

  dynamicBindEvents (action) {
    const { textareas } = this.DOM

    textareas.map(textarea => {
      textarea[`${action}EventListener`]('keyup', this.keyupHandler)
    })
  }

  keyupHandler ({ currentTarget }) { this.changeHandler(currentTarget) }

  /**
   * This method is based on the example of Yair Even Or from codepen
   * demo: https://codepen.io/vsync/pen/frudD?editors=0010
   */
  changeHandler (currentTarget) {
    const minRows = currentTarget.getAttribute('data-min-rows') | 0
    currentTarget.rows = minRows

    const { scrollHeight, baseScrollHeight } = currentTarget
    currentTarget.rows = minRows + Math.ceil((scrollHeight - baseScrollHeight) / 16)
    pubsub.publish('ps:update')
  }

  resetInstance (target) {
    target.parentNode.scrollTop = 0
    this.changeHandler(target)
  }

  setContainersSizes () {
    const { containers } = this.DOM

    containers.map(container => {
      container.style.height = `${container.offsetHeight + 1}px`
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
