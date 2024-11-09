import React from "react";

interface AppbarTypes {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarTypes) => {
  return (
    <div className="w-full shadow-md p-3">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">PayTm</div>
        <div className="rounded-md bg-blue-500 transition-all duration-300 hover:bg-blue-700 p-2 text-white">
          <button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
