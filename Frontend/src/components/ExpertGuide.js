import { connect } from "react-redux";
import { Modal, Button } from 'antd';
import Guide1 from "../images/guide1.png";
import Guide2 from "../images/guide2.png"
import Guide3 from "../images/guide3.png"



import React, { Component, Carousel  } from "react";


const imageStyle = {
  maxWidth: "480px"
}

export default class ExpertGuide extends Component  {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    return (

<div>

        <Button type="danger" onClick={() => this.setModal2Visible(true)}>
          Commenting Walkthrough        </Button>
        <Modal
          title="
          Commenting Walkthrough"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <img style = {imageStyle} src = {Guide1}></img>
          <p>First click on the "Comment on Vidoes" button in the dashboard</p>
          <img style = {imageStyle} src = {Guide2}></img>
          <p> Press Play on the comment page, pause when you want to leave a comment!</p>
          <img style = {imageStyle} src = {Guide3}></img>
          <p> After you finish your imputs, go the the top right corner and submit!</p>
          <br/>
          <p>Congratulations! You just finished commenting and will be paid accordingly!</p>


        </Modal>
</div>
    );
  }
}
