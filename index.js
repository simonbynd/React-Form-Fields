var React = require('react'),
	ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'React Form Fields',
	isOldie: false,
	regexp: {
		email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		numeric: /^[0-9]*$/,
		alpha: /^[ a-zA-Z]*$/,
		alphanumeric: /^[ a-z0-9]*$/i
	},
	propTypes: {
		tag: React.PropTypes.string,
		attributes: React.PropTypes.shape({
			type: React.PropTypes.string,
			placeholder: React.PropTypes.string,
			name: React.PropTypes.string,
			id: React.PropTypes.string,
			className: React.PropTypes.string,
			autoComplete: React.PropTypes.string,
			value: React.PropTypes.string
		}),
		relationship: React.PropTypes.string,
		parameter: React.PropTypes.string,
		errorMsg: React.PropTypes.string,
		required: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.bool
		]),
		validation: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		]),
		onChange: React.PropTypes.func,
		options: React.PropTypes.array,
		legend: React.PropTypes.string
	},
	getDefaultProps: function(){
		return {
			tag: 'input',
			attributes: {
				type: 'text',
				name: 'react-form-field',
				id: 'react-form-field'
			},
			errorMsg: 'This field is invalid'
		};
	},
	getInitialState: function(){
		return {
			value: '',
			valid: true
		}
	},
	componentWillReceiveProps: function(props){
		this.setState({value: props.attributes.value});
	},
	componentWillMount: function(){
		if(this.props.attributes.autoComplete == 'off' && (!this.props.attributes.value || this.props.attributes.value == '')) {
			setTimeout(() => {
				this.setState({
					value: '',
					valid: true
				});
			}, 200);
		}
		if(this.props.relationship) {
			this.relationalInput = document.getElementById(this.props.relational);
		}
		var domClass =  document.documentElement.className;
		this.isOldie = (domClass.indexOf('ie9') > -1 || domClass.indexOf('ie8') > -1 || domClass.indexOf('ie6') > -1 || domClass.indexOf('ie7') > -1);
		this.setState({value: this.props.attributes.value});
	},
	componentDidMount: function(){
		if(this.props.parameter){
			var parameters = {},
				parts = location.search.substr(1).split("&");
			for(var i=0;i<parts.length;i++) {
			    var item = parts[i].split("="),
			        result = {};
			    parameters[item[0]] = decodeURIComponent(item[1]);
			}
			if(parameters[this.props.parameter]){
				this.setState({value: parameters[this.props.parameter]});
			}
		}
		if(this.isOldie && this.props.attributes.placeholder && this.props.attributes.type == 'text'){
			this.setState({value: this.props.attributes.placeholder});
		}
	},
	validate: function(newValue){
		var value = typeof(newValue) !== 'undefined' ? newValue : (this.state.value ? this.state.value : ''),
			isValid = true,
			required = typeof this.props.required == 'string' ? (this.props.required == 'false' ? false : true) : this.props.required;
		if(this.props.validation){
			if(this.props.validation instanceof RegExp){
				isValid = this.props.validation.test(value);
			} else if(this.regexp[this.props.validation]) {
				isValid = this.regexp[this.props.validation].test(value);
			} else {
				isValid = new RegExp(this.props.validation).test(value);
			}
		}
		if(!isValid && !required && value.length === 0){
			isValid = true;
		} else if(required && this.props.attributes.type == 'checkbox' && !ReactDOM.findDOMNode(this.refs['form-element']).checked){ 
			isValid = false;
		} else if(required && value.length === 0){
			isValid = false;
		}
		if(this.props.relationship && this.relationalInput) {
			if(this.relationalInput.value !== value) {
				isValid = false;
			}
		}
		this.setState({valid: isValid});
		return isValid;
	},
	handleChange: function(event){
		if(this.props.tag == 'select') ReactDOM.findDOMNode(this.refs['form-element']).blur();
		this.setState({value: event.target.value});
		if(this.props.onChange) {
			this.props.onChange(event);
		}
	},
	handleFocus: function(event){
		if(this.state.value == this.props.attributes.placeholder){
			this.setState({value: ''});
		}
	},
	handleBlur: function(event){
		this.validate(event.target.value);
		if(!this.isOldie || !this.props.attributes.placeholder || this.props.attributes.type != 'text') return;
		if(this.state.value == ''){
			this.setState({value: this.props.attributes.placeholder});
		}
	},
	render: function(){
		var self = this;
		if(this.props.attributes.type == 'radio'){
			this.props.attributes.className += ' input-wrapper';
			return (
				<fieldset className={this.state.valid ? this.props.attributes.className : this.props.attributes.className+' error'} >
						{(function(){
							if(self.props.legend) return <legend>{self.props.legend}</legend>
						})()}
						{this.props.options.map(function(option, i) {
							return <label key={'option-'+i} htmlFor={'radio-button-'+i+'-'+self.props.attributes.name}><input autoComplete={self.props.attributes.autoComplete} id={'radio-button-'+i+'-'+self.props.attributes.name} key={'input-option-'+i} type={self.props.attributes.type} name={self.props.attributes.name} value={option.value} onChange={self.handleChange} onFocus={self.handleFocus} onBlur={self.handleBlur} />{option.label}</label>
						})}
						{(function(){
							if(!self.state.valid){
								return <span className="error-msg">{self.props.errorMsg}</span>
							}
						})()}
				</fieldset>
			);
		} else if(this.props.tag == 'select'){
			return (
				<div className="input-wrapper">
					<select ref="form-element" {...this.props.attributes} autoComplete={this.props.attributes.autoComplete} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} className={this.state.valid ? this.props.attributes.className : this.props.attributes.className+' error'} >
						<option disabled selected>{this.props.attributes.placeholder}</option>
						{this.props.options.map(function(option, i) {
							return <option key={'input-option-'+i} value={option.value} disabled={option.disabled}>{option.label}</option>
						})}
					</select>
					{(function(){
						if(!self.state.valid){
							return <span className="error-msg">{self.props.errorMsg}</span>
						}
					})()}
				</div>
			)
		} else {
			return (
				<div className="input-wrapper">
					<this.props.tag ref="form-element" {...this.props.attributes} autoComplete={this.props.attributes.autoComplete} onChange={this.handleChange} value={this.state.value} onFocus={this.handleFocus} onBlur={this.handleBlur} className={this.state.valid ? this.props.attributes.className : this.props.attributes.className+' error'} />
						{(function(){
							if(!self.state.valid){
								return <span className="error-msg">{self.props.errorMsg}</span>
							}
						})()}
				</div>
			);
		}
	}
});