import React, { useEffect, useState } from 'react';
import {
  animated,
  AnimationResult,
  config,
  Controller,
  SpringValue,
  useSpring,
  useSprings,
  useTransition,
} from 'react-spring';

import '../stylesheets/conveyer.css';

const ConveyerSmooth: React.FC = () => {
  const [data, setData] = useState<number[]>([1]);

  const handleTransitionRest = (
    result: AnimationResult,
    spring: Controller | SpringValue,
    item: number
  ) => {
    if (item !== data[0]) return;
    const newData = data.slice(0, 5); // TODO programmatically determine upper bound
    newData.unshift(data[0] + 1);

    setData(newData);
  };

  /*
   I think I can do something like this:
   create a spring via useSpring that has an array `to`.
   This array will explicitly spell out each transform - entering, conveying, and leaving.
   We will render data.length animated divs, each with this spring as their style.
   My question is: when we add elements to the array, will each div's animation
   start over?  Or will it continue on its multiple-to-array journey?
   */
  // const conveySpring = useSpring({
  //   from: { transform: `translate3d(0, -400%, 0)` },
  //   to: [
  //     { transform: `translate3d(0, 0, 0)` },
  //     { transform: 'translate3d(100px, 0, 0)' },
  //     { transform: 'translate3d(200px, 0, 0)' },
  //     { transform: 'translate3d(300px, 0, 0)' },
  //     { transform: 'translate3d(400px, 0, 0)' },
  //     { transform: 'translate3d(500px, 0, 0)' },
  //     { transform: 'translate3d(500px, -400%, 0)' },
  //   ],
  //   config: config.wobbly,
  // });
  const [springs, api] = useSprings(
    data.length,
    (springIdx: number) => {
      const springFrom = { transform: '' };
      let springTo: { transform: string } | { transform: string }[] = {
        transform: '',
      };
      if (springIdx === 0) {
        // enter
        springFrom.transform = 'translate3d(0, -400%, 0)';
        springTo.transform = 'translate3d(0, 0, 0)';
      } else if (springIdx === 5) {
        // exit
        springFrom.transform = `translate3d(${80 * springIdx}px, 0, 0)`;
        springTo.transform = `translate3d(${80 * springIdx}px, -400%, 0)`;
      } else {
        // convey
        // springFrom.transform = `translate3d(${80 * springIdx}px, 0, 0)`;
        // springTo.transform = `translate3d(${80 * (springIdx + 1)}px, 0, 0)`;
        springFrom.transform = 'translate3d(0, 0, 0)';
        springTo = [0, 1, 2, 3, 4, 5].map((n) => ({
          transform: `translate3d(${80 * n}px, 0, 0)`,
        }));
      }
      return {
        from: springFrom,
        to: springTo,
        config: (key: string) => {
          return config.wobbly;
        },
      };
    },
    []
  );

  useEffect(() => {
    const conveyerInterval = setInterval(() => {
      setData((prev) => {
        const newData = prev.slice(0, 5);
        newData.unshift(prev[0] + 1);
        return newData;
      });
    }, 1000);

    return () => clearInterval(conveyerInterval);
  }, []);

  return (
    <section className="pane conveyer">
      <section className="animation-window">
        {springs.map((props, idx) => {
          return (
            <animated.div key={data[idx]} className="springy" style={props}>
              {data[idx]}
            </animated.div>
          );
        })}
      </section>
      <section className="animation-info">Factory runs 24/7</section>
    </section>
  );
};

export default ConveyerSmooth;
