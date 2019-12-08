import * as React from "react";
import { RealAddComment } from "../components/AddComment";
import { RealCommentList } from "../components/CommentList";
import formatTime from "../components/FormatTime.js";
import { logoutNow } from "../redux/auth/actions";

import { addRating, getRating, resetRatingSuccess } from "../redux/rating/actions";
import { getVideos } from "../redux/videosList/actions";
import { deleteComment } from "../redux/comments/actions";

import { connect } from "react-redux";

import ReactPlayer from "react-player";
import "./css/CommentOnVideo.css";

// import { Container, Row, Col } from 'reactstrap';
import {
  Badge,
  Button,
  Descriptions,
  Steps,
  message,
  Typography,
  Row,
  Col,
  Layout,
  Result,
  Rate,
  Card,
  Statistic,
  Icon,
  PageHeader,
  Modal,
  Popconfirm
} from "antd";

const { Header, Content, Footer, Sider } = Layout;

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const { Text, Title } = Typography;
const { Step } = Steps;

export class CommentOnVideo extends React.Component {
  constructor(props) {
    super(props);
    this.reactPlayer = React.createRef();
    this.state = {
      url: "",
      song_name: "",
      composer: "",
      instrument: "",
      music_score_url: "",
      grade: "",
      video_id: this.props.match.params.video_id,
      created_at: "",
      updated_at: "",
      thumbnail_url: "",
      controls: true,
      currenttimecode: "0:00",
      duration: 0,
      className: "react-player",
      width: "100%",
      height: "100%",
      rating: 0,
      searchinput: "",
      submit_modal_visible: false,
      assignVideo_modal_visible: false,
      comments: []
    };
  }

  setSubmitModalVisible(submit_modal_visible) {
    this.setState({ submit_modal_visible });
  }

  setAssignVideoModalVisible(assignVideo_modal_visible) {
    this.setState({ assignVideo_modal_visible });
  }


  checkCurrentVideoFromProps = () => {
    let filteredVideo = this.props.videosList.filter(
      video => video.id == this.props.match.params.video_id
    )[0];

    if (filteredVideo) {
      this.setState({
        url: filteredVideo.video_link,
        song_name: filteredVideo.song_name,
        composer: filteredVideo.composer,
        instrument: filteredVideo.instrument,
        grade: filteredVideo.grade,
        music_score_url: filteredVideo.music_score_url,
        created_at: filteredVideo.created_at,
        updated_at: filteredVideo.updated_at,
        thumbnail_url: filteredVideo.thumbnail_url,
        rating: filteredVideo.rating
      });
    } else {
      this.setAssignVideoModalVisible(true);
    }
  };

  componentDidMount = () => {
    this.props.getVideos();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.videosList !== prevProps.videosList) {
      this.checkCurrentVideoFromProps();
    }
    if (this.state.url !== prevState.url) {
      this.props.getRating(this.state.url);
    }
    if (this.props.comments !== prevProps.comments) {
      this.setState({ comments: this.props.comments });
    }
  };

  handleCardGridClick = input => {
    this.setState({
      searchinput: input
    });
  };

  clearAllComments = () => {
    this.state.comments.forEach(comment => {
      this.props.clickDeleteComment({
        id: comment.id,
        currentVideoLink: this.state.url
      });
    });
    message.success("All comments cleared.");
  };

  captureCurrentTimecode = () => {
    this.setState({
      currenttimecode: formatTime(this.reactPlayer.current.getCurrentTime()),
      duration: formatTime(this.reactPlayer.current.getDuration())
    });
  };

  addRating = async value => {
    //lifecycle methods
    await this.setState({
      rating: value
    });
    this.props.addRating(this.state.rating, this.state.url);
    message.success("Rating succesfully set!");
  };

  resetRatingSuccess = () => {
    this.props.resetRatingSuccess(this.state.url);
    message.success("Rating succesfully reset!");
    this.redirectToDashboard();
  }

  logout = () => {
    this.props.logout();
  };

  redirectToDashboard = () => {
    this.props.history.push(`/earnings`);
  };

  render = () => {
    return (
      <Layout>
        <Modal
          key="1"
          title="No videos now..."
          centered
          footer={null}
          visible={this.state.assignVideo_modal_visible}
          // onOk={() => this.setSubmitModalVisible(false)}
          onCancel={() => {
            this.setAssignVideoModalVisible(false);
            this.redirectToDashboard();
            }
          }
        >
          <Result
              title="Currently all our videos have been commented at the moment. Please try again later."
            />
        </Modal>
        <Content style={{ padding: "32px 32px" }} size="small">
          <Row>
            <PageHeader
              title={this.state.song_name}
              subTitle={this.state.composer}
              style={{ padding: "0 0 20px" }}
              onBack={() => window.history.back()}
              extra={[
                <Popconfirm
                  title="Confirm to clear all your comments?"
                  key="2"
                  onConfirm={this.clearAllComments}
                  okText="Clear"
                  cancelText="Back"
                >
                  <Button
                    disabled={
                      // this.state.rating === 0 || this.state.rating === null ?
                        false
                        // : true
                    }
                  >
                    Clear All
                  </Button>
                </Popconfirm>,
                <Button
                  key="1"
                  type="primary"
                  onClick={() => this.setSubmitModalVisible(true)}
                  disabled={
                    // this.state.rating === 0 || this.state.rating === null ?
                      false
                      // : true
                  }
                >
                  Submit
                </Button>,
                <Modal
                  key="3"
                  title="Submit your comments!"
                  centered
                  footer={null}
                  visible={this.state.submit_modal_visible}
                  // onOk={() => this.setSubmitModalVisible(false)}
                  onCancel={() => this.setSubmitModalVisible(false)}
                >
                  {this.state.rating === 0 || this.state.rating === null ? (
                    <div>
                      <Result
                        icon={
                          <Icon
                            type="star"
                            theme="twoTone"
                            twoToneColor="#faad14"
                          />
                        }
                        title="Rate this video"
                      >
                        <Rate
                          className="videoRating"
                          onChange={this.addRating}
                          tooltips={desc}
                          value={this.props.rating}
                        />
                      </Result>
                    </div>
                  ) : (
                    <Result
                      status="success"
                      title="Successfully Submitted Comments!"
                      subTitle={`Your submission: ${new Date().toLocaleString()}`}
                      extra={
                        <Button
                          type="primary"
                          onClick={this.resetRatingSuccess}
                        >
                          Done
                        </Button>
                      }
                    />
                  )} 
                </Modal>
              ]}
            ></PageHeader>
          </Row>
          <Row gutter={16}>
            {/* Left side */}

            <Col lg={16}>
              <Row>
                <Descriptions
                  column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 2 }}
                >
                  <Descriptions.Item label="Grade">
                    {this.state.grade}
                  </Descriptions.Item>
                  <Descriptions.Item label="Instrument">
                    {this.state.instrument}
                  </Descriptions.Item>
                  <Descriptions.Item label="Duration">
                    {this.state.duration}
                  </Descriptions.Item>
                  {this.props.rating ? (
                    <Descriptions.Item label="Status">
                      <Badge status="success" text="Submitted" />
                    </Descriptions.Item>
                  ) : (
                    <Descriptions.Item label="Status">
                      <Badge
                        status="processing"
                        text="Commenting"
                      />
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Row>

              <Row>
                <Descriptions column={2}>
                  <Descriptions.Item label="Created At">
                    {new Date(this.state.created_at).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Updated At">
                    {new Date(this.state.updated_at).toLocaleString()}
                  </Descriptions.Item>
                </Descriptions>
              </Row>

              <div className="comment-player-wrapper">
                <ReactPlayer
                  {...this.state}
                  ref={this.reactPlayer}
                  onProgress={this.captureCurrentTimecode}
                  className="react-player"
                />
              </div>

              <br></br>

              {/* {this.state.rating === 0 || this.state.rating === null ? */}
              <RealAddComment {...this.state} />
              {/* :
                ''
              } */}

              <br></br>

              <Row type="flex">
                <Col xs={8} sm={12} md={12} lg={12} xl={12}>
                  <Card
                    size="small"
                    className="cardTotal"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("")}
                    hoverable
                  >
                    <Statistic
                      title="Total Comments"
                      value={this.props.commentsSummary.total}
                      valueStyle={{ color: "#002766" }}
                      prefix={<Icon type="unordered-list" />}
                    />
                  </Card>
                </Col>

                <Col xs={8} sm={6} md={6} lg={6} xl={6}>
                  <Card
                    size="small"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("positive")}
                    hoverable
                  >
                    <Statistic
                      title="Positive"
                      value={this.props.commentsSummary.positive}
                      valueStyle={{ color: "#52c41a" }}
                      prefix={<Icon type="heart" />}
                    />
                  </Card>
                </Col>

                <Col xs={8} sm={6} md={6} lg={6} xl={6}>
                  <Card
                    size="small"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("critical")}
                    hoverable
                  >
                    <Statistic
                      title="Critical"
                      value={this.props.commentsSummary.critical}
                      valueStyle={{ color: "#eb2f96" }}
                      prefix={<Icon type="alert" />}
                    />
                  </Card>
                </Col>
              </Row>

              <Row type="flex">
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card
                    size="small"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("posture")}
                    hoverable
                  >
                    <Statistic
                      title="Posture"
                      value={this.props.commentsSummary.posture}
                      valueStyle={{ color: "#faad14" }}
                      prefix={<Icon type="user" />}
                    />
                  </Card>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card
                    size="small"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("accuracy")}
                    hoverable
                  >
                    <Statistic
                      title="Accuracy"
                      value={this.props.commentsSummary.accuracy}
                      valueStyle={{ color: "#fadb14" }}
                      prefix={<Icon type="check" />}
                    />
                  </Card>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card
                    size="small"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("style")}
                    hoverable
                  >
                    <Statistic
                      title="Style"
                      value={this.props.commentsSummary.style}
                      valueStyle={{ color: "#722ed1" }}
                      prefix={<Icon type="fire" />}
                    />
                  </Card>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card
                    size="small"
                    style={{ height: "100px" }}
                    onClick={() => this.handleCardGridClick("style")}
                    hoverable
                  >
                    <Statistic
                      title="Others"
                      value={this.props.commentsSummary.others}
                      prefix={<Icon type="message" />}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>

            <br></br>

            {/* Right side */}

            <Col lg={8}>
              {this.state.url && (
                <RealCommentList
                  {...this.state}
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "100vh"
                  }}
                />
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  };
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    commentsSummary: state.comments.commentsSummary,
    rating: state.rating.rating,
    videosList: state.videosList.videosList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutNow());
    },
    addRating: (rating, url) => {
      dispatch(addRating(rating, url));
    },
    getRating: url => {
      dispatch(getRating(url));
    },
    resetRatingSuccess: url => {
      dispatch(resetRatingSuccess(url));
    },
    getVideos: () => {
      dispatch(getVideos());
    },
    clickDeleteComment: selectedComment =>
      dispatch(deleteComment(selectedComment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentOnVideo);
