import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

function labelShouldCoverInput(props) {
  return !props.value && !props.defaultValue && !props.placeholder;
}

export default class PaperInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      dirty: !labelShouldCoverInput(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: !labelShouldCoverInput(nextProps) || !!findDOMNode(this.refs.input).value,
      touched: (nextProps.value) ? this.state.touched : false
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
    if (this.props.onBlurCapture) {
      this.props.onBlurCapture(e);
    }

    this.setState({
      dirty: !labelShouldCoverInput(this.props) || !!e.target.value
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
      this.setState({ dirty: !labelShouldCoverInput(this.props) });
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
    let { floatLabel, className, name, label, error, large } = this.props;
    let { dirty, touched } = this.state;
    let containerClassNames = classnames({
      'paper-input': true,
      'float-label': !!floatLabel,
      'big': large,
      [className]: !!className
    });
    let inputClassNames = classnames({
      dirty: !!dirty,
      touched: !!touched
    });
    let props = Object.keys(this.props).reduce((prev, curr) => {
      if (curr !== 'className') {
        prev[curr] = this.props[curr];
      }
      return prev;
    }, {});

    return (
      <div className={containerClassNames}>
        <input
          {...props}
          ref='input'
          className={inputClassNames}
          onBlurCapture={this.handleBlurCapture.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor={name}>{label}</label>
        {!!error && (
          <span className='error'>{error}</span>
        )}
      </div>
    );
  }
}

let { bool, func, string } = React.PropTypes;

PaperInput.propTypes = {
  className: string,
  error: string,
  floatLabel: bool,
  label: string.isRequired,
  large: bool,
  name: string.isRequired,
  onBlurCapture: func,
  onChange: func,
  onKeyPress: func,
  placeholder: string,
  type: string,
  value: string
};

PaperInput.defaultProps = {
  floatLabel: true,
  type: 'text',
};
