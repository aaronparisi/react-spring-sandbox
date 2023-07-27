import React, { useEffect, useState } from 'react';
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

const SubsequentManual: React.FC = () => {
  const nums = [1, 2, 3, 4];
  const [idx, setIdx] = useState<number>(0);
  const [empty, setEmpty] = useState<boolean>(true);
  const [full, setFull] = useState<boolean>(false);
  const [entering, setEntering] = useState<boolean>(false);
  const [leaving, setLeaving] = useState<boolean>(false);
  const [allAtOnce, setAllAtOnce] = useState<boolean>(false);
  const [buttons, setButtons] = useState<Button[]>([]);

  const enterAllAtOnce = (
    result: AnimationResult,
    spring: Controller | SpringValue,
    item: number
  ) => {
    if (idx === nums.length && item === nums[idx - 1]) {
      // we are done
      setEntering(false);
      setFull(true);
    } else {
      setIdx(nums.length);
    }
  };
  const leaveAllAtOnce = (
    result: AnimationResult,
    spring: Controller | SpringValue,
    item: number
  ) => {
    if (idx === 0 && item === nums[0]) {
      // we are done
      setLeaving(false);
      setEmpty(true);
    } else {
      setIdx(0);
    }
  };
  const enterOneAtATime = (
    result: AnimationResult,
    spring: Controller | SpringValue,
    item: number
  ) => {
    if (idx === nums.length && item === nums[idx - 1]) {
      // we are done
      setEntering(false);
      setFull(true);
    } else {
      setIdx((prev) => prev + 1);
    }
  };
  const leaveOneAtATime = (
    result: AnimationResult,
    spring: Controller | SpringValue,
    item: number
  ) => {
    if (idx === 0 && item === nums[0]) {
      // we are done
      setLeaving(false);
      setEmpty(true);
    } else {
      setIdx((prev) => prev - 1);
    }
  };
  useEffect(() => {
    // kick things off
    if (entering && allAtOnce) setIdx(nums.length);
    else if (entering) setIdx((prev) => prev + 1);
    else if (leaving && allAtOnce) setIdx(0);
    else if (leaving) setIdx((prev) => prev - 1);
  }, [entering, leaving]);
  useEffect(() => {
    const newButtons: Button[] = [];

    if (empty) {
      newButtons.push({
        disabled: false,
        text: 'Enter',
        onClick: () => {
          setAllAtOnce(true);
          setEntering(true);
          setEmpty(false);
        },
      });
      newButtons.push({
        disabled: false,
        text: 'Enter',
        onClick: () => {
          setAllAtOnce(false);
          setEntering(true);
          setEmpty(false);
        },
      });
    } else if (full) {
      newButtons.push({
        disabled: false,
        text: 'Leave',
        onClick: () => {
          setAllAtOnce(true);
          setLeaving(true);
          setFull(false);
        },
      });
      newButtons.push({
        disabled: false,
        text: 'Leave',
        onClick: () => {
          setAllAtOnce(false);
          setLeaving(true);
          setFull(false);
        },
      });
    } else if (entering) {
      newButtons.push({
        disabled: true,
        text: '...entering',
        onClick: () => {},
      });
      newButtons.push({
        disabled: true,
        text: '...entering',
        onClick: () => {},
      });
    } else {
      newButtons.push({
        disabled: true,
        text: '...leaving',
        onClick: () => {},
      });
      newButtons.push({
        disabled: true,
        text: '...leaving',
        onClick: () => {},
      });
    }

    setButtons(newButtons);
  }, [empty, full, entering, leaving]);

  const transitions = useTransition(nums.slice(0, idx), {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' },
    trail: 100,
    config: config.wobbly,
    onRest:
      entering && allAtOnce
        ? enterAllAtOnce
        : entering
        ? enterOneAtATime
        : allAtOnce
        ? leaveAllAtOnce
        : leaveOneAtATime,
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
      <p>
        {buttons.map((btn, idx) => {
          return (
            <span key={btn.text + idx}>
              <button onClick={btn.onClick}>{btn.text}</button>
              {idx === 0 ? 'all at once' : 'one at a time'}
            </span>
          );
        })}
      </p>
    </section>
  );
};

export default SubsequentManual;
