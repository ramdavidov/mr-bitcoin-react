import React, { Component } from 'react'

export default class TransferFund extends Component {
    state = {
        amount: ''
    }

    onHandleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ amount: value });
    };

    onHandleSubmit = async (ev) => {
        ev.preventDefault();
        const amount = +this.state.amount
        const { maxCoins } = this.props
        if (amount > maxCoins || amount <= 0) {
            return
        }
        await this.props.onTransferCoins(amount);
        this.setState({ amount: '' });
    };

    render() {
        const { amount } = this.state
        const { maxCoins } = this.props
        return (
            <section className="transfer-fund">
                <form onSubmit={this.onHandleSubmit}>
                    <input
                        onChange={this.onHandleChange}
                        type="number"
                        value={amount}
                        min="0"
                        max={maxCoins}
                        placeholder="Select Bitcoin amount to transfer" />
                    <button>Transfer</button>
                </form>
            </section>
        )
    }
}