import React, { Fragment, useEffect } from "react";

type radiosArray = string[] | number[];

interface Props {
  changeFncs: {
    setSelectedCategory: Function;
    setSelectedLimit: Function;
    setSelectedDifficulty: Function;
    setShouldRender: Function;
  };
  setReqState: Function;
  setRandomDirValue: Function;
}

const renderRadios = (arr: radiosArray, name: string) => {
  const lastElement = arr[arr.length - 1];

  return arr.map((ele: any, eleIdx: number) => {
    return (
      <Fragment key={eleIdx + 1}>
        <div>
          {eleIdx === 0 ? (
            <input
              type="radio"
              name={name}
              id={ele}
              value={ele}
              defaultChecked
            />
          ) : (
            <input type="radio" name={name} id={ele} value={ele} />
          )}
          <label htmlFor={ele}>{ele}</label>
        </div>
        {lastElement === ele ? (
          <div>
            <input type="radio" name={name} id={`${name}_Random`} value="" />
            <label htmlFor={`${name}_Random`}>Choose Randomly...</label>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  });
};

const QuestionInfo: React.FC<Props> = ({
  changeFncs,
  setReqState,
  setRandomDirValue,
}) => {
  const qsDirectories = ["Linux", "Devops", "Docker", "Js"],
    qsLimit = [5, 10, 15, 20],
    difficulties = ["Easy", "Medium", "Hard"];

  const {
    setSelectedCategory,
    setSelectedLimit,
    setSelectedDifficulty,
    setShouldRender,
  } = changeFncs;

  useEffect(() => {
    setSelectedCategory(qsDirectories[0]);
    setSelectedLimit(qsLimit[0]);
    setSelectedDifficulty(difficulties[0]);
    setRandomDirValue(
      qsDirectories[Math.floor(qsDirectories.length * Math.random())]
    );
  }, []);

  return (
    <div className="choose-qs-info">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="title">choose directory of questions:</h2>
        <div
          className="qs-dir"
          onChange={(e) =>
            setSelectedCategory((e.target as HTMLInputElement).value)
          }
        >
          {renderRadios(qsDirectories, "qsDirectories")}
        </div>
        <h2 className="title">choose number of questions:</h2>
        <div
          className="qs-nums"
          onChange={(e) =>
            setSelectedLimit((e.target as HTMLInputElement).value)
          }
        >
          {renderRadios(qsLimit, "qsLimit")}
        </div>
        <h2 className="title">choose difficulty:</h2>
        <div
          className="diffc"
          onChange={(e) =>
            setSelectedDifficulty((e.target as HTMLInputElement).value)
          }
        >
          {renderRadios(difficulties, "difficulties")}
        </div>
      </form>
      <button
        className="submit-qs-info blue-btn"
        onClick={() => {
          setReqState(true);
          setShouldRender(true);
        }}
      >
        Submit Quiz Info
      </button>
    </div>
  );
};

export default QuestionInfo;
