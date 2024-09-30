import React, { SetStateAction } from "react";

export interface IValues {
  alarmTime: number;
  alarmDesc: string;
  alarmTitle: string;
  id: number;
}

export interface IList {
  alarms: IValues[];
  setAlarms: React.Dispatch<SetStateAction<IValues[]>>;
}

export interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  lable?: string;
  type: React.HTMLInputTypeAttribute;
}

export interface IModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  alarm?: IValues
  setAlarms: React.Dispatch<SetStateAction<IValues[]>>;
}
