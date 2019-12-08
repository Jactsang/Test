import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import VideoFileUpload from './VideoFileUpload';
import ScoreFileUpload from './ScoreFileUpload';
import { uploadVid } from '../redux/videoUpload/actions';
import { Input, Button, Form, Select, Modal, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/videoUpload.css'

class VideoUploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validForm: false,
            modalOpen: false,
            scoresheet: null,
            scoreSize: 0,
            scoreUploadedSize: 0,
            userID: null,
            vidURL: '',
            vidDuration: 0,
            scoreURL: '',
            thumbURL: '',
            song: '',
            composer: '',
            instrument: '',
            grade: 0
        }
    }

    componentDidMount() {
        console.log(`UserID: ${localStorage.getItem("userID")}`);
        const id = localStorage.getItem("userID");
        this.setState({
            userID: id
        });
    }

    handleInputChange = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
        console.log(this.state)
    }

    handleSelectChange = (field, value) => {
        const state = {};
        state[field] = value;
        this.setState(state);
        console.log(this.state)
    }

    getVidDuration = () => {
        let x = document.getElementById("videoUploaded").duration;
        console.log("Duration: ", x);
        this.setState({
            vidDuration: x
        });
    };

    handleSubmit = async () => {
        await this.checkForm();
        if (this.state.validForm) {
            // passing all required info to database
            this.props.addVidConnect(
                {
                    vidURL: this.props.videoURL,
                    scoreURL: this.props.scoresheetURL,
                    thumbURL: this.props.thumbnailURL,
                    vidDuration: this.props.videoDuration,
                    song: this.state.song,
                    composer: this.state.composer,
                    instrument: this.state.instrument,
                    grade: this.state.grade,
                    id: this.state.userID
                }
            );
            // triggers the form submission message
            this.setState({
                modalOpen: true,
            })
            }
    }

    checkForm = () =>{
        const { song, composer, instrument, grade } = this.state;
        const { videoURL, scoresheetURL, thumbnailURL } = this.props
        if(videoURL === ''){
            document.getElementById("videoWarning").innerHTML = "Please Upload Video File."
        }else{
            document.getElementById("videoWarning").innerHTML = ""
        }
        if(scoresheetURL === ''){
            document.getElementById("scoresheetWarning").innerHTML = "Please Upload Scoresheet File."
        }else{
            document.getElementById("scoresheetWarning").innerHTML = ""
        }
        if(thumbnailURL === ''){
            document.getElementById("thumbnailWarning").innerHTML = "Please Save Thumbnail."
        }else{
            document.getElementById("thumbnailWarning").innerHTML = ""
        }
        if(song === ''){
            document.getElementById("songWarning").innerHTML = "Please Provide Song Name."
        }else{
            document.getElementById("songWarning").innerHTML = ""
        }
        if(composer === ''){
            document.getElementById("composerWarning").innerHTML = "Please Provide Composer Name."
        }else{
            document.getElementById("composerWarning").innerHTML = ""
        }
        if(instrument === ''){
            document.getElementById("instrumentWarning").innerHTML = "Please Select Instrument."
        }else{
            document.getElementById("instrumentWarning").innerHTML = ""
        }
        if(grade === 0){
            document.getElementById("gradeWarning").innerHTML = "Please Select Grade."
        }else{
            document.getElementById("gradeWarning").innerHTML = ""
        }

        if(videoURL !== '' && scoresheetURL !== '' && thumbnailURL !== '' && song !== '' && composer !== '' && instrument !== '' && grade !== 0){
            this.setState({
                validForm: true
            })
        }
    }

    handleMessageClose = () => {
        // closes form submission message and refresh the page for next upload
        window.location.reload();
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { modalOpen } = this.state
        const { Option } = Select;
        return (
            <Fragment>
                {/* video upload */}
                <VideoFileUpload />
                {/* scoresheet upload */}
                <br />
                <ScoreFileUpload />
                {/* other video information */}
                <br />
                <Row>
                    <Col sm={{ span: 12, offset: 6 }} md={{ span: 8, offset: 8 }} >
                        <Form.Item className="mobileResponsive">
                            <label>Song Name</label>
                            <Input placeholder="Song Name" onChange={this.handleInputChange.bind(this, 'song')} />
                            <div id="songWarning" className="warningText mobileResponsive"></div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 12, offset: 6 }} md={{ span: 8, offset: 8 }}>
                        <Form.Item className="mobileResponsive">
                            <label>Composer</label>
                            <Input placeholder="Composer" onChange={this.handleInputChange.bind(this, 'composer')} />
                            <div id="composerWarning" className="warningText mobileResponsive"></div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 8, offset: 8 }} md={{ span: 8, offset: 8 }}>
                        <Form.Item className="mobileResponsive">
                            <label>Instrument</label>
                            <Select
                                placeholder="Instrument"
                                onChange={this.handleSelectChange.bind(this, 'instrument')}
                                style={{ width: '100%' }}
                            >
                                <Option value="piano">Piano</Option>
                                <Option value="guitar">Guitar</Option>
                                <Option value="singing">Singing</Option>
                            </Select>
                            <div id="instrumentWarning" className="warningText mobileResponsive"></div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 8, offset: 8 }} md={{ span: 8, offset: 8 }}>
                        <Form.Item className="mobileResponsive">
                            <label>Grade</label>
                            <Select
                                placeholder="Grade"
                                onChange={this.handleSelectChange.bind(this, 'grade')}
                                style={{ width: '100%' }}
                            >
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                                <Option value={5}>5</Option>
                                <Option value={6}>6</Option>
                            </Select>
                            <div id="gradeWarning" className="warningText mobileResponsive"></div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Col sm={4}>
                        <Button
                            onClick={this.handleSubmit}
                            style={{ width: "100%" }}>
                            Submit Video
                        </Button>
                    </Col>
                </Row>
                <br /><br />
                <Modal
                    visible={modalOpen}
                    onCancel={this.handleMessageClose}
                    footer={[
                        <a href="/videosList">
                            <Button style={{ marginRight: '1%' }}>
                                Previous Video
                            </Button>
                        </a>,
                        <Button onClick={this.handleMessageClose}>
                            Upload New Video
                        </Button>,
                    ]}
                >
                    <p>Video has been submitted.</p>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        thumbnailURL: state.vidUploadStore.thumbnailURL,
        videoURL: state.vidUploadStore.videoURL,
        videoDuration: state.vidUploadStore.videoDuration,
        scoresheetURL: state.vidUploadStore.scoresheetURL
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addVidConnect: payload => {
            dispatch(uploadVid(payload));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoUploadForm);