import { debounce } from 'lodash'
import { isSmartphone, isTablet, isDesktop } from './tools/utils'
import HighwayNav from './highway/highwayNav'
import BurgerMenu from './modules/burgerMenu'
import Home from './viewsModules/home'
import Services from './viewsModules/services'
import Contact from './viewsModules/contact'
import Overlay from './modules/overlay'
import Scroll from './modules/scroll'
import AnchorNav from './modules/anchorNav'
import ModuleManager from './moduleManager'
import Controls from './modules/controls'
import Grid from './modules/grid'
import Textarea from './modules/textarea'
import Splash from './modules/splash'
import EntryDesk from './modules/entry.desk'
import EntryMob from './modules/entry.mob'
import GridHover from './modules/grid.hover'

window.addEventListener('load', () => {
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
      new Splash(),
      new HighwayNav(),
      new Overlay(),
      new Controls(),

      // only smartphone
      ...isSmartphone()
        ? [
          new EntryMob(),
          new BurgerMenu()
        ] : [],

      // only tablet and desktop
      ...!isSmartphone()
        ? [
          new EntryDesk()
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
      new Grid(),

      // only desktop
      ...isDesktop()
        ? [
          new GridHover()
        ] : []
    ],

    contact: [
      new Contact(),

      // only desktop
      ...isDesktop()
        ? [
          new Textarea()
        ] : []
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
})
