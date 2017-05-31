import { connect } from 'react-redux'
import { apiCall } from '../elemental-fetch'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
	active: false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(apiCall('postProject'));
  }
});

const LanguageLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default LanguageLink
