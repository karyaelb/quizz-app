import { useState } from "react";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
// import { getSavedUser } from "./utils/localStorage";

function App() {
  const [user, setUser] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState(null);

  // useEffect(() => {
  //   const saved = getSavedUser();
  //   if (saved) setUser(saved);
  // }, []);

  if (!user) return <Login onLogin={setUser} />;
  if (quizComplete) return <Result result={result} />;
  return (
    <Quiz
      onComplete={(res) => {
        setResult(res);
        setQuizComplete(true);
      }}
      user={user}
    />
  );
}

export default App;
