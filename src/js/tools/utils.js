import PerfectScrollbar from 'perfect-scrollbar'
import Pubsub from './pubsub'

/**
 * Perfect Scrollbar control
 */
export const perfectScrollbar = new PerfectScrollbar('.content__scroll')

/**
 * Toggle class
 */
export const toggleClass = (el, ...classes) => {
  classes.map(className => el.classList.toggle(className))
}

/**
 * Pubsub pattern custom events
 */
export const pubsub = new Pubsub()

/**
 * simple querySelector methods
 */
export const $ = (selector) => document.querySelector(selector) // single selector
export const $$ = (selector) => [...document.querySelectorAll(selector)] // array selector

/**
 * Detect mobile device
 */
export const isMobileDevice = () => new RegExp(/Mobi/i).test(window.navigator.userAgent)

/**
 * Detect smartphone resolutions
 */
export const isSmartphone = () => {
  const { width, height } = window.screen
  return isMobileDevice() && Math.min(width, height) < 768
}

/**
 * Detect tablet resolutions
 */
export const isTablet = () => isMobileDevice() && !isSmartphone()
