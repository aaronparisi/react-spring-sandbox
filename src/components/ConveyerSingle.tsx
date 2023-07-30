import React from 'react';
import { animated, config, useSpring } from 'react-spring';

import '../stylesheets/conveyer.css';

const ConveyerSingle: React.FC = () => {
  const spring = useSpring({
    from: { transform: 'translate3d(0px, -400%, 0)' },
    to: async (next, cancel) => {
      await next({ transform: 'translate3d(0px, 0%, 0)' });
      await next({ transform: 'translate3d(100px, 0%, 0)' });
      await next({ transform: 'translate3d(200px, 0%, 0)' });
      await next({ transform: 'translate3d(300px, 0%, 0)' });
      await next({ transform: 'translate3d(400px, 0%, 0)' });
      await next({ transform: 'translate3d(400px, -400%, 0)' });
    },
    config: { ...config.wobbly, bounce: 2 },
  });

  return (
    <section className="pane conveyer">
      <section className="animation-window">
        <animated.div className="springy" style={spring}>
          1
        </animated.div>
      </section>
      <section className="animation-info">Decrease in production.</section>
    </section>
  );
};

export default ConveyerSingle;
