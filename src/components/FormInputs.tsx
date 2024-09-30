import React, { useState } from "react";
import Input from "./Input";
import { IValues } from "../types/main.d";
import List from "./List";

const Form: React.FC = () => {

  const [error, setError] = useState<string>("");
  const [id, setId] = useState<number>(1);

  const [values, setValues] = useState<IValues>({
    alarmTime: 0,
    alarmDesc: "",
    alarmTitle: "",
    id: id,
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
    // console.log(values);
    const newValue = { ...values, id: id };
    if (
      values.alarmDesc !== "" &&
      values.alarmTitle !== "" &&
      values.alarmTime !== 0
    ) {
      setAlarms([...alarms, newValue]);
      setError("")
    } else {
      setError("Please enter the empty ones...");
    }
    setId(id + 1);
    // console.log(alarms);
  };


  return (
    <>
      <div className="flex flex-col items-center">
        <form
          className="bg-white w-1/3 P-4 py-6 px-9 rounded shadow-md"
          onSubmit={onSubmitHandler}
        >
          <Input
            type="time"
            lable="Alarm Time"
            placeholder="00:00"
            onChange={(event) =>
              onChangeHandler("alarmTime", event.target.value)
            }
            value={values.alarmTime}
          />
          <Input
            type="text"
            lable="Alarm Discription"
            onChange={(event) =>
              onChangeHandler("alarmDesc", event.target.value)
            }
            value={values.alarmDesc}
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
            className="bg-green-600 text-white py-2 w-full rounded mt-4 hover:bg-green-700"
          >
            SUBMIT
          </button>
          <p className={`text-red-500 text-sm mt-3 ${error ? "" : "hidden"}`}>{error}</p>
        </form>
      </div>
      <List alarms={alarms} setAlarms={setAlarms} />
    </>
  );
};

export default Form;
