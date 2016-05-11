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
    this.handleBlurCapture = this.handleBlurCapture.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: !labelShouldCoverInput(nextProps) || !!findDOMNode(this.refs.input).value
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

  handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ touched: true });
  }


  handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (!this.state.touched) {
      this.setState({ touched: true });
    }
  }

  //convenience method to be called by a container component
  cancel() {
    console.warn(
      '<PaperInput>.cancel() has been deprecated and will be removed ' +
      'in the next version of paper-input.'
    );
    findDOMNode(this.refs.input).value = '';
    this.setState({ dirty: false });
  }

  getValue() {
    console.warn(
      '<PaperInput>.getValue() has been deprecated and will be removed ' +
      'in the next version of paper-input.'
    );
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
      dirty,
      touched
    });

    return (
      <div className={containerClassNames}>
        <input
          {...this.props}
          ref='input'
          className={inputClassNames}
          onBlurCapture={this.handleBlurCapture}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <label htmlFor={name}>{label}</label>
        {!!error && touched && (
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
  onFocus: func,
  onChange: func,
  onKeyDown: func,
  placeholder: string,
  type: string,
  value: string
};

PaperInput.defaultProps = {
  floatLabel: true,
  type: 'text',
};
