import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import PaperInput from '../src/paper-input';

describe('PaperInput', () => {

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

    it('renders an input, label, and span as children', () => {
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
      assert.equal(result.props.children[2].type, 'span');
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

    it('sets an error message in the span', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PaperInput
          name='name'
          label='Full Name'
          error='Cannot be blank'
        />
      );
      const result = shallowRenderer.getRenderOutput();
      const span = result.props.children[2];
      assert.equal(span.props.children, 'Cannot be blank');
    });

  });

});
