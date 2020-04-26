import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getUser } from '../../actions/UserActions';
import { loadContacts } from '../../actions/ContactActions';
import { BitcoinService } from '../../services/BitcoinService';
import { MoveList } from '../../cmps/MoveList/MoveList';
import LoadingCmp from '../../cmps/LoadingCmp/LoadingCmp'

// Images
import userImg from '../../../src/assets/img/user.png'
import coinImg from '../../../src/assets/img/bitcoin.png'
import moneyImg from '../../../src/assets/img/money.png'
import rateImg from '../../../src/assets/img/rate.png'
import contactImg from '../../../src/assets/img/contact.png'

class HomePage extends Component {
    state = {
        rate: null
    }

    async componentDidMount() {
        this.loadContacts()
        setTimeout(() => {
            this.loadRate()
        }, 500);

    }

    loadRate = async () => {
        const rate = await BitcoinService.getRate()
        this.setState({ rate })
    }

    loadContacts = async () => {
        await this.props.loadContacts(this.state.filterBy);
    }

    get avatarImg() {
        return `https://robohash.org/${this.props.user.name}.png`
    }

    get coinValue() {
        const value = this.props.user.coins / this.state.rate
        return value.toFixed(2)
    }

    get lastMoves() {
        return this.props.user.moves.slice(0, 3)
    }

    get contactsSum() {
        return this.props.contacts.length
    }

    movesTitle() {
        const moves = this.props.user.moves.slice(0, 3)
        if (moves.length === 1) return 'Last move:'
        if (moves.length > 1) return `Last ${moves.length} moves:`
    }

    render() {
        const { rate } = this.state;
        const { user } = this.props;
        const { contacts } = this.props;
        const title = (user) ? this.movesTitle() : ''

        if (!rate || !user) return (<LoadingCmp />)
        return (
            <section className="home-page">
                <h2>Wallet:</h2>
                <div className="user-card">
                    <img className="user-avatar" src={this.avatarImg} alt={`${user.name}`} />
                    <img src={userImg} alt={'user'} />
                    <span>{user.name}</span>
                    <img src={coinImg} alt={'coins'} />
                    <span>Bitoins: ₿{user.coins}</span>
                    <img src={moneyImg} alt={'value'} />
                    {rate && <span>Coins Value: ${this.coinValue}</span>}
                </div>
                <h2>Dashboard:</h2>
                <div className="dashboard">
                    <img src={rateImg} alt={'rate'} />
                    {rate && <span>$1 is worth ₿{rate}</span>}
                    <NavLink exact to="/statistic">Check analytics</NavLink>
                    <img src={contactImg} alt={'rate'} />
                    {contacts && <span>you have {this.contactsSum} contacts</span>}
                    <NavLink exact to="/contact">Transfer bitcoins</NavLink>
                </div>
                {!!user.moves.length && <MoveList title={title} moveList={this.lastMoves} isFullList={true} />}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.loggedinUser,
        contacts: state.contact.contacts
    };
};

const mapDispatchToProps = {
    getUser,
    loadContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);