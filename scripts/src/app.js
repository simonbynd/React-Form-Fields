//Deps
var React = require('react'),
	ReactDOM = require('react-dom'),
	Input = require('./classes/input.jsx');

/** @jsx React.DOM */
ReactDOM.render(<Input tag="input" validation="alphanumeric" errorMsg="Test" attributes={{
                type: 'text',
                placeholder: 'Phone',
                name: 'test',
                id: 'test'
            }} />, document.getElementById('react-form-field'));

// errorMsg: 'Email addresses do not match',
// required: true,
// onChange
// relationship: 'email',
// validation: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
// attributes: {
// 	type: 'text',
// 	name: 'confirm_email',
// 	id: 'confirm_email',
// 	placeholder: 'Confirm Email',
// 	autoComplete: 'off'
// }
// 
// this.props.options
// this.props.description
// this.props.legend - these are all if its type == 'radio'
// 
// 
// this.props.tag == 'select'
// also needs options of value and label
// 
// 		email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
		// numeric: /^[0-9]*$/,
		// alpha: /^[a-z]*$/i,
		// alphanumeric: /^[a-z0-9]*$/i