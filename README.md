# React Form Fields

Form fields packaged into a react class, supports validation, cross-browser supported placeholders, url parameter autofill, relationships and HTML5 form attribute polyfils.

To support cross-browser supported placeholders add class (explain)

## Usage

### Text input
```javascript
ReactDOM.render(
	<Input
		tag="input" 
		validation="alphanumeric" 
		errorMsg="This field is required and only accepts alpha numeric characters" 
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
ReactDOM.render(
	<Input
		tag="input" 
		validation="alphanumeric" 
		errorMsg="This field is required and only accepts alpha numeric characters" 
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

### Radios
```javascript
ReactDOM.render(
	<Input
		tag="input" 
		validation="alphanumeric" 
		errorMsg="This field is required and only accepts alpha numeric characters" 
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

### Select
```javascript
ReactDOM.render(
	<Input
		tag="input" 
		validation="alphanumeric" 
		errorMsg="This field is required and only accepts alpha numeric characters" 
		attributes={{
			type: 'text',
			placeholder: 'Alpha numeric text input',''
			name: 'my-input',
			id: 'my-input'
		}}
	/>,
	document.getElementById('react-form-field')
);
```

### Textarea
```javascript
ReactDOM.render(
	<Input
		tag="input" 
		validation="alphanumeric" 
		errorMsg="This field is required and only accepts alpha numeric characters" 
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

## Options

#### tag

Type: `string`

Default: `input`

Options: `input`, `select`, `textarea`, `radio`

Determines the type of form field, if using input specify the attribute type as text or checkbox

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