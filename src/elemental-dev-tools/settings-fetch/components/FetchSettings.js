import React from 'react'

import TextInput from '../../../elemental-bindable/widgets/TextInput.js'


const FetchSettings = () => (
	<div>
		<h1>Fetch settings</h1>
		<TextInput bind="$edt.form.fetch.mixinName" />
	</div>
);

export default FetchSettings

