import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
