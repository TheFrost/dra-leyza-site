import { $, $$, pubsub } from '../tools/utils'

export default class AnchorNav {
  static instance = null

  static triggerHandler = ({ currentTarget }) => {
    this.instance.setupNav(currentTarget.dataset)
  }

  constructor () {
    // singleton pattern
    if (AnchorNav.instance !== null) {
      return AnchorNav.instance
    }

    this.DOM = {
      from: null,
      to: null
    }

    this.isAnchorNavInAction = false

    this.bindEvents()

    AnchorNav.instance = this
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
    pubsub.suscribe('manualNav', this.setupNav, this)
  }

  dynamicBindEvents (action) {
    const { triggers } = this.DOM

    triggers.forEach(trigger => {
      trigger[`${action}EventListener`]('click', AnchorNav.triggerHandler)
    })
  }

  setupNav ({ from, to, direction, controls }) {
    this.DOM.from = $(from)
    this.DOM.to = $(to)

    this.uiControlsActive = !!controls

    pubsub.publish('overlayIn', direction)

    this.isAnchorNavInAction = true
  }

  triggerChangeView () {
    if (!this.isAnchorNavInAction) return

    const { from, to } = this.DOM

    from.style.display = 'none'
    to.style.display = 'block'

    pubsub.publish('controls:toggle', this.uiControlsActive)
    pubsub.publish('psUpdate')
    pubsub.publish('overlayOut')

    this.isAnchorNavInAction = false
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
