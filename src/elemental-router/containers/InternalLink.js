import { connect } from 'react-redux'

import HLink from '../components/HLink'
import { navigateToRoute } from '../actions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(navigateToRoute(ownProps.route, ownProps.params, ownProps.searchParams))
  }
});

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(HLink);

export default FilterLink
