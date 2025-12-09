import React, { Children, ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}
export default function Container(props: ContainerProps) {
  const { className } = props;
  return (
    <div className={`container mx-auto ${className}`}>{props.children}</div>
  );
}
