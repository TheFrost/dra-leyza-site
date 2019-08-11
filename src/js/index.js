import { isMobileDevice } from './tools/utils'
import BurgerMenu from './modules/burgerMenu'

if (isMobileDevice()) {
  // only mobile modules

  const burger = new BurgerMenu()
  burger.init()

} else {
  // only desktop modules
}
