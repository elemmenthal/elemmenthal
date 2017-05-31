import { connect } from 'react-redux'
import { setLanguage } from '../elemental-i18n'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
	active: false
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setLanguage(ownProps.code))
  }
})

const LanguageLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default LanguageLink
