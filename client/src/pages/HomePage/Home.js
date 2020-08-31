import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup } from 'reactstrap'
import moment from 'moment'

import { expensAction } from '../../actions'
import { AddFrom, Spinner, ExpenseItem, MonthSelector, Statistics } from '../../components'

export const Home = () => {
    const MONTHS = moment.months()

    const [state, setState] = useState({
        selected: moment().month()
    })
    const dispatch = useDispatch()
    const expenselist = useSelector(state => state.expense)


    useEffect(() => {
        getExpense()
        // eslint-disable-next-line
    }, [])


    const onSelectMonth = (month) => {
        getExpense(month)
        setState({ selected: month })

    }

    const onDelete = (e) => {
        const expenseId = e.target.attributes.getNamedItem('data-id').value
        dispatch(expensAction.deleteExpense(expenseId))
    }

    const getExpense = (month) => {
        dispatch(expensAction.fetchExpense(month))
    }


    if (expenselist.fetching) {
        return <Spinner size={50} />
    }

    return (
        <div style={{ marginTop: 30 }}>
            <h3>Expense List</h3>
            <hr />
            <Statistics data={expenselist.statistics} />

            <MonthSelector
                months={MONTHS}
                onSelectMonth={onSelectMonth}
                selected={state.selected}
            />
            <ListGroup>
                {expenselist.expense.map((item) => (
                    <ExpenseItem key={item._id} item={item} onDelete={onDelete} />
                ))}
            </ListGroup>
            <AddFrom />
        </div>
    )
}
