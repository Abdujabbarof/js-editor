import React from 'react';

const ConsoleWindow = ({ output }) => {
  return (
    <div className='flex flex-col h-[100%]'>
      <h2 className='text-base font-semibold font-sans'>Output</h2>
      <div className="w-full h-[100%] px-5 py-2 mt-1 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {output.map((message, index) => (
          <div key={index} className="text-[13px]">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsoleWindow;
