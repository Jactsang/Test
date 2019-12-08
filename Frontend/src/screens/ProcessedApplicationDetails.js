import * as React from 'react';
import { connect } from 'react-redux';
import { getProcessedCandidate } from '../redux/jobApplication/actions';
import { getProcessedDetails } from '../redux/appDetails/actions';
import { Descriptions, Col, Tag, Icon } from 'antd';
import './ScreensCSS/processedJobList.css';

class ProcessedApplicationDetails extends React.Component {
      constructor(props){
        super(props)
        this.state = {
          application_id: localStorage.getItem('id'),
          status: localStorage.getItem('status')
        }
      }

    componentDidMount() {
        this.getProcessedDetails(this.state.application_id)
        console.log(localStorage.getItem('id') + ' Processed')
        console.log('status: ' + localStorage.getItem('status'))
    }

    getProcessedDetails = () => {
        this.props.getProcessedDetails(this.state.application_id)
    }

    detailsList = () => {
        let details = [];

        for (let i=0; i<this.props.details.length; i++){
            let detailsFirstName = this.props.details[i].first_name
            let detailsLastName = this.props.details[i].last_name
            let detailsEmail = this.props.details[i].email
            let detailsEducation = this.props.details[i].education_certificate
            
            let Instruments = [];
            let detailsInstrument1 = this.props.details[i].instrument_1
            let detailsInstrument2 = this.props.details[i].instrument_2
            let detailsInstrument3 = this.props.details[i].instrument_3
            Instruments.push(detailsInstrument1, detailsInstrument2, detailsInstrument3)
            
            let skillLevel =[];
            let detailsLevel1 = this.props.details[i].level_of_skil_1
            let detailsLevel2 = this.props.details[i].level_of_skil_2
            let detailsLevel3 = this.props.details[i].level_of_skil_3
            skillLevel.push(detailsLevel1, detailsLevel2, detailsLevel3)

            let detailsExperience = this.props.details[i].experience
            
            let detailsLangCan = this.props.details[i].language_Cantonese
            let detailsLangEng = this.props.details[i].language_English
            let detailsLangMan = this.props.details[i].language_Mandarin

            let detailsReferral = this.props.details[i].referral
            let detailsSummary = this.props.details[i].summary

            let detailsDate = this.props.details[i].created_at
            let formattedDate = detailsDate.substring(0,10)

            let detailStatus;
            if (this.state.status === "true"){
                detailStatus = "Approved"
            } else if (this.state.status === "b"){
                detailStatus = "Denied"
            }

            let uploads = [];
            let detailsUpload1 = this.props.details[i].upload_1
            let detailsUpload2 = this.props.details[i].upload_2
            let detailsUpload3 = this.props.details[i].upload_3
            uploads.push(detailsUpload1, detailsUpload2, detailsUpload3)
            

            details.push(
                <Descriptions className="applicationDetails" layout="vertical" bordered 
                    column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 1 }}
                    style={{ width: "80vw" }}>
                    <Descriptions.Item label="First Name" span={2} >{detailsFirstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={4}>{detailsLastName}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={4}>{detailsEmail}</Descriptions.Item>
                    <Descriptions.Item label="Education" span={4}>{detailsEducation}</Descriptions.Item>

                    <Descriptions.Item label="Instrument(s)" span={2}>
                        {Instruments.map((instrument, i) => {
                            if (instrument !== ""){
                                return (<li key={i}>{instrument}</li>)
                            }
                        })}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Level Achieved" span={4}>
                        {skillLevel.map((level, i) => {
                            if (level !== 0){
                                return (<li key={i}>{level}</li>)
                            }
                        })}
                    </Descriptions.Item>

                    <Descriptions.Item label="Experience" span={4}>{detailsExperience}</Descriptions.Item>

                    <Descriptions.Item label="Language" span={2}>
                        {detailsLangCan ? "Cantonese ": ""}
                        {detailsLangEng ? "English ": ""}
                        {detailsLangMan ? "Mandarin": ""}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Referral" span={4}>{detailsReferral}</Descriptions.Item>
                    <Descriptions.Item label="Personal Statement" span={4}>{detailsSummary}</Descriptions.Item>
                    <Descriptions.Item label="Application Submission Date" span={2}>{formattedDate}</Descriptions.Item>                    
                    <Descriptions.Item label="Status" span={2}>
                        {/* {this.state.status ? "A":"B"} */}
                        {detailStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="View Uploaded Documents" span={4}>
                        {uploads.map((upload, i) => {
                            if (upload !== ""){
                                return (<li key={i}><Tag style={{border:"none", background:"#fff", color:"#1890ff"}}>
                                        <a target="_blank" href={upload}>Document {i + 1}</a>
                                        </Tag></li>)
                            }
                        })}
                    </Descriptions.Item>
                </Descriptions> 
            )
        }
        return details;
    }

    render() {
        return(
            <div style={{ margin: "50px" }}>
                <Col type="flex" justify="center" align="middle" >
                    <h3 className="test"><Icon type="idcard" size="30px"/> Application Details</h3>
                    <br/>
                    {this.detailsList()}
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        candidateInfo: state.jobApplicationStore.candidateInfo,
        details: state.detailsStore.details
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProcessedCandidate: (payload) => {
            dispatch(getProcessedCandidate(payload))
        },
        getProcessedDetails: (application_id) => {
            dispatch(getProcessedDetails(application_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessedApplicationDetails)