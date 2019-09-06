import { $$ } from '../tools/utils'
import { debounce } from 'lodash'

export default class Grid {
  static instance = null

  constructor () {
    // singleton pattern
    if (Grid.instance !== null) {
      return Grid.instance
    }
    Grid.instance = this

    this.DOM = {
      gridLabels: $$('.grid__label'),
      gridLabelsInner: $$('.grid__label-inner')
    }
  }

  init () {
    this.setLabelUniformSize()
    this.bindEvents()
  }

  bindEvents () {
    window.addEventListener('resize', debounce(
      () => this.setLabelUniformSize(), 100
    ))
  }

  setLabelUniformSize () {
    const { gridLabels, gridLabelsInner } = this.DOM
    const maxSize = gridLabelsInner
      .map(label => label.offsetHeight)
      .sort((a, b) => b - a)[0]

    gridLabels.map(label => (label.style.height = `${maxSize + 2}px`))
  }
}
