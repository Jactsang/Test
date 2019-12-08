import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/lastVideoUploaded.css';

class LastUploadedVideo extends Component {
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
        const lastVideoUploaded = this.props.videoData;
        const uploadedDate = this.formatDate(lastVideoUploaded.created_at)
        return (
            <Fragment>
                <a href={'/studentViewCom/' + lastVideoUploaded.id} onClick={() => localStorage.setItem('link', lastVideoUploaded.video_link)} style={{ textDecoration: 'none' }}>
                    <Card
                        hoverable
                        className="figuresCard"
                        cover={<img alt="videoThumbnail" src={lastVideoUploaded.thumbnail_url} />}
                    >
                        <Meta
                            title={lastVideoUploaded.song_name}
                            description={`Uploaded on ${uploadedDate}`} />
                        <br />
                        <Tag color="blue">{this.formatTag(lastVideoUploaded.instrument)}</Tag>
                    </Card>
                </a>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        videoData: state.vidFiguresStore.lastVideoUploadedData
    }
}

export default connect(mapStateToProps)(LastUploadedVideo);

