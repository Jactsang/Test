import React, { Component } from "react";
// import { Button, InputGroup, InputGroupText, InputGroupAddon, Input, Container, Row, Col } from 'reactstrap';

import { connect } from "react-redux";

import { addComment } from "../redux/comments/actions";

import CommentTemplates from "./CommentTemplates";

import unFormatTime from "./UnformatTime.js";

import {
  Input,
  Progress,
  Collapse,
  Button,
  Row,
  Col,
  Card,
  Icon,
  message,
  Tooltip,
  Rate,
  Tag
} from "antd";

import { Spring } from "react-spring/renderprops";

import "./css/AddComment.css";

const { CheckableTag } = Tag;
const { Panel } = Collapse;

const ButtonGroup = Button.Group;

const { TextArea } = Input;
const { Meta } = Card;

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      validateInput: false,
      currentVideoLink: this.props.url,
      video_id: this.props.video_id,
      percent: 0,
      commentType: true,
      commentAspect: "",
      templateTags: [],
      inputVisible: false,
      inputValue: '',
      templateDrawer: false
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.url !== prevProps.url) {
      this.setState({
        currentVideoLink: this.props.url
      });
    }
  };

  handleClose = removedTag => {
    const templateTags = this.state.templateTags.filter(tag => tag !== removedTag);
    this.setState({ templateTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    let { templateTags } = this.state;
    if (this.state.inputValue && templateTags.indexOf(this.state.inputValue) === -1) {
      templateTags = [...templateTags, this.state.inputValue];
    }
    this.setState({
      templateTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleTagChange = (tag, checked) => {
    if (this.state.commentAspect !== "" && this.state.commentAspect === tag) {
      this.setState({ commentAspect: "" });
    } else {
      this.setState({ commentAspect: tag });
    }
  };

  handleAddComment = e => {
    e.preventDefault();
    // console.log(e.currentTarget.getAttribute('value'))
    if (!this.state.comment) {
      this.setState({
        validateInput: true
      });
      message.error("Comment cannot be empty.");
      // } else if (this.props.comments.find(x => x.timeCode === this.props.currenttimecode) !== undefined) {
      //   this.setState({
      //     validateInput: true,
      //   })
      //   message.error('Comment for this moment in time already exists.');
    } else {
      this.props.addComment({
        ...this.state,
        timeCode: this.props.currenttimecode,
        commentType: e.currentTarget.getAttribute("value") === "true"
      });
      this.setState({
        comment: "",
        validateInput: false
      });
    }
  };

  setCommentWithTemplate = (template, aspect) => {
    this.setState({
      comment: template,
      commentAspect: aspect
    });
    message.success("Comment template applied.");
  };

  handleTemplateDrawer = () => {
    this.setState(prevState => ({
      templateDrawer: !prevState.templateDrawer
    }));
  };

  viewScoreSheet = () => {
    window.open(this.props.music_score_url);
  };

  getTemplateTags = templateTags => {
    this.setState({
      templateTags: templateTags
    });
  };

  render = () => {

    var disabled = this.state.validateInput;

    return (
      <div>
        <Row>
          <Card
            bordered={false}
            actions={
              // this.props.rating === 0 || this.props.rating === null ?
              [
              <Tooltip title="Add as positive feedback">
                <Icon
                  type="heart"
                  key="heart"
                  value={true}
                  theme="twoTone"
                  twoToneColor="#52c41a"
                  onClick={e => this.handleAddComment(e)}
                />
              </Tooltip>,
              <Tooltip title="Add as critical feedback">
                <Icon
                  type="alert"
                  key="alert"
                  value={false}
                  theme="twoTone"
                  twoToneColor="#eb2f96"
                  onClick={e => this.handleAddComment(e)}
                />
              </Tooltip>,
              <Tooltip title="View music score">
                <Icon
                  type="file-pdf"
                  key="file-pdf"
                  value={false}
                  theme="twoTone"
                  twoToneColor="#faad14"
                  onClick={this.viewScoreSheet}
                />
              </Tooltip>,
              <Tooltip title="Comment templates">
                <Icon
                  type="profile"
                  key="profile"
                  value={false}
                  theme="twoTone"
                  twoToneColor="#096dd9"
                  onClick={this.handleTemplateDrawer}
                />
              </Tooltip>
            ] 
            // : 
            // []
          }
          > 
            <Meta
              avatar={
                <Progress
                  type="circle"
                  width={80}
                  percent={
                    (unFormatTime(this.props.currenttimecode) /
                      unFormatTime(this.props.duration)) *
                    100
                  }
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068"
                  }}
                  format={() => this.props.currenttimecode}
                />
              }
              title={
                <TextArea
                  value={this.state.comment}
                  invalid={{ disabled }}
                  placeholder="Type your comments here."
                  onChange={this.handleCommentChange}
                  autosize={{ minRows: 3 }}
                  disabled={
                    // this.props.rating === 0 || this.props.rating === null
                    // ?
                    false
                    // :
                    // true
                  }
                />
              }
              description={
                <div>
                  <span style={{ marginRight: 8, display: "inline" }}>
                    Tags:
                  </span>
                  {this.state.templateTags.map((tag, index) => (
                    <CheckableTag
                      key={tag}
                      checked={this.state.commentAspect.indexOf(tag) > -1}
                      onChange={checked => this.handleTagChange(tag, checked)}
                    >
                      {tag}
                      {tag === 'posture' || tag === 'accuracy' || tag === 'style' ?
                      <span></span>
                      :
                      <Icon
                        type="close"
                        key={tag + 'icon'}
                        onClick={() => this.handleClose(tag)}
                      />}
                    </CheckableTag>
                  ))}

                  {this.state.inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={this.state.inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                      disabled={
                        // this.props.rating === 0 || this.props.rating === null ?
                        false
                        // :
                        // true
                      }
                    />
                  )}
                  {!this.state.inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                      <Icon type="plus" /> New Tag
                    </Tag>
                  )}
                </div>
              }
            />
          </Card>
        </Row>

        <Row>
          <div
            style={
              this.state.templateDrawer
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {this.props.composer &&
            (<CommentTemplates
              {...this.state}
              {...this.props}
              setCommentWithTemplate={this.setCommentWithTemplate}
              getTemplateTags={this.getTemplateTags}
            />)}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments
  };
};

const mapDispatchToProp = dispatch => {
  return {
    addComment: commentState => dispatch(addComment(commentState))
  };
};

export const RealAddComment = connect(
  mapStateToProps,
  mapDispatchToProp
)(AddComment);
