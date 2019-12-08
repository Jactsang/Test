import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Statistic, Row, Col, Card, Icon, Rate} from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/videoFigures.css'

class VideoFigures extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    formatDuration = (duration) => {
        duration = Number(duration);
        var hour = Math.floor(duration / 3600);
        var min = Math.floor(duration % 3600 / 60);
        var sec = Math.floor(duration % 3600 % 60);

        var hourDisplay = hour > 0 ? hour + "h " : "";
        var minDisplay = min > 0 ? min + "m " : "";
        var secDisplay = sec > 0 ? sec + "s" : "";
        return hourDisplay + minDisplay + secDisplay;
    }

    getTotalVideoDuration = (data) => {
        const numberOfVideo = data.length
        const durationArray = [];
        for(let i=0; i<numberOfVideo; i++){
            durationArray.push(data[i].video_time_duration)
        }
        let durationIntegerArray = durationArray.map(element => parseInt(element))
        let totalVideoDuration = durationIntegerArray.reduce((a, b)=> a+b , 0)

        return totalVideoDuration
    }

    getAverageRating = (data) => {
        const ratingArray = [];
        const filteredUncommented = data.filter(video =>
            video.rating > 0)
        const numberOfCommented = filteredUncommented.length
        for(let i=0; i< numberOfCommented; i++){
            ratingArray.push(filteredUncommented[i].rating)
        }
        let ratingIntegerArray = ratingArray.map(element => parseInt(element))
        let totalRating = ratingIntegerArray.reduce((a, b)=> a+b , 0)
        let averageRating = totalRating/numberOfCommented

        if (averageRating !== Math.floor(averageRating)){
            return Math.floor(averageRating)+0.5
        }else{
            return averageRating
        }
    }

    render() {
        const propsVideoData = this.props.videoData;
        const numberOfVideo = this.props.videoData.length;
        const totalVideoDuration = this.getTotalVideoDuration(propsVideoData)
        const averageRating = this.getAverageRating(propsVideoData)
        return (
            <Fragment>
                <Row type="flex" justify="center" align="middle" id="videoFigure">
                    <Col xs={20} sm={8} md={8} lg={6}>
                    <Card className="figuresBox">
                    <Statistic title={numberOfVideo === 1 ? "Video Upload" : "Videos Uploaded"} value={" "+numberOfVideo} valueStyle={{fontSize: "2em"}} prefix={<Icon type="video-camera"/>}/>
                        </Card>
                    </Col>
                    <Col xs={20} sm={8} md={8} lg={6}>
                        <Card className="figuresBox">
                        <Statistic title="Total Video Duration" value={this.formatDuration(totalVideoDuration)} valueStyle={{fontSize: "2em"}} prefix={<Icon type="clock-circle"/>}/>
                        </Card>
                    </Col>
                    <Col xs={20} sm={8} md={8} lg={6}>
                        <Card className="figuresBox">
                        {/* <Statistic title="Average Rating" value={averageRating} valueStyle={{fontSize: "2em"}} suffix="/ 5" /> */}
                        <div className="statisticsTitle">Average Rating</div>
                        <Rate disabled allowHalf value={averageRating} className="averageRating" />
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        videoData: state.vidFiguresStore.videoData
    }
}

export default connect(mapStateToProps)(VideoFigures);
