import React from 'react';
import { connect } from 'react-redux';

import ReactDOM from 'react-dom';
import { Table, Divider, Tag } from 'antd';
import 'antd/dist/antd.css';
const axios = require('axios');

export class PendingJobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobData: []
    }
  }

  columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Instrument',
      dataIndex: 'instrument1',
      key: 'instrument1',
    },
    {
      title: 'Level',
      dataIndex: 'level1',
      key: 'level1',
    },
    {
      title: 'Instrument',
      dataIndex: 'instrument2',
      key: 'instrument2',
    },
    {
      title: 'Level',
      dataIndex: 'level2',
      key: 'level2',
    },
    {
      title: 'Instrument',
      dataIndex: 'instrument3',
      key: 'instrument3',
    },
    {
      title: 'Level',
      dataIndex: 'level3',
      key: 'level3',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (

        <span>
          {/* <Divider type="vertical" /> */}
          <a href={text} >Process</a>
        </span>
      ),
    },
  ];

  componentWillMount(){
      axios.get(`${process.env.REACT_APP_API_SERVER}/api/admin/pendingjobs`)
      .then(response => {
        // console.log(response.data,'response.data')
        // console.log(response.data.length,'response.data.length')
        let numOfJobApplication = response.data.length;
        // console.log(response.data[0].first_name,'response.data[1]')
        let data = []
        for(var i = 0; i < numOfJobApplication; i++ ){
          let iKey = i;
          let fName =  response.data[i].first_name;
          let lName = response.data[i].last_name;
          let instructment1 = response.data[i].instrument_1;
          let level1 = response.data[i].level_of_skil_1;
          let instructment2 = response.data[i].instrument_2;
          let level2 = response.data[i].level_of_skil_2;
          let instructment3 = response.data[i].instrument_3;
          let level3 = response.data[i].level_of_skil_3;
          let link = `jobpending/details/${iKey}`
          // console.log(fName,'fName')
          data.push(
            {
              key: iKey,
              firstName: fName,
              lastName: lName,
              instrument1: instructment1,
              level1: level1,
              instrument2: instructment2,
              level2: level2,
              instrument3: instructment3,
              level3: level3,
              action: link
            }
          )
          // console.log(this.data,'data')
        }
        // console.log(this.data,'data22222222222')
        this.setState({allJobData: data})
        console.log(this.state.allJobData,'this.state.allJobData')
      }).catch(err => console.log("Error: ", err))
  }

  render() {

    return(
      <div>
        AdminJobPending
        <Table columns={this.columns} dataSource={this.state.allJobData} />
      </div>
    )
  }
}

// ReactDOM.render(<Table columns={columns} dataSource={data} />, document.getElementById('container'));
          

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProp = dispatch => {
  return {
  }
}

export const RealAddComment = connect(mapStateToProps, mapDispatchToProp)(PendingJobList);

