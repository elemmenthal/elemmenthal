import { connect } from 'react-redux'

import HLink from '../components/HLink'
import { navigateToRoute, navigateHref } from '../actions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    if (ownProps.route) {
      dispatch(navigateToRoute(ownProps.route, ownProps.params, ownProps.searchParams))
    } else if (ownProps.href) {
      dispatch(navigateHref(ownProps.href, ownProps.method || 'PUSH'))
    }
  }
});

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(HLink);

export default FilterLink
