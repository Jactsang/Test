import * as React from 'react';
import { logoutNow } from '../redux/auth/actions';
import { connect } from 'react-redux';
import PageNotFoundImg from '../images/PageNotFound.png';
import { Row, Col } from 'antd';

export class NoMatch extends React.Component {
  logout = () => {
    this.props.logout()
  }
  render(){
    return (
      <div className="nomatch" style={{ padding: "30px" }}>
        <Row type="flex" justify="center" align="middle">
          <Col md={14} xs={24}>
        <h1>Sorry, </h1>
        <h2>we couldn't find the page you're looking for.</h2>
        </Col>

        <Col md={10} xs={{offse:12}}>
        <img src={PageNotFoundImg} alt="PageNotFoundImg" style={{width:"40vw", textAlign:"center"}} />
        </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutNow())
    }
  }
}

export default connect(null, mapDispatchToProps)(NoMatch)