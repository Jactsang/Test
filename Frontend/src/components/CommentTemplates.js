import React, { Component } from 'react';
import { Card, Button, Typography, Tag, Statistic, Icon } from 'antd';

const { Text } = Typography;

let gridStyle;
let tabListNoTitle;
let keywords;
let commentTemplates;
let contentListNoTitle;

export default class CommentTemplates extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      noTitleKey: 'keywords'
    };

    gridStyle = {
      height: 120,
      textAlign: 'center',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    tabListNoTitle = [
      {key: 'keywords', tab: 'keywords'}
    ];


    commentTemplates = {
      posture: [
        `Try to sit up straight.`,
        `Your back is curling up too much.`,
        `Don't overstretch your fingers.`,
        `Your fingers are too tense.`,
        `Remember to relax your wrists.`,
        `Try to keep your neck straight, aligned to your back.`
      ],
      accuracy: [
        `You played a wrong note here, it should be`,
        `Try to play slower to achieve for better accuracy.`,
        `Play the ${this.props.instrument} with clarity, not haste.`,
        `Please take some time to sit down and study the score.`,
        `Do not rush through the passages just for the sake of speed.`,
        `Try practising with just one hand for now for better accuracy.`,
      ],
      style: [
        `Try to imagine a story to go with the music you're playing.`,
        `You can vary the sound more during your performance.`,
        `Try researching more about ${this.props.composer}'s background and life.`,
        `Reading more about the historical background can help you achieve greater understanding.`,
        `${this.props.song_name} is a piece from the`,
        `You're doing very well given this is a Grade ${this.props.grade} piece!`,
      ]
    }

    keywords = {
      instrument: this.props.instrument,
      grade: 'Grade ' + this.props.grade,
      composer: this.props.composer,
      song_name: this.props.song_name
    }
      
    contentListNoTitle = {
      keywords: (<div></div>)
    };

  }
    
  componentDidMount = () => {    

    Object.keys(commentTemplates).forEach(templateKey => {
      tabListNoTitle.push({ key: templateKey, tab: templateKey })
      }
    )

    Object.keys(commentTemplates).forEach(templateKey => {
      contentListNoTitle[templateKey] = (<div></div>)
      }
    )

    this.props.getTemplateTags(Object.keys(commentTemplates))
    
    if (contentListNoTitle.keywords) {
      contentListNoTitle.keywords =
        Object.entries(keywords).map(([key, value]) => {return (
          <Card.Grid
            key={Math.random()}
            value={key}
            style={gridStyle}
            onClick = {
              (e) => {this.sendTemplate(value, e)}
            }>
            <a>

              <Statistic title={[key].toString().replace(/_/g, ' ')} value={[value].toString()} />
             
            </a>
          </Card.Grid>
        )  
      })
    }

    
    Object.keys(contentListNoTitle).forEach((key, index) => {
      if (commentTemplates[key]) {
        contentListNoTitle[key] =
          (commentTemplates[key]).map(comment => {return(
            <Card.Grid
              key={(commentTemplates[key]).indexOf(comment)}
              value={key}
              style={gridStyle}
              onClick = {
                (e) => {this.sendTemplate(comment, e)}
              }>
              <a>
                {comment}
              </a>
            </Card.Grid>
          )}
        )
      }
    })

  }

  sendTemplate = (template, e) => {
    this.props.setCommentWithTemplate(template, e.currentTarget.getAttribute('value'))
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    return (
      <div>
        <Card
          bordered={false} 
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
        <br></br>
      </div>
    );
  }

}