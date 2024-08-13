import "./pieChartBox.scss";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useGetAllUsers from "../../../../hooks/admin/useGetAllUsers";
import useGetAllCourses from "../../../../hooks/admin/useGetAllCourses";
import Spinner from "../../../spinner/Spinner";

function PieChartBox() {
  const { users, loading: usersLoading, error: usersError } = useGetAllUsers();
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useGetAllCourses();

  if (usersLoading || coursesLoading) return <Spinner />;
  if (usersError) return <div>Error loading users: {usersError.message}</div>;
  if (coursesError)
    return <div>Error loading courses: {coursesError.message}</div>;

  const data = [
    { name: "Users", value: users.length, color: "#0088FE" },
    { name: "Courses", value: courses.length, color: "#00C49F" },
  ];

  return (
    <div className="pieChartBox">
      <h1>عدد الطلاب والكورسات</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChartBox;
