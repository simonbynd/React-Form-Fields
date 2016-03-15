# React Form Fields

Form fields packaged into a react class, supports validation, url parameter autofill, relationships and HTML5 polyfill for placeholders

```
npm install react-form-fields
```

For HTML5 placeholder polyfill versioning is defined in the DOM using conditional comments, to support <IE9 include these in your html:
```
	<!--[if lt IE 7 ]> <html class="ie ie6"> <![endif]-->
	<!--[if IE 7 ]>    <html class="ie ie7"> <![endif]-->
	<!--[if IE 8 ]>    <html class="ie ie8"> <![endif]-->
	<!--[if IE 9 ]>    <html class="ie ie9"> <![endif]-->
	<!--[if (gt IE 9)|!(IE)]><!--><html><!--<![endif]-->
```

## Usage

### Text input
```javascript
var Input = require('react-form-fields');
ReactDOM.render(
	<Input
		tag="input" 
		validation="alphanumeric" 
		errorMsg="This field is required and only accepts alpha numeric characters" 
		required={true} 
		attributes={{
			type: 'text',
			placeholder: 'Alpha numeric text input',
			name: 'my-input',
			id: 'my-input'
		}}
	/>,
	document.getElementById('react-form-field')
);
```

### Checkbox input
```javascript
var Input = require('react-form-fields');
ReactDOM.render(
	<Input
		tag="input" 
		errorMsg="This field is required" 
		required={true} 
		attributes={{
			type: 'checkbox',
			name: 'my-input',
			id: 'my-input',
			value: 'agreed to terms'
		}}
	/>,
	document.getElementById('react-form-field')
);
```

### Radios
```javascript
var Input = require('react-form-fields');
ReactDOM.render(
	<Input
		tag="input" 
		attributes={{
			type: 'radio',
			name: 'my-input',
			id: 'my-input'
		}} 
		options={[
			{
				value: 'option-1',
				label: 'Option 1'
			},
			{
				value: 'option-2',
				label: 'Option 2'
			}
		]} 
		legend="My Radios"
	/>,
	document.getElementById('react-form-field')
);
```

### Select
```javascript
var Input = require('react-form-fields');
ReactDOM.render(
	<Input
		tag="select" 
		attributes={{
			placeholder: 'Please select an option',
			name: 'my-input',
			id: 'my-input'
		}} 
		options={[
			{
				value: 'option-1',
				label: 'Option 1'
			},
			{
				value: 'option-2',
				label: 'Option 2'
			}
		]} 
	/>,
	document.getElementById('react-form-field')
);
```

### Textarea
```javascript
var Input = require('react-form-fields');
ReactDOM.render(
	<Input
		tag="textarea" 
		attributes={{
			placeholder: 'Alpha numeric text input',
			name: 'my-input',
			id: 'my-input'
		}}
	/>,
	document.getElementById('react-form-field')
);
```

### Form validation example
```
var Input = require('react-form-fields');
var Form = React.createClass({

	// .....

	validate: function(e){
		e.preventDefault();
		var self = this,
			valid = true,
			inputs = Object.keys(this.refs).filter(function(key) {
				return key.indexOf('react-form-field-') == 0;
			}).reduce(function(data, key) {
				data[key] = self.refs[key];
				return data;
			}, {});
		for(var key in inputs) {
			if(!inputs[key].validate()) {
				valid = false;
			}
		}
		if(!valid) {
			e.preventDefault();
		} else {
			// its valid
		}
	},

	render: function(){
		return (
			<form onSubmit={this.validate}>
				<Input
					ref="react-form-field-1" 
					tag="input" 
					validation="email" 
					errorMsg="Please enter a valid email address" 
					required={true} 
					attributes={{
						type: 'text',
						placeholder: 'Your email',
						name: 'email',
						id: 'email'
					}}
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}

});

ReactDOM.render(
	<Form />,
	document.getElementById('react-form-field')
);
```

## Options

#### tag

Type: `string`

Default: `input`

Options: `input`, `select`, `textarea`

Determines the type of form field, if using input specify the attribute type as text, radio or checkbox

#### errorMsg

Type: `string`

Default: `This field is invalid`

The error message that is appended after the input if it is required and empty or if validation fails

#### required

Type: `boolean`

Default: `false`

If this field is required, will fail validation if empty

#### validation

Type: `regexp | string`

Options: `regexp object`, `regexp string`, `email`, `numeric`, `alpha`, `alphanumeric`

Field validation, accepts regexp or a predefined option

#### options

Type: `array`

Example: 
```
	options={[
		{
			value: 'option-1',
			label: 'option 1'
		},
		{
			value: 'option-2',
			label: 'option 2'
		}
	]}
```

An array of options for use with radio or select field tags

#### parameter

Type: `string`

Auto populate field based on a url parameter, example 'email' would auto populate field if url contains the email parameter http://localhost:4000/?email=me@simonstaton.co.uk

#### relationship

Type: `string`

Accepts another form elements id and will fail validation if the input value does not match, used for confirmational email/phone number fields

#### onChange

Type: `function`

A callback function for change events, callback contains event object

#### legend

Type: `string`

For use with radio fields, if specified will add a fieldset legend

#### attributes

Type: `object`

Assigns attributes directly to the form field

##### attributes.type

Type: `string`

Default: `text`

The type of input, to be used with the field tag of input to define a text or checkbox input

##### attributes.placeholder

Type: `string`

The placeholder

##### attributes.name

Type: `string`

Default: `react-form-field`

The field name

##### attributes.id

Type: `string`

Default: `react-form-field`

The field id

##### attributes.className

Type: `string`

Class assigned to the field

##### attributes.autoComplete

Type: `string`

Options: `off`

Will disable default browser auto complete on load, clears field

##### attributes.value

Type: `string`

Prepopulate field value, will fire change events and validate if prop changes

## License

MIT © [Simon Staton](https://github.com/simonstaton)