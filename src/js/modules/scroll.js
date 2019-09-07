import PerfectScrollbar from 'perfect-scrollbar'
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

  resize () {
    this.update()
  }
}
