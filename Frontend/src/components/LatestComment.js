import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCommentAspect } from '../redux/videoFigures/actions'
import { List, Button, Row, Col, Icon } from 'antd';
import 'antd/dist/antd.css';

class LatestComment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getCommentAspect();
    }

    formatDate = (date) => {
        const newDate = new Date(date).toLocaleString();
        return newDate.split(',')[0]
    }

    listComment = () => {
        let weakness = this.props.weakestAspect;
        let propsComment = this.props.commentAspect;
        let weakestComment = propsComment.filter(comment =>
            comment.comment_aspect.toUpperCase() === weakness.toUpperCase());
        let data = [];
        for (let i = 0; i < weakestComment.length; i++) {
            let commentDate = `${weakestComment[i].updated_at}`
            data.push({
                date: this.formatDate(commentDate),
                comment: weakestComment[i].comment,
                timecode: weakestComment[i].comment_timecode,
                videoID: weakestComment[i].video_id,
                videoURL: weakestComment[i].video_link
            })

            if(i>=2){
                break;
            }
        }
        return data
    }

    render() {
        return (
            <Fragment>
                <List
                    size="small"
                    header={<div >KEY IMPROVEMENT ASPECT: <font style={{color: '#1890ff'}}>{this.props.weakestAspect}</font></div>}
                    bordered
                    dataSource={this.listComment()}
                    renderItem={item =>
                        <List.Item
                        actions={[<a href={`/studentViewCom/${item.videoID}`} onClick={() => localStorage.setItem('link', item.videoURL)}>Watch Video</a>]}
                        >
                                <Icon type="message" />
                                {` "${item.comment}" ${item.timecode} `}
                                <br/>
                                <font style={{fontSize: '0.6rem'}}>{`Commented on ${item.date}`}</font>
                                {/* <a href={`/studentViewCom/${item.videoID}`}><Button value="small">Watch Video</Button></a> */}
                        </List.Item>}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentAspect: state.vidFiguresStore.commentAspect,
        weakestAspect: state.vidFiguresStore.weakestAspect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCommentAspect: () => {
            dispatch(getCommentAspect())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LatestComment);