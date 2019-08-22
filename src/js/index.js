import { isSmartphone, isTablet, isDesktop } from './tools/utils'
import BurgerMenu from './modules/burgerMenu'
import Overlay from './modules/overlay'
import Scroll from './modules/scroll'
import AnchorNav from './modules/anchorNav'
import ModuleManager from './moduleManager'

if (isSmartphone()) document.body.classList.add('smartphone-device')
if (isTablet()) document.body.classList.add('tablet-device')
if (isDesktop()) document.body.classList.add('desktop-device')

const moduleCatalogSetup = {
  general () {
    return [
      new Overlay(),

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
      new AnchorNav()
    ]
  }
}

const moduleManager = new ModuleManager(moduleCatalogSetup)
moduleManager.init()
