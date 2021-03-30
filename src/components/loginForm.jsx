import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleSubmit = (e) => {
    e.preventDefault();

    const username = this.username.current.value;
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div class="mb-3">
            <label for="username" class="form-label">
              Email address
            </label>
            <input
              autoFocus
              ref={this.username}
              type="email"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
