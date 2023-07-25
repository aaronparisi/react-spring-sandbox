import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';

const LoopWithCancel: React.FC = () => {
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
        config: config.wobbly,
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
        <animated.div
          className="slide-on-click-reset springy"
          style={slideSpring}
        ></animated.div>
      </section>
      <p>
        This animation loops as you'd expect. Click{' '}
        <span>
          <button onClick={handleClick}>here</button>
        </span>{' '}
        to [ {!hasStarted ? 'start' : isLooping ? 'pause' : 'continue'} ] the
        loop.
      </p>
    </section>
  );
};

export default LoopWithCancel;