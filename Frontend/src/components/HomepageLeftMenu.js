import React, { Component } from "react";
import { Menu, Anchor } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Link } = Anchor;

class LeftMenu extends Component {
  render() {
    return (
      <Anchor affix={false}>
        <Menu mode={this.props.mode}>
          <Menu.Item key="1">
            <Link href="#about-us" title="About Us" />
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="#student-overview" title="Student Overview" />
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="#work-with-us" title="Work with CommentFly" />
          </Menu.Item>
        </Menu>
      </Anchor>
    );
  }
}

export default LeftMenu;
