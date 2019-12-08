import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Tag, Rate } from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/lastVideoUploaded.css';

class LastCommentedVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    formatDate = (date) => {
        const newDate = new Date(date).toLocaleString();
        return newDate.split(',')[0]
    }

    formatTag = (item) => {
        let itemString = `${item}`;
        return itemString.toUpperCase();
    }

    render() {
        const { Meta } = Card;
        let lastVideoCommented = this.props.videoData;
        let rating = lastVideoCommented.rating;
        let commentedDate = this.formatDate(lastVideoCommented.updated_at)

        return (
            <Fragment>
                <a href={'/studentViewCom/' + lastVideoCommented.id} onClick={() => localStorage.setItem('link', lastVideoCommented.video_link)} style={{ textDecoration: 'none' }}>
                    <Card
                        hoverable
                        className="figuresCard"
                        cover={<img alt="videoThumbnail" src={lastVideoCommented.thumbnail_url} />}
                    >
                        <Meta
                            title={lastVideoCommented.song_name}
                            description={`Commented on ${commentedDate}`} />
                        <br />
                        <Tag color="blue">{this.formatTag(lastVideoCommented.instrument)}</Tag>
                        <Tag color="volcano">{`GRADE ${this.formatTag(lastVideoCommented.grade)}`}</Tag>
                        <br />
                        <Rate disabled allowHalf value={rating} style={{ marginTop: '1%' }} />
                    </Card>
                </a>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        videoData: state.vidFiguresStore.lastVideoCommentedData
    }
}

export default connect(mapStateToProps)(LastCommentedVideo);

