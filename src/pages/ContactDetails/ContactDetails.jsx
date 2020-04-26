import React, { Component } from 'react'

import { loadContactById, deleteContact, resetCurrContact } from '../../actions/ContactActions';
import { getUser, addMove } from '../../actions/UserActions';
import { loadContacts } from '../../actions/ContactActions';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TransferFund from '../../cmps/TransferFund/TransferFund'
import { MoveList } from '../../cmps/MoveList/MoveList';

// Images
import userImg from '../../../src/assets/img/user.png'
import emailImg from '../../../src/assets/img/email.png'
import phoneImg from '../../../src/assets/img/phone.png'

class ContactDetails extends Component {

    async componentDidMount() {
        await this.loadContacts()
        await this.loadContact()
    }

    componentWillUnmount() {
        this.props.resetCurrContact()
    }

    loadContacts = async () => {
        await this.props.loadContacts();
    };

    loadContact = async () => {
        const id = this.props.match.params.id;
        await this.props.loadContactById(id);
    }

    onDeleteClickHandler = async () => {
        await this.props.deleteContact(this.props.contact._id);
        this.props.history.push('/contact');
    };

    transferCoins = (amount) => {
        const { contact } = this.props
        this.props.addMove(contact, amount)
    }

    get filteredMoves() {
        const moves = this.props.user.moves
        return moves.filter(move => move.toId === this.props.contact._id)
    }

    render() {
        const { contact } = this.props
        const { user } = this.props
        const title = (contact) ? `Transactions with ${contact.name}:` : ''

        if (!contact || !user) return <h1>no Contact</h1>
        return (

            <section className="contact-details">
                <div className="actions">
                    <Link to={`/contact`}>Back</Link>
                    <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
                    <button onClick={this.onDeleteClickHandler}>Delete</button>
                </div>
                <div className="contact-card">
                    <img className="contact-avatar" src={`https://robohash.org/${contact.name}.png`} alt={`${contact.name}`} />
                    <img src={userImg} alt={'user'} />
                    <span>{contact.name}</span>
                    <img src={emailImg} alt={'email'} />
                    <span>{contact.email}</span>
                    <img src={phoneImg} alt={'phone'} />
                    <span>{contact.phone}</span>
                </div>
                <TransferFund contact={contact} maxCoins={user.coins} onTransferCoins={this.transferCoins} />
                {!!this.filteredMoves.length && <MoveList title={title} moveList={this.filteredMoves} isFullList={false} />}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contact: state.contact.currContact,
        contacts: state.contact.contacts,
        user: state.user.loggedinUser,
    };
};

const mapDispatchToProps = {
    loadContacts,
    loadContactById,
    resetCurrContact,
    deleteContact,
    getUser,
    addMove,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
