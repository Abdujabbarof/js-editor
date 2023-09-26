import React from 'react';

const ConsoleWindow = ({ output }) => {
  return (
    <div className="w-full h-[100%] px-5 py-2 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
      {output.map((message, index) => (
        <div key={index} className="text-[13px]">
          {message}
        </div>
      ))}
    </div>
  );
};

export default ConsoleWindow;
