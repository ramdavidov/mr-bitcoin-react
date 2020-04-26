import React from 'react'

export default ({ contact }) => {
    return (
        <div className="contact-preview">
            <img src={`https://robohash.org/${contact.name}.png`} alt={`${contact.name}`}/>
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
        </div>
    )
}
