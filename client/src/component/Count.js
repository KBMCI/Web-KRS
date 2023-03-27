import { useEffect, useState } from "react";

const Count = ({ number, duration }) => {
  const [count, setCount] = useState("0");
  useEffect(() => {
    let start = 0;
    const end = parseInt(number);
    if (start === end) return;
    let totalMilSecDur = parseInt(duration);
    let incrementtime = (totalMilSecDur / end) * 1000;
    let timer = setInterval(() => {
      start += 1;
      setCount(String(start));
      if (start === end) clearInterval(timer);
    }, incrementtime);
  }, [number, duration]);

  return <h1 className="text-center text-4xl">{count}</h1>;
};

export default Count;
