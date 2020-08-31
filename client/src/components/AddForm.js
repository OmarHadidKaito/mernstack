import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { expensAction } from '../actions'
import { FloatButton, FormBody } from '../components'




export const AddFrom = () => {
    const expense = useSelector(state => state.expense)
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const onSubmit = (values, { resetForm }) => {
        dispatch(expensAction.saveExpense(values))
        resetForm({})
    }

    useEffect(() => {
        const { saved } = expense

        if (saved && modal) {
            toggle()
            dispatch(expensAction.resetSaved())
            dispatch(expensAction.fetchExpense())
        }
    })


    return (
        <div>
            <FloatButton onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>ADD EXPENS</ModalHeader>
                <ModalBody>
                    <FormBody onSubmit={onSubmit} />
                </ModalBody>
            </Modal>
        </div>
    )
}