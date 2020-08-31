import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}
    from 'reactstrap'

import { userAction } from '../actions'

export const NavBar = (props) => {
    const [state, setState] = useState({
        isOpenToggle: false,
        isDropdownOpen: false
    })

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const toggle = () => {
        setState({
            ...state,
            isOpenToggle: !state.isOpenToggle
        })
    }
    const toggleDropDown = () => {
        setState({
            ...state,
            isDropdownOpen: !state.isDropdownOpen
        })
    }

    const loginOrLogoutRender = () => {

        if (auth.isAuth) {
            return (
                <ButtonDropdown isOpen={state.isDropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle caret color="link" size="sm" >
                        Welcome {auth.profile.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => {
                            return dispatch(userAction.logout())
                        }}>Logout</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            )
        }
        else {
            return (
                <NavItem>
                    <NavLink href="/login">login</NavLink>
                </NavItem>
            )
        }

    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">My MERN APP</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={state.isOpenToggle} navbar>
                    <Nav className="ml-auto" navbar>
                        {loginOrLogoutRender()}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

