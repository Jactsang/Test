import * as React from 'react';
import StudentViewCom from '../screens/StudentViewCom';
import CommentViewOnly from '../components/CommentViewOnly';
import {PDFObject} from 'react-pdfobject';
// import ViewScoreSheet from '../components/ViewScoreSheet';
import { shallow, mount } from 'enzyme';
import { Button } from 'antd';

describe('StudentViewCom Page', () => {
  it('renders PageHeader', () => {
    const wrapper = shallow(<CommentViewOnly />);
    expect(wrapper.find('Button').length).toEqual(1);
    expect(wrapper.findByType('Button').props.toBe('success'));
  });

  // it('Should call show function on button click', ()=>{
    // const wrapper = shallow(<StudentViewCom />);
    // const onClick = jest.fn();
  //   const instance = wrapper.instance();
  //   jest.spyOn(instance, 'show');
  //   wrapper.find('button').simulate('click');
  //   expect(instance.show).toHaveBeenCalled();
  // });
});