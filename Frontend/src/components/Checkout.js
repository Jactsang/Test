import React, {Component, Fragment} from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import axios from 'axios';
import { Input, Button, Row } from 'antd';
import 'antd/dist/antd.css';
import './ComponentCSS/checkOut.css';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    handleInputChange = (field, e) => {
        const state = {};
        state[field] = e.target.value;
        this.setState(state);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting!');
        try{
            let stripeToken = await this.props.stripe.createToken({type: 'card', name: this.state.name});
            console.log('stripeToken', stripeToken)
            let amount = this.state.amount;
            let userId = await localStorage.getItem("userID")
            let token = await localStorage.getItem('token');
            let successPaid;
            await axios.post(`${process.env.REACT_APP_API_SERVER}/api/payment`, {
                userId: userId,
                stripeToken: stripeToken,
                amount: amount}, 
                {headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                })
                .then(function (res) {
                    // handle success
                    console.log('axios success: ',res);
                    successPaid = true;
                  })
                  .catch(function (error) {
                    // handle error
                    alert('Sorry, there is an error. The payment is not successful. Please try again.')
                    console.log('axios fail: ', error);
                    successPaid = false;
                  })
            //redirect, clear inputs, thanks alert
            this.props.afterSubmit(successPaid)
        }catch(e){
            throw e
        }
    }

    render(){
        return(
            <Fragment>
                <h1>30-Day Quota Upgrade Plan</h1>
                <h3>Total Price: USD 50</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <br />
                    <Input
                        className="formItem"
                        placeholder="Full Name"
                        value={this.state.name}
                        onChange={this.handleInputChange.bind(this, 'name')}/>
                    {/* <br />
                    <label>Amount</label>
                    <br />
                    <Input 
                        className="formItem"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.handleInputChange.bind(this, 'amount')}/> */}
                    <br/>
                    <CardElement className="formItem"/>
                    <br/>
                    <Row type="flex" justify="center" align="middle">
                    <Button onClick={this.handleSubmit}>Pay Here</Button>
                    </Row>
                </form>
            </Fragment>
        )
    }
}

export default injectStripe(Checkout);