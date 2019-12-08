import React, { Component, Fragment } from 'react';
import axios from 'axios';
import LastUploadedVideo from '../components/LastUploadedVideo';
import LastCommentedVideo from '../components/LastCommentedVideo';
import CommentAspectChart from '../components/CommentAspectChart';
import LatestComment from '../components/LatestComment';
import VideoFigures from '../components/VideoFigures';
import { connect } from 'react-redux';
import { getVideoData, getlastVideoCommentedData, getlastVideoUploadedData, getCommentAspect } from '../redux/videoFigures/actions';
import { getSubscriptionData } from '../redux/subscription/actions';
import { Row, Col, Icon, Divider } from 'antd';
import 'antd/dist/antd.css';
import './ScreensCSS/studentDashboard.css';


class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: localStorage.getItem("userID")
    }
  }

  componentWillMount() {
    this.props.getVideoData();
    this.props.getLastVideoCommentedData();
    this.props.getlastVideoUploadedData();
    this.props.getCommentAspect();
    this.props.getSubscriptionData();
  }

  componentDidUpdate(prevProps) {
    console.log('did updated')
    if (this.props.subscribed !== prevProps.subscribed) {
      this.checkSubscription();
    }
    this.props.getSubscriptionData();
  }

  checkSubscription = async () => {
    const userID = localStorage.getItem('userID');
    // console.log('subscribed? ', this.props.subscribed)
    // console.log('subscription date ', this.props.subscription_date)
    // console.log('expiry date ', this.props.expiry_date.toLocaleString())
    if (this.props.subscribed) {
      console.log('checking subscription')
      let token = localStorage.getItem('token');
      let expiryDate = new Date(this.props.expiry_date);
      let today = new Date();
      let expiredSeconds = expiryDate.getTime() / 1000;
      let todaySeconds = today.getTime() / 1000;
      if (expiredSeconds < todaySeconds) {
        console.log('updating subscription status...')
        // await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID });
        await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID }, {
                    headers: { "Authorization": `Bearer ${token}` } 
                });
        this.props.getSubscriptionData();
      }
    }
  }

  render() {
    let rawDate = new Date(this.props.expiry_date);
    // let expiryDate = rawDate.toLocaleString().split(",")[0];
    let expiryDate = rawDate.toLocaleString()
    return (
      <Fragment>
        <Row type="flex" justify="center" align="middle" id="studentGreeting">
        <Col xs={20}>HELLO, {this.props.first_name.toUpperCase()}</Col>
        <Divider className="subscriptionDivider" />
        </Row>
        <Row type="flex" justify="center" align="middle" id="subscriptionDetails">
          <Col xs={20} sm={8} md={8} lg={6}>
          <Icon type="user" className="subscriptionIcon" /><font className="subscriptionItem"> STATUS: {this.props.subscribed ? "Quota Purchased" : "No Quota Purchased"}</font>
          </Col>
          <Col xs={20} sm={8} md={8} lg={6}>
          <Icon type="inbox" className="subscriptionIcon"/><font className="subscriptionItem"> REMAINING VIDEO QUOTA: {this.props.quota_left}</font>
          </Col>
          <Col xs={20} sm={8} md={8} lg={6}>
          <Icon type="hourglass" className="subscriptionIcon"/><font className="subscriptionItem"> EXPIRY DATE: {this.props.subscribed ? expiryDate : "No Quota Purchased"}</font>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" style={{ height: '15vh', marginTop: '5%' }} id="hoverEffect">
          <Col xs={20} sm={10} md={8} style={{ height: '100%' }} >
            <a href="/uploadVideo">
              <Row type="flex" justify="center" align="middle" className="btnStyle" id="btnUpload">
                <Col><Icon type="upload" />{" UPLOAD VIDEO"}</Col>
              </Row>
            </a>
          </Col>
          <Col xs={20} sm={{ span: 10, offset: 2 }} md={{ span: 8, offset: 2 }} style={{ height: '100%' }}>
            <a href="/videosList">
              <Row type="flex" justify="center" align="middle" className="btnStyle" id="btnPrevious">
                <Col><Icon type="database" />{" PREVIOUS VIDEO"}</Col>
              </Row>
            </a>
          </Col>
        </Row>
        <VideoFigures />
        <br />
        <Row type="flex" justify="center" align="middle">
          <Col xs={20} sm={10} md={8} className="figuresCardContainer">
            <h3>Last Video Uploaded</h3>
            <LastUploadedVideo />
          </Col>
          <Col xs={20} sm={10} md={8} className="figuresCardContainer">
            <h3>Last Video Commented</h3>
            <LastCommentedVideo />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 8, offset: 4 }} className="commentAspectSession">
            <CommentAspectChart />
          </Col>
          <Col xs={{ span: 20, offset: 2 }} sm={6} className="commentAspectSession">
            <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
              <Col>
                <LatestComment />
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    videoData: state.vidFiguresStore.videoData,
    first_name: state.subscriptionStore.first_name,
    subscribed: state.subscriptionStore.subscribed,
    subscription_date: state.subscriptionStore.subscription_date,
    expiry_date: state.subscriptionStore.expiry_date,
    quota_left: state.subscriptionStore.quota_left
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVideoData: () => {
      dispatch(getVideoData());
    },
    getLastVideoCommentedData: () => {
      dispatch(getlastVideoCommentedData());
    },
    getlastVideoUploadedData: () => {
      dispatch(getlastVideoUploadedData())
    },
    getCommentAspect: () => {
      dispatch(getCommentAspect())
    },
    getSubscriptionData: () => {
      dispatch(getSubscriptionData())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDashboard);
