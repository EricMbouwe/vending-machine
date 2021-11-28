import React from 'react';

function GuestHeader() {
  return (
    <div className="">
      <div className="login-logo py-10 px-11 bg-gray-100">
        <a href="/" className="anchor">
          <div>
            <div className="logo font-bold text-xl">
              <span>VM</span>
              <span className="text-blue-700 text-3xl">.</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default GuestHeader;
