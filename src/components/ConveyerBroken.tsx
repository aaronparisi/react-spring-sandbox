import React, { useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import '../stylesheets/conveyer.css';

const ConveyerSmooth: React.FC = () => {
  const spring = useSpring({
    from: { transform: 'translate3d(0, -400%, 0)' },
    to: [
      { transform: 'translate3d(0, 0, 0)' },
      { transform: 'translate3d(100px, 0, 0)' },
      { transform: 'translate3d(200px, 0, 0)' },
      { transform: 'translate3d(300px, 0, 0)' },
      { transform: 'translate3d(400px, 0, 0)' },
      { transform: 'translate3d(400px, -400%, 0)' },
    ],
  });
  // const spring1 = useSpring({
  //   from: { transform: 'translate3d(0, -400%, 0)' },
  //   to: { transform: 'translate3d(0, 0, 0)' },
  //   config: { ...config.wobbly, bounce: 2 },
  // });
  // const spring2 = useSpring({
  //   from: { transform: 'translate3d(0, 0, 0)' },
  //   to: { transform: 'translate3d(100px, 0, 0)' },
  //   config: config.wobbly,
  // });
  // const spring3 = useSpring({
  //   from: { transform: 'translate3d(100px, 0, 0)' },
  //   to: { transform: 'translate3d(200px, 0, 0)' },
  //   config: config.wobbly,
  // });
  // const spring4 = useSpring({
  //   from: { transform: 'translate3d(200px, 0, 0)' },
  //   to: { transform: 'translate3d(300px, 0, 0)' },
  //   config: config.wobbly,
  // });
  // const spring5 = useSpring({
  //   from: { transform: 'translate3d(300px, 0, 0)' },
  //   to: { transform: 'translate3d(400px, 0, 0)' },
  //   config: { ...config.wobbly, bounce: 2 },
  // });
  // const spring6 = useSpring({
  //   from: { transform: 'translate3d(400px, 0, 0)' },
  //   to: { transform: 'translate3d(400px, -400%, 0)' },
  //   config: { ...config.wobbly, bounce: 2 },
  // });
  // const springs = [spring1, spring2, spring3, spring4, spring5, spring6];
  const [data, setData] = useState<number[]>([1]);

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
        {data.map((el, idx) => {
          return (
            <animated.div key={el} className="springy" style={spring}>
              {el}
            </animated.div>
          );
        })}
      </section>
      <section className="animation-info">OSHA violation.</section>
    </section>
  );
};

export default ConveyerSmooth;
