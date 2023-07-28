import React, { useState } from 'react';
import {
  animated,
  AnimationResult,
  config,
  Controller,
  SpringValue,
  useTransition,
} from 'react-spring';

import '../stylesheets/conveyer.css';

const Conveyer: React.FC = () => {
  const [data, setData] = useState<number[]>([1]);

  const handleTransitionRest = (
    result: AnimationResult,
    spring: Controller | SpringValue,
    item: number
  ) => {
    // TODO this is a hack
    // I can access the item's animation values and say something
    // like if (endValue === "translateY(-100%)") { ... }
    // but idk this works fine for now
    if (item !== data[0]) return;
    const newData = data.slice(0, 5); // TODO programmatically determine upper bound
    newData.unshift(data[0] + 1);

    setData(newData);
  };
  const transitions = useTransition(data, {
    from: { transform: 'translateY(-400%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-400%)' },
    onRest: handleTransitionRest,
    config: (item, index, state) => {
      return {
        ...config.wobbly,
        bounce: state === 'enter' ? 2 : 0,
      };
    },
  });

  return (
    <section className="pane conveyer">
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
      <section className="animation-info">Factory runs 24/7</section>
    </section>
  );
};

export default Conveyer;
