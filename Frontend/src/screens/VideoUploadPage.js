import * as React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { getSubscriptionData } from '../redux/subscription/actions';
import { getVideos } from '../redux/videosList/actions';
import VideoUploadForm from "../components/VideoUploadForm";
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const background = {
  width: "100%",
  backgroundColor: '#ffffff'
};

class VideoUploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotaModal: false
    }
  }

  componentWillMount() {
    this.props.getVideos();
    this.props.getSubscriptionData();
  }

  componentDidUpdate(prevProps) {
    console.log('did updated')
    if (this.props.subscribed !== prevProps.subscribed) {
      this.checkSubscription();
    }
  }

  checkSubscription = async () => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    // console.log('subscribed? ', this.props.subscribed)
    // console.log('subscription date ', this.props.subscription_date)
    // console.log('expiry date ', this.props.expiry_date)
    // console.log('quota left ', this.props.quota_left)
    if (this.props.subscribed) {
      console.log('checking subscription')
      // check if there is quota left
      if (this.props.quota_left <= 0){
        this.setState({
          quotaModal: true
        })
      }
      let expiryDate = new Date(this.props.expiry_date);
      let today = new Date();
      let expiredSeconds = expiryDate.getTime() / 1000;
      let todaySeconds = today.getTime() / 1000;
      // the purchased quota is expired
      if (expiredSeconds < todaySeconds) {
        console.log('updating subscription status...')
        // await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID });
        await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID }, {
          headers: { "Authorization": `Bearer ${token}` } 
      });
        this.props.getSubscriptionData();
      }
    } else {
      // await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID });
      await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID }, {
        headers: { "Authorization": `Bearer ${token}` } 
    });
      console.log('videoUploaded', this.props.videosList.length)
      if (this.props.videosList.length >= 5) {
        this.setState({
          quotaModal: true
        })
      } else {
        let quotaRemains = 5 - this.props.videosList.length;
        console.log('videoUploaded', this.props.videosList.length)
        console.log(`still have ${quotaRemains} quota`)
      }
    }
  }

  handleModalClose = () => {
    window.location.assign("/studentDashboard");
    this.setState({
      quotaModal: false
  })
  }

  render() {
    const { quotaModal } = this.state;
    return (
      <div style={background}>
        <VideoUploadForm />
        <Modal
          visible={quotaModal}
          onCancel={this.handleModalClose}
          footer={[
            <a href="/subscription">
              <Button style={{ marginRight: '1%' }}>
                Buy More Quotas
              </Button>
            </a>
          ]}
        >
          <p>You've already exceeded the maximum quota of video upload.</p>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    videosList: state.videosList.videosList,
    subscribed: state.subscriptionStore.subscribed,
    subscription_date: state.subscriptionStore.subscription_date,
    expiry_date: state.subscriptionStore.expiry_date,
    quota_left:  state.subscriptionStore.quota_left
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVideos: () => {
      dispatch(getVideos())
    },
    getSubscriptionData: () => {
      dispatch(getSubscriptionData())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoUploadPage);
