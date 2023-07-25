import React from 'react';
import { useSpring, animated, config } from 'react-spring';

const MultiPartAnimation: React.FC = () => {
  const [slideSpring, slideApi] = useSpring(() => {
    return {
      from: { x: 100 },
    };
  });

  const handleClick = () => {
    slideApi.start({
      from: { x: 100 },
      to: [{ x: 300 }, { x: 0 }, { x: 600 }, { x: 100 }],
      config: config.wobbly,
      loop: true,
    });
  };

  return (
    <section className="pane">
      <section className="animation-window">
        <animated.div
          className="slide-on-click-reset springy"
          style={slideSpring}
          onClick={handleClick}
        ></animated.div>
      </section>
      <p>
        This animation takes an <em>array</em> for its `to` property. `loop`
        seems to only work as expected when `to` "ends up" at `from`.
      </p>
    </section>
  );
};

export default MultiPartAnimation;