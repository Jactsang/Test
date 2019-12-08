import * as React from "react";
import RightMenu from "./RightMenuHomepage";
import { Drawer, Button, Icon, Anchor } from "antd";
import "../components/ComponentCSS/NavbarHomepage.css"
import CommentFlyLogo from "../images/commentflyLogo.png"
const { Link } = Anchor;

const style = {
  width: "80px",
  height: "45px",
  // maxWidth: "80px",
  // maxHeight: "50px"
}

const borderStyle = {
  padding: "0",
  margin: "0"
}

export default class NavBarHomepage extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Anchor affix={true}>
        <nav  className="menu">
          <div className="menu__logo">
            <a style={borderStyle} href="/" >
              <div>
                <img src = {CommentFlyLogo} style = {style}></img>
              </div>
            </a>
          </div>
          <div className="menu__container">
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
              <RightMenu mode="inline" />
            </Drawer>
          </div>
        </nav>
      </Anchor>
    );
  }
}
