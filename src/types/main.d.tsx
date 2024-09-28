import React from "react";

export interface IValues {
  alarmTime: number;
  alarmDisc: string;
  alarmTitle: string;
}


export interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  lable?: string;
  type: React.HTMLInputTypeAttribute;
}
