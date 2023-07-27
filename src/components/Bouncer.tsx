import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const Bouncer: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  const [slideSpring, slideApi] = useSpring(() => {
    return {
      from: { x: 100 },
    };
  });

  const handleClick = () => {
    if (!hasStarted) {
      slideApi.start({
        from: { x: 100 },
        to: { x: 500 },
        config: {
          ...config.wobbly,
          bounce: 2,
        },
        loop: { reverse: true },
      });

      setIsLooping(true);
      setHasStarted(true);
    }
    if (isLooping) {
      slideApi.pause();
      setIsLooping(false);
    } else {
      slideApi.resume();
      setIsLooping(true);
    }
  };

  return (
    <section className="pane">
      <section className="animation-window">
        <animated.div className="springy" style={slideSpring}></animated.div>
      </section>
      <p>
        This one bounces. Click{' '}
        <span>
          <button onClick={handleClick}>here</button>
        </span>{' '}
        to [ {!hasStarted ? 'start' : isLooping ? 'pause' : 'continue'} ] the
        loop.
      </p>
    </section>
  );
};

export default Bouncer;
