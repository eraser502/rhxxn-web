import { useState } from "react";
import Calendar from "react-calendar";
import "./TDLCalendar.css";
import moment from "moment";

export const TDLCalendar = (props) => {
  const [value, setValue] = useState(props.pointday);

  let marks = [];
  if (props.calendarDb !== null) {
    //const diaryDBDateArray = props.calendarDb.map((value) => value.createAt);
    if (props.calendarDb) {
      for (let i = 0; i < props.calendarDb.length; i++) {
        let tmp = props.calendarDb[i].createAt;
        let tmp2 = moment(tmp).format("DD-MM-YYYY");
        marks = [...marks, tmp2];
      }
    }
  }

  props.getPointDay(value);

  return (
    <Calendar calendarType="US"
      onChange={setValue}
      value={value}
      formatDay={(locale, date) => moment(date).format("DD")}
      tileClassName={({ date, view }) =>{
        if (marks.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
          return "highlight";
        }
      }}
      //tileDisabled={({ date }) => !diaryDBDateArray.includes(date.toLocaleDateString())}
    />
  );
};
