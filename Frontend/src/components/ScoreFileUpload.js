import React, { Component } from 'react';
import { storage } from '../Config/FirebaseConfig';
import { connect } from 'react-redux';
import { sendScoresheetURL } from '../redux/videoUpload/actions';
import { Mentions, Button, Upload, Icon, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/videoUpload.css';

class ScoreFileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoresheet: null,
            scoresheetName: '',
            scoreSize: 0,
            scoreUploadedSize: 0,
            scoreURL: '',
            uploading: false
        }
    }
 
    handleScoreChange = scoresheet => {
        if (scoresheet) {
            this.setState({
                scoresheet: scoresheet,
                scoreSize: scoresheet.size,
                scoresheetName: scoresheet.name
            })
        }
    }

    handleScoreUpload = () => {
        const { scoresheet } = this.state;
        const thisClass = this;
        const uploadTask = storage.ref(`scoresheet/${scoresheet.name}`).put(scoresheet);
        uploadTask.on('state_changed',
            (snapshot) => {
                // functions during upload
                this.setState({
                    scoreUploadedSize: snapshot.bytesTransferred,
                    uploading: true
                })
            },
            (err) => {
                // handle errors during upload
                console.log('scoresheet upload error: ', err)
            },
            () => {
                // functions after successful upload
                this.setState({
                    uploading: false
                })
                // retrieve the download url from firebase
                storage.ref('scoresheet').child(scoresheet.name).getDownloadURL().then(url => {
                    thisClass.props.sendScoresheet(url)
                })
                    .then(() => {
                        console.log('scoresheet upload successfully')
                    })
            })
    }

    render(){
        const { scoreSize,
                scoreUploadedSize,
                scoresheetName,
                scoresheet,
                uploading} = this.state;
        const uploadProps = {
            beforeUpload: this.handleScoreChange,
            showUploadList: false,
            multiple: false,
        }
        return(
            <div>
                {/* scoresheet file upload */}
                <Row>
                    <Col sm={{ span: 4, offset: 4 }} md={{ span: 4, offset: 6 }} lg={{ span:4, offset: 8 }}>
                        <Upload {...uploadProps} className="btnSelectFile">
                            <Button>
                                <Icon type="upload" /> Select Scoresheet File
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={16} sm={{ span: 12, offset: 4 }} md={{ span: 8, offset: 6 }} lg={{ span: 6, offset: 8 }}>
                    <Mentions className="fileNameBar" placeholder="filename" value={scoresheetName} readOnly />
                    </Col>
                    <Col xs={8} sm={4} md={4} lg={2}>
                        <Button
                            type="primary"
                            onClick={this.handleScoreUpload}
                            disabled={scoresheet !== null ? false : true}
                            className="btnUpload"
                            loading={uploading}
                        >
                            {scoreUploadedSize === 0 ? 'Upload' : null}
                            {scoreUploadedSize > 0 && scoreUploadedSize < scoreSize ? 'Uploading' : null}
                            {scoreUploadedSize === scoreSize && scoreUploadedSize > 0 ? 'Uploaded' : null}
                        </Button>
                    </Col>
                    <Col xs={16} sm={{ span: 12, offset: 4 }} md={{ span: 8, offset: 6 }} lg={{ span: 6, offset: 8 }}>
                    <div id="scoresheetWarning" className="warningText"></div>
                    </Col>
                    </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        scoresheetURL: state.vidUploadStore.scoresheetURL
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendScoresheet: (payload) => {
            dispatch(sendScoresheetURL(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreFileUpload);