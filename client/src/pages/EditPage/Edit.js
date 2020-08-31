import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBody } from '../../components'
import { expensAction } from '../../actions'

export const Edit = (props, { history }) => {

    const dispatch = useDispatch()
    const expense = useSelector(state => state.expense)
    let item

    useEffect(() => {
        if (expense.updated) {
            dispatch(expensAction.resetSaved())
            props.history.push('/')
        }
    })

    try {
        item = props.location.state.item
    } catch (e) {
        item = undefined
    }

    if (!item) history.push('/')

    const onSubmit = (values) => {
        const item = props.location.state.item
        values._id = item._id
        dispatch(expensAction.updateExpense(values))
    }

    return (
        <div style={{ marginTop: 30 }}>
            <h3>Edit Expense</h3>
            <hr />
            <FormBody
                onSubmit={onSubmit}
                btnTxt="Update Expense"
                expense={item}
            />
        </div>
    )
}
