import React from "react";

interface Props {
  children: React.ReactNode;
  axis?: "x" | "y";
  degrees?: number;
}

const TumbleEffect: React.FC<Props> = ({
  children,
  axis = "x",
  degrees = 20,
}) => {
  const transform =
    axis && degrees ? `rotate${axis.toUpperCase()}(${degrees}deg)` : "";

  return (
    <div
      className="transform-gpu transition-transform duration-500 hover:rotate-0 hover:scale-105"
      style={{ transform }}
    >
      {React.Children.map(children, (child) => (
        <div className="transform-gpu">{child}</div>
      ))}
    </div>
  );
};

export default TumbleEffect;
