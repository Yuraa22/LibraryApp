import React, { Component } from 'react';

export class ViewUserContacts extends Component {
  constructor(props) {
    super(props);

    var userId = this.props.match.params["userId"];

      this.state = { user: new UserData, userId: userId, usercontacts: [], loading: true };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
      this.populateUserContacts();
      this.populateUser();
  }

    handleDelete(id) {
        if (!window.confirm("Do you want to delete user contact with Id: " + id))
            return;
        else {
            fetch('api/usercontacts/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        usercontacts: this.state.userContacts.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    handleEdit(id) {
        this.props.history.push("edit-user-contact/" + this.state.userId + "/" + id);
    }

    handleCreate() {
        this.props.history.push("add-user-contact" + this.state.userId);
    }

  renderUserContactsTable(userContacts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Contact Type</th>
            <th>Contact Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userContacts.map(uc =>
            <tr key={uc.id}>
              <td>{uc.type}</td>
              <td>{uc.value}</td>
              <td>
                <button className="action" class="btn btn-secondary" onClick={() => this.handleEdit(uc.id)}>Edit</button>
                <button className="action" class="btn btn-secondary" onClick={() => this.handleDelete(uc.id)}>Delete</button>
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
      : this.renderUserContactsTable(this.state.userContacts);

      return (
      <div>
      <h1>{'User contacts - ' + this.state.user.firstName + ' ' + this.state.user.lastName}</h1>
      <p>
        <button class="btn btn-secondary" onClick={() => this.handleCreate()}>Add User Contact</button>
      </p>
        {contents}
      </div>
    );
  }

  async populateUserContacts() {
    const response = await fetch('api/usercontacts/byuserid/' + this.state.userId );
    const data = await response.json();
    this.setState({ userContacts: data, loading: false });
  }

  async populateUser(){
    const response = await fetch('api/users/' + this.state.userId);
    const data = await response.json();
    this.setState({ user: data });
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