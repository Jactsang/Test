import * as React from "react";
import { connect } from "react-redux";
import { signUpAction } from "../redux/signUp/actions";
import { Form, Col, Input, Button, Row } from "antd";
import Background from "../images/14988.jpg";
import NavBarPending from "../components/NavBarPending"


const backgroundImg = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  zIndex: 1,
  opacity: ".8"
};

export class StudentSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpType: "student",
      email: "",
      password: "",
      name: "",
      errorMessage: ""
    };
  }

  onChangeField = (field, e) => {
    const state = {};
    state[field] = e.currentTarget.value;
    this.setState(state);
  };

  signUp = () => {
    this.props.signUp(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.signUpType
    );
  };

  componentDidUpdate() {
    // Pop up Error Message when it receives this.props.errorMessage === 'The email exists'
    // this.state.errorMessage === '' prevents infinite loop
    if (
      this.state.errorMessage === "" &&
      this.props.errorMessage === "The email exists"
    ) {
      this.setState({ errorMessage: "This Email has been used" });
    }
    // Redirect to another page once sign up successfully
    if (this.props.isSignUped === true) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
    <div>
    <NavBarPending/>

      <div className="login-container" style={backgroundImg}>
        <Form className="login-form">
          <h2 className="text-center">Welcome To CommentFly</h2>
          <Form.Item>
            <Input
              onChange={this.onChangeField.bind(this, "name")}
              type="text"
              value={this.state.name}
              placeholder="Name"
            />
          </Form.Item>
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
              type="text"
              value={this.state.password}
              placeholder="Password"
            />
          </Form.Item>
          <div className="login-btn">
            <Button onClick={this.signUp}>Sign Up</Button>
          </div>
          <div className="loginMisc">
            <span className="p-2">Already a member? Login</span>
            <a href="/login"> Here!</a>
          </div>
        </Form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.signUp.signUpErrorMessage,
    isSignUped: state.signUp.isSignUped
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signUp: (name, email, password, signUpType) => {
      // Passing the signUpType to action as well
      dispatch(signUpAction(name, email, password, signUpType));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSignUp);
