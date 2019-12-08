import * as React from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap';

class GoBack extends React.Component{

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <Button onClick={this.goBack}>Back</Button>
      </div>
    );
  }
}

export default GoBack = withRouter(GoBack);