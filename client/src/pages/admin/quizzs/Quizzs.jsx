import "./quizzs.scss";
import { useState, useEffect, useRef } from "react";
import useGetAllQuizzs from "../../../hooks/admin/useGetAllQuizzs";
import Spinner from "../../../components/spinner/Spinner";
import { makeRequest } from "../../../requestMethod";
import { toast } from "react-toastify";

function Quizzes() {
  const { isLoading: status, error, quizzs: quizzes } = useGetAllQuizzs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [timer, setTimer] = useState(1);
  const [className, setClassName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], answer: "" },
  ]);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(5);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.querySelector("input").focus();
    }
  }, [isModalOpen]);

  // Handle Add
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newQuiz = { title: quizTitle, questions, timer, className };
      await makeRequest.post("quiz/create", newQuiz);
      resetForm();
      toast.success("😎 تمت الاضافة بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`Error adding quiz: ${error.message}`);
    }
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuiz = { title: quizTitle, questions, timer, className };
      await makeRequest.put(`/quiz/update/${currentQuizId}`, updatedQuiz);
      resetForm();
      toast.success("😎 تم التعديل بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`Error updating quiz: ${error.message}`);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("هل انت متاكد من حذف هذا الاختبار ؟؟")) {
      try {
        await makeRequest.delete(`quiz/delete/${id}`);
        resetForm();
        toast.success("😎 تم الحذف بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(`Error deleting quiz: ${error.message}`);
      }
    }
  };

  const resetForm = () => {
    setQuizTitle("");
    setQuestions([{ question: "", options: ["", ""], answer: "" }]);
    setIsModalOpen(false);
    setIsEdit(false);
    setCurrentQuizId(null);
  };

  const handleEdit = (quiz) => {
    setQuizTitle(quiz.title);
    setQuestions(quiz.questions);
    setCurrentQuizId(quiz._id);
    setIsModalOpen(true);
    setIsEdit(true);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", ""], answer: "" },
    ]);
    setTimeout(() => {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }, 100);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  // Pagination
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="quizzes">
      <div className="headerAdmin">
        <h1 style={{ color: "blue" }}>الكويزات</h1>
        <button onClick={() => setIsModalOpen(true)}>اضافة اختبار</button>
      </div>

      {status === "loading" ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className="quiz-list">
            {currentQuizzes?.map((quiz) => (
              <div className="quiz-item" key={quiz._id}>
                <h2>{quiz.title}</h2>
                <button onClick={() => handleEdit(quiz)}>تعديل</button>
                <button onClick={() => handleDelete(quiz._id)}>حذف</button>
              </div>
            ))}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(quizzes.length / quizzesPerPage)).keys()].map(
              (number) => (
                <button key={number + 1} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2 style={{ marginBottom: "5px", color: "gray" }}>
              {isEdit ? "تعديل" : "اضافة"}
            </h2>
            <form onSubmit={isEdit ? handleUpdate : handleAdd}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  marginBottom: "10px",
                }}
              >
                العنوان
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                  style={{
                    padding: "7px",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    flex: 1,
                    marginLeft: "5px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  marginBottom: "10px",
                }}
              >
                الوقت
                <input
                  type="number"
                  value={timer}
                  min={1}
                  max={30}
                  onChange={(e) => setTimer(e.target.value)}
                  required
                  style={{
                    padding: "7px",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    flex: 1,
                    marginLeft: "5px",
                  }}
                />
              </div>
              <label>
                <select
                  name="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <option value="">اختار الصف الدراسي</option>
                  <option value="أولي اعدادي">أولي اعدادي</option>
                  <option value="ثانية اعدادي">ثانية اعدادي</option>
                  <option value="ثالثة اعدادي">ثالثة اعدادي</option>
                  <option value="أولي ثانوي">أولي ثانوي</option>
                  <option value="ثانية ثانوي">ثانية ثانوي</option>
                  <option value="ثالثة ثانوي">ثالثة ثانوي</option>
                </select>
              </label>

              {questions?.map((q, qIndex) => (
                <div key={qIndex} className="question-item">
                  <label>
                    السوال
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "question", e.target.value)
                      }
                      required
                    />
                  </label>
                  {q?.options?.map((option, oIndex) => (
                    <label key={oIndex}>
                      الاختيار {oIndex + 1}:
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        required
                      />
                    </label>
                  ))}
                  <button
                    style={{ marginBottom: "5px", backgroundColor: "blue" }}
                    type="button"
                    onClick={() => addOption(qIndex)}
                  >
                    اضافة اختيار
                  </button>
                  <label>
                    الاجابة الصحيحة
                    <input
                      type="text"
                      value={q.answer}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "answer", e.target.value)
                      }
                      required
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={addQuestion}>
                اضافة سوال
              </button>
              <button type="submit">{isEdit ? "تعديل" : "اضافة"}</button>
              <button type="button" onClick={resetForm}>
                كنسل
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizzes;
