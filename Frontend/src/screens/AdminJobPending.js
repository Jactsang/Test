import * as React from 'react';
import {connect} from 'react-redux'
import { PendingJobList } from '../components/PendingJobList';

 export class AdminJobPending extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <div>
                <PendingJobList />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps  = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminJobPending)


