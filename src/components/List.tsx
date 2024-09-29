import React from "react";
import { IList } from "../types/main.d";

const List: React.FC<IList> = ({ alarms, setAlarms }) => {
  const deleteAlarm = (id: number) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
    console.log(id);
  };

  return (
    <div className="w-full mx-auto p-4 flex justify-center">
      <table className="w-10/12 bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-Blue text-white">
            <th className="py-4">Time</th>
            <th className="py-4">Title</th>
            <th className="py-4">Discription</th>
            <th className="py-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {alarms.map((alarm, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-4">{alarm.alarmTime}</td>
              <td className="py-4">{alarm.alarmTitle}</td>
              <td className="py-4">{alarm.alarmDisc}</td>
              <td className="py-4 flex gap-2 justify-center text-base">
                <button className="text-white bg-green-600 py-1 px-4 rounded">
                  Edit
                </button>
                <button
                  onClick={() => deleteAlarm(alarm.id)}
                  className="text-white bg-red-500 py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default List;
