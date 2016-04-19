import React from 'react';
import ReactDOM from 'react-dom';
import PaperInput  from '../src';

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
        <PaperInput
          name='email'
          label='Email Address'
          type='email'
          floatLabel={true}
          onChange={this.handleChange.bind(this)}
        />
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
