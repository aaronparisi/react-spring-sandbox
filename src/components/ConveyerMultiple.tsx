import React, { useEffect, useState } from 'react';
import { animated, config, useSpring, useSpringRef } from 'react-spring';

import '../stylesheets/conveyer.css';

const ConveyerMultiple: React.FC = () => {
  // ISSUE: each time data[] changes, each element
  // is getting a new spring, rather than keeping its previous
  // spring and continuing on with it
  // => attempted to use refs to ensure that one element
  //    keeps the same spring even as data[] changes
  //    but I think all it does is ensure the spring
  //    value-set is not regenerated over and over...
  // const springRef = useSpringRef();
  // const refSpring = useSpring({
  //   ref: springRef,
  //   from: { transform: 'translate3d(0px, -400%, 0)' },
  //   to: async (next, cancel) => {
  //     await next({ transform: 'translate3d(0px, 0%, 0)' });
  //     await next({ transform: 'translate3d(100px, 0%, 0)' });
  //     await next({ transform: 'translate3d(200px, 0%, 0)' });
  //     await next({ transform: 'translate3d(300px, 0%, 0)' });
  //     await next({ transform: 'translate3d(400px, 0%, 0)' });
  //     await next({ transform: 'translate3d(400px, -400%, 0)' });
  //   },
  //   config: { ...config.wobbly, bounce: 2 },
  // });

  // => another attempt: use individual springs, attach to elements
  //    over and over depending on location in data[]
  // ... now that I think about it I'm actually not sure why this didn't work...
  const spring1 = useSpring({
    from: { transform: 'translate3d(0px, -400%, 0)' },
    to: { transform: 'translate3d(0px, 0%, 0)' },
    config: { ...config.wobbly, bounce: 2 },
  });
  const spring2 = useSpring({
    from: { transform: 'translate3d(0px, 0%, 0)' },
    to: { transform: 'translate3d(100px, 0%, 0)' },
    config: config.wobbly,
  });
  const spring3 = useSpring({
    from: { transform: 'translate3d(100px, 0%, 0)' },
    to: { transform: 'translate3d(200px, 0%, 0)' },
    config: config.wobbly,
  });
  const spring4 = useSpring({
    from: { transform: 'translate3d(200px, 0%, 0)' },
    to: { transform: 'translate3d(300px, 0%, 0)' },
    config: config.wobbly,
  });
  const spring5 = useSpring({
    from: { transform: 'translate3d(300px, 0%, 0)' },
    to: { transform: 'translate3d(400px, 0%, 0)' },
    config: config.wobbly,
  });
  const spring6 = useSpring({
    from: { transform: 'translate3d(400px, 0%, 0)' },
    to: { transform: 'translate3d(400px, -400%, 0)' },
    config: { ...config.wobbly, bounce: 2 },
  });
  const springs = [spring1, spring2, spring3, spring4, spring5, spring6];
  const [data, setData] = useState<number[]>([1]);

  useEffect(() => {
    const conveyerInterval = setInterval(() => {
      setData((prev) => {
        const newData = prev.slice(0, 5);
        newData.unshift(prev[0] + 1);
        return newData;
      });
    }, 3000);

    return () => clearInterval(conveyerInterval);
  }, []);

  return (
    <section className="pane conveyer">
      <section className="animation-window">
        {data.map((el, idx) => {
          console.log(el, idx);
          console.log(springs);
          return (
            <animated.div key={el} className="springy" style={springs[idx]}>
              {el}
            </animated.div>
          );
        })}
      </section>
      <section className="animation-info">Fingers crossed...</section>
    </section>
  );
};

export default ConveyerMultiple;
