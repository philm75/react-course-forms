import React,{ Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

class FormTwo extends Component {

    state = {
        maxAge:80,
        submitting:false
    }

    formSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last name is required'),
        age: Yup.number().required('Age is required').min(20, 'Age must be greater than 20'),
        message: Yup.string().required('Message is required')
    });

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

    render() {
        return (
            <>
                <Formik
                    initialValues={{name: '', lastName: '', age: '', message: ''}}
                    validationSchema={this.formSchema}
                    // validate={values => {
                    //     let errors = {};

                    //     if (!values.name) {
                    //         errors.name = 'Name is required';
                    //     }

                    //     if (!values.lastName) {
                    //         errors.lastName = 'Last name is required';
                    //     }

                    //     if (values.age) {
                    //         if (values.age <= 20) {
                    //             errors.age = 'You must be over 20';
                    //         }
                    //     } else {
                    //         errors.age = 'Age is required';
                    //     }

                    //     if (!values.message) {
                    //         errors.message = 'Message is required';
                    //     }
                    //     return errors;
                    // }}
                    onSubmit={(values, {resetForm}) => {
                        this.setState({submitting:true});
                        setTimeout(() => {                            
                            this.setState({submitting:false});
                            resetForm();
                            console.log(values);
                        }, 2000);
                    }}
                >
                    {
                        ({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting                           
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{
                                            background: `${errors.name && touched.name ? 'red' : ''}`
                                        }}
                                    />
                                    {errors.name && touched.name ? 
                                        <div style={{color: 'red'}}>
                                            {errors.name}
                                        </div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Lastname</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        style={{
                                            background: `${errors.lastName && touched.lastName ? 'red' : ''}`
                                        }}                                                                               
                                    />
                                    {errors.lastName && touched.lastName ? 
                                        <div style={{color: 'red'}}>
                                            {errors.lastName}
                                        </div> : null
                                    }                                    
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <select
                                        name="age"
                                        className="form-control"
                                        value={values.age}
                                        onChange={handleChange}
                                        onBlur={handleBlur}                                                                                                                                                                                            
                                    >
                                        <option value="">--Select age--</option>
                                        {this.generateAgeOptions()}                                    
                                    </select>
                                    {errors.age && touched.age ? 
                                        <div style={{color: 'red'}}>
                                            {errors.age}
                                        </div> : null
                                    }                                      
                                </div>
                                <div className="form-group">
                                    <label>Enter your message here</label>
                                    <textarea 
                                        rows="3"
                                        placeholder="Add your message here..."
                                        className="form-control"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}  
                                        style={{
                                            background: `${errors.message && touched.message ? 'red' : ''}`
                                        }}                                                                                 
                                    ></textarea>
                                    {errors.message && touched.message ? 
                                        <div style={{color: 'red'}}>
                                            {errors.message}
                                        </div> : null
                                    }                                     
                                </div>
                                <button 
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={this.state.submitting}
                                >
                                    Submit
                                </button>
                            </form>
                        )
                    }
                </Formik>
            </>
        )
    }
}

export default FormTwo;