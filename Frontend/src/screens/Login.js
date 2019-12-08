import * as React from "react";
import { connect } from "react-redux";
import { loginUser, loginFacebook } from "../redux/auth/actions";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./ScreensCSS/login.css";
import FacebookLogin from "react-facebook-login";
import NavBarPending from "../components/NavBarPending"


import { Form, Col, Input, Button, Row } from "antd";

export class PureLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;
    this.setState(state);
    // console.log(state)
  };

  login = () => {
    this.props.login(
      this.state.email,
      this.state.password,
      this.state.userType
    );
    // Wrong Login Info Message
    // if (500 !== null) {
    //   this.setState({ errorMessage: "Wrong Account or Password" });
    //   alert(this.state.errorMessage);
    // }
  };

  // Redirect pages Based on userType once login
  componentDidMount() {
    if (localStorage.getItem("userType") === "expert") {
      this.props.history.push("/earnings");
    }
    if (localStorage.getItem("userType") === "student") {
      console.log("push to studentDashboard");
      this.props.history.push("/studentDashboard");
    }
    if (localStorage.getItem("userType") === "admin") {
      this.props.history.push("/adminJobPending");
    }
    if (localStorage.getItem("userType") === "jobPending") {
      this.props.history.push("/error404");
    }
  }

  componentClicked() {
    return null;
  }

  // responseFacebook = userInfo => {
  //   if (userInfo.accessToken) {
  //     this.props.loginFacebook(userInfo.accessToken);
  //   }
  //   return null;
  // };

  render() {
    return (
      <div>
            <NavBarPending/>

      <div className="login-container">
        <Form className="login-form">
          <h2 className="text-center">Login</h2>
          <Form.Item>
            <Input
              onChange={this.onChangeField.bind(this, "email")}
              type="text"
              value={this.state.email}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              onChange={this.onChangeField.bind(this, "password")}
              type="password"
              value={this.state.password}
              placeholder="Password"
            />
          </Form.Item>
          <div className="login-btn">
            <Button className="btn-lg btn-dark btn-block" onClick={this.login}>
              Login
            </Button>
          </div>
          <div style ={{textAlign: "center"}} className="loginMisc">
            <a href="/signup">Sign up!</a>
          </div>
        </Form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
    isAuthenticated: state.auth.isAuthenticated,
    userType: state.auth.userType,
    loginErrorMessage: state.auth.loginErrorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Pass email & password to auth_actions
    login: (email, password) => {
      dispatch(loginUser(email, password));
    },
    loginFacebook: accessToken => {
      dispatch(loginFacebook(accessToken));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PureLogin);
