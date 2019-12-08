import React, { Component, Fragment } from 'react';
import AvatarEditor from 'react-avatar-editor'
import { storage } from '../Config/FirebaseConfig';
import { connect } from 'react-redux';
import { sendVidURL, sendThumbnail, sendVidDuration } from '../redux/videoUpload/actions';
import { Button, Upload, Icon, Row, Col, Mentions, Alert } from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/videoUpload.css';

class VideoFileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            uploading: false,
            videoName: '',
            videoSize: 0,
            videoUploadedSize: 0,
            thumbSize: 0,
            thumbUploadedSize: 0,
            vidTempPath: '',
            snapshot: '',
            saveThumbnailOn: true
        }
    }

    handleVideoChange = video => {
        // video object to be uploaded
        if (video) {
            // generates a temp url in browser for video preview and generating thumbnail 
            // avoids the problem of dealing with cors and access-control-allow-origin for using the firebase url
            const vidTempPath = URL.createObjectURL(video);
            this.setState({
                video: video,
                videoName: video.name,
                videoSize: video.size,
                vidTempPath: vidTempPath
            })
        }
    }

    handleVideoUpload = () => {
        const { video } = this.state;
        const uploadTask = storage.ref(`video/${video.name}`).put(video);

        uploadTask.on('state_changed',
            (snapshot) => {
                // functions during upload
                console.log('bytesTransferred: ', snapshot.bytesTransferred);
                this.setState({
                    videoUploadedSize: snapshot.bytesTransferred,
                    uploading: true
                })
            },
            (err) => {
                // handle errors during upload
                console.log('video upload error: ', err)
            },
            () => {
                // functions after successful upload
                this.setState({
                    uploading: false
                })
                // retrieve the download url from firebase
                storage.ref('video').child(video.name).getDownloadURL()
                    .then(url => {
                        console.log('firebase url: ', url)
                        this.props.sendVidURL(url)
                    })
                    .then(() => {
                        console.log('video upload successfully')
                    })
            })

    }

    getVidDuration = () => {
        // uses <video> tag for getting metadata of the video file
        const duration = document.getElementById("videoUploaded").duration;
        this.setState({
            vidDuration: duration
        });
        this.props.sendDuration(duration)
    }

    setCanvas = () => {
        // by the time video is ready to play, setting up the canvas and hiding it
        const vidElement = document.getElementById("videoUploaded");
        const canvasElement = document.getElementById("canvas-thumbnail");

        canvasElement.style.display = 'none';
        canvasElement.width = vidElement.videoWidth;
        canvasElement.height = vidElement.videoHeight;
    }

    getSnapshot = () => {
        const vidElement = document.getElementById("videoUploaded");
        const canvasElement = document.getElementById("canvas-thumbnail");
        const canvasContext = canvasElement.getContext("2d");

        // uses canvas to capture the snapshot from video
        console.log('vidElement: ', vidElement)
        canvasContext.drawImage(vidElement, 0, 0, canvasElement.width, canvasElement.height);
        // uploads canvas image to firebase
        this.setState({
            snapshot: canvasElement.toDataURL(),
            saveThumbnailOn: false
        })
    }

    saveThumbnail = () => {
        const thisClass = this;
        const { video } = this.state;
        // remove the format dot (i.e. '.mp4') from the video filename
        const thumbnailName = video.name.split('.').join("");
        const canvas = this.editor.getImageScaledToCanvas(0, 0, 560, 315);

        canvas.toBlob(function (blob) {
            const image = new Image();
            image.src = blob;
            const uploadTask = storage.ref(`thumbnail/${thumbnailName}`).put(blob);
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log('snapshot: ', snapshot);
                    // cannot use 'this' for representing this class as this is a function inside a function of this class
                    thisClass.setState({
                        thumbSize: snapshot.totalBytes,
                        thumbUploadedSize: snapshot.bytesTransferred,
                    })
                },
                (err) => {
                    console.log('thumbnail upload error: ', err)
                },
                () => {
                    storage.ref('thumbnail').child(thumbnailName).getDownloadURL()
                        .then(url => {
                            console.log('thumbnail firebase url: ', url);
                            thisClass.setState({
                                thumbURL: url
                            });
                            thisClass.props.sendThumbnail(url)
                        })
                        .then(() => {
                            console.log('thumbnail upload successfully')
                        })
                })
        });
    }

    setEditorRef = (editor) => this.editor = editor

    render() {
        const ButtonGroup = Button.Group;
        const {
            video, videoName, videoSize, videoUploadedSize, thumbUploadedSize, thumbSize, vidTempPath, uploading
        } = this.state;
        const uploadProps = {
            beforeUpload: this.handleVideoChange,
            showUploadList: false,
            multiple: false,
        }
        return (
            <div>
                {/* video preview && thumbnail upload*/}
                <Row type="flex" justify="center">
                    {vidTempPath !== '' ?
                        <Col sm={16} md={10} style={{marginTop: '2%', marginBottom: '2%'}}>
                        <Alert
                                description="Play the video and pick a snapshot for thumbnail"
                                closable
                                type="info"
                            />
                        </Col>

                    : null}
                </Row>
                <Row type="flex" justify="center" style={{marginTop: '2%'}}>
                    {vidTempPath !== '' ?
                        <Col xs={24} sm={20} md={14} lg={12} xl={10}>
                            <video id="videoUploaded" src={vidTempPath} onLoadedMetadata={this.getVidDuration} onCanPlay={this.setCanvas} width="100%" controls></video>
                            <br />
                            <canvas id="canvas-thumbnail"></canvas>
                        </Col>
                        :
                        <Col xs={24} sm={20} md={14} lg={12} xl={10}>
                            <div id="videoPreviewBox">
                                <Row type="flex" justify="center" align="middle" style={{width:"100%", height: "100%"}}>
                                <div>Video Preview</div>
                                </Row>
                            </div>
                        </Col>
                    }
                    
                    <Col xs={24} sm={20} md={10} lg={8} xl={6} id="thumbnailPreview">
                        <Row type="flex" justify="center" align="middle">
                        <div id="thumbnailHeading">Thumbnail Preview</div>
                        <AvatarEditor
                            image={this.state.snapshot}
                            ref={this.setEditorRef}
                            width={300}
                            height={169}
                            border={1}
                            style={{backgroundColor: '#ffffff'}}
                            id="avatar"
                        />
                        <ButtonGroup id="thumbnailButtons">
                            <Button type="primary" onClick={this.getSnapshot} disabled={vidTempPath !== ''? false: true}>
                                Set Thumbnail
                            </Button>
                            <Button type="info" onClick={this.saveThumbnail} disabled={this.state.saveThumbnailOn}>
                            Save Thumbnail
                            </Button>
                        </ButtonGroup>
                        <div id="thumbnailWarning" className="warningText"></div>
                        {thumbUploadedSize > 0 && thumbUploadedSize < thumbSize ? <div className="savingMessage">Saving</div> : null}
                        {thumbUploadedSize === thumbSize && thumbUploadedSize > 0 ? <div className="savingMessage">Thumbnail is saved</div> : null}
                        </Row>
                    </Col>
                </Row>
                {/* video file upload */}
                <br />
                <Row>
                    <Col sm={{ span: 4, offset: 4 }} md={{ span: 4, offset: 6 }} lg={{ span:4, offset: 8 }}>
                        <Upload {...uploadProps} className="btnSelectFile">
                            <Button>
                                <Icon type="upload" /> Select Video File
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={16} sm={{ span: 12, offset: 4 }} md={{ span: 8, offset: 6 }} lg={{ span: 6, offset: 8 }}>
                        <Mentions className="fileNameBar" placeholder="filename" value={videoName} readOnly />
                    </Col>
                    <Col xs={8} sm={4} md={4} lg={2}>
                        <Button
                            type="primary"
                            onClick={this.handleVideoUpload}
                            disabled={video !== null ? false : true}
                            className="btnUpload"
                            loading={uploading}
                        >
                            {videoUploadedSize === 0 ? 'Upload' : null}
                            {videoUploadedSize > 0 && videoUploadedSize < videoSize ? 'Uploading' : null}
                            {videoUploadedSize === videoSize && videoUploadedSize > 0 ? 'Uploaded' : null}
                        </Button>
                    </Col>
                    <Col xs={16} sm={{ span: 12, offset: 4 }} md={{ span: 8, offset: 6 }} lg={{ span: 6, offset: 8 }}>
                    <div id="videoWarning" className="warningText"></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        videoURL: state.vidUploadStore.videoURL
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendThumbnail: (payload) => {
            dispatch(sendThumbnail(payload))
        },
        sendVidURL: (payload) => {
            dispatch(sendVidURL(payload))
        },
        sendDuration: (payload) => {
            dispatch(sendVidDuration(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoFileUpload);