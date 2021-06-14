import React, { Component } from 'react';
import * as moment from 'moment';

export class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", userData: new UserData };

        var id = this.props.match.params["id"];

        // This will set state for Edit user  
        if (id > 0) {
            fetch('api/users/' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", userData: data });
                });
        }

        // This will set state for Add user  
        else {
            this.state = { title: "Create", loading: false, userData: new UserData };
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>User</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit user.  
        if (this.state.userData.id) {
            fetch('api/users/' + this.state.userData.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.userData),

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/view-users");
                })
        }

        // POST request for Add user.  
        else {
            fetch('api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.userData),

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/view-users");
                })
        }
    }

    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/view-users");
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === 'firstName')
            this.state.userData.firstName = value;

        if (name === 'lastName')
            this.state.userData.lastName = value;

        if (name === 'dateOfBirth')
            this.state.userData.dateOfBirth = value;
    }

    // Returns the HTML Form to the render() method.  
    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.userData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="firstName">First Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="firstName" defaultValue={this.state.userData.firstName}
                            onChange={this.handleInputChange} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="lastName">Last Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="lastName" defaultValue={this.state.userData.lastName}
                            onChange={this.handleInputChange} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="dateOfBirth">Date of Birth</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="dateOfBirth"
                            defaultValue={moment(this.state.userData.dateOfBirth).format('YYYY-MM-DD')}
                            onChange={this.handleInputChange} required />
                        </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-secondary">Save</button>
                    <button className="btn btn-secondary" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
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
