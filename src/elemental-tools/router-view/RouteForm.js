import React from 'react'

import Button from '../components/Button.js'
import TextInput from '../components/TextInput.js'
import RouteNameInput from './RouteNameInput.js'
import RoutePathInput from './RoutePathInput.js'
import AddRouteButton from './AddRouteButton.js'

const RouteForm = ( ) => (
  <div>

	  <div className="route-form_form">
		  <div>
				<label>ROUTE NAME</label>
			  <RouteNameInput />
		  </div>
		  <div>
			  <label>ROUTE PATH</label>
			  <RoutePathInput />
		  </div>
		  <div>
			  <AddRouteButton />
		  </div>
	  </div>


  </div>
)

export default RouteForm
