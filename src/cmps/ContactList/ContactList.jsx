import React from 'react'
import { Link } from 'react-router-dom';

import ContactPreview from '../ContactPreview/ContactPreview';

export default (props) => {
    return (
        <div className="contact-list">
            {props.contacts.map(contact => {
                return (
                    <Link to={'/contact/' + contact._id} key={contact._id}>
                        <ContactPreview contact={contact} />
                    </Link>
                )
            })}
        </div>
    )
}
