import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const LoopOnClick: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const [slideSpring, slideApi] = useSpring(() => {
    return {
      from: { x: 100 },
    };
  });

  const handleClick = () => {
    console.log('user clicked on LoopOnClick; sliding now');
    slideApi.start({
      x: isAnimated ? 100 : 500,
      config: config.wobbly,
      loop: true,
    });

    setIsAnimated((prev) => !prev);
  };

  return (
    <section className="pane">
      <section className="animation-window">
        <animated.div
          className="clickable springy"
          onClick={handleClick}
          style={slideSpring}
        >
          Click
        </animated.div>
      </section>
      <p>
        This one loops in the most naive way possible. Refresh the page to stop
        it.
      </p>
    </section>
  );
};

export default LoopOnClick;
