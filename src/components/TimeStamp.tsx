import { useState } from "react";
import { getTimeStamp } from "../Timestamp";

export function TimeStamp() {
  const [name, setName] = useState<string | undefined>();
  const [date, setDate] = useState<string>();
  const [diffInDayz, setDiffInDayz] = useState<string | undefined>();

  const getDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const getName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

const getDayz = () => {
  if (name && date) {
    const dayz = getTimeStamp(name, date);
    setDiffInDayz(dayz?.diffInDays);
  }
};

  return (
    <div className="flex border-red-900">
      <div>
        <input type="text" onChange={getName} placeholder="Your Name" />
      </div>
      <input type="date" onChange={getDate} className="color-black" />
      <button onClick={getDayz}>Submit</button>
      <div>{name}</div>
      <div>{date}</div>
      <div>{diffInDayz}</div>
    </div>
  );
}
