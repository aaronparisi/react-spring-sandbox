import React, { useEffect, useState } from 'react';
import { animated, useTransition, config } from 'react-spring';

const Subsequent: React.FC = () => {
  const nums = [1, 2, 3, 4];
  const [idx, setIdx] = useState<number>(1);

  // @ts-ignore
  const handleTransitionRest = (result, spring, item) => {
    // TODO this feels like a hack
    // issue is that when we cycle idx back to 0,
    // the entire collection of divs animates,
    // resulting in 4 nearly simultaneous executions of onRest
    if (item > idx + 1) return;
    if (idx === 0) {
      // when we set idx to 0, all 4 blocks transition to their 'leave' state
      // once the first block 'rests', we execute its `onRest`, thus
      // bumping the index back up to 1, thus adding block #1 back to the UI.
      // Unfortunately, this happens BEFORE the other 3 blocks have been
      // REMOVED from the UI, so we end up with an odd situation where
      // block #1 ends up being positioned as if its the 4th element in a
      // flexbox (because for a moment, it is).
      // Given the UI I'm trying to create, ideally we would begin
      // counting up again only after all the blocks have been removed from
      // the DOM, not after the first block's leave onRest.
      //
      // SOLUTION: just force a bit of delay with setTimeout.
      // It's hacky but ultimately I don't think anyone would
      // actually create this endlessly cycling animation in a real UI.
      // ... and if they did, I may look into other mechanisms like
      // keeping track of which items are rendered in component state
      // and removing them in onRest, then only counting back up
      // when the last element of this piece of state is removed.
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % (nums.length + 1));
      }, 300);
    } else {
      setIdx((prev) => (prev + 1) % (nums.length + 1));
    }
  };
  const transitions = useTransition(nums.slice(0, idx), {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' },
    trail: 100,
    config: config.wobbly,
    onRest: handleTransitionRest,
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
        Leverages `onRest` (and some hacky timeouts) to automatically transition
        in the new element (see component tsx for commentary)
      </p>
    </section>
  );
};

export default Subsequent;
