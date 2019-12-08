import * as React from "react";
import EarningFigures from "../components/EarningsGraph";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEarningData } from "../redux/earningFigures/actions";
import ExpertGuide from "../components/ExpertGuide";
import { Row, Col, Button, AutoComplete } from "antd";
import "antd/dist/antd.css";
import bg_image from '../images/page_bg.png'

const background = {
  backgroundImage: `url(${bg_image})`,
  backgroundPosition: "bottom",
  height: `100vh`,
  width: `auto`,
  backgroundSize: "cover"
}

class ExpertDashboard extends React.Component {
  componentDidMount() {
    this.props.getEarningData();
  }

  render() {
    return (
      <div>
        <br/>
                <Row>
          <Col span ={10}></Col>
          <Col span ={8}>
        <ExpertGuide />
        </Col>
        
        </Row>

        <Row>
        <EarningFigures />
        </Row>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vidTotalNumber: state.vidFiguresStore.vidTotalNumber,
    vidTotalDuration: state.vidFiguresStore.vidTotalDuration,
    lastVideoPost: state.vidFiguresStore.lastVideoPost,
    lastVideoComment: state.vidFiguresStore.lastVideoComment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEarningData: () => {
      dispatch(getEarningData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertDashboard);
