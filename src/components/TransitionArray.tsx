import React, { useEffect, useState } from 'react';
import { animated, useTransition, config } from 'react-spring';

const TransitionArray: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
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
    if (data.length !== 0) {
      console.log('clearing data');
      setData([]);
    } else {
      setData([1, 2, 3, 4]);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        to [ {data.length ? 'exit' : 'enter'} ] the blocks. Doesn't seem to be
        working when passing function to useTransition...
      </p>
    </section>
  );
};

export default TransitionArray;
