import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { getVideos } from "../redux/videosList/actions";
import { getProcessedCandidate } from "../redux/jobApplication/actions";
import { VideosList } from "../screens";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expertInfo: [],
      uncommentedVideos: [],
      candidateInfo: {},
      chosenVideoId: 1, //Hardcoded
      correctInstrumentVideos: []
    };
  }

  componentDidMount = () => {
    this.props.getVideos();
    this.props.getProcessedCandidate();
  };
  componentDidUpdate = (prevProps, prevState) => {

    if (this.props.videosList.length !== prevProps.videosList.length) {
      this.setState({
        uncommentedVideos: this.props.videosList.filter(
          video => video.expert_id === null
        )
      });
    }

    if (this.props.candidateInfo.length !== prevProps.candidateInfo.length) {
      this.setState({
        candidateInfo: this.props.candidateInfo.filter(
          candidate => candidate.id == localStorage.getItem("userID")
        )[0]
      });
    }

    if (this.state.uncommentedVideos.length !== prevState.uncommentedVideos.length) {
      // if (this.state.chosenVideoId === 0) {
        this.assignVideo(this.state.uncommentedVideos);
      // }
    }

  };

  assignVideo = videos => {
    let candidateSkills = [];
    let correctInstrumentVideos = [];

    if (this.state.candidateInfo.skills) {

    for (let i = 0; i < this.state.candidateInfo.skills.length; i++) {
      candidateSkills.push(
        this.state.candidateInfo.skills[i].instrument.toLowerCase()
      );
      candidateSkills.push(this.state.candidateInfo.skills[i].level);
    }

    correctInstrumentVideos = videos.filter(
      video =>
        candidateSkills.indexOf(video.instrument.toLowerCase()) > -1 &&
        video.grade <=
          candidateSkills[candidateSkills.indexOf(video.instrument) + 1]
    );

    if (correctInstrumentVideos[getRandomInt(0, correctInstrumentVideos.length)]){
      this.setState({
        chosenVideoId: correctInstrumentVideos[getRandomInt(0, correctInstrumentVideos.length)].id
      });
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    }
  };
  render() {
    return (
      <Menu mode={this.props.mode}>
        <Menu.Item key="1">
          {/* <a href={`/commentOnVideo/${assignedVideoId}`}>Comment Now!</a> */}
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/videosList">View All Videos</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/earnings">Dashboard</a>
        </Menu.Item>
      </Menu>
  
      );
    }

  }

const mapStateToProps = state => {
  return {
    videosList: state.videosList.videosList,
    candidateInfo: state.jobApplicationStore.candidateInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVideos: () => {
      dispatch(getVideos());
    },
    getProcessedCandidate: () => {
      dispatch(getProcessedCandidate());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);
