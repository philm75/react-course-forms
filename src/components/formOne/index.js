import React,{ Component } from 'react';
import FormField from '../utils/formFields';
import { validate } from '../utils/validate';

class FormOne extends Component {

    state = {
        loading: false,
        maxAge:81,
        formData: {
            name: {
               element: 'input',
               value: '',
               config: {
                   name: 'name_input',
                   type: 'text',
                   placeholder: 'Enter your name'
               },
               validation: {
                   required: true
               },
               valid: false,
               touched: false,
               validationMessage: ''
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastName_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            age: {
                element: 'select',
                value: '',
                config: {
                    name: 'age_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                    minNum: 20
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            message: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'message_input',
                    placeholder: 'Enter your message here...',
                    rows: 3
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''                
            }
        }
    }

    generateAgeOptions = () => {
        const ages = [];
        for (let i=1; i < this.state.maxAge; i++) {
            ages.push(i)
        }

        return ages.map((age, key) => {
            return (
            <option key={key} value={age}>{age}</option>
            )
        })
    }

    updateForm = (element) => {
        const newFormData = {
            ...this.state.formData
        }

        const newElement = {
            ...newFormData[element.id]
        }

        newElement.value = element.event.target.value;

        let validateData = validate(newElement);
        newElement.valid = validateData[0];
        newElement.validationMessage = validateData[1];

        if (element.blur) {
            newElement.touched = element.blur;
        }

        newFormData[element.id] = newElement;
        this.setState({formData: newFormData});
    }

    onSuccess = () => {
        let formDataCopy = {
            ...this.state.formData
        }

        for (let key in this.state.formData) {
            formDataCopy[key].value = '';
            formDataCopy[key].valid = false;
            formDataCopy[key].touched = false;
        }

        this.setState({formData: formDataCopy});
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            this.setState({loading:true});
            for (let key in this.state.formData) {
                dataToSubmit[key] = this.state.formData[key].value;
            }
            setTimeout(() => {
                this.setState({loading:false});
                this.onSuccess();
            }, 2000);
            console.log('Submit the form with', dataToSubmit);
        } else {
            alert('The form is not valid');
        }
    }

    render(){
        return(
            <>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <FormField 
                            formData={this.state.formData.name} 
                            id="name"
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <FormField 
                            formData={this.state.formData.lastName} 
                            id="lastName"
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <FormField
                            formData={this.state.formData.age}
                            change={(element) => this.updateForm(element)}
                            id="age"
                        >
                            <option value="">--Select age--</option>
                            {this.generateAgeOptions()}
                        </FormField>
                    </div>
                    
                    <div className="form-group">
                        <label>Enter your message here</label>
                        <FormField 
                            formData={this.state.formData.message} 
                            id="message"
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        onClick={(event)=>this.submitForm(event)}
                        disabled={this.state.loading}
                    >
                        Submit
                    </button>

                </form>
            </>
        )
    }
}

export default FormOne;