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

    this.setLabelUniformSizeDebounced = debounce(
      () => this.setLabelUniformSize(), 100
    )
  }

  init () {
    this.setupSelectors()
    this.setLabelUniformSize()
    this.dynamicBindEvents('add')
  }

  setupSelectors () {
    this.DOM = {
      gridLabels: $$('.grid__label'),
      gridLabelsInner: $$('.grid__label-inner')
    }
  }

  dynamicBindEvents (action) {
    window[`${action}EventListener`](
      'resize',
      this.setLabelUniformSizeDebounced
    )
  }

  setLabelUniformSize () {
    const { gridLabels, gridLabelsInner } = this.DOM
    const maxSize = gridLabelsInner
      .map(label => label.offsetHeight)
      .sort((a, b) => b - a)[0]

    gridLabels.map(label => (label.style.height = `${maxSize + 2}px`))
  }

  dispose () {
    this.dynamicBindEvents('remove')
  }
}
