"use client";

import { Button } from "./ui/button";

const UserLogout = () => {
  return (
    <Button
      variant="secondary"
      className="inline-block w-full p-2 rounded-md hover:bg-gray-200 hover:text-foreground cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default UserLogout;
