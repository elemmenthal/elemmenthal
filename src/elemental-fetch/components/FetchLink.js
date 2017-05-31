import { connect } from 'react-redux'
import { apiCall } from '../actions.js'
import Link from './Link'

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(apiCall(ownProps.call));
  }
});

const FetchLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FetchLink
