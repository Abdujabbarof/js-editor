import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ setCode, code, theme }) => {

  const handleEditorChange = (value) => {
    setCode(value)
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={"javascript"}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
