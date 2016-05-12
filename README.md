# `<PaperInput />`

[![Build Status](https://travis-ci.org/scienceai/paper-input.svg?branch=master)](https://travis-ci.org/scienceai/paper-input)

Check out a live demo at http://scienceai.github.io/paper-input

### Install
```
npm install paper-input
```

### Usage
```js
import React from 'react';
import PaperInput from 'paper-input';

class MyComponent extends React.Component {
  // ... setup state and change handlers

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
* `error`: String. Optional. An error message that is displayed in the `<span>` below the `<input>`.
* `floatLabel`: Boolean. Optional. Floats the `<label>` above the `<input>` when focused. Defaults to `true`.
* `large`: String. Optional. Adds a CSS class to increase the font size of the `<input>` and `<label>`.
* `mustDisplayError`: Bool. Optional. Ensures that the `error` provided is displayed regardless of whether or not the component has been interacted with.
* `onBlurCapture`: Function. Optional. Called on the `blur` event on the `<input>`.
* `onChange`: Function. Optional. Called on the `change` event on the `<input>`.
* `onFocus`: Function. Optional. Called on the `focus` event on the `<input>`.
* `onKeyDown`: Function. Optional. Called on the `keydown` event on the `<input>`.
* `defaultValue`: String. Optional. See [the docs](https://facebook.github.io/react/docs/forms.html#default-value) on the `defaultValue` prop.
* `placeholder`: String. Optional. Note that you should not set `floatLabel` to `false` if using a placeholder as it will overlap with the label.
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
