import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { sendWeakestAspect } from '../redux/videoFigures/actions'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
} from "bizcharts";
import 'antd/dist/antd.css';
import DataSet from "@antv/data-set";

class CommentAspectChart extends Component {
    insertData = () => {

        // check number of positive and negative comments from each default comment aspect
        let posturePositiveComment = this.props.commentAspect.filter(comment =>
            comment.comment_aspect === "posture" && comment.comment_type === true
        )
        let accuracyPositiveComment = this.props.commentAspect.filter(comment =>
            comment.comment_aspect === "accuracy" && comment.comment_type === true
        )
        let stylePositiveComment = this.props.commentAspect.filter(comment =>
            comment.comment_aspect === "style" && comment.comment_type === true
        )
        let postureNegativeComment = this.props.commentAspect.filter(comment =>
            comment.comment_aspect === "posture" && comment.comment_type === false
        )
        let accuracyNegativeComment = this.props.commentAspect.filter(comment =>
            comment.comment_aspect === "accuracy" && comment.comment_type === false
        )
        let styleNegativeComment = this.props.commentAspect.filter(comment =>
            comment.comment_aspect === "style" && comment.comment_type === false
        )

        let posturePoints = posturePositiveComment.length - postureNegativeComment.length;

        let data = [{
            comment_aspect: "POSTURE",
            points: 10 + posturePoints
        },
        {
            comment_aspect: "ACCURACY",
            points: 10 + accuracyPositiveComment.length - accuracyNegativeComment.length
        },
        {
            comment_aspect: "STYLE",
            points: 10 + stylePositiveComment.length - styleNegativeComment.length
        }
        ]

        //check how many new aspects of comment and what it is
        let newCommentAspect = this.props.commentAspect.filter(comment =>
            comment.comment_aspect !== "posture" && comment.comment_aspect !== "accuracy" && comment.comment_aspect !== "style" && comment.comment_aspect !== "others"
        )
        let listNewCommentAspect = [];
        // if there is new new comment aspect, using array 'listNewCommentAspect' to contain all new comment aspects
        if (newCommentAspect.length !== 0) {
            for (let i = 0; i < newCommentAspect.length; i++) {
                if (listNewCommentAspect.indexOf(newCommentAspect[i].comment_aspect) < 0) {
                    listNewCommentAspect.push(newCommentAspect[i].comment_aspect)
                }
            }
        }
        // check number of positive and negative comments from each new comment aspect
        let dataOfEachNewCommentAspect = [];
        if (listNewCommentAspect.length !== 0) {
            listNewCommentAspect.forEach((element) => {
                let eachCommentAspectPositive = newCommentAspect.filter(comment =>
                    comment.comment_aspect === element && comment.comment_type === true);
                let eachCommentAspectNegative = newCommentAspect.filter(comment =>
                    comment.comment_aspect === element && comment.comment_type === false);
                let calculateCommentAspect = {
                    comment_aspect: element.toUpperCase(),
                    points: 10 + eachCommentAspectPositive.length - eachCommentAspectNegative.length
                }
                dataOfEachNewCommentAspect.push(calculateCommentAspect)
            })
            let newDataArray = data.concat(dataOfEachNewCommentAspect)
            this.aspectOfLowestPoint(newDataArray);
            return newDataArray
        } else {
            this.aspectOfLowestPoint(data);
            return data
        }
    }

    aspectOfLowestPoint(data) {
        var lowest = 0;
        for (var i = 1; i < data.length; i++) {
            if (data[i].points < data[lowest].points) lowest = i;
        }
        // console.log(data[lowest].comment_aspect);
        this.props.sendWeakestAspect(data[lowest].comment_aspect)
    }

    render() {
        const { DataView } = DataSet;
        const dv = new DataView().source(this.insertData());
        dv.transform({
            type: "fold",
            fields: ["points"],
            // 展开字段集
            key: "user",
            // key字段
            value: "score" // value字段
        });
        const cols = {
            score: {
                min: 0,
                max: 30,
                ticks: [null],
                tickInterval: 2
            }
        };
        return (
            <Fragment>
                <Chart
                    height={300}
                    data={dv}
                    padding={20}
                    scale={cols}
                    forceFit={true}
                >
                    <Coord type="polar" radius={0.8} />
                    <Axis
                        name="comment_aspect"
                        line={null}
                        tickLine={null}
                        grid={{
                            lineStyle: {
                                lineDash: null
                            },
                            hideFirstLine: false
                        }}
                    />
                    <Tooltip />
                    <Axis
                        name="score"
                        line={null}
                        tickLine={null}
                        grid={{
                            type: "polygon",
                            lineStyle: {
                                lineDash: null
                            },
                            alternateColor: "rgba(0, 0, 0, 0.04)"
                        }}
                    />

                    <Geom type="area" position="comment_aspect*score" color="user" />
                    <Geom type="line" position="comment_aspect*score" color="user" size={2} />
                    <Geom
                        type="point"
                        position="comment_aspect*score"
                        color="user"
                        shape="circle"
                        size={0}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1,
                            fillOpacity: 1
                        }}
                    />
                </Chart>
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentAspect: state.vidFiguresStore.commentAspect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendWeakestAspect: (payload) => {
        dispatch(sendWeakestAspect(payload))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CommentAspectChart);