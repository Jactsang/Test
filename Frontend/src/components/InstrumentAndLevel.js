
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Form, Input, Icon, Button, Menu, Dropdown, message } from 'antd';

let id = 0;

export class InstrumentAndLevel extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
    handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
    }

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">
            <Icon type="user" />
            1st menu item
            </Menu.Item>
            <Menu.Item key="2">
            <Icon type="user" />
            2nd menu item
            </Menu.Item>
            <Menu.Item key="3">
            <Icon type="user" />
            3rd item
            </Menu.Item>
        </Menu>
    );

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
      
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
    
        
      <Form.Item
  


        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Passengers' : ''}
        Dropdown ={index === 0 ? 'Passengers' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            },
          ],
        })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
    <div>
        <Dropdown overlay={this.menu}>
            <Button>
                Button <Icon type="down" />
            </Button>
        </Dropdown>

        <Form onSubmit={this.handleSubmit}>
            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> Add field
            </Button>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}> */}
            <Button type="primary" htmlType="submit">
                Submit
            </Button> 
            </Form.Item>
        </Form>
      </div>
    );
  }
}

export const InstrumentAndLevelSection = Form.create({ name: 'dynamic_form_item' })(InstrumentAndLevel);

// ReactDOM.render(<WrappedDynamicFieldSet />, document.getElementById('container'));
          