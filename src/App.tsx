import { useState, useEffect } from "react";
import QuestionInfo from "./components/QuestionInfo";
import ShowAnswers from "./components/ShowAnswers";
import axios from "axios";
import "./css/main.css";

const fetchData = (api: string) => {
  return axios.get(api).then((resp: { data: [] }) => resp.data);
};

function App() {
  const [questions, setQuestions] = useState([]),
    [selectedCategory, setSelectedCategory] = useState(""),
    [selectedLimit, setSelectedLimit] = useState(0),
    [selectedDifficulty, setSelectedDifficulty] = useState(""),
    [initRequest, setInitRequest] = useState(false),
    [randomDirValue, setRandomDirValue] = useState(""),
    [shouldRender, setShouldRender] = useState(false);

  const theApi = `https://quizapi.io/api/v1/questions?apiKey=b9i5LP5r9yhGvs3yDLGC75A3rjGQh1h3RG6tgkUG&category=${
    selectedCategory || randomDirValue
  }&difficulty=${selectedDifficulty || "Easy"}&limit=${selectedLimit || 10}`;

  useEffect(() => {
    if (initRequest) {
      fetchData(theApi).then((result) => {
        setQuestions(result);
        setShouldRender(true);
      });

      setInitRequest(false);
    }

    fetchData(theApi).then((result) => {
      setQuestions(result);
    });
  }, []);

  return (
    <main className="main">
      {shouldRender ? (
        ""
      ) : (
        <QuestionInfo
          changeFncs={{
            setSelectedCategory,
            setSelectedLimit,
            setSelectedDifficulty,
            setShouldRender,
          }}
          setReqState={setInitRequest}
          setRandomDirValue={setRandomDirValue}
        />
      )}
      {shouldRender ? (
        <div className="main__container container">
          <h1 className="page-title">quiz app</h1>
          <section className="questions">
            <ShowAnswers
              data={{
                selectedCategory,
                selectedDifficulty,
                selectedLimit,
                questions,
              }}
              changeFncs={{
                setShouldRender,
                setSelectedLimit,
              }}
            />
          </section>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}

export default App;
