import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { IList, IValues } from "../types/main.d";
import Modal from "./Modal";
import { PermissionModal } from "./PermissionModal";
import { toast } from "react-toastify";

const List: React.FC<IList> = ({ alarms, setAlarms }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [selectedAlarmId, setSelectedAlarmId] = useState<number | null>(null);
  const [ValueInput, setValueInput] = useState<IValues>();

  const timeSort = () => {
    const sorted = [...alarms].sort((a, b) => {
      return a.alarmTime.toString().localeCompare(b.alarmTime.toString());
    });
    setAlarms(sorted);
  };

  const titleSort = () => {
    const sorted = [...alarms].sort((a, b) => {
      return a.alarmTitle.localeCompare(b.alarmTitle);
    });
    setAlarms(sorted);
  };

  const showModalHandler = (alarm: IValues) => {
    setShowModal(true);
    setValueInput(alarm);
  };

  const showDeleteModal = (id: number) => {
    setShowModalDelete(true);
    setSelectedAlarmId(id);
  };

  const deleteAlarm = () => {
    setAlarms(alarms.filter((alarm) => alarm.id !== selectedAlarmId));
    setShowModalDelete(false);
    toast.success("Deleted", {
      style: {
        fontSize: "15px",
        borderRadius: "8px",
      },
    });
  };

  return (
    <>
      <div className="w-full mx-auto p-4 overflow-x-auto sm:px-8 md:px-20 lg:px-40 xl:px-80">
        <table className="min-w-full w-full sm:w-2/3 bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-Blue text-white">
              <th className="py-4">
                <div
                  onClick={timeSort}
                  className="flex gap-1 items-center justify-center"
                >
                  Time
                  <IoIosArrowDown className="cursor-pointer" />
                </div>
              </th>
              <th className="py-4">
                <div
                  onClick={titleSort}
                  className="flex gap-1 items-center justify-center"
                >
                  Title
                  <IoIosArrowDown className="cursor-pointer" />
                </div>
              </th>
              <th className="py-4">Discription</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {alarms.map((alarm) => (
              <tr
                key={alarm.id}
                className="border-b hover:bg-gray-100 odd:bg-Grey"
              >
                <td className="py-4 text-sm md:text-base">{alarm.alarmTime}</td>
                <td className="py-4">{alarm.alarmTitle}</td>
                <td className="py-4">{alarm.alarmDesc}</td>
                <td className="py-4 flex gap-2 justify-center text-base">
                  <button
                    onClick={() => {
                      showModalHandler(alarm);
                    }}
                    className="text-white bg-green-600 py-1 px-4 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => showDeleteModal(alarm.id)}
                    className="text-white bg-red-500 py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          alarm={ValueInput}
          setAlarms={setAlarms}
        />
      )}
      {showModalDelete && (
        <PermissionModal
          deleteAlarm={deleteAlarm}
          setShowModalDelete={setShowModalDelete}
        />
      )}
    </>
  );
};
export default List;
