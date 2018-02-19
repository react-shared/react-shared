import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { omit } from './Utils'
import StyleSheet from './StyleSheet'
import View from './View'

class TextInput extends Component {

  state = {
    isFocused: false
  }

  static defaultProps = {
    type: 'normal',
    withAffix: false,
    enableFocus: true,
    affix: ''
  }

  static propTypes = {
    enableFocus: PropTypes.bool,
    focusStyle: PropTypes.any,
    affix: PropTypes.string,
    withAffix: PropTypes.bool,
    type: PropTypes.string,
    dispatch: PropTypes.func
  }

  renderWithAffix = (props) => {
    return (
      <View style={[styles.inputWrapper, styles.inputWrapper_withAffix]}>
        <View>{this.props.affix}</View>
        <input type="text" {...props.inputProps} />
      </View>
    )
  }

  _onfocus = (e) => {
    this.setState({ isFocused: true })
    this.props.onFocus && this.props.onFocus(e)
  }

  _onblur = (e) => {
    this.setState({ isFocused: false })
    this.props.onBlur && this.props.onBlur(e)
  }

  render() {
    const { isFocused } = this.state
    const { children, enableFocus, type, withAffix, style, focusStyle } = this.props
    const inputProps = omit(this.props, Object.keys(TextInput.propTypes).concat([]))

    inputProps.style = StyleSheet.assign([styles.input, style, isFocused && focusStyle])

    if (withAffix) {
      return this.renderWithAffix({ inputProps })
    }

    if (enableFocus) {
      Object.assign(inputProps, {
        onFocus: this._onfocus,
        onBlur: this._onblur
      })
    }

    return (
      <input
        {...inputProps}
      />
    )
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
  },
  inputWrapper_withAffix: {
    position: 'relative',
    background: '#f3f6f8',
    border: '1px solid #c8d7e1',
    color: '#4f748e',
    padding: '8px 14px',
    whiteSpace: 'nowrap',
    flex: 1,
    fontSize: 16,
    lineHeight: 1.5,
  },
  input: {
    minHeight: 32,
    padding: 4,
    boxSizing: 'border-box',
    outline: 'none',
    fontSize: 14,
  }
})

export default TextInput