import React, { useState } from "react";
import { IModal } from "../types/main.d";
import Input from "./Input";

const Modal: React.FC<IModal> = ({ setShowModal, alarm }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const [edit, setEdit] = useState<boolean>(false);

  const edited = () => {
    setShowModal(false);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity backdrop-blur-sm"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-end mb-2">
               <button onClick={closeModal}>
               <svg
                  aria-hidden="true"
                  data-prefix="fal"
                  data-icon="times"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="svg-inline--fa fa-times fa-w-10 fa-7x w-3.5"
                >
                  <path
                    fill="currentColor"
                    d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                  ></path>
                </svg>
               </button>
              </div>
              <div className="flex flex-shrink-0 items-center justify-center rounded-full sm:mx-0">
                <img
                  className="w-20 h-16 animate-shake"
                  src="../../public/images/alarm-clock-svgrepo-com.svg"
                  alt="alarm"
                />
              </div>
              <div className="my-6 flex justify-center">
                <p>Alarm Time: {alarm?.alarmTime}</p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Input type="text" lable="Alarm Title" value={alarm?.alarmTitle} />
                  <Input type="text" lable="Alarm Discription" value={alarm?.alarmDisc} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 my-2">
              <button
                onClick={closeModal}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={edited}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md px-4 py-2 text-sm text-white shadow-sm bg-green-600 hover:bg-green-700 sm:mt-0 sm:w-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
