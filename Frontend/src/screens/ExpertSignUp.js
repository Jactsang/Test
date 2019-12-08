import * as React from 'react';
import {connect} from 'react-redux'
import {signUpAction} from '../redux/signUp/actions' 
import { storage } from '../Config/FirebaseConfig';
import { Upload, message, Icon, Row, Col, Button, Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber,  Checkbox } from 'antd';
import "./ScreensCSS/ExpertSignUp.css";
import Background from "../images/14988.jpg";
import NavBarPending from "../components/NavBarPending"

const backgroundImg = {
    width: "100%",
    height: "100%vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    zIndex: 1,
    opacity: ".8"
  };

const { TextArea } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

 export class ExpertSignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            signUpType: 'expert',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            summary: '',
            experience: '',
            educationAndCertificate: '',
            instrument1: '',
            skillLevel1: 0,
            instrument2: '',
            skillLevel2: 0,
            instrument3: '',
            skillLevel3: 0,
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

    onSelectChange = (field, value) => {
        const state = {};
        state[field] = value;
        this.setState(state)
        console.log(state,'before')
    }

    onClickField = (field, value,e) => {
        const state = {};
        state[field] = value;
        this.setState(state)
        console.log(state,'before')
        if (!e.currentTarget.checked){
            // console.log('dsfasdfadsfas')
            state[field] = '';
            this.setState(state)
            console.log(state,'after')
        }
    }

    handleUpload = (field, e) => {
        // This is For ant design
        console.log(e.file.originFileObj,'e.file.originFileObj')
        console.log(e.file.originFileObj.name,'e.file.originFileObj.name')

        let url
        var file = e.file.originFileObj;

        var storageRef = storage.ref(`scoresheet/${file.name}`)

        // var storageRef = storage.ref().child('video/' + file.name);
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
            break;
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
            break;
            default: 
            return null;
          } 
    }

    signUp = () => {
        // console.log(this.state.invalidFormErrorMessage,'errorMessage1')
        // console.log(this.state.emailErrorMessage,'emailErrorMessage1')
        // console.log(this.state.passwordErrorMessage,'passwordErrorMessage1')

        if(this.state.emailErrorMessage !== '' || this.state.passwordErrorMessage !== '') {
            this.setState({invalidFormErrorMessage: 'invalid form'})
            // console.log(this.state.errorMessage,'errorMessage2')
            // console.log(this.state.emailErrorMessage,'emailErrorMessage2')
            // console.log(this.state.passwordErrorMessage,'passwordErrorMessage2')
        }

        if(this.state.emailErrorMessage === '' && this.state.passwordErrorMessage === '') {
            this.props.signUp(
                this.state.name,
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
    }

     formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
    };

    

    render(){
        return (
            <div>
            <NavBarPending/>
            <div style={backgroundImg} >
                 <Form {...this.formItemLayout} >
                    <Form.Item
                    label="Email"
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                    >
                        <Input placeholder="Email" onChange={this.onChangeField.bind(this, 'email')} value={this.state.email}/>
                        <div style={{color: "red"}}>
                            {this.state.emailErrorMessage}
                        </div>
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    // validateStatus="error"
                    >
                        <Input placeholder="Password" onChange={this.onChangeField.bind(this, 'password')} value={this.state.password} />
                        <div style={{color: "red"}}>
                            {this.state.passwordErrorMessage}
                        </div>
                    </Form.Item>
                        <Form.Item
                            label="First Name"
                            >
                            <Input onChange={this.onChangeField.bind(this, 'firstName')} value={this.state.firstName}/>
                            
                        </Form.Item>

        
                        <Form.Item
                            label="Last Name"
                            >
                            <Input onChange={this.onChangeField.bind(this, 'lastName')} type="text" value={this.state.lastName} />
                        </Form.Item>
        
                    <Form.Item
                    label="Summary"
                    >
                        <TextArea id='text-area' onChange={this.onChangeField.bind(this, 'summary')} type="textarea" value={this.state.summary}/>
                    </Form.Item>

                    <Form.Item
                    label="Experience"
                    >
                        <TextArea id='text-area' onChange={this.onChangeField.bind(this, 'experience')} type="textarea" value={this.state.experience}/>
                    </Form.Item>

                    <Form.Item
                    label="Education and Certificate"
                    >
                        <TextArea id='text-area' onChange={this.onChangeField.bind(this, 'educationAndCertificate')} type="textarea" value={this.state.educationAndCertificate} />
                    </Form.Item>

                    <Row>
                        <Col span={6} offset={6}>
                            <Form.Item label="Instrument">
                                <InputGroup compact >
                                    {/* <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')} value={this.state.instrument1} /> */}
                                        <Select defaultValue="Select" 
                    
                                        onChange={this.onSelectChange.bind(this, 'instrument1')} 
                                        >
                                            <Option value="Piano">Piano</Option>
                                            <Option value="Guitar">Guitar</Option>
                                            <Option value="Singing">Singing</Option>
                                        </Select>
                                </InputGroup>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label="Skill Level">
                                <InputGroup compact >
                                    {/* <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')} value={this.state.instrument1} /> */}
                                        <Select defaultValue="Select" 
                                        onChange={this.onSelectChange.bind(this, 'skillLevel1')}
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={4}>4</Option>
                                            <Option value={5}>5</Option>
                                            <Option value={6}>6</Option>
                                        </Select>
                                </InputGroup>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} offset={6}>
                            <Form.Item label="Instrument">
                                <InputGroup compact >
                                    {/* <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')} value={this.state.instrument1} /> */}
                                        <Select defaultValue="Select" 
                    
                                        onChange={this.onSelectChange.bind(this, 'instrument2')} 
                                        >
                                            <Option value="Piano">Piano</Option>
                                            <Option value="Guitar">Guitar</Option>
                                            <Option value="Singing">Singing</Option>
                                        </Select>
                                </InputGroup>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label="Skill Level">
                                <InputGroup compact >
                                    {/* <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')} value={this.state.instrument1} /> */}
                                        <Select defaultValue="Select" 
                                        onChange={this.onSelectChange.bind(this, 'skillLevel2')}
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={4}>4</Option>
                                            <Option value={5}>5</Option>
                                            <Option value={6}>6</Option>
                                        </Select>
                                </InputGroup>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} offset={6}>
                            <Form.Item label="Instrument">
                                <InputGroup compact >
                                    {/* <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')} value={this.state.instrument1} /> */}
                                        <Select defaultValue="Select" 
                    
                                        onChange={this.onSelectChange.bind(this, 'instrument3')} 
                                        >
                                            <Option value="Piano">Piano</Option>
                                            <Option value="Guitar">Guitar</Option>
                                            <Option value="Singing">Singing</Option>
                                        </Select>
                                </InputGroup>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label="Skill Level">
                                <InputGroup compact >
                                    {/* <Input type="select" onChange={this.onChangeField.bind(this, 'instrument1')} value={this.state.instrument1} /> */}
                                        <Select defaultValue="Select" 
                                        onChange={this.onSelectChange.bind(this, 'skillLevel3')}
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={4}>4</Option>
                                            <Option value={5}>5</Option>
                                            <Option value={6}>6</Option>
                                        </Select>
                                </InputGroup>
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={12} offset={8} id='language'>
                            <Col span={6} >
                                <Checkbox onClick={this.onClickField.bind(this, 'languageEnglish',true)}>English</Checkbox>
                            </Col>
                            <Col span={6} >
                                <Checkbox onClick={this.onClickField.bind(this, 'languageMandarin',true)}>Mandarin</Checkbox>
                            </Col>
                            <Col span={6} >
                                <Checkbox onClick={this.onClickField.bind(this, 'languageCantonese',true)}>Cantonese</Checkbox>
                            </Col>
                        </Col>
                    </Row>
                    <br></br>

                    <Form.Item
                    label="Name of Referral">
                        <Input onChange={this.onChangeField.bind(this, 'referral')} value={this.state.referral}/>
                    </Form.Item>

                    <Form.Item label="CV">
                        <Upload onChange={this.handleUpload.bind(this, 'upload1')}>
                            <Button >
                            <Icon type="upload" /> Click to Upload
                        
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Others">
                        <Upload onChange={this.handleUpload.bind(this, 'upload2')}>
                            <Button >
                            <Icon type="upload" /> Click to Upload
                        
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Row>
                        <Col span={10} offset={7} >
                            <Form.Item >
                                <div id='error-msg' style={{color: "red"}}>
                                    <p>{this.state.invalidFormErrorMessage}</p>
                                    <p>{this.state.emailExistMessage}</p>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row id='submit-button'>
                        <Col span={3} offset={11}>
                            <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={this.signUp} span={12} offset={10}>
                                        Submit
                                    </Button>
                                    
                            </Form.Item>
                        </Col>
                    </Row>
              </Form>

            </div>
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
                name,
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
                name,
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

