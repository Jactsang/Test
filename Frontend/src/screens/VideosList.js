import * as React from 'react';
import { connect } from 'react-redux';
import VideoSearchBar from '../components/VideoSearchBar';
import { getVideos } from '../redux/videosList/actions';
// import { Badge, Container, Row, Col, ListGroup, ListGroupItem, Progress, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
// import { Button, Progress, List, Row, Col } from 'antd';
import { List, Button, Slider, Row, Col, Progress, Tag } from 'antd';
import 'antd/dist/antd.css';
import './ScreensCSS/videosList.css';

class VideosList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userType: localStorage.getItem('userType'),
      videoFiltered: null,
      sortByLatest: false,
      grade: [1, 6],
      sortByUncommented: false,
      sortByCommented: false,
      filteredResult: null
    }
  }

  componentDidMount() {
    this.props.getVideos();
    if (this.state.userType === "expert") {
      this.setState({
        sortByUncommented: false,
        sortByCommented: true
      })
    }
  }

  formatDate = (date) => {
    const newDate = new Date(date).toLocaleString();
    return newDate.split(',')[0]
  }

  listingVideos = () => {
    console.log('start listing video')
    const { userType, videoFiltered, grade, sortByUncommented, sortByCommented, sortByLatest } = this.state;
    const propsVideoList = this.props.videosList;
    const thisClass = this;
    let videoElements = [];
    // define the path to video page by userType
    let route;
    if (userType === 'expert') {
      route = '/commentOnVideo/';
    } else if (userType === 'student') {
      route = '/studentViewCom/';
    };
    // define the video array if there is input search
    let videoFilteredByGrade;
    let videoArray;

    if (videoFiltered !== null) {
      videoFilteredByGrade = videoFiltered.filter(video =>
        video.grade >= grade[0] && video.grade <= grade[1])
    } else {
      videoFilteredByGrade = propsVideoList.filter(video =>
        video.grade >= grade[0] && video.grade <= grade[1])
    }

    if (sortByUncommented) {
      videoArray = videoFilteredByGrade.filter(video =>
        video.grade >= grade[0] && video.grade <= grade[1] && video.rating <= 0)
    } else if (sortByCommented) {
      videoArray = videoFilteredByGrade.filter(video =>
        video.grade >= grade[0] && video.grade <= grade[1] && video.rating > 0)
    } else {
      videoArray = videoFilteredByGrade
    }

    if(sortByLatest){
      videoArray.sort(function (a, b) {
        return b.id - a.id;
      })
    }else{
      videoArray.sort(function (a, b) {
        return a.id - b.id;
      })
    }

    for (let i = 0; i < videoArray.length; i++) {
      if (videoArray[i].rating > 0) {
        route = '/studentViewCom/';
      }
      videoElements.push(
        <List.Item
          key={videoArray[i].id}
        >
          <Col xs={24} sm={12} md={8}>
            <a href={route + videoArray[i].id} onClick={() => localStorage.setItem('link', videoArray[i].video_link)}>
              <img src={videoArray[i].thumbnail_url} alt="thumbnail" width="100%" />
            </a>
          </Col>
          <Col xs={20} sm={12} md={12} style={{ marginLeft: '2%' }}>
            <a href={route + videoArray[i].id} onClick={() => localStorage.setItem('link', videoArray[i].video_link)}>
              <List.Item.Meta
                title={videoArray[i].song_name}
                description={videoArray[i].composer}
                style={{ marginBottom: '3%' }} />
              <Tag color="geekblue">{videoArray[i].instrument.toUpperCase()}</Tag>
              {" "}
              <Tag color={videoArray[i].rating <= 0 ? "green" : "volcano"}>{videoArray[i].rating <= 0 ? 'UNCOMMENTED' : 'COMMENTED'}</Tag>
              <Progress
                strokeColor={{
                  '0%': '#d9f7be',
                  '100%': '#13c2c2',
                }}
                percent={videoArray[i].grade * 10}
                format={percent => 'Grade ' + percent / 10}
                style={{ marginBottom: '2%', width: '80%' }}
              />
              <List.Item.Meta
                description={'Upload on ' + thisClass.formatDate(videoArray[i].created_at)} />
            </a>
          </Col>
        </List.Item>
      )
    }
    return videoElements
  }

  handleInputSearch = (search) => {
    if (search) {
      // if a search exists (i.e. someone is using the search function)
      // convert the search input into lowercase
      // it allows people to search by either uppercase or lowercase
      const lowerSearch = search.toLowerCase();
      // console.log(search)
      // create a variable, called videoFiltered, use the filter method on 
      let videoFiltered = this.props.videosList.filter(video =>
        // for each video, take the song name/ composer/ instrument, turn it to lower case and then check to see the index position of the search key word, if the searched word exists in the name, then the condition for the filter method will be larger than -1 and therefore true, otherwise it will return false. If true is returned then the video will be placed within videoFiltered.
        // video.song_name.toLowerCase().indexOf(lowerSearch) returns the index of the alphabet inside the search string
        video.song_name.toLowerCase().indexOf(lowerSearch) > -1 ||
        video.composer.toLowerCase().indexOf(lowerSearch) > -1 ||
        video.instrument.toLowerCase().indexOf(lowerSearch) > -1)

      this.setState({
        videoFiltered: videoFiltered
      })
    } else {
      // if no keyword is searched, set the state of videoFiltered as null
      this.setState({
        videoFiltered: null
      })
    }
  }

  handleSelectSearch = (search) => {
    console.log('select search: ', search)
    if (search === 'Uncommented') {
      this.setState({
        sortByUncommented: true,
        sortByCommented: false
      })
    } else if (search === 'Commented') {
      this.setState({
        sortByUncommented: false,
        sortByCommented: true
      })
    } else {
      this.setState({
        sortByUncommented: false,
        sortByCommented: false
      })
    }
  }

  handleSliderChange = value => {
    console.log('slider value: ', value)
    this.setState({
      grade: value
    })
  }

  sortByTime = (isSwitch) => {
    const { videoFiltered } = this.state
    if (videoFiltered !== null) {
      if (isSwitch !== true) {
        videoFiltered.sort(function (a, b) {
          return a.id - b.id;
        })
      } else {
        videoFiltered.sort(function (a, b) {
          return b.id - a.id;
        })
      }
      this.setState({
        videoFiltered: videoFiltered,
        sortByLatest: isSwitch
      })
    } else {
      const propsVideoList = this.props.videosList;
      if (isSwitch !== true) {
        propsVideoList.sort(function (a, b) {
          return a.id - b.id;
        })
      } else {
        propsVideoList.sort(function (a, b) {
          return b.id - a.id;
        })
      }
      this.setState({
        videoFiltered: propsVideoList,
        sortByLatest: isSwitch
      })
    }
  }

  render() {
    const ButtonGroup = Button.Group;
    const { sortByLatest } = this.state;
    const gradeMarks = {
      1: "Grade 1",
      6: "6"
    }
    if (this.props.videosList) {
      return (
        <div>
          <Row type="flex" justify="center" style={{ marginTop: '3%' }}>
            <VideoSearchBar
              onInputChange={this.handleInputSearch}
              onSelectChange={this.handleSelectSearch} />
          </Row>
          <Row type="flex" justify="center">
            <Col xs={14} sm={10} md={6} lg={4}>
              <Slider
                range
                defaultValue={[1, 6]}
                min={1}
                max={6}
                marks={gradeMarks}
                onChange={this.handleSliderChange}
                style={{ width: '90%' }} />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: '3%' }}>
            <Col xs={24} sm={22} md={18} lg={14}>
              <Row type="flex" justify="end">
                <Col>
                  <ButtonGroup>
                    <Button className="btnSortByTime" type={sortByLatest ? 'primary' : null} onClick={this.sortByTime.bind(this, true)}>Latest Video</Button>
                    <Button className="btnSortByTime" type={sortByLatest ? null : 'primary'} onClick={this.sortByTime.bind(this, false)}>Oldest Video</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <List split style={{ borderTop: '1px solid #e8e8e8' }}>
                {this.listingVideos()}
              </List>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div>
          Unable to load videos
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    videosList: state.videosList.videosList.filter(video => video.expert_id == localStorage.getItem('userID') || 
      video.student_id == localStorage.getItem('userID')
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVideos: () => {
      dispatch(getVideos())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosList)