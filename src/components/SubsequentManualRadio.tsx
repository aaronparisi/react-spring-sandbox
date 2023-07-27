import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  animated,
  useTransition,
  config,
  AnimationResult,
  Controller,
  SpringValue,
} from 'react-spring';

interface Button {
  disabled: boolean;
  text: string;
  onClick: () => void;
}

const SubsequentManualRadio: React.FC = () => {
  const nums = [1, 2, 3, 4];
  const [idx, setIdx] = useState<number>(0);
  const [empty, setEmpty] = useState<boolean>(true);
  const [entering, setEntering] = useState<boolean>(false);
  const [leaving, setLeaving] = useState<boolean>(false);
  const [allAtOnce, setAllAtOnce] = useState<boolean>(true);

  const enter = () => {
    setIdx((prev) => (allAtOnce ? nums.length : prev + 1));
  };
  const leave = () => {
    setIdx((prev) => (allAtOnce ? 0 : prev - 1));
  };
  const handleEnteringRest = () => {
    if (idx === nums.length) {
      console.log(
        'This gets called repeatedly... can I cancel subsequent onRests?'
      );
      // we are done
      setEntering(false);
    } else {
      enter();
    }
  };
  const handleLeavingRest = () => {
    if (idx === 0) {
      console.log(
        'This gets called repeatedly... can I cancel subsequent onRests?'
      );
      // we are done
      setLeaving(false);
      setEmpty(true);
    } else {
      leave();
    }
  };
  const handleBtnClick = () => {
    if (empty) {
      setEmpty(false);
      setEntering(true);
    } else {
      setLeaving(true);
    }
  };
  const handleTimingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAllAtOnce(e.target.value === 'all-at-once');
  };

  useEffect(() => {
    // kick things off
    if (entering) enter();
    else if (leaving) leave();
  }, [entering, leaving]);

  const transitions = useTransition(nums.slice(0, idx), {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' },
    trail: 100,
    config: config.wobbly,
    onRest: entering ? handleEnteringRest : handleLeavingRest,
  });

  return (
    <section className="pane">
      <section className="animation-window">
        {transitions((style, item) => {
          return (
            <animated.div
              key={item}
              className="springy"
              style={{ position: 'relative', ...style }}
            >
              {item}
            </animated.div>
          );
        })}
      </section>
      <section>
        <button disabled={entering || leaving} onClick={handleBtnClick}>
          {entering
            ? '...entering'
            : leaving
            ? '...leaving'
            : empty
            ? 'Enter'
            : 'Leave'}
        </button>
        <p>
          <label htmlFor="all-at-once">All at Once</label>
          <input
            type="radio"
            id="all-at-once"
            value="all-at-once"
            name="animation-timing"
            checked={allAtOnce}
            onChange={handleTimingChange}
          />
          <label htmlFor="one-at-a-time">One at a Time</label>
          <input
            type="radio"
            id="one-at-a-time"
            value="one-at-a-time"
            name="animation-timing"
            checked={!allAtOnce}
            onChange={handleTimingChange}
          />
        </p>
      </section>
    </section>
  );
};

export default SubsequentManualRadio;
