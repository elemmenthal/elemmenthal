import React, { PropTypes } from 'react'
import Project from './Project.js'

const ProjectList = ({ projects }) => {

	if (!projects) {
		return <ul/>
	}

	return <ul>
		{projects.map(project =>
				<li key={project.id} ><Project
					{...project}
					/></li>
		)}
	</ul>
};

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired)
};

//export default ProjectList

import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
	projects: state.$edt.projects
});

const ProjectListContainer = connect(mapStateToProps, null)(ProjectList);

export default ProjectListContainer