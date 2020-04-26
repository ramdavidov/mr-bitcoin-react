import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signup, getUser } from '../../actions/UserActions';
import logo from '../../../src/assets/img/bitcoin.png'

class SignupPage extends Component {
    state = {
        username: "",
    };
    componentDidMount() {
        this.getLoggedinUser();
    }

    getLoggedinUser = async () => {
        await this.props.getUser();
        if (this.props.user) this.props.history.push("/");
    };

    onHandleChange = (ev) => {
        this.setState({
            username: ev.target.value
        })
    };

    onHandleSubmit = (ev) => {
        ev.preventDefault();
        this.props.signup(this.state.username);
        this.props.history.push("/");
    };
    render() {
        return (
            <section className="signup-page">
                <h1>Weclome to MR. Bitcoin</h1>
                <h2>The #1 Bitcoin wallet app</h2>
                <div className="signup-main">
                    <img src={logo} alt="MR. Bitcoin" className="animated bounce delay-1s"></img>
                    <form onSubmit={this.onHandleSubmit}>
                        <input type="text" onChange={this.onHandleChange} placeholder={'Choose your username'} />
                        <button>Sign in</button>
                    </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.loggedinUser,
    };
};

const mapDispatchToProps = {
    signup, getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
