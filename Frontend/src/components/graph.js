import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Basic extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "Design",
        a: 70,
        b: 30
  
      },
      {
        item: "Development",
        a: 60,
        b: 20

      },
      {
        item: "Marketing",
        a: 50,
        b: 60

      }
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["a"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });
    const cols = {
      score: {
        min: 0,
        max: 80,
        ticks: [null],
        tickInterval: 10
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          padding={20}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8}/>
          <Axis
            name="item"
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
         
          <Geom type="area" position="item*score" color="user" />
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
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
      </div>
    );
  }
}

ReactDOM.render(<Basic />, mountNode)
