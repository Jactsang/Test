import * as React from 'react';
import {connect} from 'react-redux'
import {signUpAction} from '../redux/signUp/actions'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';   
import { storage } from '../Config/FirebaseConfig';
import { InstrumentAndLevelSection } from '../components/InstrumentAndLevel';
import "./ScreensCSS/ExpertSignUp.css";



 export class ExpertSignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            signUpType: 'expert',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            summary: '',
            experience: '',
            educationAndCertificate: '',
            instrument1: '',
            skillLevel1: '',
            instrument2: '',
            skillLevel2: '',
            instrument3: '',
            skillLevel3: '',
            languageEnglish: '',
            languageMandarin: '',
            languageCantonese: '',
            referral: '',
            upload1: '',
            upload2: '',
            upload3: '',
            emailExistMessage: '',
            invalidFormErrorMessage: '',
            emailErrorMessage:'',
            passwordErrorMessage:''
        }
    }

    componentDidUpdate(){
        if(this.state.emailExistMessage === '' && this.props.errorMessage === 'The email exists'){
            this.setState({emailExistMessage: 'This Email has been used'})
        } 
        // Redirect to another page once sign up successfully
        if(this.props.isSignUped === true){
            this.props.history.push('/login')
        }
    }

    onClickField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state)
        console.log(state,'before')
        // Untick a checkbox and set the value back to '' 
        if (!e.currentTarget.checked){
            // console.log('dsfasdfadsfas')
            state[field] = '';
            this.setState(state)
            console.log(state,'after')
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state)
        // console.log(state[field],'state[field]')
        console.log(state,'before')
        // console.log(this.state)

        switch (field) {
            case "email":
                if(!this.state.email.includes('@') ){
                    this.setState({emailErrorMessage: 'invalid email'})
                } 
                if (this.state.email.includes('@') ){
                    this.setState({emailErrorMessage: ''})
                }
            break;
            case "password":
                console.log(state[field].length)
                console.log(this.state.passwordErrorMessage)
                if(state[field].length < 3 ) {
                    this.setState({passwordErrorMessage: 'minimum 3 characaters required'})
                } 
                if (state[field].length > 3 ) {
                    this.setState({passwordErrorMessage: ''})
                } 
            break
  
            default:
              break;
          }
    }

    handleUpload = (field, e) => {
        let url
        var file = e.target.files[0];
        console.log(file,'file')
        var storageRef = storage.ref().child('scoresheet/' + file.name);
        switch (field) {
            case "upload1":
                storageRef.put(file)
                .then(()=>{ storageRef.getDownloadURL()
                    .then((link)=>{
                        url = link
                        console.log(url,'url')
                    })
                    .then(()=>{
                        this.setState({upload1: url})
                        console.log(this.state,'this.state')
                    })
                })
            break;
            case "upload2":
                storageRef.put(file)
                .then(()=>{ storageRef.getDownloadURL()
                    .then((link)=>{
                        url = link
                        console.log(url,'url')
                    })
                    .then(()=>{
                        this.setState({upload2: url})
                        console.log(this.state,'this.state')
                    })
                })
            break
            case "upload3":
                storageRef.put(file)
                .then(()=>{ storageRef.getDownloadURL()
                    .then((link)=>{
                        url = link
                        console.log(url,'url')
                    })
                    .then(()=>{
                        this.setState({upload3: url})
                        console.log(this.state,'this.state')
                    })
                })
            break
          } 
    }

    signUp = () => {
        console.log(this.state.invalidFormErrorMessage,'errorMessage1')
        console.log(this.state.emailErrorMessage,'emailErrorMessage1')
        console.log(this.state.passwordErrorMessage,'passwordErrorMessage1')

        if(this.state.emailErrorMessage !== '' || this.state.passwordErrorMessage !== '') {
            this.setState({invalidFormErrorMessage: 'invalid form'})
            // console.log(this.state.errorMessage,'errorMessage2')
            // console.log(this.state.emailErrorMessage,'emailErrorMessage2')
            // console.log(this.state.passwordErrorMessage,'passwordErrorMessage2')
        }

        // if(this.state.emailErrorMessage === '' && this.state.passwordErrorMessage === '') {
        //     this.setState({invalidFormErrorMessage: ''})
        //     console.log(this.state.invalidFormErrorMessage,'errorMessage2')
        // }

        if(this.state.emailErrorMessage === '' && this.state.passwordErrorMessage === '') {
            this.props.signUp(
                this.state.email, 
                this.state.password, 
                this.state.signUpType,
                this.state.firstName,
                this.state.lastName,
                this.state.summary,
                this.state.experience,
                this.state.educationAndCertificate,
                this.state.instrument1,
                this.state.skillLevel1,
                this.state.instrument2,
                this.state.skillLevel2,
                this.state.instrument3,
                this.state.skillLevel3,
                this.state.languageEnglish,
                this.state.languageMandarin,
                this.state.languageCantonese,
                this.state.referral,
                this.state.upload1,
                this.state.upload2,
                this.state.upload3
            )
        } 
        // if(this.props.errorMessage === 'The email exists'){
        //     this.setState({emailExistMessage: 'This Email has been used'})
        // } 
    }

     formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
    };

    

    render(){
        return (
            <div>


                <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Label for="examplePassword">Create your Account</Label>
                    </Col>
                </Row>
                    <Form >

                        <div id='account-password'>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <Col xs="6">
                                        <FormGroup>
                                            {/* <Label for="exampleEmail">Email</Label> */}
                                            <Input type="email" name="email" id="exampleEmail" onChange={this.onChangeField.bind(this, 'email')} value={this.state.email} placeholder="Email" />
                                        </FormGroup>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4">
                                    <div>
                                        {this.state.emailErrorMessage}
                                    </div>  
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <Col xs="6">
                                        <FormGroup>
                                            {/* <Label for="examplePassword">Password</Label> */}
                                            <Input type="password" name="password" id="examplePassword" onChange={this.onChangeField.bind(this, 'password')} value={this.state.password} placeholder="Password"/>
                                        </FormGroup>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4">
                                    <div>
                                        {this.state.passwordErrorMessage}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <hr />

                        <div id='job-application'>
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <Label for="examplePassword">Tell Us More About Yourself</Label>
                            </Col>
                        </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="5">
                                                <FormGroup>
                                                    <Label for="examplePassword">Frist Name</Label>
                                                    <Input type="test" id="examplePassword" onChange={this.onChangeField.bind(this, 'firstName')} value={this.state.firstName} />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="5">
                                                <FormGroup>
                                                    <Label for="examplePassword">Last Name</Label>
                                                    <Input onChange={this.onChangeField.bind(this, 'lastName')} type="text" value={this.state.lastName}  />
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <FormGroup>
                                                <Label for="exampleText">Summary</Label>
                                                <Input onChange={this.onChangeField.bind(this, 'summary')} type="textarea" value={this.state.summary} />
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <FormGroup>
                                                <Label for="exampleText">Experience</Label>
                                                <Input onChange={this.onChangeField.bind(this, 'experience')} type="textarea" value={this.state.experience} />
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <FormGroup>
                                                <Label for="exampleText">Education and Certificate</Label>
                                                <Input onChange={this.onChangeField.bind(this, 'educationAndCertificate')} type="textarea" value={this.state.educationAndCertificate} />
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="5">
                                            <FormGroup >
                                                <Label for="exampleSelect">Instrument</Label>
                                                <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')}>
                                                    <option>Select</option>
                                                    <option>Piano</option>
                                                    <option>Guitar</option>
                                                    <option>Singing</option>
                                                </Input>
                                            </FormGroup>    
                                            </Col>
                                            <Col xs="5">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Skill Level</Label>
                                                    <Input type="select" onChange={this.onChangeField.bind(this, 'skillLevel1')}>
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </Input>
                                                </FormGroup>    
                                            </Col>
                                        </Col>
                                    </Row>
            
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="5">
                                            <FormGroup>
                                                <Input type="select" onChange={this.onChangeField.bind(this, 'instrument2')}>
                                                    <option>Select</option>
                                                    <option>Piano</option>
                                                    <option>Guitar</option>
                                                    <option>Singing</option>
                                                </Input>
                                            </FormGroup>    
                                            </Col>
                                            <Col xs="5">
                                                <FormGroup>
                                                    <Input type="select" onChange={this.onChangeField.bind(this, 'skillLevel2')}>
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </Input>
                                                </FormGroup>    
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="5">
                                            <FormGroup>
                                                <Input type="select" onChange={this.onChangeField.bind(this, 'instrument3')}>
                                                    <option>Select</option>
                                                    <option>Piano</option>
                                                    <option>Guitar</option>
                                                    <option>Singing</option>
                                                </Input>
                                            </FormGroup>    
                                            </Col>
                                            <Col xs="5">
                                                <FormGroup>
                                                    <Input type="select" onChange={this.onChangeField.bind(this, 'skillLevel3')}>
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </Input>
                                                </FormGroup>    
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <Label for="exampleSelect">Language</Label>
                                            </Col>
                                            <Col xs="10" id='language'>
                                                <Col xs="4">
                                                    <FormGroup check inline>
                                                    <Label check>
                                                    <Input type="checkbox" value='true' onClick={this.onClickField.bind(this, 'languageEnglish')}/>English
                                                    </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs="4">
                                                    <FormGroup check inline>
                                                    <Label check>
                                                    <Input type="checkbox" value='true' onChange={this.onClickField.bind(this, 'languageMandarin')}/>Mandarin
                                                    </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs="4">
                                                    <FormGroup check inline>
                                                    <Label check>
                                                    <Input type="checkbox" value='true' onChange={this.onClickField.bind(this, 'languageCantonese')}/>Cantonese
                                                    </Label>
                                                    </FormGroup>
                                                </Col>    
                                            </Col>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <FormGroup>
                                                    <Label for="exampleEmail">Name of Referral</Label>
                                                    <Input type="text" onChange={this.onChangeField.bind(this, 'referral')} type="text" value={this.state.referral} />
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <FormGroup>
                                                    <Label for="exampleFile">CV</Label>
                                                    <Input type="file" name="file" onChange={this.handleUpload.bind(this, 'upload1')} />
                                                    <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    </FormText>
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                                            <Col xs="10">
                                                <FormGroup>
                                                    <Label for="exampleFile">Other</Label>
                                                    <Input type="file" name="file" onChange={this.handleUpload.bind(this, 'upload2')} />
                                                    <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    </FormText>
                                                </FormGroup>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <p>{this.state.invalidFormErrorMessage}</p>
                                    <p>{this.state.emailExistMessage}</p>

                                    <Button onClick={this.signUp} >Submit</Button>
            
                        </div>
                        
                    </Form>
                    </Container> 
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.signUp.signUpErrorMessage,
        isSignUped: state.signUp.isSignUped
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        signUp: (
                email,
                password, 
                signUpType, 
                firstName,
                lastName,
                summary,
                experience,
                educationAndCertificate,
                instrument1,
                skillLevel1,
                instrument2,
                skillLevel2,
                instrument3,
                skillLevel3,
                languageEnglish,
                languageMandarin,
                languageCantonese,
                referral,
                upload1,
                upload2,
                upload3
            ) => {
            // Passing the signUpType to action as well
            dispatch(signUpAction(
                email,
                password, 
                signUpType, 
                firstName,
                lastName,
                summary,
                experience,
                educationAndCertificate,
                instrument1,
                skillLevel1,
                instrument2,
                skillLevel2,
                instrument3,
                skillLevel3,
                languageEnglish,
                languageMandarin,
                languageCantonese,
                referral,
                upload1,
                upload2,
                upload3
                )
            )
        }
    }
}
 
     
export default connect(mapStateToProps, mapDispatchToProps)(ExpertSignUp)

