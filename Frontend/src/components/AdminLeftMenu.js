import React, { Component } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode={this.props.mode}>
        <Menu.Item key="1">
          <a href="/adminJobPending">Pending Application</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/adminJobProcessed">Processed Application</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
