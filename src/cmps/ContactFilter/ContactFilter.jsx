import React, { Component } from 'react'

export default class ContactFilter extends Component {
    state = {
        term: '',
    };

    constructor(props) {
        super(props);
        this.state = { ...props.filterBy };
    }

    onChangeHandler = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value }, () => {
            this.props.onFilter({ ...this.state });
        });
    };

    onKeyHandler = (ev) =>{     
        if(ev.keyCode === 13){
          ev.preventDefault()
          this.props.moveToContact()   
        }
      }

    render() {
        return (
            <form className="contact-filter" onKeyDown={this.onKeyHandler}>
                <input
                    type="text"
                    placeholder="Search contact"
                    onChange={this.onChangeHandler}
                    name="term"
                    value={this.state.term}
                />
            </form>
        )
    }
}
