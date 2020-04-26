import React from 'react';
import { connect } from "react-redux";

import { loadContactById, saveContact, resetCurrContact } from '../../actions/ContactActions';

class ContactEdit extends React.Component {
    state = {
        _id: '',
        name: '',
        email: '',
        phone: ''
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            await this.props.loadContactById(id);
            this.setState({ ...this.props.contact })
        }
    }

    componentWillUnmount() {
        this.props.resetCurrContact()
    }

    onHandleChange = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value });
    };

    onSaveContact = async (ev) => {
        ev.preventDefault();

        const contact = await this.props.saveContact({ ...this.state });

        this.props.history.push(`/contact/${contact._id}`);
    };

    render() {
        const { name, email, phone } = this.state
        return (
            <section className="contact-edit">
                <form onSubmit={this.onSaveContact}>
                    <label>
                        Name:
                        </label>
                    <input
                        onChange={this.onHandleChange}
                        value={name}
                        type="text"
                        name="name"
                        required
                    />
                    <label>
                        Email:
                        </label>
                    <input
                        onChange={this.onHandleChange}
                        value={email}
                        type="text"
                        name="email"
                        required
                    />
                    <label>
                        Phone:
                        </label>
                    <input
                        onChange={this.onHandleChange}
                        value={phone}
                        type="text"
                        name="phone"
                        required
                    />
                    <button>SAVE</button>
                </form>
            </section>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        contact: state.contact.currContact,
    };
};
const mapDispatchToProps = {
    loadContactById,
    saveContact,
    resetCurrContact
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);