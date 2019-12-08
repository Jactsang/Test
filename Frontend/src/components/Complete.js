import * as React from "react";
import { connect } from "react-redux";

import { AutoComplete, Input, Icon } from "antd";
import "./css/Complete.css";

const { Option, OptGroup } = AutoComplete;

export class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dataSource: []
    };
  }

  componentWillReceiveProps = props => {
    let commentArray = [];
    let timeCodeArray = [];

    props.comments.map(comment =>
      commentArray.push({
        title: comment.comment
      })
    );

    props.comments.map(comment =>
      timeCodeArray.push({
        title: comment.timeCode
      })
    );

    this.setState({
      dataSource: [
        {
          title: "Comment Aspect",
          children: [
            {
              title: "posture",
              count: props.commentsSummary.posture + " comments"
            },
            {
              title: "accuracy",
              count: props.commentsSummary.accuracy + " comments"
            },
            {
              title: "style",
              count: props.commentsSummary.style + " comments"
            }
          ]
        },
        {
          title: "Comment Type",
          children: [
            {
              title: "positive",
              count: props.commentsSummary.positive + " comments"
            },
            {
              title: "critical",
              count: props.commentsSummary.critical + " comments"
            }
          ]
        },
        {
          title: "Comments",
          children: commentArray
        },
        {
          title: "Timecodes",
          children: timeCodeArray
        }
      ]
    });
  };

  searchInput = input => {
    this.props.searchInput(input);
  };

  onSearch = input => {
    this.setState({
      value: input
    });
    this.searchInput(input);
  };

  onSelect = input => {
    this.setState({
      value: input
    });
    this.searchInput(input);
  };

  render() {
    const { dataSource, value } = this.state;
    return (
      <div>
        <AutoComplete
          dataSource={dataSource.map(group => (
            <OptGroup key={group.title}>
              {group.children.map(opt => (
                <Option key={opt.title} value={opt.title}>
                  <span>{opt.title}</span>
                  <span className="certain-search-item-count">{opt.count}</span>
                </Option>
              ))}
            </OptGroup>
          ))}
          style={{ width: "100%" }}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          placeholder="Search comments..."
          value={value}
          size="large"
          optionLabelProp="value"
          filterOption={(inputValue, option) => {
            if (option.props.value !== undefined) {
              return (
                option.props.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              );
            }
          }}
        >
          <Input
            suffix={<Icon type="search" className="certain-category-icon" />}
          />
        </AutoComplete>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    commentsSummary: state.comments.commentsSummary,
    comments: state.comments.comments
  };
};

export default connect(
  mapStateToProps,
  null
)(Complete);
