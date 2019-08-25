import { $, $$, pubsub } from '../tools/utils'

export default class Controls {
  constructor () {
    this.DOM = {
      controls: $$('.controls__trigger'),
      copyAreas: $$('.controls__copy'),
      controlsAreas: $$('.controls__area')
    }
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    const { controls } = this.DOM

    controls.map(control => control.addEventListener('click', (e) => this.triggerControl(e)))

    pubsub.suscribe('controls:setup', this.setupControls, this)
    pubsub.suscribe('controls:href', this.setHref, this)
    pubsub.suscribe('controls:reset', this.resetControlsState, this)
  }

  triggerControl ({ currentTarget }) {
    // validate anchor navigation, if not stop
    if (currentTarget.getAttribute('href') !== '#') return

    const { typeAction } = currentTarget.dataset

    pubsub.publish(`controls:${typeAction}`)
  }

  setupControls (controlsSettings) {
    if (controlsSettings instanceof Array) {
      controlsSettings.map(settings => this.configControls(settings))
      return
    }

    this.configControls(controlsSettings)
  }

  configControls (controlsSettings) {
    const baseControlSettings = {
      area: null,
      controls: [],
      href: [],
      copy: false
    }

    Object.assign(baseControlSettings, controlsSettings)

    const { area, controls, href, copy } = baseControlSettings
    const currentArea = $(`.controls__area.${area}`)
    const copyArea = currentArea.querySelector('p.controls__copy')

    // show controls area
    currentArea.classList.toggle('active', true)

    // show controls configured
    controls.map((control, index) => {
      const controlTrigger = currentArea
        .querySelector(`.controls__trigger[data-type-action=${control}]`)

      controlTrigger.classList.add('show')
      controlTrigger.href = href[index] || '#'
    })

    // if copy active applyy to copy inside currentArea
    copyArea.classList.toggle('show', !!copy)
    copyArea.textContent = copy || ''
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
    const { controlsAreas, controls, copyAreas } = this.DOM

    controlsAreas.map(area => area.classList.remove('active'))

    controls.map(control => {
      control.href = '#'
      control.classList.remove('show')
    })

    copyAreas.map(copyArea => {
      copyArea.textContent = ''
      copyArea.classList.remove('show')
    })
  }
}
