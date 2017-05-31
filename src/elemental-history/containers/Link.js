import { connect } from 'react-redux'

import HLink from '../components/HLink'

import { navigate } from '../actions.js'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(navigate(ownProps.href, ownProps.method || 'PUSH'))
  }
});

const Link = connect(
  mapStateToProps,
  mapDispatchToProps
)(HLink);

export default Link
