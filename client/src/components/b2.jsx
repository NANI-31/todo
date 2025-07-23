import React, { useEffect, useRef } from "react";

const AnimatedBlob = () => {
  const blobGroupRef = useRef(null);
  const stop1Ref = useRef(null);
  const stop2Ref = useRef(null);
  const width = 960;
  const height = 540;
  const radius = 100;
  useEffect(() => {
    let x = 100;
    let y = 100;
    let dx = 2;
    let dy = 1.5;

    const applyTransform = () => {
      if (blobGroupRef.current) {
        blobGroupRef.current.setAttribute("transform", `translate(${x} ${y})`);
      }
    };

    const randomHSL = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 60%)`;
    };

    const changeGradient = () => {
      if (stop1Ref.current)
        stop1Ref.current.setAttribute("stop-color", randomHSL());
      if (stop2Ref.current)
        stop2Ref.current.setAttribute("stop-color", randomHSL());
    };

    const updatePosition = () => {
      x += dx;
      y += dy;

      let bounced = false;

      if (x < radius || x > width - radius) {
        dx = -dx;
        x = Math.max(radius, Math.min(x, width - radius));
        changeGradient();
        bounced = true;
      }

      if (y < radius || y > height - radius) {
        dy = -dy;
        y = Math.max(radius, Math.min(y, height - radius));
        changeGradient();
        bounced = true;
      }

      if (!bounced) {
        applyTransform();
      }

      requestAnimationFrame(updatePosition);
    };

    requestAnimationFrame(updatePosition);
  }, []);

  return (
    <div className="absolute">
      <svg
        id="visual"
        viewBox="0 0 960 540"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: "2px solid red" }}
      >
        <defs>
          <linearGradient id="myGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(300, 70%, 60%)" ref={stop1Ref} />
            <stop offset="100%" stopColor="hsl(180, 70%, 60%)" ref={stop2Ref} />
          </linearGradient>

          <filter id="blobGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="50"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g id="blob-group" ref={blobGroupRef} transform="translate(100 100)">
          <path
            id="blob-path"
            d="M115.3 -98.4C149.1 -81.6 175.8 -40.8 177.7 1.9C179.5 44.5 156.6 89.1 122.8 122.4C89.1 155.8 44.5 177.9 5.4 172.5C-33.7 167 -67.4 134.1 -92.6 100.7C-117.7 67.4 -134.4 33.7 -132.1 2.2C-129.9 -29.2 -108.8 -58.5 -83.6 -75.3C-58.5 -92.2 -29.2 -96.7 5.8 -102.5C40.8 -108.3 81.6 -115.3 115.3 -98.4"
            fill="url(#myGradient)"
            filter="url(#blobGlow)"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBlob;
