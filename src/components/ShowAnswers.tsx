import React, { useState, Fragment, useEffect } from "react";

interface Props {
  data: {
    selectedCategory: string;
    selectedDifficulty: string;
    selectedLimit: number;
    questions: object[];
  };
  changeFncs: {
    setShouldRender: Function;
    setSelectedLimit: Function;
  };
}

const covertNumToAlpha = (num: number) => {
  if (num < 1 || num > 26) return -1;

  const leveler = 96;

  return String.fromCharCode(num + leveler);
};

const ShowAnswers: React.FC<Props> = ({ data, changeFncs }): JSX.Element => {
  const { selectedCategory, selectedLimit, selectedDifficulty, questions } =
      data,
    { setShouldRender, setSelectedLimit } = changeFncs;

  const titles: any = [],
    chooseAnswers: object[] = [],
    correctAnswers: any = [],
    multiCorrectAnswers: any = [];

  let [currendInd, setCurrentInd] = useState(0),
    [userPoints, setUserPoints] = useState(0);

  const [selectedAns, setSelectedAns] = useState("answer_a");
  const [renderAnswers, setRenderAnswers] = useState(true);

  const handleQuestions = (questions: object[]) => {
    Object.values(questions).forEach((qs: any) => {
      titles.push(qs.question);
      chooseAnswers.push(qs.answers);
      if (qs.correct_answer !== null) correctAnswers.push(qs.correct_answer);
      if (qs.correct_answers !== null)
        multiCorrectAnswers.push(qs.correct_answers);
    });
  };

  const handleLevelsSeconds = () => {
    if (selectedDifficulty === "Easy") return 16;
    if (selectedDifficulty === "Medium") return 12;
    if (selectedDifficulty === "Hard") return 10;
    return 16;
  };

  const [timeLeft, setTimeLeft] = useState(handleLevelsSeconds());
  const [isActive, setIsActive] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const [showContact, setShowContact] = useState(false);

  let interval: any;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      if (timeLeft === 0) {
        setCurrentInd(++currendInd);
        setTimeLeft(handleLevelsSeconds());
      }
    } else {
      clearInterval(interval);
      setTimeLeft(0);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isActive]);

  handleQuestions(questions);

  const checkAndInc = () => {
    setCurrentInd(++currendInd);
    try {
      if (
        selectedAns === correctAnswers[currendInd] ||
        multiCorrectAnswers[currendInd][`${selectedAns}_correct`] === "true"
      ) {
        setUserPoints(userPoints + 15);
      }
    } catch (err) {
      setIsActive(false);
      setShowPoints(true);
      setRenderAnswers(false);
    }
  };

  const renderQuestions = (answers: object) => {
    if (answers) {
      return Object.values(answers).map((ans, idx) => {
        if (ans) {
          return (
            <div
              key={idx}
              onChange={(e) =>
                setSelectedAns((e.target as HTMLInputElement).id)
              }
            >
              {idx === 0 ? (
                <Fragment key={idx}>
                  <input
                    type="radio"
                    name="answer"
                    id={`answer_${covertNumToAlpha(idx + 1)}`}
                    defaultChecked
                    className="answers__answer"
                  />
                  <label htmlFor={`answer_${covertNumToAlpha(idx + 1)}`}>
                    {ans}
                  </label>
                </Fragment>
              ) : (
                <Fragment key={idx}>
                  <input
                    type="radio"
                    name="answer"
                    id={`answer_${covertNumToAlpha(idx + 1)}`}
                    className="answers__answer"
                  />
                  <label htmlFor={`answer_${covertNumToAlpha(idx + 1)}`}>
                    {ans}
                  </label>
                </Fragment>
              )}
            </div>
          );
        }
        return "";
      });
    }
  };

  const renderBasedOnInd = (ind: number) => {
    return (
      <>
        <h3 className="qs-title">{titles[ind]}</h3>
        <div className="answers">{renderQuestions(chooseAnswers[ind])}</div>
      </>
    );
  };

  const handleSubmit = () => {
    if (isActive) {
      checkAndInc();
      setTimeLeft(handleLevelsSeconds());
    }
  };

  const resetAll = () => {
    setCurrentInd(0);
    setUserPoints(0);
    setRenderAnswers(true);
    setShowPoints(false);
    setIsActive(true);
  };

  const renderEverything = () => {
    return (
      <>
        <div className="questions__head">
          <span className="dif">
            Difficulty: <span>{selectedDifficulty}</span>
          </span>
          <span className="dir">
            Category: <span>{selectedCategory}</span>
          </span>
          <span className="qs-count">
            Remaining Questions : <span>{selectedLimit}</span>
          </span>
        </div>
        <div className="questions__submit">
          {renderBasedOnInd(currendInd)}
          <button className="submit-answer blue-btn" onClick={handleSubmit}>
            submit answer
          </button>
        </div>
        <div className="questions__foot">
          <div className="score">
            Points: <span>{userPoints}</span>
          </div>
          <div className="countdown">
            Time Left:
            <span> {timeLeft}s</span>
          </div>
        </div>
      </>
    );
  };

  const handleContact = () => {
    setShowPoints(false);
    setShowContact(true);
  };

  return (
    <>
      {renderAnswers ? renderEverything() : ""}
      {showPoints ? (
        <div className="show-score">
          <div>
            <h2>You Scored : {userPoints} Points</h2>
            <div className="close" onClick={handleContact}></div>
          </div>
          <button className="blue-btn try-again" onClick={resetAll}>
            Try Again
          </button>
        </div>
      ) : (
        ""
      )}
      {showContact ? (
        <div className="contact-me">
          <h1>Contact Me:</h1>
          <div>
            <a
              href="https://twitter.com/abdraoufx"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
            <a
              href="https://github.com/abdraoufx"
              target="_blank"
              rel="noreferrer"
            >
              twitter
            </a>
            <a
              href="https://www.facebook.com/AbdRaouf.zk/"
              target="_blank"
              rel="noreferrer"
            >
              facebook
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ShowAnswers;
