import React from "react";
import clsx from "clsx";

interface DottedGridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const DottedGridBackground = ({ children, className }: DottedGridBackgroundProps) => {
  return <div className={clsx(className, "background dark:background-dark")}>{children}</div>;
};

export default DottedGridBackground;
