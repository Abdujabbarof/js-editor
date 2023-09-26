'use client'
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import { classnames } from "../utils/general";
import ConsoleWindow from './ConsoleWindow'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
// import OutputWindow from "./OutputWindow";
// import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";


const Landing = () => {
  const [code, setCode] = useState("// Default code \nconsole.log('Hello World')");
  const [theme, setTheme] = useState("cobalt");
  const [consoleOutput, setConsoleOutput] = useState([]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      runCode(code)
    }
  }, [ctrlPress, enterPress]);

  const runCode = (code) => {
    try {
      setConsoleOutput([]);

      const consoleMessages = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleMessages.push(args.map((arg) => arg.toString()).join(' '));
        originalConsoleLog(...args);
      };

      eval(code); 

      setConsoleOutput(consoleMessages);
      showSuccessToast()
    } catch (error) {
      const consoleMessages = []
      consoleMessages.push(`Error: ${error.message}`);
      console.error(error);
      setConsoleOutput(consoleMessages);
      showErrorToast(error.message)
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex">
        <div className="px-4 py-2">
            <button
              onClick={() => [runCode(code)]}
              disabled={!code}
              className={classnames(
                "border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              Compile and Execute
            </button>
            </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 px-4 py-4">
        <div className="col-span-3">
          <CodeEditorWindow
            code={code}
            setCode={setCode}
            language={'javascript'}
            theme={theme?.value}
          />
        </div>

        <div className="col-span-2">
          <ConsoleWindow output={consoleOutput} />
        </div>
      </div>
    </>
  );
};
export default Landing;
