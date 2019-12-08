import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Statistic, Row, Col, Card, Icon } from "antd";
import "antd/dist/antd.css";
import { getVideos } from "../redux/videosList/actions";
import { getProcessedCandidate } from "../redux/jobApplication/actions";

class EarningFigures extends Component {
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

  componentDidMount() {
    // console.log(this.props.vidTotalDuration);
    this.props.getVideos();
    this.props.getProcessedCandidate();
  }

  componentDidUpdate = (prevProps, prevState) => {

    if (this.props.videosList.length !== prevProps.videosList.length) {this.setState({
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

      if (correctInstrumentVideos[getRandomInt(0, correctInstrumentVideos.length)]) {
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


  formatDuration = duration => {
    duration = Number(duration);
    var hour = Math.floor(duration / 3600);
    var min = Math.floor((duration % 3600) / 60);
    var sec = Math.floor((duration % 3600) % 60);

    var hourDisplay = hour > 0 ? hour + " h " : "";
    var minDisplay = min > 0 ? min + " m " : "";
    var secDisplay = sec > 0 ? sec + " s" : "";
    return hourDisplay + minDisplay + secDisplay;
  };

  render() {
    return (
      <Fragment>
        <div style={{ marginTop: "2%" }}>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ height: "15vh", marginTop: "5%" }}
            id="hoverEffect"
          >
            <Col xs={20} sm={10} md={8} style={{ height: "100%" }}>
              <a href={`/commentOnVideo/${this.state.chosenVideoId}`}>
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  className="btnStyle"
                  id="btnUpload"
                >
                  <Col>
                   <Icon type="form" />
                    {" COMMENT ON VIDEOS"}
                  </Col>
                </Row>
              </a>
            </Col>
            <Col
              xs={20}
              sm={{ span: 10, offset: 2 }}
              md={{ span: 8, offset: 2 }}
              style={{ height: "100%" }}
            >
              <a href="/videosList">
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  className="btnStyle"
                  id="btnPrevious"
                >
                  <Col>
                    <Icon type="database" />
                    {" PREVIOUS VIDEO"}
                  </Col>
                </Row>
              </a>
            </Col>
          </Row>
          <br />
          <Row type="flex" justify="center" align="center" style={{marginTop: '2%'}}>
            <Col xs={20} sm={8} md={8}>
              <Card style={{ textAlign: "center" }}>
                <Statistic
                  title="Total Comment Duration"
                  value={this.formatDuration(this.props.vidTotalDuration)}
                  valueStyle={{ fontSize: "2.3rem" }}
                />
              </Card>
            </Col>
            <Col xs={20} sm={8} md={8}>
              <Card style={{ textAlign: "center" }}>
                <Statistic
                  title="Total Earnings (HKD)"
                  value={
                    (Math.round(this.props.vidTotalDuration / 60) / 5) * 7.8
                  }
                  valueStyle={{ fontSize: "2.3rem" }}
                  prefix="$"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    vidTotalNumber: state.earnFiguresStore.vidTotalNumber,
    vidTotalDuration: state.earnFiguresStore.vidTotalDuration,
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

export default connect(mapStateToProps, mapDispatchToProps)(EarningFigures);
