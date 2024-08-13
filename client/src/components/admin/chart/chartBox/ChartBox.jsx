import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { NavLink } from "react-router-dom";

function ChartBox(props) {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} className="totalImg" alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <NavLink to={`/admin/${props.navLink}`} style={{ color: props.color }}>
          روية الكل
        </NavLink>
      </div>

      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">هذا الشهر</span>
        </div>
      </div>
    </div>
  );
}

export default ChartBox;
