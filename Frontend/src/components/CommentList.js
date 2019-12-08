import * as React from "react";
import { connect } from "react-redux";
// import { Input, Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Card, Icon, Timeline, Tag, Typography, message, Result } from "antd";
import {
  deleteComment,
  updateCommentOnChange,
  getComments
} from "../redux/comments/actions";
import { Complete } from "./Complete";
import "./css/CommentList.css";

const { Paragraph } = Typography;

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: {},
      searchinput: this.props.searchinput
    };
  }

  componentDidMount = () => {
    this.props.getComments(this.props.url);
  };

  // componentWillReceiveProps = (prevProps) => {
  //   if (this.props.comments !== prevProps.comments) {
  //     this.props.getComments(this.props.url)
  //   }
  // }

  searchInput = input => {
    if (!input) {
      this.setState({
        searchinput: ""
      });
    }
    if ("positive".indexOf(input) !== -1 && input) {
      this.setState({
        searchinput: "true"
      });
    } else if ("critical".indexOf(input) !== -1 && input) {
      this.setState({
        searchinput: "false"
      });
    } else {
      this.setState({
        searchinput: input
      });
    }
  };

  handleChange = (id, timeCode, e) => {
    this.props.updateCommentOnChange({
      id: id,
      timeCode: timeCode,
      comment: e,
      currentVideoLink: this.props.url
    });
    if (
      this.props.comments.filter(comment => comment.id === id)[0].comment !== e
    ) {
      message.success("Comment updated.");
    }
  };

  handleMouseEnter = id => {
    this.setState(prevState => {
      return {
        isHovered: { ...prevState.isHovered, [id]: true }
      };
    });
  };

  handleMouseLeave = id => {
    this.setState(prevState => {
      return {
        isHovered: { ...prevState.isHovered, [id]: false }
      };
    });
  };

  handleDelete = async id => {
    await this.props.url;
    this.props.clickDeleteComment({
      id: id,
      currentVideoLink: this.props.url
    });
  };

  commentList = () => {
    let commentElements = [];

    for (let i = 0; i < this.props.comments.length; i++) {
      let commentId = this.props.comments[i].id;
      let commentTimeCode = this.props.comments[i].timeCode;
      let comment = this.props.comments[i].comment;
      let commentAspect = this.props.comments[i].commentAspect;
      let commentType = this.props.comments[i].commentType;

      commentElements.push(
        <Timeline.Item
          key={commentId}
          aspect={commentAspect}
          comment={comment}
          type={commentType.toString()}
          timecode={commentTimeCode}
          color={commentType ? "#52c41a" : "#eb2f96"}
        >
          <Card
            size="small"
            className="commentCards"
            hoverable
            bordered={false}
            headStyle={
              commentType
                ? { backgroundColor: "#f6ffed" }
                : { backgroundColor: "#fff0f6" }
            }
            // bodyStyle={commentType ? { backgroundColor: "#f6ffed" } : {backgroundColor: "#fff1f0"}}
            type="inner"
            onMouseEnter={() => this.handleMouseEnter(commentId)}
            onMouseLeave={() => this.handleMouseLeave(commentId)}
            title={
              <div>
                <span
                  style={
                    commentType ? { color: "#52c41a" } : { color: "#eb2f96" }
                  }
                >
                  {commentTimeCode}
                </span>
                &nbsp; &nbsp;
                {commentAspect ? (
                  <Tag
                  // color={
                  //   (commentAspect === 'accuracy') ? 'grey'
                  // : (commentAspect === 'posture') ? 'grey'
                  // : (commentAspect === 'style') ? 'grey'
                  // : 'white'
                  // }
                  >
                    {commentAspect}
                  </Tag>
                ) : (
                  <span></span>
                )}
              </div>
            }
            extra={
              this.state.isHovered[commentId]
              // &&
              // (this.props.rating === 0 || this.props.rating === null) 
              ?
              (
                <Icon
                  align="right"
                  type="delete"
                  onClick={() => {
                    this.handleDelete(commentId);
                    message.success("Comment deleted.");
                  }}
                />
              ) : (
                ""
              )
            }
            style={{ width: 300 }}
          >
            {this.state.isHovered[commentId]
            // &&
            // (this.props.rating === 0 || this.props.rating === null) 
            ?
            (
              <Paragraph
                editable={{
                  onChange: e => {
                    this.handleChange(commentId, commentTimeCode, e);
                  }
                }}
              >
                {comment}
              </Paragraph>
            ) : (
              <Paragraph>{comment}</Paragraph>
            )}
          </Card>
        </Timeline.Item>
      );
    }

    if (!this.state.searchinput) {
      return commentElements;
    } else {
      return commentElements.filter(
        comment =>
          comment.props.aspect.indexOf(this.state.searchinput) !== -1 ||
          comment.props.timecode.indexOf(this.state.searchinput) !== -1 ||
          comment.props.type.indexOf(this.state.searchinput) !== -1 ||
          comment.props.comment.indexOf(this.state.searchinput) !== -1
      );
    }
  };

  render() {
    return (
      <div>
        <Complete {...this.props} searchInput={this.searchInput} />
        <br></br>
        <br></br>
        {!this.props.comments[0] ? (
          <Result
            icon={
              <Icon type="message" theme="twoTone" twoToneColor="#69c0ff" />
            }
            title="Your comments go here"
          />
        ) : this.commentList().length === 0 ? (
          <Result
            icon={<Icon type="meh" theme="twoTone" twoToneColor="#69c0ff" />}
            title="No filtered results."
          />
        ) : (
          <Timeline>{this.commentList()}</Timeline>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    commentsSummary: state.comments.commentsSummary
  };
};

const mapDispatchToProp = dispatch => {
  return {
    clickDeleteComment: selectedComment =>
      dispatch(deleteComment(selectedComment)),
    updateCommentOnChange: selectedComment =>
      dispatch(updateCommentOnChange(selectedComment)),
    getComments: currentVideoLink => {
      dispatch(getComments(currentVideoLink));
    }
  };
};

export const RealCommentList = connect(
  mapStateToProps,
  mapDispatchToProp
)(CommentList);
