import PerfectScrollbar from 'perfect-scrollbar'
import { pubsub } from '../tools/utils'

export default class Scroll {
  constructor () {
    this.psBase = new PerfectScrollbar('.content__scroll')
    this.psViewInstances = []
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    pubsub.suscribe('ps:update', () => this.update())
    pubsub.suscribe('ps:setup', container => this.setup(container))
    pubsub.suscribe('ps:destroy', () => this.destroy())
  }

  update () {
    this.psViewInstances.map(instance => {
      instance.update()
    })
    this.psBase.update()
  }

  setup (container) {
    this.psViewInstances.push(
      new PerfectScrollbar(container)
    )
  }

  destroy () {
    this.psViewInstances.map(instance => {
      instance.destroy()
    })

    this.instance = []
  }

  resize () {
    this.update()
  }
}
