import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    courses: 4000,
    vidoes: 2400,
    sections: 2400,
  },
  {
    name: "Mon",
    courses: 3000,
    vidoes: 1398,
    sections: 2210,
  },
  {
    name: "Tue",
    courses: 2000,
    vidoes: 9800,
    sections: 2290,
  },
  {
    name: "Wed",
    courses: 2780,
    vidoes: 3908,
    sections: 2000,
  },
  {
    name: "Thu",
    courses: 1890,
    vidoes: 4800,
    sections: 2181,
  },
  {
    name: "Fri",
    courses: 2390,
    vidoes: 3800,
    sections: 2500,
  },
  {
    name: "Sat",
    courses: 3490,
    vidoes: 4300,
    sections: 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>التحليل</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="courses"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="vidoes"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="sections"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
