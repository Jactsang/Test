import React, { Component } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode={this.props.mode}>
        <Menu.Item key="1">
          <a href="/uploadVideo">Upload Now!</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/videosList">View All Videos</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/studentDashboard">Dashboard</a>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="/subscription">Subscription</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
