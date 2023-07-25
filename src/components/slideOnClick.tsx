import React from 'react';
import { useSpring, animated, config } from 'react-spring';

const SlideOnClick: React.FC = () => {
  const [slideSpring, slideApi] = useSpring(() => {
    return {
      from: { x: 0 },
    };
  });

  const handleClick = () => {
    console.log('user clicked on SlideOnClick; sliding now');
    slideApi.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
      config: config.wobbly,
    });
  };

  return (
    <section className="pane">
      <section className="animation-window">
        <animated.div
          className="slide-on-click springy"
          onClick={handleClick}
          style={slideSpring}
        ></animated.div>
      </section>
      <p>
        Click events are handled by a function that calls `api.start`
        explicitly. The `to` and `from` values are defined in start's config
        object argument. Subsequent clicks <em>do not</em> "reverse" the
        animation.
      </p>
    </section>
  );
};

export default SlideOnClick;
