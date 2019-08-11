/**
 * Detect mobile device
 */
export const isMobileDevice = () => new RegExp(/Mobi/i).test(window.navigator.userAgent)

/**
 * simple querySelector methods
 */
export const $ = (selector) => document.querySelector(selector) // single selector
export const $$ = (selector) => [...document.querySelectorAll(selector)] // array selector
