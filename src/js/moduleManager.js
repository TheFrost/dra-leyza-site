import { $, pubsub } from './tools/utils'

export default class ModuleManager {
  constructor (moduleCatalogSetup) {
    this.moduleCatalogSetup = moduleCatalogSetup
    this.currentScopeModules = []
    this.DOM = {
      content: $('.content')
    }
  }

  init () {
    this.setupModules('general') // force general setup
    this.setupModules() // setup scope view modules
    this.bindEvents()
  }

  bindEvents () {
    pubsub.suscribe('manager:setup', this.setupModules, this)
    pubsub.suscribe('manager:dispose', this.disposeModules, this)
  }

  setupModules (forcedScope) {
    const { moduleScope } = this.DOM.content.dataset
    const scope = forcedScope || moduleScope
    const scopeSetupFn = this.moduleCatalogSetup[scope]
    this.currentScopeModules = []

    if (scopeSetupFn === undefined) return // if not scope defined stop method

    this.currentScopeModules = scopeSetupFn()
    this.currentScopeModules.map(module => module.init())
  }

  disposeModules () {
    this.currentScopeModules.map(module => module.dispose ? module.dispose() : null)
  }
}
