import React from "react";
import * as Progress from "@radix-ui/react-progress";
import "./style.css";

const ProgressDemo = ({ maxSteps, steps }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress((steps / maxSteps) * 100), 500);
    return () => clearTimeout(timer);
  }, [steps, maxSteps]);

  return (
    <Progress.Root
      className="translate-z-0 relative overflow-hidden rounded-full bg-[#f8f8fb] h-1 w-full "
      value={progress}
    >
      <Progress.Indicator
        className="transition-transform-cb bg-pr w-full h-full "
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressDemo;
