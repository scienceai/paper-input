
import React from 'react';
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
    this.input = null;
    ['handleBlurCapture', 'handleChange', 'handleFocus', 'handleKeyDown', 'handleInputRef']
      .forEach(meth => (this[meth] = this[meth].bind(this)));
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value != null) this._value = nextProps.value;
    this.setState({
      dirty: !!this._value,
    });
  }
  componentDidUpdate () {
    this.input.setCustomValidity(this.shouldDisplayError() ? this.props.error : '');
  }
  getValue () {
    console.warn(
      '<PaperInput>.getValue() has been deprecated and will be removed ' +
      'in the next version of paper-input.'
    );
    return this.input.value;
  }
  // convenience method to be called by a container component
  cancel () {
    console.warn(
      '<PaperInput>.cancel() has been deprecated and will be removed ' +
      'in the next version of paper-input.'
    );
    this.input.value = '';
    this.setState({ dirty: false });
  }
  handleBlurCapture (e) {
    if (this.props.onBlurCapture) this.props.onBlurCapture(e);
    this.setState({ dirty: !!this._value, focused: false });
  }
  handleChange (e) {
    this._value = e.target.value;
    if (this.props.onChange) this.props.onChange(e);
    this.setState({ dirty: !!this._value });
  }
  handleFocus (e) {
    if (this.props.onFocus) this.props.onFocus(e);
    this.setState({ touched: true, focused: true });
  }
  handleKeyDown (e) {
    if (this.props.onKeyDown) this.props.onKeyDown(e);
    if (!this.state.touched) this.setState({ touched: true });
  }
  handleInputRef (ref) {
    this.input = ref;
  }
  shouldDisplayError () {
    return this.props.error && (
      (this.state.touched && this.state.dirty) ||
      this.props.mustDisplayError
    );
  }
  render () {
    let { floatLabel, className, label, error, large, name, autoFocus, value,
      placeholder, type } = this.props
      , inputProps = { name, autoFocus, value, placeholder, type }
      , { dirty, touched, focused } = this.state
      , containerClassNames = classnames({
          'paper-input':  true,
          'float-label':  !!floatLabel,
          big:            large,
          [className]:    !!className,
        })
      , inputClassNames = classnames({ dirty, touched })
    ;
    if (inputProps.placeholder && !focused) {
      inputProps = Object.assign({}, inputProps, { placeholder: undefined });
    }

    return (
      <div className={containerClassNames}>
        <input
          {...inputProps}
          ref={this.handleInputRef}
          className={inputClassNames}
          onBlurCapture={this.handleBlurCapture}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <label htmlFor={inputProps.name}>
          {label}
        </label>
        <span className="border-line" />
        {this.shouldDisplayError() && (
          <span className="error">{error}</span>
        )}
      </div>
    );
  }
}
const { bool, func, string } = React.PropTypes;
PaperInput.propTypes = {
  className:        string,
  defaultValue:     string,
  error:            string,
  floatLabel:       bool,
  label:            string.isRequired,
  large:            bool,
  mustDisplayError: bool,
  name:             string.isRequired,
  onBlurCapture:    func,
  onChange:         func,
  onFocus:          func,
  onKeyDown:        func,
  placeholder:      string,
  type:             string,
  value:            string,
  autoFocus:        bool,
};
PaperInput.defaultProps = {
  floatLabel: true,
  type:       'text',
};
