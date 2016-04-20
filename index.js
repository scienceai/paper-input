import React from 'react';
import ReactDOM from 'react-dom';
import PaperInput  from '../src';

function Row({ children }) {
  return (
    <div style={{height: '60px'}}>
      {children}
    </div>
  );
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      'controlled-component': ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <section style={{margin: '50px auto', width: '50vw'}}>
        <Row>
          <h1>
            <pre>{'<PaperInput>'}</pre>
          </h1>
        </Row>
        <Row>
          <PaperInput
            name='normal-text'
            label='Normal Text'
          />
        </Row>
        <Row>
          <PaperInput
            name='large-text'
            label='Large Text'
            large={true}
          />
        </Row>
        <Row>
          <PaperInput
            name='no-float'
            label='No Float Label'
            large={true}
            floatLabel={false}
          />
        </Row>
        <Row>
          <PaperInput
            name='with-placeholder'
            label='With Placeholder'
            large={true}
            placeholder='Hello World'
          />
        </Row>
        <Row>
          <PaperInput
            name='disabled'
            label='Disabled'
            disabled={true}
            large={true}
          />
        </Row>
        <Row>
          <PaperInput
            name='readonly'
            label='Read Only'
            readOnly={true}
            large={true}
          />
        </Row>
        <Row>
          <PaperInput
            name='errors'
            label='Builtin Form Validation'
            type='email'
            placeholder='me@example.com'
            large={true}
          />
        </Row>
        <Row>
          <PaperInput
            name='custom-error'
            label='Custom Form Validation'
            placeholder={'type a few letters'}
            large={true}
            error={
              !this.state['custom-error'] || this.state['custom-error'].length < 5 ?
              'Please enter at least 5 letters' :
              null
            }
            onChange={this.handleChange}
          />
        </Row>
        <Row>
          <PaperInput
            name='default-value'
            label='Default Value'
            large={true}
            defaultValue='a default value'
            placeholder='a placeholder'
          />
        </Row>
        <Row>
          <PaperInput
            name='controlled-component'
            label='Controlled Component'
            large={true}
            placeholder='a placeholder'
            value={this.state['controlled-component']}
            onChange={this.handleChange}
          />
        </Row>
      </section>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
