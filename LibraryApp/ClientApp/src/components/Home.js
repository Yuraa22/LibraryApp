import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <p>This is a library app build with</p>
        <ul>
          <li>ASP.NET Core and C#</li>
          <li>React for client-side code</li>
          <li>Bootstrap for layout and styling</li>
        </ul>
      </div>
    );
  }
}
