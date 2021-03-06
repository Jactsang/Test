import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { logoutNow } from "../redux/auth/actions";
import { connect } from "react-redux";
import ContactForm from "../components/ContactForm";



const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class RightMenu extends Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <Menu mode="horizontal">
                <Menu.Item onClick={this.logout} key="logout">
          <a href="/login">Login</a>
        </Menu.Item>
      <Menu.Item >
      <ContactForm/>
        </Menu.Item>



      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutNow());
    }
  };
};

export default RightMenu = connect(
  null,
  mapDispatchToProps
)(RightMenu);
