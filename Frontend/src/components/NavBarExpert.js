import React, { Component } from "react";
import LeftMenu from "./ExpertLeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button, Icon } from "antd";
import "./Navbar.css";
import CommentFlyLogo from "../images/commentflyLogo.png"


const style = {
  width: "80px",
  height: "50px",
  // maxWidth: "80px",
  // maxHeight: "50px"
}

const borderStyle = {
  padding: "0",
  margin: "0"
}

class Navbar extends Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <nav className="menu">
        <div className="menu__logo">
        <a style={borderStyle} href="/expertDashboard" >
              <div>
                <img src = {CommentFlyLogo} style = {style}></img>
              </div>
            </a>        </div>
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu_right">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={this.showDrawer}
          >
            <Icon type="align-right" />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    );
  }
}

export default Navbar;
