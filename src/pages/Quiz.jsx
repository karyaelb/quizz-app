import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import {
  saveProgress,
  getProgress,
  clearProgress,
} from "../utils/localStorage";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function Quiz({ onComplete, user }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = getProgress();
    if (saved) {
      setQuestions(saved.questions);
      setCurrentIndex(saved.currentIndex);
      setAnswers(saved.answers);
      setLoading(false);
    } else {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.results.map((q) => {
            const options = [...q.incorrect_answers];
            const randIndex = Math.floor(Math.random() * 4);
            options.splice(randIndex, 0, q.correct_answer);
            return {
              question: decodeHtml(q.question),
              options: options.map(decodeHtml),
              correct: decodeHtml(q.correct_answer),
            };
          });
          setQuestions(formatted);
          setLoading(false);
        });
    }
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    const newIndex = currentIndex + 1;
    setAnswers(newAnswers);
    setCurrentIndex(newIndex);

    if (newIndex < questions.length) {
      saveProgress({
        user,
        questions,
        answers: newAnswers,
        currentIndex: newIndex,
      });
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers = answers) => {
    clearProgress();
    const correctCount = finalAnswers.filter(
      (a, i) => a === questions[i].correct
    ).length;
    onComplete({
      name: user.username,
      total: questions.length,
      correct: correctCount,
      wrong: questions.length - correctCount,
    });
  };

  // 🔧 Alias untuk digunakan di Timer
  const handleFinish = () => {
    finishQuiz();
  };

  if (loading) return <div className="p-4">Loading...</div>;
  const q = questions[currentIndex];

  return (
    <div className="p-4 max-w-4xl m-auto ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Soal {currentIndex + 1}/{questions.length}
        </h2>
        <Timer duration={120} onTimeUp={handleFinish} />
      </div>

      <QuestionCard
        question={q.question}
        options={q.options}
        onSelect={handleAnswer}
      />
    </div>
  );
}

export default Quiz;
