import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Checkout from '../components/Checkout';
import { getSubscriptionData } from '../redux/subscription/actions';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { Row, Col, Button, Icon, Modal, notification } from 'antd';
import 'antd/dist/antd.css';
import './ScreensCSS/subscription.css';

class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseModal: false
        }
    }

    componentWillMount() {
        this.props.getSubscriptionData();
    }

    componentDidUpdate(prevProps) {
        console.log('did updated')
        if (this.props.subscribed !== prevProps.subscribed) {
            this.checkSubscription();
        }
        this.props.getSubscriptionData();
    }

    checkSubscription = async () => {
        const userID = localStorage.getItem('userID');
        // console.log('subscribed? ', this.props.subscribed)
        // console.log('subscription date ', this.props.subscription_date)
        // console.log('expiry date ', this.props.expiry_date.toLocaleString())
        if (this.props.subscribed) {
            console.log('checking subscription')
            let token = localStorage.getItem('token');
            let expiryDate = new Date(this.props.expiry_date);
            let today = new Date();
            let expiredSeconds = expiryDate.getTime() / 1000;
            let todaySeconds = today.getTime() / 1000;
            if (expiredSeconds < todaySeconds) {
                console.log('updating subscription status...')
                // await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID });
                await axios.post(`${process.env.REACT_APP_API_SERVER}/api/subscription`, { id: userID }, {
                    headers: { "Authorization": `Bearer ${token}` } 
                });
                this.props.getSubscriptionData();
            }
        }
    }

    handlePurchase = () => {
        this.setState({
            purchaseModal: true
        })
    }

    handleModalClose = (successPaid) => {
        if (typeof successPaid !== undefined) {
            if (successPaid) {
                notification.open({
                    message: 'Thank You!',
                    description:
                      'Payment was successfully made.',
                    icon: <Icon type="smile" style={{ color: '#a0d911' }} />,
                    duration: 6
                  });
                // alert('Payment was successfully made. Thank You!')
                this.setState({
                    purchaseModal: false
                })
            } else {
                notification.open({
                    message: 'Sorry',
                    description:
                      'The payment has failed. Please try again or contact us for help.',
                    icon: <Icon type="frown" style={{ color: '#595959' }} />,
                    duration: 6
                  });
                // alert('Sorry, the payment has failed. Please try again or contact us for help.')
                this.setState({
                    purchaseModal: true
                })
            }
        } else {
            this.setState({
                purchaseModal: false
            })
        }
    }

    modalCloseBeforePaid = () => {
        this.setState({
            purchaseModal: false
        })
    }

    render() {
        const { purchaseModal } = this.state;
        return (
            <div>
                <Row type="flex" justify="center" align="middle" id="subscriptionPlan">
                    <Col xs={22} sm={14} md={8} id="quotaUpgrade">
                        <div className="quotaUpgradeHeader">30-Day Quota Upgrade</div>
                        <br />
                        <Icon type="thunderbolt" style={{ fontSize: '6rem', color: '#ffec3d', textAlign: 'middle', marginBottom: '3%' }} />
                        <ul>
                            <div className="quotaUpgradeSubHead">For first-time/ upgrade-expired buyers: </div>
                            <li><div className="quotaUpgradeContent">Enjoy 5 more video quotas within 30 days</div></li>
                        </ul>
                        <ul>
                            <div className="quotaUpgradeSubHead">If upgrade again before expiry date:  </div>
                            <li><div className="quotaUpgradeContent">Extend expiry date to next 30 days from current time</div></li>
                            <li><div className="quotaUpgradeContent">Enjoy remaining upgraded video quotas with extended expiry date</div></li>
                            <li><div className="quotaUpgradeContent">Enjoy 5 more video quotas within 30 days</div></li>
                        </ul>
                        <div className="quotaUpgradeHeader">USD 50</div>
                        <br />
                        <Button onClick={this.handlePurchase} value="large">Purchase Now</Button>
                    </Col>
                </Row>
                <Modal
                    visible={purchaseModal}
                    onCancel={this.modalCloseBeforePaid}
                    footer={null}
                >
                    <StripeProvider apiKey='pk_test_kfYfHjinpv2vTrPpffHBRj2h00ZFObhe7S'>
                        <Elements>
                            <Checkout afterSubmit={this.handleModalClose} />
                        </Elements>
                    </StripeProvider>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        subscribed: state.subscriptionStore.subscribed,
        subscription_date: state.subscriptionStore.subscription_date,
        expiry_date: state.subscriptionStore.expiry_date,
        quota_left: state.subscriptionStore.quota_left
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSubscriptionData: () => {
            dispatch(getSubscriptionData())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscription);
