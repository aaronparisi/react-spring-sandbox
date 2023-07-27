import React, { useEffect, useRef, useState } from 'react';
import { animated, useTransition, config } from 'react-spring';

const TransitionArray: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // const [transitions, transitionsApi] = useTransition(data, () => {
  //   return {
  //     from: { opacity: 0, transform: 'translateY(100%)' },
  //     enter: { opacity: 1, transform: 'translateY(0%)' },
  //     leave: { opacity: 0, transform: 'translateY(-100%)' },
  //   };
  // });
  const transitions = useTransition(data, {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' },
    trail: 100,
    config: config.wobbly,
  });

  const handleClick = () => {
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    if (running) {
      // so we get animation immediately
      setData([1, 2, 3, 4]);
      intervalRef.current = setInterval(() => {
        setData((prev) => {
          if (prev.length === 0) {
            return [1, 2, 3, 4];
          } else {
            return [];
          }
        });
      }, 2000);
    } else {
      setData([]);
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [running]);

  return (
    <section className="pane">
      <section className="animation-window">
        {transitions((style, item) => {
          return (
            <animated.div
              key={item}
              className="springy"
              style={{ position: 'relative', ...style }}
            >
              {item}
            </animated.div>
          );
        })}
      </section>
      <p>
        Staggered entrance and exit of multiple elements. Click{' '}
        <span>
          <button onClick={handleClick}>here</button>
        </span>{' '}
        to [ {running ? 'stop' : 'start'} ] the animation. Doesn't seem to be
        working when passing function to useTransition. Small enough interval
        values mess it up as well.
      </p>
    </section>
  );
};

export default TransitionArray;
