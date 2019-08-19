import PerfectScrollbar from 'perfect-scrollbar'
import { debounce } from 'lodash'
import { pubsub } from '../tools/utils'

export default class Scroll {
  constructor () {
    this.ps = new PerfectScrollbar('.content__scroll')
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    pubsub.suscribe('psUpdate', () => this.ps.update())

    window.addEventListener('resize', debounce(
      () => this.ps.update(), 100
    ))
  }
}
