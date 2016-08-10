
import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';

import PaperInput from '../src/';

class WithoutCustomValidity extends PaperInput {
  // set componentDidUpdate to a noop as this is throwing the error
  // "TypeError: input.setCustomValidity is not a function"
  componentDidUpdate() {}
}

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value.length < 3) {
      this.setState({ error: 'This field is required' });
    } else {
      this.setState({ error: null });
    }
  }

  render() {
    return (
      <WithoutCustomValidity
        name="name"
        label="Full Name"
        error={this.state.error}
        onChange={this.handleChange}
        required={true}
      />
    );
  }
}

describe('PaperInput', () => {
  before(() => {
    global.document = jsdom('<!doctype html><html><body></body></html>');
    global.window = global.document.defaultView;
  });

  describe('html output', () => {
    it('renders a div with className "paper-input"', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert.equal(result.type, 'div');
      assert(result.props.className.match(/paper\-input/));
    });

    it('renders an input and label as children', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert.equal(result.props.children[0].type, 'input');
      assert.equal(result.props.children[1].type, 'label');
    });

    it('renders the error only if the input has been focused and has an invalid value', () => {
      let instance = TestUtils.renderIntoDocument(<Wrapper />);
      assert(!TestUtils.scryRenderedDOMComponentsWithClass(instance, 'error').length);
      let domInput = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');

      // initial render has no error
      TestUtils.Simulate.focus(domInput);
      assert(!TestUtils.scryRenderedDOMComponentsWithClass(instance, 'error').length);

      // an invalid input triggers an error
      domInput.value = 'x';
      TestUtils.Simulate.change(domInput);
      assert.equal(
        TestUtils.findRenderedDOMComponentWithClass(instance, 'error').textContent,
        'This field is required'
      );

      // blurring with an invalid input preserves the error
      TestUtils.Simulate.blur(domInput);
      assert.equal(
        TestUtils.findRenderedDOMComponentWithClass(instance, 'error').textContent,
        'This field is required'
      );

      // a valid input will remove the error
      domInput.value = 'xyz';
      TestUtils.Simulate.change(domInput);
      assert(!TestUtils.scryRenderedDOMComponentsWithClass(instance, 'error').length);
    });

    it('does not render an error when the input is cleared', () => {
      let instance = TestUtils.renderIntoDocument(<Wrapper />);
      assert(!TestUtils.scryRenderedDOMComponentsWithClass(instance, 'error').length);
      let domInput = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');

      // initial render has no error
      TestUtils.Simulate.focus(domInput);
      assert(!TestUtils.scryRenderedDOMComponentsWithClass(instance, 'error').length);

      // an invalid input triggers an error
      domInput.value = 'x';
      TestUtils.Simulate.change(domInput);
      assert.equal(
        TestUtils.findRenderedDOMComponentWithClass(instance, 'error').textContent,
        'This field is required'
      );

      // blurring with an invalid input preserves the error
      TestUtils.Simulate.blur(domInput);
      assert.equal(
        TestUtils.findRenderedDOMComponentWithClass(instance, 'error').textContent,
        'This field is required'
      );

      // clearing the input will remove the error
      domInput.value = '';
      TestUtils.Simulate.change(domInput);
      assert(!TestUtils.scryRenderedDOMComponentsWithClass(instance, 'error').length);
    });

    it('renders a span when error and mustDisplayError props are passed', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
          error="This field is required"
          mustDisplayError={true}
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert.equal(result.props.children[0].type, 'input');
      assert.equal(result.props.children[1].type, 'label');
    });
  });

  describe('props', () => {
    it('floatLabel adds a "float-label" class to the div, and is true by default', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
          floatLabel={true}
        />
      );
      const resultWithFloatLabelTrue = shallowRenderer.getRenderOutput();
      assert(resultWithFloatLabelTrue.props.className.match(/float\-label/));

      const shallowRenderer1 = TestUtils.createRenderer();
      shallowRenderer1.render(
        <PaperInput
          name="name"
          label="Full Name"
          floatLabel={false}
        />
      );
      const resultWithFloatLabelFalse = shallowRenderer1.getRenderOutput();
      assert(!resultWithFloatLabelFalse.props.className.match(/float\-label/));

      const shallowRenderer2 = TestUtils.createRenderer();
      shallowRenderer2.render(
        <PaperInput
          name="name"
          label="Full Name"
        />
      );
      const resultWithFloatLabelOmitted = shallowRenderer2.getRenderOutput();
      assert(resultWithFloatLabelOmitted.props.className.match(/float\-label/));
    });

    it('adds the className prop to div', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
          className="custom-css-class"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert(result.props.className.match(/custom\-css\-class/));
    });

    it('passes props to the input', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
          defaultValue="Your Name Here"
          required={true}
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const input = result.props.children[0];
      assert.equal(input.props.name, 'name');
      assert.equal(input.props.defaultValue, 'Your Name Here');
      assert.equal(input.props.required, true);
    });

    it('uses the label prop as the text of the label element', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name="name"
          label="Full Name"
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const label = result.props.children[1];
      assert.equal(label.props.children, 'Full Name');
    });

    it('does not display the placeholder until focused', () => {
      let focused = false;
      class FocusWrapper extends React.Component {
        componentDidUpdate() {
          if (focused) {
            assert.equal(this.refs.input.placeholder, 'Doug');
          } else {
            assert(!this.refs.input.placeholder);
          }
        }

        render() {
          return (
            <WithoutCustomValidity
              ref="input"
              name="name"
              label="Full Name"
              placeholder="Doug"
              onBlurCapture={() => { focused = false; }}
              onFocus={() => { focused = true; }}
            />
          );
        }
      }

      let instance = TestUtils.renderIntoDocument(<FocusWrapper />);
      let domInput = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      assert(!focused);
      TestUtils.Simulate.focus(domInput);
      assert(focused);
      TestUtils.Simulate.blur(domInput);
      assert(!focused);
    });
  });
});
