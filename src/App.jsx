import { Sidebar } from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ColorPaletteGenerator() {
  return (
    <>
    <Sidebar/>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
