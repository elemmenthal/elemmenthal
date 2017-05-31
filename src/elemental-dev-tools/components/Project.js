import React, { PropTypes } from 'react'

const Project = ({ name }) => (
	<span>
		{ name }
	</span>
);

Project.propTypes = {
	name: PropTypes.string.isRequired
};

export default Project
