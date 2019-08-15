import { isSmartphone } from './tools/utils'
import BurgerMenu from './modules/burgerMenu'

// only smartphone
if (isSmartphone()) {
  const burger = new BurgerMenu()
  burger.init()
}
