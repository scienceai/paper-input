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
      value: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <section style={{margin: '50px auto', width: '50vw'}}>
        <Row>
          <PaperInput
            name='normal-text'
            label='Normal Text'
            onChange={this.handleChange}
          />
        </Row>
        <Row>
          <PaperInput
            name='large-text'
            label='Large Text'
            large={true}
            onChange={this.handleChange}
          />
        </Row>
        <Row>
          <PaperInput
            name='no-float'
            label='No Float Label'
            large={true}
            floatLabel={false}
            onChange={this.handleChange}
          />
        </Row>
        <Row>
          <PaperInput
            name='with-placeholder'
            label='With Placeholder'
            large={true}
            placeholder='Hello World'
            onChange={this.handleChange}
          />
        </Row>
        <Row>
          <PaperInput
            name='email'
            label='Email Address'
            type='email'
            large={true}
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
