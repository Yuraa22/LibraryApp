import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ViewUsers } from './components/ViewUsers';
import { ViewUserContacts } from './components/ViewUserContacts';

import './custom.css'
import { AddUser } from './components/AddUser';
import { AddUserContact } from './components/AddUserContact';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/view-users' component={ViewUsers} />
            <Route path='/add-user' component={AddUser} />
            <Route path='/edit-user/:id' component={AddUser} />
            <Route path='/add-user-contact/:userId' component={AddUserContact} />
            <Route path='/edit-user-contact/:userId/:id' component={AddUserContact} />
            <Route path='/view-user-contacts/:userId' component={ViewUserContacts} />
      </Layout>
    );
  }
}
