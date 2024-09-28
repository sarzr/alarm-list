import React from "react";
import { IInput } from "../types/main.d";


const Input: React.FC<IInput> = ({ lable, type, ...Input }) => {
  return (
    <div className="mt-2">
      <label className="text-sm font-medium">{lable}</label>
      <input type={type} {...Input} className="border-2 border-gray-200 rounded mt-1 w-full py-1 px-2 outline-none" />
    </div>
  );
};
export default Input;
