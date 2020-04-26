import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage'
import SignupPage from './pages/SignupPage/SignupPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ContactDetails from './pages/ContactDetails/ContactDetails'
import ContactEdit from './pages/ContactEdit/ContactEdit'
import StatisticPage from './pages/StatisticPage/StatisticPage'
import MainNavbar from './cmps/MainNavbar/MainNavbar'

import { getUser } from './actions/UserActions';


class App extends Component {
  async componentDidMount() {
    await this.props.getUser();
    if (!this.isInSignupPage && !this.props.user) {
      this.props.history.push("/signup")
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.location !== prevProps.location &&
      !this.props.user &&
      !this.isInSignupPage
    ) {
      this.props.history.push("/signup");
    }
  }

  get isInSignupPage() {
    return this.props.location.pathname === "/signup";
  }

  render() {
    if (!this.isInSignupPage && !this.props.user) return <h1>NOTHING</h1>
    return (
      <div className="App main-layout">
        <MainNavbar className="main-navbar" />
        <main className="container">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/contact/edit/:id?" component={ContactEdit} />
            <Route path="/contact/:id" component={ContactDetails} />
            <Route path="/statistic" exact component={StatisticPage} />
          </Switch>
        </main>
      </div>
    );
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
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
