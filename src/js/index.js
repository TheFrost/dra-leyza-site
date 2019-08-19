import { isSmartphone, isTablet, isMobileDevice } from './tools/utils'
import BurgerMenu from './modules/burgerMenu'
import Overlay from './modules/overlay'
import Scroll from './modules/scroll'
import Home from './modules/home'

// general modules
const overlay = new Overlay()
overlay.init()

const home = new Home()
home.init()

if (isSmartphone()) { // only smartphone
  // notify DOM
  document.body.classList.add('smartphone-device')

  // modules
  const burger = new BurgerMenu()
  burger.init()
}

// only Tablet
if (isTablet()) {
  // notify DOM
  document.body.classList.add('tablet-device')
}

// only desktop
if (!isMobileDevice()) {
  // notify DOM
  document.body.classList.add('desktop-device')

  const scroll = new Scroll()
  scroll.init()
}
