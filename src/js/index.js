import { debounce } from 'lodash'
import { isSmartphone, isTablet, isDesktop } from './tools/utils'
import HighwayNav from './highway/highwayNav'
import BurgerMenu from './modules/burgerMenu'
import Home from './viewsModules/home'
import Services from './viewsModules/services'
import Overlay from './modules/overlay'
import Scroll from './modules/scroll'
import AnchorNav from './modules/anchorNav'
import ModuleManager from './moduleManager'
import Controls from './modules/controls'
import Grid from './modules/grid'
import Textarea from './modules/textarea'

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
  general: [
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
  ],

  home: [
    new Home(),
    new AnchorNav()
  ],

  services: [
    new Services(),
    new Grid()
  ]
}

const moduleManager = new ModuleManager(moduleCatalogSetup)
moduleManager.init()

/**
 * Bind events global control
 */

window.onresize = debounce(() => {
  moduleManager.resizeHandler()
}, 100)
