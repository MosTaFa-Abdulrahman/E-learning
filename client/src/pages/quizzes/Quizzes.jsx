import "./quizzes.scss";
import useGetAllQuizzs from "../../hooks/admin/useGetAllQuizzs";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

function Quizzes() {
  const { quizzs: quizzes } = useGetAllQuizzs();

  if (!quizzes) {
    return <h1 style={{ textAlign: "center" }}>🤗 لا يوجد اختبارات حاليا</h1>;
  }

  return (
    <div className="quizzes-page">
      <h1>الاختبارات المتاحة</h1>
      <div className="quizzes-list">
        {quizzes?.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h2>{quiz.title}</h2>
            <Link to={`/quiz/${quiz?._id}`} className="start-quiz-btn">
              ابدا الامتحان
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
