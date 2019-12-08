import * as React from 'react';
import {connect} from 'react-redux'
import {signUpAction} from '../redux/signUp/actions'

 export class AdminSignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            signUpType: 'admin',
            email: '',
            password: '',
            errorMessage: '',
            name: '',
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state)
    }

    signUp = () => {
        // console.log(this.state.email, this.state.password, this.state.signUpType)
        this.props.signUp(this.state.name,this.state.email, this.state.password, this.state.signUpType)
    }

    componentDidUpdate(){
        // Pop up Error Message when it receives this.props.errorMessage === 'The email exists'
        // this.state.errorMessage === '' prevents infinite loop
        if(this.state.errorMessage === '' && this.props.errorMessage === 'The email exists'){
            this.setState({errorMessage: 'This Email has been used'})
        } 
        // Redirect to another page once sign up successfully
        if(this.props.isSignUped === true){
            this.props.history.push('/login')
        }
    }

    render(){
        return (
            <div>
                <p>{this.state.errorMessage}</p>
                Email:
                <input onChange={this.onChangeField.bind(this, 'email')} type="text" value={this.state.email} /> 
                <br />
                Password:
                <input onChange={this.onChangeField.bind(this, 'password')} type="text" value={this.state.password} /> 
                <br />
                <button onClick={this.signUp}>Sign Up</button>
                <br />
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
        signUp: (name, email, password, signUpType) => {
            // Passing the signUpType to action as well
            dispatch(signUpAction(name, email, password, signUpType))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUp)

