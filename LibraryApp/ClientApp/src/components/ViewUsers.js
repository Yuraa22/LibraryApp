import React, { Component } from 'react';
import * as moment from 'moment';

export class ViewUsers extends Component {
  static displayName = ViewUsers.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true, imageSource: "" };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleViewContacts = this.handleViewContacts.bind(this);
  }

  componentDidMount() {
    this.populateUsers();
  }

    handleDelete(id) {
        if (!window.confirm("Do you want to delete user with Id: " + id))
            return;
        else {
            fetch('api/users/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        users: this.state.users.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    handleEdit(id) {
        this.props.history.push("edit-user/" + id);
    }

    handleViewContacts(id) {
        this.props.history.push("view-user-contacts/" + id);
    }

    handleCreate() {
        this.props.history.push("add-user");
    }

    handleAdd() {
        fetch('api/users/postfromimagesource/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.imageSource),
                
        }).then(response => response.json())
          .then(data => {
            this.setState({
                users: this.state.users.concat(data)
            })
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === 'postImageSource')
            this.state.imageSource = value;
    }

  renderUsersTable(users) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Valid ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{moment(user.dateOfBirth).format('DD-MM-YYYY')}</td>
              <td>{user.isValid?String(user.isValid):'N/A'}</td>
              <td>
                <button className="action" class="btn btn-secondary" onClick={() => this.handleEdit(user.id)}>Edit</button>
                <button className="action" class="btn btn-secondary" onClick={() => this.handleDelete(user.id)}>Delete</button>
                <button className="action" class="btn btn-secondary" onClick={() => this.handleViewContacts(user.id)}>Contact Info</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderUsersTable(this.state.users);

    return (
      <div>
      <h1 id="tabelLabel" >Library users</h1>
      <p>
        <button class="btn btn-secondary" onClick={() => this.handleCreate()}>Create New</button>
      </p>
      <p>
        <button className="action" class="btn btn-secondary" onClick={() => this.handleAdd()}>Create user from image source</button>
        <input type="text" name="postImageSource" onChange={this.handleInputChange} />
      </p>
        {contents}
      </div>
    );
  }

  async populateUsers() {
    const response = await fetch('api/users');
    const data = await response.json();
    this.setState({ users: data, loading: false });
  }
}

export class UserData {
    id;
    firstName;
    lastName;
    dateOfBirth;
    isValid;
    userContacts;
}
