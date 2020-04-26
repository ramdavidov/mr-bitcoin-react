import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom';

export default class BurgerMenu extends Component {
    state = {
        menuOpen: false
    }

    closeMenu = () => {
        this.setState({ menuOpen: false })
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
      }

    render() {
        const { menuOpen } = this.state
        return (
                <Menu className="menu-burger" right isOpen={menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                    <NavLink onClick={() => this.closeMenu()} activeClassName="active" exact to="/">Home</NavLink>
                    <NavLink onClick={() => this.closeMenu()} activeClassName="active" to="/contact">Contacts</NavLink>
                    <NavLink onClick={() => this.closeMenu()} activeClassName="active" to="/statistic">Statistics</NavLink>
                </Menu>
        )
    }
}
