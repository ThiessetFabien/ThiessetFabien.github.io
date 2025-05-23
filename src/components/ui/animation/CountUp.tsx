'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1000,
  suffix = '',
  className,
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const endValue = end;

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for a more natural animation
      const easeOutQuart = 1 - (1 - progress) ** 4;
      const currentCount = Math.floor(easeOutQuart * endValue);

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, inView]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};
