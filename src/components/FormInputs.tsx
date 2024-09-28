import React, { useState } from "react";
import Input from "./Input";
import { IValues } from "../types/main.d";

const Form: React.FC = () => {
  const [error, setError] = useState<string>("");

  const [values, setValues] = useState<IValues>({
    alarmTime: 0,
    alarmDisc: "",
    alarmTitle: "",
  });

  const [alarms, setAlarms] = useState<IValues[]>([]);

  const onChangeHandler = (
    inputName: keyof IValues,
    value: string | number
  ) => {
    setValues({ ...values, [inputName]: value });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(values);
    if (
      values.alarmDisc !== "" &&
      values.alarmTitle !== "" &&
      values.alarmTime !== 0
    ) {
      setAlarms([...alarms, values]);
      setError("");
    } else {
      setError("Please enter the empty ones...");
    }
    console.log(alarms);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="bg-white w-1/2 P-4 py-6 px-9 rounded"
        onSubmit={onSubmitHandler}
      >
        <Input
          type="time"
          lable="Alarm Time"
          placeholder="00:00"
          onChange={(event) => onChangeHandler("alarmTime", event.target.value)}
          value={values.alarmTime}
        />
        <Input
          type="text"
          lable="Alarm Discription"
          onChange={(event) => onChangeHandler("alarmDisc", event.target.value)}
          value={values.alarmDisc}
        />
        <Input
          type="text"
          lable="Alarm Title"
          onChange={(event) =>
            onChangeHandler("alarmTitle", event.target.value)
          }
          value={values.alarmTitle}
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 w-full rounded mt-4"
        >
          SUBMIT
        </button>
        <p className={`text-red-500 text-sm mt-3 ${error ? "" : "hidden"}`}>
          {error}
        </p>
      </form>
    </div>
  );
};

export default Form;
