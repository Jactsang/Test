import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProcessedCandidate } from '../redux/jobApplication/actions';
import CandidateSearchBar from '../components/CandidateSearchBar';
import { Table, Tag, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import './ScreensCSS/processedJobList.css';

export class ProcessedJobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateFiltered: null,
      sortByApproved: false,
      sortByDenied: false,
      sortByLatest: true
    }
  }

  componentDidMount() {
    this.props.getProcessedCandidate();
  }

  columns = [
    {
      title: 'Date Applied',
      dataIndex: 'dateApplied',
      key: 'dateApplied',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Instruments',
      dataIndex: 'skills',
      key: 'skills',
      render: skills => (
        <Fragment>
          {skills.map((skill, i) => {
            let color;
            if (skill.instrument === "Piano") {
              color = "volcano"
            } else if (skill.instrument === "Guitar") {
              color = "gold"
            } else if (skill.instrument === "Singing") {
              color = "cyan"
            }
            return (
              <Fragment>
                {skill.instrument !== '' ?
                  <Tag key={i} color={color}>
                    {`${skill.instrument.toUpperCase()} GRADE ${skill.level}`}
                  </Tag> : null}
              </Fragment>
            )
          })}
        </Fragment>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Fragment>
          {status ? 'Approved' : 'Denied'}
        </Fragment>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href={text[0]} onClick={() => {
            localStorage.setItem('id', text[1]);
            localStorage.setItem('status', text[2])
          }}><Button>Details</Button></a>
        </span>
      ),
    },
  ];

  handleDataReceived = () => {
    const { candidateFiltered, sortByApproved, sortByDenied, sortByLatest } = this.state;
    let candidateFilteredByInput, candidateInfo;
    let dataSource = [];

    if (candidateFiltered !== null) {
      candidateFilteredByInput = candidateFiltered
    } else {
      candidateFilteredByInput = this.props.candidateInfo
    }

    if (sortByApproved) {
      candidateInfo = candidateFilteredByInput.filter(candidate =>
        candidate.approved === true)
    } else if (sortByDenied) {
      candidateInfo = candidateFilteredByInput.filter(candidate =>
        candidate.approved === false)
    } else {
      candidateInfo = candidateFilteredByInput
    }

    const numOfCandidate = candidateInfo.length

    for (let i = 0; i < numOfCandidate; i++) {
      dataSource.push({
        id: candidateInfo[i].id,
        firstName: candidateInfo[i].firstName,
        lastName: candidateInfo[i].lastName,
        skills: candidateInfo[i].skills,
        status: candidateInfo[i].approved,
        action: [`/processedApplicationDetails/${candidateInfo[i].id}`, candidateInfo[i].id, candidateInfo[i].approved],
        dateApplied: candidateInfo[i].date.split("T")[0]
      })
      console.log(`candidate ${candidateInfo[i].id}`, candidateInfo[i].approved)
    }

    if(sortByLatest){
      dataSource.sort(function (a, b) {
        return b.id - a.id;
      })
    }else{
      dataSource.sort(function (a, b) {
        return a.id - b.id;
      })
    }

    return dataSource
  }

  setItemToLocalStorage = (index) => {

  }

  handleInputSearch = (search) => {
    if (search) {
      // if a search exists (i.e. someone is using the search function)
      // convert the search input into lowercase
      // it allows people to search by either uppercase or lowercase
      const lowerSearch = search.toLowerCase();
      console.log(search)
      // create a variable, called candidateFiltered, use the filter method on 
      let candidateFiltered = this.props.candidateInfo.filter(candidate =>
        // for each candidate, take the first name/ last name/ instrument, turn it to lower case and then check to see the index position of the search key word, if the searched word exists in the name, then the condition for the filter method will be larger than -1 and therefore true, otherwise it will return false. If true is returned then the candidate will be placed within candidateFiltered.
        // candidate.firstName.toLowerCase().indexOf(lowerSearch) returns the index of the alphabet inside the search string
        candidate.firstName.toLowerCase().indexOf(lowerSearch) > -1 ||
        candidate.lastName.toLowerCase().indexOf(lowerSearch) > -1 ||
        candidate.skills[0].instrument.toLowerCase().indexOf(lowerSearch) > -1 ||
        candidate.skills[1].instrument.toLowerCase().indexOf(lowerSearch) > -1 ||
        candidate.skills[2].instrument.toLowerCase().indexOf(lowerSearch) > -1)

      this.setState({
        candidateFiltered: candidateFiltered
      })
    } else {
      // if no keyword is searched, set the state of candidateFiltered as null
      this.setState({
        candidateFiltered: null
      })
    }
  }

  handleSelectSearch = (search) => {
    console.log('select search: ', search)
    if (search === 'Approved') {
      this.setState({
        sortByApproved: true,
        sortByDenied: false
      })
    } else if (search === 'Denied') {
      this.setState({
        sortByApproved: false,
        sortByDenied: true
      })
    } else {
      this.setState({
        sortByApproved: false,
        sortByDenied: false
      })
    }
  }

  sortByTime = (isSwitch) => {
    const { candidateFiltered } = this.state
    if (candidateFiltered !== null) {
      if (isSwitch !== true) {
        candidateFiltered.sort(function (a, b) {
          return a.id - b.id;
        })
      } else {
        candidateFiltered.sort(function (a, b) {
          return b.id - a.id;
        })
      }
      this.setState({
        candidateFiltered: candidateFiltered,
        sortByLatest: isSwitch
      })
    } else {
      const propsCandidateList = this.props.candidateInfo;
      if (isSwitch !== true) {
        propsCandidateList.sort(function (a, b) {
          return a.id - b.id;
        })
      } else {
        propsCandidateList.sort(function (a, b) {
          return b.id - a.id;
        })
      }
      this.setState({
        candidateFiltered: propsCandidateList,
        sortByLatest: isSwitch
      })
    }
  }

  render() {
    const ButtonGroup = Button.Group;
    const { sortByLatest } = this.state;
    return (
      <Fragment>
        <h2 style={{marginTop: '2%', textAlign: "center"}}>Processed Applications</h2>
        <Row type="flex" justify="center" align="middle" style={{ marginTop: '2%', marginBottom: '2%' }}>
          <CandidateSearchBar
            onInputChange={this.handleInputSearch}
            onSelectChange={this.handleSelectSearch}
            onPending={false} />
        </Row>
        <Row type="flex" justify="center" align="middle" style={{ marginTop: '2%', marginBottom: '2%' }}>
          <Col>
            <ButtonGroup>
              <Button type={sortByLatest ? 'primary' : null} onClick={this.sortByTime.bind(this, true)}>Latest Candidate</Button>
              <Button type={sortByLatest ? null : 'primary'} onClick={this.sortByTime.bind(this, false)}>Oldest Candidate</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row style={{marginTop: '5%'}}>
          <Col xs={24}>
        <Table className="joblist" dataSource={this.handleDataReceived()} columns={this.columns} scroll={{x:true}}/>
          </Col>
        </Row>
        </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    candidateInfo: state.jobApplicationStore.candidateInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProcessedCandidate: (payload) => {
      dispatch(getProcessedCandidate(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessedJobList);

