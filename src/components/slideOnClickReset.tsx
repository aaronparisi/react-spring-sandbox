import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const SlideOnClickReset: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const [slideSpring, slideApi] = useSpring(() => {
    return {
      from: { x: 0 },
    };
  });

  const handleClick = () => {
    console.log('user clicked on SlideOnClickReset; sliding now');
    slideApi.start({
      x: isAnimated ? 0 : 100,
      config: config.wobbly,
    });

    setIsAnimated((prev) => !prev);
  };

  return (
    <section className="pane">
      <section className="animation-window">
        <animated.div
          className="slide-on-click-reset springy"
          onClick={handleClick}
          style={slideSpring}
        ></animated.div>
      </section>
      <p>
        This spring enables us to "reverse" the animation every other click. It
        does so via a component state variable + ternary operator in spring
        declaration.
      </p>
    </section>
  );
};

export default SlideOnClickReset;
