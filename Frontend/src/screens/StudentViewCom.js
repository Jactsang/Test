import * as React from 'react';
import { CommentView } from '../components/CommentViewOnly';
import ViewScoreSheet from '../components/ViewScoreSheet';  
import ReactPlayer from 'react-player'
import formatTime from '../components/FormatTime.js';
import unFormatTime from '../components/UnformatTime.js';
import { getRating } from '../redux/rating/actions';
import { getVideos } from '../redux/videosList/actions';
import { connect } from 'react-redux';

import { Typography, Row, Col, Layout, Rate, Card, Statistic, Icon, PageHeader, Button, Descriptions, Badge } from 'antd';
const { Content } = Layout;
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const { Text, Title } = Typography;


export class StudentViewCom extends React.Component {
  constructor(props) {
    super(props);
    this.reactPlayer = React.createRef();
    this.state = {
      url: localStorage.getItem('link'),
      song_name: '',
      composer: '',
      instrument: '',
      music_score_url: '',
      grade: '',
      video_id: this.props.match.params.video_id,
      created_at: '',
      updated_at: '',
      thumbnail_url: '',
      controls: true,
      className: 'react-player',
      width: '100%',
      height: '100%',
      button_visible: false,
      time_code: 0,
      duration: 0,
      score_url:'',
      rating: 0
    }
  }
  componentDidMount = () => {
    this.props.getVideos();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.videosList !== prevProps.videosList) {
      this.checkCurrentVideoFromProps()
    }
    this.props.getRating(this.state.url)
  }

  checkCurrentVideoFromProps = () => {
    let filteredVideo = (this.props.videosList.filter(video =>
      video.id.toString() === this.props.match.params.video_id))[0]

    this.setState({
      // url: filteredVideo.video_link,
      song_name: filteredVideo.song_name,
      composer: filteredVideo.composer,
      instrument: filteredVideo.instrument,
      grade: filteredVideo.grade,
      score_url: filteredVideo.music_score_url,
      created_at: filteredVideo.created_at,
      updated_at: filteredVideo.updated_at,
      thumbnail_url: filteredVideo.thumbnail_url,
      rating: filteredVideo.rating
    })
  }


//vvvv Show & Hide Music Score when button clicked
  show() {
    this.setState({
      button_visible: !this.state.button_visible,
    });
  }

  captureCurrentTimecode = () => {
    let currentTime = formatTime(this.reactPlayer.current.getCurrentTime())
    this.setState({
      time_code: currentTime,
      duration: formatTime(this.reactPlayer.current.getDuration())
    });
  };

  // vvv Get the timecode(aka timestamp) from CommentViewOnly when a comment is clicked
  handleTime = (timeStamp) => {
    this.setState({
      time_code: timeStamp
    })
    let time = unFormatTime(timeStamp)
    time = Number(time)
    this.reactPlayer.current.seekTo(time, true);
  }

  render(){
    return (
      <Layout>
        <Content style={{ padding: '32px 32px' }} size='small'>
          <Row gutter={40}>

{/* Left side */}
            <Col lg={16}>
              <PageHeader title={this.state.song_name}
                          subTitle={this.state.composer}
                          style={{padding: '0 0 20px'}}
                          onBack={() => window.history.back()}
              >
                <Row>
                <Descriptions column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 2 }} >
                  <Descriptions.Item label="Grade">{this.state.grade}</Descriptions.Item>
                  <Descriptions.Item label="Instrument">{this.state.instrument}</Descriptions.Item>
                  <Descriptions.Item label="Duration">{this.state.duration}</Descriptions.Item>
                  {/* <Descriptions.Item label="Created At">{this.state.created_at}</Descriptions.Item>
                  <Descriptions.Item label="Updated At">{this.state.updated_at}</Descriptions.Item> */}
                  <Descriptions.Item label="Status">
                    <Badge status="processing" text="Running" />
                  </Descriptions.Item>
                </Descriptions>
              </Row>
              </PageHeader>

              <div className='comment-player-wrapper'>
                <ReactPlayer {...this.state} ref={this.reactPlayer} onProgress={this.captureCurrentTimecode} className='react-player' />
              </div>

              <br></br>

              <Row type="flex">
                  <Col span={12}>
                    <Card title='Overall Rating' size='small' style={{ height: '100px' }}>
                      <Rate tooltips={desc} value={this.state.rating} disabled style={{ width: "max-content" }}/>
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card size='small' style={{ height: '100px' }}>
                      <Statistic
                        title="Total Comments"
                        value={this.props.commentsSummary.total}
                        valueStyle={{ color: '#002766' }}
                        prefix={<Icon type="unordered-list" />}
                      />
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card size='small' style={{ height: '100px' }}>
                      <Statistic
                        title="Positive Comments"
                        value={this.props.commentsSummary.positive}
                        valueStyle={{ color: '#52c41a' }}
                        prefix={<Icon type="heart" />}
                      />
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card size='small' style={{ height: '100px' }}>
                      <Statistic
                        title="Critical Comments"
                        value={this.props.commentsSummary.critical}
                        valueStyle={{ color: '#eb2f96' }}
                        prefix={<Icon type="alert" />}
                      />
                    </Card>
                  </Col>
              </Row>

              <Row type="flex">
                <Col span={6}>
                  <Card size='small' style={{ height: '100px' }}>
                    <Statistic
                      title="Posture"
                      value={this.props.commentsSummary.posture}
                      valueStyle={{ color: '#faad14' }}
                      prefix={<Icon type="user" />}
                    />
                  </Card>
                </Col>

                <Col span={6}>
                  <Card size='small' style={{ height: '100px' }}>
                    <Statistic
                      title="Accuracy"
                      value={this.props.commentsSummary.accuracy}
                      valueStyle={{ color: '#fadb14' }}
                      prefix={<Icon type="check" />}
                    />
                  </Card>
                </Col>

                <Col span={6}>
                  <Card size='small' style={{ height: '100px' }}>
                    <Statistic
                      title="Style"
                      value={this.props.commentsSummary.style}
                      valueStyle={{ color: '#722ed1' }}
                      prefix={<Icon type="fire" />}
                    />
                  </Card>

                </Col>

                <Col span={6}>
                  <Card size='small' style={{ height: '100px' }}>
                    <Statistic
                      title="Others"
                      value={this.props.commentsSummary.others}
                      valueStyle={{ color: '#13c2c2' }}
                      prefix={<Icon type="message" />}
                    />
                  </Card>
                </Col>
              </Row>
              <br></br>

              <Row type="flex">
                <Col span={8} offset={9}>
                  <Button 
                    onClick={() => {
                      this.show();
                    }}
                  >
                    Score Sheet
                  </Button>
                </Col>
              </Row>

              <Row type="flex">
               <Col lg={16}>
                  <div>{this.state.button_visible ? <ViewScoreSheet {...this.state} /> : null}</div>
                  {/* <div>{this.state.button_visible ? <ViewScoreSheet /> : null}</div> */}
                </Col>
              </Row>
            </Col>

{/* Right side */}
            <Col lg={8} >
            <br></br>
            <div style={{overflowY: 'auto', overflowX: 'hidden', height: '100vh'}}>
              <CommentView {...this.state} changeTime={this.handleTime} />
            </div>
            </Col>

        </Row>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    commentsSummary: state.comments.commentsSummary,
    rating: state.rating.rating,
    videosList: state.videosList.videosList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRating: (url) => {
      dispatch(getRating(url))
    },
    getVideos: () => {
      dispatch(getVideos())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentViewCom)