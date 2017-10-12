import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Form ,Button, Message} from "semantic-ui-react";
import Validator from "validator" ;
import InlineError from "../message/InlineError";


class SignupForm extends Component {
    state = {
        data :{
            email : "",
            password : ""
        },
        loading :false ,
        errors : {}
    }

    onchange = (e) => {
        this.setState({
            data : { ...this.state.data , [e.target.name] : e.target.value}
        })
    };

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0 ){
            this.setState({loading:true});
            this.props
                .submit(this.state.data)
                .catch(err => 
                    this.setState({errors : err.response.data.errors ,loading: false})
                );
        }
    };
    
    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    };


    render() {
        const { data, errors, loading} = this.state ;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header>{ errors.global }</Message.Header>
                    </Message> 
                )}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="example@mail.com"
                        value={data.email}
                        onChange={this.onchange}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="password"
                        value={data.password}
                        onChange={this.onchange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Sign Up</Button>
            </Form>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
  };
  
export default SignupForm;