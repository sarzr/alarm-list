import { ToastContainer } from "react-toastify";
import Form from "./components/FormInputs";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-slate-50 h-full flex flex-col gap-8 py-14 font-Inter">
      <ToastContainer />
      <Form />
    </div>
  );
}

export default App;
