import { useState, useCallback } from "react";
import { getTimeStamp } from "../Timestamp";

export function TimeStamp() {
  const [name, setName] = useState<string | undefined>();
  const [date, setDate] = useState<string>();
  const [diffInDayz, setDiffInDayz] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null); // new state variable
  const [dateError, setDateError] = useState<string | null>(null); // new state variable

  const getDate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    setDateError(null); // clear error when input is changed
  }, []);

  const getName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(null); // clear error when input is changed
  }, []);

  const getDayz = useCallback(() => {
    if (!name) {
      setNameError("Please enter your name!"); // set error if name is not entered
    }
    if (!date) {
      setDateError("Please enter a date!"); // set error if date is not entered
    }
    if (name && date) {
      setLoading(true);
      setTimeout(() => {
        const dayz = getTimeStamp(name, date);
        setDiffInDayz(dayz?.diffInDays);
        setLoading(false);
        setSubmitted(true);
      }, 1600);
    }
  }, [name, date]);

  const tryAgain = useCallback(() => {
    setSubmitted(false);
  }, []);

  return (
    <div className="flex flex-col p-5">
      {!submitted && (
        <>
          <div>
            <input
              className="mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              type="text"
              onChange={getName}
              placeholder="Your Name"
            />
            {nameError ? (
              <p className="text-red-500 text-center">{nameError}</p>
            ) : (
              <div className="text-red-500 text-center">&nbsp;</div>
            )}{" "}
            {/* display error if nameError is not null */}
            <input
              type="date"
              onChange={getDate}
              className="w-full text-gray-700 mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {dateError ? (
              <p className="text-red-500 text-center">{dateError}</p>
            ) : (
              <div className="text-red-500 text-center">&nbsp;</div>
            )}{" "}
            {/* display error if dateError is not null */}
          </div>
          <div className="flex justify-center">
            <button
              onClick={getDayz}
              className="w-32 bg-gradient-to-l from-blue-500 to-green-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </>
      )}
      {submitted && (
        <div className="flex flex-col justify-center mx-auto border border-red-500 slide-out">
          <p>
            Hi, {name}! Your birthday is on {date} and this is day <br />
            <span
              style={{ fontWeight: 500, fontSize: 100, textAlign: "center" }}
            >
              {diffInDayz}
            </span>
            .
          </p>
          <div className="flex justify-center">
            <button
              onClick={tryAgain}
              className="w-32 bg-gradient-to-l from-blue-500 to-green-500 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}