import React, { Component } from 'react';

export class AddUserContact extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", contactData: new UserContact };
        
        var id = this.props.match.params["id"];

        if (id > 0) {
            fetch('api/usercontacts/' + id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", contactData: data });
                });
        }

        // This will set state for Add user  
        else {
            this.state = { title: "Create", loading: false, contactData: new UserContact };
        }

        this.state.contactData.userId = this.props.match.params["userId"];
        this.state.contactData.id = id;

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
            <h3>User Contact</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit user contact.  
        if (this.state.contactData.id) {
            fetch('api/usercontacts/' + this.state.contactData.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.contactData),

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/view-user-contacts/" + this.state.contactData.userId);
                })
        }

        // POST request for Add user contact.  
        else {
            fetch('api/usercontacts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.contactData),

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/view-user-contacts/" + this.state.contactData.userId);
                })
        }
    }

    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/view-user-contacts/" + this.state.contactData.userId);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === 'type')
            this.state.contactData.type = value;

        if (name === 'value')
            this.state.contactData.value = value;
    }

    // Returns the HTML Form to the render() method.  
    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.contactData.id} />
                </div>
                <div className="form-group row" >
                    <input type="hidden" name="userId" value={this.state.contactData.userId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="type">Contact Type</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="type" defaultValue={this.state.contactData.type}
                            onChange={this.handleInputChange} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="lastName">Contact value</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="value" defaultValue={this.state.contactData.value}
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

export class UserContact {
    id;
    userId;
    type;
    value;
}
