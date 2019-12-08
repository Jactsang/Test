import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button, Timeline, Tag, Typography } from 'antd';
import { getComments } from '../redux/comments/actions'

const { Paragraph } = Typography;

export class CommentViewOnly extends React.Component {
  componentDidMount() {
    this.getComments(this.props.url);
    // console.log(this.props.url)
    // console.log(this.getComments(this.props.url))
  }

  getComments = currentVideoLink => {
    this.props.getComments(currentVideoLink);
  };

  timeGet = index => {
    let timeStamp = this.props.comments[index].timeCode;
    // console.log(timeStamp)
    this.props.changeTime(timeStamp);
  }

  render() {
    const commentList = this.props.comments.map((comment, index) => (
      <Timeline.Item key={comment.id}
                color={comment.commentType ? "#52c41a" : "#eb2f96"}
                >
        <Card size="small" bordered={true} type="inner" 
        headStyle={ comment.commentType
            ? { backgroundColor: "#f6ffed" }
            : { backgroundColor: "#fff0f6" }
        }
        title={<div>
              <span style={ comment.commentType ? { color: "#52c41a" } : { color: "#eb2f96" } } >
                  <Button shape="circle" onClick={() => { this.timeGet(index) }}
                    style={this.props.time_code === comment.timeCode ? { backgroundColor: "#e6fffb" } : {}}>Go</Button>
                  &nbsp;&nbsp;
                  {comment.timeCode}
              </span>
                  &nbsp;&nbsp;
                  {comment.commentAspect ?
                      <Tag>{comment.commentAspect}</Tag>
                      :
                      <span></span>
                  }
                </div>}
        style={this.props.time_code === comment.timeCode ? { backgroundColor: "#e6fffb",  width: 300 } : {width: 300} }>

            <Paragraph>{comment.comment}</Paragraph>
      </Card>
      </Timeline.Item>
    ));

    return (
      <div>
        <Timeline>
          {commentList}
        </Timeline>
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
    getComments: (currentVideoLink) => {
      dispatch(getComments(currentVideoLink))
    }
  }
}

export const CommentView = connect(mapStateToProps, mapDispatchToProp)(CommentViewOnly);
