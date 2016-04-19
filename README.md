# `<PaperInput />`

[![Build Status](https://travis-ci.org/scienceai/paper-input.svg?branch=master)](https://travis-ci.org/scienceai/paper-input)

### Install

```
npm install paper-input
```

### Using the Component

```js
import PaperInput from 'paper-input';
```

### Using the CSS

With postcss-import or similar

```css
@import "paper-input/dist/paper-input.css";
```

### API

* `label: String`: Required. The label that will be displayed on the `<input>` element.
* `name: String`: Required. The `name` attribute that will be attached to the `<input>` element.
* `className: String`: Optional.
* `defaultValue: String`: Optional.
* `error: String`: Optional. An error message that is displayed below the component.
* `floatLabel: Boolean`: Optional. Floats the label to the top of the element when focused.
* `onBlurCapture: Function`: Optional. Called on the `blur` event on the `<input>`.
* `onKeyPress: Function`: Optional. Called on the `keypress` event on the `<input>`.
* `onChange: Function`: Optional. Called on the `change` event on the `<input>`.
* `type: String`: Optional. Defaults to `'text'`.
* `value: String`: Optional.

### Example

```js
<PaperInput
  name='email'
  label='Email Address'
  type='email'
  floatLabel={true}
  error={this.state.error ? 'Please enter a valid email address' : ''}
  onChange={this.handleChange.bind(this)}
  value={this.state.email}
/>
```
