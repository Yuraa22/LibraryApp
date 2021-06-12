import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

export class ViewUsers extends Component {
  static displayName = ViewUsers.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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

    handleAdd() {
        fetch('api/users/postuserwithlink', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(this.state.userData),
                
        }).then(response => response.json())
          .then(data => {
            this.setState({
                users: this.state.users.concat(data)
            })
        });
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
                <button className="action" class="btn btn-secondary" onClick={(id) => this.handleEdit(user.id)}>Edit</button>
                <button className="action" class="btn btn-secondary" onClick={(id) => this.handleDelete(user.id)}>Delete</button>
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
         <Link class ="btn btn-secondary" to="/add-user">Create New</Link>
         <button className="action" class ="btn btn-secondary" onClick={(id) => this.handleAdd()}>Create user from blinkID</button>
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
