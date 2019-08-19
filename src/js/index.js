import { isSmartphone, isTablet } from './tools/utils'
import BurgerMenu from './modules/burgerMenu'
import Overlay from './modules/overlay'
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
} else { // only desktop
  // notify DOM
  document.body.classList.add('desktop-device')
}

// only Tablet
if (isTablet()) {
  // notify DOM
  document.body.classList.add('tablet-device')
}
