

export { default as middleware, setConfig as init } from './middleware.js'
export { apiRequest, apiCall } from './actions.js'

import FetchLink from './components/FetchLink.js'
export const components = { FetchLink: FetchLink };
