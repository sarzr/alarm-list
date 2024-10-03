import { useEffect, useRef, useState } from "react";
import { IModalTime } from "../types/main.d";

const ModalTime: React.FC<IModalTime> = ({ alarms }) => {
  const [showModalTime, setShowModalTime] = useState<boolean>(false);
  const [showAlarmTime, setShowAlarmTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const [snoozeTime, setSnoozeTime] = useState<string>("");

  const audioAlarm = useRef(new Audio("public/sound.mp3"));

  useEffect(() => {
    const showModalTimeHandler = () => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      alarms.forEach((alarm) => {
        const alarmTime = alarm.alarmTime.toString();
        setShowAlarmTime(alarmTime);
        if (currentTime === alarmTime && !isOpen.includes(alarmTime)) {
          setShowModalTime(true);
          setIsOpen((prevTime) => [...prevTime, alarmTime]);
          audioAlarm.current.play();
        }
      });
    };

    const interval = setInterval(showModalTimeHandler, 1000);
    return () => clearInterval(interval);
  }, [alarms, isOpen]);

  const closeModal = () => {
    audioAlarm.current.pause();
    setShowModalTime(false);
  };

  const snoozeAlarm = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    const snoozeTime = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setIsOpen((prevTime) => [...prevTime, snoozeTime]);
    setSnoozeTime(snoozeTime);

    setTimeout(() => {
      setShowModalTime(true);
      audioAlarm.current.play();
    }, 300000);
    closeModal();
  };

  return (
    <div
      className={`relative z-10 ${showModalTime ? "" : "hidden"}`}
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
          <div className="relative px-4 pt-12 pb-7 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
            <div className="flex flex-shrink-0 items-center justify-center rounded-full sm:mx-0">
              <img
                className="w-20 h-16 animate-shake"
                src="../../public/images/alarm-clock-svgrepo-com.svg"
                alt="alarm"
              />
            </div>
            <div className="my-6 flex justify-center items-center gap-2">
              <div
                onClick={() => {
                  audioAlarm.current.pause();
                }}
              >
                <img
                  className="w-5 sm:w-8"
                  src="../../public/images/icons8-sound-50.png"
                  alt="sound-alarm"
                />
              </div>
              <p className="text-sm sm:text-base sm:font-medium">
                Alarm Time: {snoozeTime ? snoozeTime : showAlarmTime}
              </p>
            </div>
            <div className="bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={snoozeAlarm}
                className="mt-3 inline-flex w-full justify-center rounded-md px-4 py-2 text-sm text-white shadow-sm bg-green-600 hover:bg-green-700 sm:mt-0 sm:w-auto"
              >
                Snooze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalTime;
