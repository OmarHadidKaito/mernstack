import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, } from 'react-redux'

import { userAction } from '../../actions'

const initialValues = {
    name: '',
    email: '',
    password: ''
}

const Schema = new Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(6)
        .required(),
})

export const Signup = ({ history }) => {
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        dispatch(userAction.signIn(values))
        history.push(`/login`)
    }

    return (
        <div style={{ padding: 20 }}>
            <h3>Create new account</h3>
            <hr />
            <Formik
                initialValues={initialValues}
                validationSchema={Schema}
                onSubmit={onSubmit}
            >
                {({
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    isSubmitting,
                    isValid,
                    touched,
                    errors
                }) => (
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    invalid={errors.name && touched.name}
                                    name="name"
                                    type="string"
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.name && touched.name && (<FormFeedback>{errors.name}</FormFeedback>)}
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    invalid={errors.email && touched.email}
                                    name="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.email && touched.email && (<FormFeedback>{errors.email}</FormFeedback>)}
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    invalid={errors.password && touched.password}
                                    name="password"
                                    type="password"
                                    placeholder="Your Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (
                                    <FormFeedback>{errors.password}</FormFeedback>
                                )}
                            </FormGroup>
                            <Button color="primary" block onClick={handleSubmit} disabled={!isValid || isSubmitting}>Create Account</Button>
                        </Form>
                    )}
            </Formik>
            <Link to="/login">Have an account? Sign In</Link>
        </div>
    )
}

