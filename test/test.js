import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';

import PaperInput from '../src/';

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
          name='name'
          label='Full Name'
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
          name='name'
          label='Full Name'
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert.equal(result.props.children[0].type, 'input');
      assert.equal(result.props.children[1].type, 'label');
    });

    it('also renders a span when an error prop is passed and the input has been touched', () => {
      class WithoutCustomValidity extends PaperInput {
        constructor(...args) {
          super(...args);
        }
        // set componentDidUpdate to a noop as this is throwing the error
        // "TypeError: input.setCustomValidity is not a function"
        componentDidUpdate() {}
      }

      let counter = 0;
      let instance = TestUtils.renderIntoDocument(
        <WithoutCustomValidity
          name='name'
          label='Full Name'
          error='This field is required'
          onFocus={e => { counter += 1; }}
          required={true}
        />
      );
      assert(!TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span').length);
      let domInput = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');

      TestUtils.Simulate.focus(domInput);
      assert.equal(counter, 1);
      let span = TestUtils.findRenderedDOMComponentWithTag(instance, 'span');
      assert(span);
      assert.equal(span.textContent, 'This field is required');
    });

  });

  describe('props', () => {

    it('floatLabel adds a "float-label" class to the div, and is true by default', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name='name'
          label='Full Name'
          floatLabel={true}
        />
      );
      const resultWithFloatLabelTrue = shallowRenderer.getRenderOutput();
      assert(resultWithFloatLabelTrue.props.className.match(/float\-label/));

      const shallowRenderer1 = TestUtils.createRenderer();
      shallowRenderer1.render(
        <PaperInput
          name='name'
          label='Full Name'
          floatLabel={false}
        />
      );
      const resultWithFloatLabelFalse = shallowRenderer1.getRenderOutput();
      assert(!resultWithFloatLabelFalse.props.className.match(/float\-label/));

      const shallowRenderer2 = TestUtils.createRenderer();
      shallowRenderer2.render(
        <PaperInput
          name='name'
          label='Full Name'
        />
      );
      const resultWithFloatLabelOmitted = shallowRenderer2.getRenderOutput();
      assert(resultWithFloatLabelOmitted.props.className.match(/float\-label/));
    });

    it('adds the className prop to div', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name='name'
          label='Full Name'
          className='custom-css-class'
        />
      );
      const result = shallowRenderer.getRenderOutput();
      assert(result.props.className.match(/custom\-css\-class/));
    });

    it('passes all other props to the input', () => {
      function customHandler(e) {
        console.log(e);
      }

      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name='name'
          label='Full Name'
          defaultValue='Your Name Here'
          required={true}
          customHandler={customHandler}
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const input = result.props.children[0];
      assert.equal(input.props.name, 'name');
      assert.equal(input.props.label, 'Full Name');
      assert.equal(input.props.defaultValue, 'Your Name Here');
      assert.equal(input.props.required, true);
      assert.equal(input.props.customHandler, customHandler);
    });

    it('uses the label prop as the text of the label element', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name='name'
          label='Full Name'
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const label = result.props.children[1];
      assert.equal(label.props.children, 'Full Name');
    });

  });

});
