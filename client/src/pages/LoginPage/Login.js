import React from 'react'
import { Button, FormGroup, Label, Input, FormFeedback, Form, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { userAction } from "../../actions"
const initialValues = {
    email: '',
    password: ''
}



const Schema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(6)
        .required()
})


export const Login = ({ history }) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    React.useEffect(() => {
        if (auth.isAuth)
            history.push(`/`)
    })

    const errorRender = () => {
        if (auth.error)
            return (<Alert color="danger">{auth.error}</Alert>)
    }

    const onSubmit = Values => { return dispatch(userAction.login(Values)) }

    return (
        <div style={{ padding: 20 }}>
            <h3>Sign in to your account</h3>
            {errorRender()}
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
                                <Label>Email</Label>
                                <Input
                                    invalid={errors.email && touched.email}
                                    name='email'
                                    type='email'
                                    placeholder='example@example.com'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.email && touched.email ? (
                                    <FormFeedback>{errors.email}</FormFeedback>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    invalid={errors.password && touched.password}
                                    name='password'
                                    type='password'
                                    placeholder='Top secret'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ?
                                    (<FormFeedback>{errors.password}</FormFeedback>) : null}
                            </FormGroup>
                            <Button color='primary' block onClick={handleSubmit} disabled={!isValid || isSubmitting} >Sign In </Button>
                        </Form>
                    )}
            </Formik>
            <Link to='/signup'>Do not have an account? Sign Up Now</Link>
        </div>
    )
}