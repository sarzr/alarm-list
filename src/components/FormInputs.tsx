import React, { useEffect, useState } from "react";
import Input from "./Input";
import { IValues } from "../types/main.d";
import List from "./List";
import ModalTime from "./ModalTime";
import { toast } from "react-toastify";

const Form: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  const [values, setValues] = useState<IValues>({
    alarmTime: 0,
    alarmDesc: "",
    alarmTitle: "",
    id: 0,
  });

  const [alarms, setAlarms] = useState<IValues[]>(() => {
    const saveAlarms = localStorage.getItem("alarms");
    return saveAlarms ? JSON.parse(saveAlarms) : [];
  });

  localStorage.setItem("alarms", JSON.stringify(alarms));

  const onChangeHandler = (
    inputName: keyof IValues,
    value: string | number
  ) => {
    setValues({ ...values, [inputName]: value });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newValue = { ...values, id: Date.now() };
    if (
      values.alarmDesc !== "" &&
      values.alarmTitle !== "" &&
      values.alarmTime !== 0
    ) {
      setAlarms([...alarms, newValue]);
      setError("");
    } else {
      setError("Please enter...");
    }

    const now = new Date();
    const alarmSet = values.alarmTime;

    const currentTime = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const [currentHour, currentMinute] = currentTime.split(":").map(Number);
    const [alarmSetHour, alarmSetMinute] = alarmSet
      .toString()
      .split(":")
      .map(Number);

    const currentTimeMinutes = currentHour * 60 + currentMinute;
    const alarmTimeMinutes = alarmSetHour * 60 + alarmSetMinute;

    let calc = alarmTimeMinutes - currentTimeMinutes;

    if (calc < 0) {
      calc += 24 * 60;
    }

    const remainingHours = Math.floor(calc / 60);
    const remainingMinute = calc % 60;
    if (
      remainingHours !== 0 &&
      remainingMinute !== 0 &&
      values.alarmDesc !== "" &&
      values.alarmTitle !== "" &&
      values.alarmTime !== 0
    ) {
      toast(
        `Alarm set for ${remainingHours} hours and ${remainingMinute} minutes from now`,
        {
          style: {
            fontSize: "15px",
            borderRadius: "8px",
          },
        }
      );
    }

    if (remainingHours === 0 && remainingMinute === 0) {
      toast(`Alarm set for now`, {
        style: {
          fontSize: "15px",
          borderRadius: "8px",
        },
      });
    }
  };

  useEffect(() => {
    const isFormValid =
      values.alarmTime !== 0 &&
      values.alarmDesc !== "" &&
      values.alarmTitle !== "";

    setDisable(!isFormValid);

  }, [values]);

  return (
    <>
      <div className="flex flex-col items-center">
        <form
          className="bg-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3 sm:py-6 px-4 sm:px-9 rounded sm:shadow-md"
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
            error={error}
          />
          <Input
            type="text"
            lable="Alarm Description"
            onChange={(event) =>
              onChangeHandler("alarmDesc", event.target.value)
            }
            value={values.alarmDesc}
            error={error}
          />
          <Input
            type="text"
            lable="Alarm Title"
            onChange={(event) =>
              onChangeHandler("alarmTitle", event.target.value)
            }
            value={values.alarmTitle}
            error={error}
          />
          <button
            disabled={disable}
            type="submit"
            className={`${
              disable ? "bg-green-700" : "bg-green-600"
            } cursor-pointer text-white text-base sm:text-lg py-2 w-full rounded mt-4`}
          >
            SUBMIT
          </button>
          <p className={`text-red-500 text-sm mt-3 ${error ? "" : "hidden"}`}>
            {error}
          </p>
        </form>
      </div>
      <List alarms={alarms} setAlarms={setAlarms} />
      <ModalTime alarms={alarms} />
    </>
  );
};

export default Form;
