# `<PaperInput />`

[![Build Status](https://travis-ci.org/scienceai/paper-input.svg?branch=master)](https://travis-ci.org/scienceai/paper-input)

### Install
```
npm install paper-input
```

### Usage
```js
import PaperInput from 'paper-input';

function MyComponent() {
  return (
    <PaperInput
      name='email'
      label='Email Address'
      type='email'
      floatLabel={true}
      error={this.state.error ? 'Please enter a valid email address' : ''}
      onChange={this.handleChange.bind(this)}
      value={this.state.email}
    />
  );
}
```

### Using the CSS

With `postcss-import` or similar:

```css
@import "paper-input/dist/paper-input.css";
```

### API
The `<PaperInput>` component has the following internal structure:
```html
<div className='paper-input'>
  <input />
  <label />
  <span className='error' />
</div>
```

`<PaperInput>` accepts the following `props`:
* `label`: String. Required. The label that will be displayed on the `<input>` element.
* `name`: String. Required. The `name` attribute that will be attached to the `<input>` element.
* `className`: String. Optional. This class will be added to the `<div>` wrapping the `<input>` element.
* `error`: String. Optional. An error message that is displayed in the `<span> below the `<input>`.
* `floatLabel`: Boolean. Optional. Floats the `<label>` above the `<input>` when focused. Defaults to `true`.
* `large`: String. Optional. Adds a CSS class to increase the font size of the `<input>` and `<label>`.
* `onBlurCapture`: Function. Optional. Called on the `blur` event on the `<input>`.
* `onFocus`: Function. Optional. Called on the `focus` event on the `<input>`.
* `onKeyPress`: Function. Optional. Called on the `keypress` event on the `<input>`.
* `onChange`: Function. Optional. Called on the `change` event on the `<input>`.
* `placeholder`: String. Optional.
* `type`: String. Optional. Defaults to `'text'`.
* `value`: String. Optional.

Any additional props not specified above will be passed to the `<input>` element.

### Example
For a fuller example, visit the `example/` directory.
```
npm run watch
```
```
open example/index.html
```

### License
Apache-2.0
