import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadContacts } from '../../actions/ContactActions';

import LoadingCmp from '../../cmps/LoadingCmp/LoadingCmp'
import ContactFilter from '../../cmps/ContactFilter/ContactFilter';
import ContactList from '../../cmps/ContactList/ContactList';

import addImg from '../../../src/assets/img/add.png'

class ContactPage extends Component {
    state = {
        filterBy: {
            term: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.loadContacts()
        }, 500);
    }

    loadContacts = async () => {
        await this.props.loadContacts(this.state.filterBy);
    }

    onFilterHandler = (filterBy) => {
        this.setState((prevState) => {
            return {
                filterBy: {
                    ...prevState.filterBy,
                    ...filterBy,
                },
            };
        }, this.loadContacts);
    }

    onHandleKeyPress = () => {
        if (this.props.contacts.length === 1) {
            console.log('here');
            let id = this.props.contacts[0]._id
            console.log(id);
            this.props.history.push(`/contact/${id}`);
        }
    }

    render() {
        const { contacts } = this.props
        if (!contacts.length) return <LoadingCmp />
        return (
            <section className="contact-page">
                <Link className="contact-add" to="/contact/edit">
                    <img src={addImg} alt={'add contact'} />
                </Link>
                <ContactFilter
                    filterBy={this.state.filterBy}
                    onFilter={this.onFilterHandler}
                    moveToContact={this.onHandleKeyPress} />
                <ContactList contacts={contacts} />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contact.contacts
    };
};

const mapDispatchToProps = {
    loadContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);