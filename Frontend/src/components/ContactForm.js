import React from "react";
import * as emailjs from "emailjs-com";
import { Form, Input, Button, Row, Col, message, Modal, Menu } from "antd";
import TextArea from "antd/lib/input/TextArea";




const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      errors: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  }
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
  

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  validateFields() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.name || this.state.name.length < 3) {
      errors.name = "Minimum 3 characters";
      formIsValid = false;
    }
    if (!this.state.subject || this.state.subject.length < 3) {
      errors.subject = "Minimum 3 characters";
      formIsValid = false;
    }
    if (!this.state.message || this.state.message.length < 10) {
      errors.message = "Minimum 10 characters";
      formIsValid = false;
    }
    if (!this.state.email || this.state.email.length < 3) {
      errors.email = "Minimum 3 characters";
      formIsValid = false;
    }

    let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!pattern.test(this.state.email)) {
      errors.email = "This is nor a valid email.";
      formIsValid = false;
    }

    this.setState({
      errors: errors
    });

    return formIsValid;
  }

  sentMessage(e) {
    e.preventDefault();

    if (!this.validateFields()) {
      return;
    }

    var templateParams = {
      from_name: this.state.name + "(" + this.state.email + ")",
      to_name: "commentfly@gmail.com",
      subject: this.state.subject,
      message_html: this.state.message
    };

    emailjs
      .send(
        "gmail",
        "template_OGAuqKYn",
        templateParams,
        "user_338BmRmvwVey0Ijg2sde8"
      )
      .then(
        response => {
          message.success("Message sent.");
        },
        err => {
          message.error("Something went wrong.");
        }
      );

    this.setState({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  }

  render() {
    return (
      <div style = {{padding: "0", marginBottom: "10px"}}>
                <a style = {{padding: "0", margin: "0"}} onClick={() => this.setModal2Visible(true)}>
         Contact Us      </a>
        <Modal
          title="
          Questions? Comments? Contact us!"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          footer={
          null
          }
        >
        <Row justify="center" align="middle">
          <Form
            id={this.props.id}
            className={this.props.className}
            name={this.props.name}
            method={this.props.method}
            action={this.props.action}
          >
            <Form.Item
              {...formItemLayout}
              label="Name"
              required={true}
              validateStatus={this.state.name ? "success" : ""}
              help={this.state.errors.name}
            >
              <Input
                type="text"
                name="name"
                onChange={this.handleInputChange.bind(this)}
                value={this.state.name}
              />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Email"
              required={true}
              validateStatus={this.state.email ? "success" : ""}
              help={this.state.errors.email}
            >
              <Input
                type="email"
                name="email"
                onChange={this.handleInputChange.bind(this)}
                value={this.state.email}
              />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Subject"
              required={true}
              validateStatus={this.state.subject ? "success" : ""}
              help={this.state.errors.subject}
            >
              <Input
                type="text"
                name="subject"
                onChange={this.handleInputChange.bind(this)}
                value={this.state.subject}
              />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Message"
              required={true}
              validateStatus={this.state.subject ? "success" : ""}
              help={this.state.errors.subject}
            >
              <TextArea
                name="message"
                id="message"
                rows="8"
                onChange={this.handleInputChange.bind(this)}
                value={this.state.message}
              />
            </Form.Item>

            <Row id="submit-button">
              <Col span={3} offset={11}>
                <Button
                  onClick={this.sentMessage.bind(this)}
                  type="primary"
                  name="submit"
                  required="required"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>

        </Modal>

      </div>
    );
  }
}
