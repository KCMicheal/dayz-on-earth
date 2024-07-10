import { useState, useCallback } from "react";
import { getTimeStamp } from "../Timestamp";

export function TimeStamp() {
  const [name, setName] = useState<string | undefined>();
  const [date, setDate] = useState<string>();
  const [diffInDayz, setDiffInDayz] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null); 
  const [dateError, setDateError] = useState<string | null>(null); 
  const [showTryAgain, setShowTryAgain] = useState<boolean>(false);
  const [ tryAgainDiv, setTryAgainDiv ] = useState<string | null>("hidden")

  const getDate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    setDateError(null); 
  }, []);

  const getName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(null);
  }, []);

  const getDayz = useCallback(() => {
    if (!name) {
      setNameError("Sorry we'd need a name 🤲!"); // set error if name is not entered
    }
    if (!date) {
      setDateError("Think you forgot to add the date 😄 !"); // set error if date is not entered
    }

    if (!name || !date) {
      // Optionally, show an error message or simply return early
      console.error("Both name and date must be provided.");
      return;
    }

    if (name && date) {
      setLoading(true);
      setTimeout(() => {
        const dayz = getTimeStamp(name, date);
        setDiffInDayz(dayz?.diffInDays);
        setLoading(false);
        setSubmitted(true);
      }, 1600);

      setTimeout(() => {
        setTryAgainDiv("block");
        setShowTryAgain(true);
      }, 3000);
    }
  }, [name, date]);

const tryAgain = useCallback(() => {
  setName(undefined);
  setDate('');
  setDiffInDayz(undefined);
  setSubmitted(false);
  setShowTryAgain(false);
  setLoading(false);
  setNameError(null);
  setDateError(null);
}, []);

  return (
    <div className="flex flex-col p-5 w-full h-[40vh] space-y-10">
      {!submitted && (
        <>
          <div className="text-center">
            <input
              className="w-70 text-center text-gray-700 mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-md"
              type="text"
              onChange={getName}
              placeholder="Your Name"
            />
            {nameError ? (
              <p className="text-red-500 text-center">{nameError}</p>
            ) : (
              <div className="text-red-500 text-center">&nbsp;</div>
            )}

            <input
              type="date"
              onChange={getDate}
              className="w-70 text-center text-gray-700 mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-md"
            />
            {dateError ? (
              <p className="text-red-500 text-center">{dateError}</p>
            ) : (
              <div className="text-red-500 text-center">&nbsp;</div>
            )}

            <div className="flex justify-center">
              <button
                onClick={getDayz}
                className="w-32 bg-gradient-to-l from-blue-500 to-green-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </>
      )}
      
      {submitted && (
        <div className="flex flex-col justify-center mx-auto slide-out">
          <div className="w-full text-center">
            <p className="text-2xl">
              Hi, <span className="font-medium">{name}</span>
            </p>
            <p className="text-2xl">
              Your birthday is on <span className="font-bold">{date}</span>
            </p>
            <p className="text-2xl">This is Day</p>
            <p className="text-8xl font-extrabold">{diffInDayz}</p>
          </div>
        </div>
      )}
      <div className={`${tryAgainDiv} `}>
        {showTryAgain && (
          <div className="text-center">
            <button
              onClick={tryAgain}
              className="w-32 bg-gradient-to-l transition-transform ease-in delay-700 from-blue-500  to-green-500 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
