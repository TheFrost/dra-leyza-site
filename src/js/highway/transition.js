import Highway from '@dogstudio/highway'
import { pubsub } from '../tools/utils'

export default class Transition extends Highway.Transition {
  in ({ from, done }) {
    from.remove()

    pubsub.publish('controls:reset')
    pubsub.publish('manager:setup')
    pubsub.publish('psUpdate')
    pubsub.publish('overlayOut')

    done()
  }

  out ({ done }) {
    pubsub.publish('overlayIn', 'right')
    pubsub.publish('manager:dispose')
    pubsub.suscribe('inActionEnd', done, null, true)
  }
}
