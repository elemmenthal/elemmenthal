import React from 'react'


import InternalLink from '../elemental-router2/containers/InternalLink.js'
import { Translate } from '../elemental-i18n'

const NavBar = () => (
    <div>

        <InternalLink route="kitchenSink"> <Translate value="app.navbar.kitchenSink" /> </InternalLink>
        <InternalLink route="dev"> <Translate value="app.navbar.devPage" /> </InternalLink>
    </div>
)

export default NavBar

