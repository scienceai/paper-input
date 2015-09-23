import React, { Component, findDOMNode, PropTypes } from 'react';

export default class PaperInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      dirty: ('defaultValue' in props) ? !!props.defaultValue : !!props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: (('defaultValue' in nextProps) ? !!nextProps.defaultValue : !!nextProps.value) || !!findDOMNode(this.refs.input).value,
      touched: (nextProps.value)? this.state.touched : false
    });
  }

  componentDidUpdate() {
    let input = findDOMNode(this.refs.input);
    if (this.props.error) {
      input.setCustomValidity(this.props.error);
    } else {
      input.setCustomValidity('');
    }
  }

  handleBlurCapture(e) {
    this.setState({ dirty: !!e.target.value }, () => {
      if (this.props.onBlurCapture) {
        this.props.onBlurCapture(e);
      }
    });
  }

  handleKeyPress(e) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }

    if (!this.state.touched) {
      this.setState({ touched: true });
    }
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    if (e.target.value && !this.state.dirty) {
      this.setState({ dirty: true });
    }

    if (!e.target.value && this.state.dirty) {
      this.setState({ dirty: false });
    }
  }

  //convenience method to be called by a container component
  cancel() {
    findDOMNode(this.refs.input).value = '';
    this.setState({ dirty: false });
  }

  getValue() {
    return findDOMNode(this.refs.input).value;
  }

  render() {
    let className = this.props.className || '';
    let props = Object.keys(this.props).reduce((prev, curr) => {
      if (curr !== 'className') {
        prev[curr] = this.props[curr];
      }
      return prev;
    }, {});

    return (
      <div className={`paper-input${this.props.floatLabel ? ' float-label' : ''}${className}`}>
        <input
          {...props}
          ref='input'
          className={`${className}${this.state.dirty ? ' dirty' : ''}${this.state.touched ? ' touched' : ''}`}
          onBlurCapture={this.handleBlurCapture.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <span className='error'>{this.props.error}</span>
      </div>
    );
  }
}

PaperInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  floatLabel: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlurCapture: PropTypes.func,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string
};

PaperInput.defaultProps = {
  error: '',
  floatLabel: true,
  type: 'text'
};
