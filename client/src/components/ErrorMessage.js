import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'

export const ErrorMessage = ({ message }) => {
    const errors = useSelector(state => state.errors)
    return message ? <Alert color='danger'>{errors.message}</Alert> : <></>
}
