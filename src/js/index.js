import { isSmartphone, isTablet, isMobileDevice } from './tools/utils'
import BurgerMenu from './modules/burgerMenu'
import Overlay from './modules/overlay'
import Scroll from './modules/scroll'
import AnchorNav from './modules/anchorNav'

// general modules
const overlay = new Overlay()
overlay.init()

const anchorNav = new AnchorNav()
anchorNav.init()

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
