import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

export default class PaperInput extends React.Component {
  constructor(props) {
    super(props);
    this._value = props.value || props.defaultValue || '';
    this.state = {
      touched: false,
      dirty: !!this._value,
      focused: false,
    };
    this.handleBlurCapture = this.handleBlurCapture.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this._value = nextProps._value;
    }
    this.setState({
      dirty: !!this._value,
    });
  }

  componentDidUpdate() {
    let input = findDOMNode(this.refs.input);
    if (this.shouldDisplayError()) {
      input.setCustomValidity(this.props.error);
    } else {
      input.setCustomValidity('');
    }
  }

  getValue() {
    console.warn(
      '<PaperInput>.getValue() has been deprecated and will be removed ' +
      'in the next version of paper-input.'
    );
    return findDOMNode(this.refs.input).value;
  }

  // convenience method to be called by a container component
  cancel() {
    console.warn(
      '<PaperInput>.cancel() has been deprecated and will be removed ' +
      'in the next version of paper-input.'
    );
    findDOMNode(this.refs.input).value = '';
    this.setState({ dirty: false });
  }

  shouldDisplayError() {
    return this.props.error && (
      (this.state.touched && this.state.dirty) ||
      this.props.mustDisplayError
    );
  }

  handleChange(e) {
    this._value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    this.setState({ dirty: !!this._value });
  }

  handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ touched: true, focused: true });
  }

  handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (!this.state.touched) {
      this.setState({ touched: true });
    }
  }

  handleBlurCapture(e) {
    if (this.props.onBlurCapture) {
      this.props.onBlurCapture(e);
    }

    this.setState({ dirty: !!this._value, focused: false });
  }

  render() {
    let { floatLabel, className, label, error, large, ...inputProps } = this.props;
    let { dirty, touched, focused } = this.state;
    let containerClassNames = classnames({
      'paper-input': true,
      'float-label': !!floatLabel,
      big: large,
      [className]: !!className,
    });
    let inputClassNames = classnames({
      dirty,
      touched,
    });
    if (inputProps.placeholder && !focused) {
      inputProps = {
        ...inputProps,
        placeholder: undefined,
      };
    }

    return (
      <div className={containerClassNames}>
        <input
          {...inputProps}
          ref="input"
          className={inputClassNames}
          onBlurCapture={this.handleBlurCapture}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <label htmlFor={inputProps.name}>{label}</label>
        {this.shouldDisplayError() && (
          <span className="error">{error}</span>
        )}
      </div>
    );
  }
}

let { bool, func, string } = React.PropTypes;

PaperInput.propTypes = {
  className: string,
  defaultValue: string,
  error: string,
  floatLabel: bool,
  label: string.isRequired,
  large: bool,
  mustDisplayError: bool,
  name: string.isRequired,
  onBlurCapture: func,
  onChange: func,
  onFocus: func,
  onKeyDown: func,
  placeholder: string,
  type: string,
  value: string,
};

PaperInput.defaultProps = {
  floatLabel: true,
  type: 'text',
};
