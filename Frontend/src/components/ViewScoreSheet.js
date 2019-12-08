import * as React from 'react';
import { PDFObject } from 'react-pdfobject';

export default class ViewScoreSheet extends React.Component {
    
    render() {

        return (
            <div className='scoreSheet' style={{ overflow: 'auto', height: '500px', width: '620px', textAlign: 'center' }}>
                <PDFObject url={this.props.score_url} />
            </div>
                )
            }
}