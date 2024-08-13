import "./singleQuiz.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetSingleQuiz from "../../hooks/user/useGetSingleQuiz";
import Spinner from "../../components/spinner/Spinner";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateQuizResults } from "../../redux/authSlice";

const SingleQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz, isLoading, error } = useGetSingleQuiz(id);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [timeLeft, setTimeLeft] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (quiz && quiz.timer) {
      setTimeLeft(quiz.timer * 60);
    }
  }, [quiz]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleAutoSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (userInfo && quiz) {
      const completed = userInfo.completedQuizzes?.some(
        (completedQuiz) => completedQuiz.quizId === quiz._id
      );

      setIsCompleted(completed);
    }
  }, [userInfo, quiz]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      handleAutoSubmit();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleAutoSubmit = async () => {
    try {
      await makeRequest.post("/quiz/submit", {
        userId: userInfo._id,
        quizId: id,
        answers: [],
        score: 0,
      });
      toast.info("Quiz ended. Your score is 0.");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || error?.message} 😥`);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await makeRequest.post("/quiz/submit", {
        userId: userInfo._id,
        quizId: id,
        answers,
      });
      dispatch(updateQuizResults(res.data.quizResults));
      toast.success(
        `Quiz submitted successfully! Your score is: ${res.data.score}`
      );
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error(`${error.response?.data?.error || error?.message} 😥`);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (!quiz || !quiz.questions)
    return (
      <div
        style={{
          height: "100vh",
          textAlign: "center",
        }}
      >
        <h2>لا يوجد اختبار الان</h2>
      </div>
    );

  if (isCompleted) {
    return (
      <div className="completed-message">
        <h2>🙄 لا يمكنك الامتحان مرة اخري</h2>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1>{quiz.title}</h1>
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <div className="questions">
        {quiz?.questions?.map((question, index) => (
          <div key={index} className="question-card">
            <h3>{question.question}</h3>
            {question?.options?.map((option, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>
      <button className="submit-quiz-btn" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
};

export default SingleQuiz;
