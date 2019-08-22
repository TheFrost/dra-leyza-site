import { isSmartphone, isTablet, isDesktop } from './tools/utils'
import HighwayNav from './highway/highwayNav'
import BurgerMenu from './modules/burgerMenu'
import Overlay from './modules/overlay'
import Scroll from './modules/scroll'
import AnchorNav from './modules/anchorNav'
import ModuleManager from './moduleManager'
import Home from './modules/home'
import Controls from './modules/controls'

/**
 * Notify DOM device type
 */
if (isSmartphone()) document.body.classList.add('smartphone-device')
if (isTablet()) document.body.classList.add('tablet-device')
if (isDesktop()) document.body.classList.add('desktop-device')

/**
 * Module manager setup
 */
const moduleCatalogSetup = {
  general () {
    return [
      new HighwayNav(),
      new Overlay(),
      new Controls(),

      // only smartphone
      ...isSmartphone()
        ? [
          new BurgerMenu()
        ] : [],

      // only desktop
      ...isDesktop()
        ? [
          new Scroll()
        ] : []
    ]
  },

  home () {
    return [
      new AnchorNav(),
      new Home()
    ]
  }
}

const moduleManager = new ModuleManager(moduleCatalogSetup)
moduleManager.init()
