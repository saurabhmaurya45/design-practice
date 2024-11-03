import { motion, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import CardWrapper from "../../components/CardWrapper";

const AnimatedCounter = () => {
  let [count, setCount] = useState(0);

  return (
    <CardWrapper className="w-96 h-60">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center">
          <div className="flex-col text-center">
            <p>Count: {count}</p>
            <div className="mt-4 gap-8 flex justify-center items-center ">
              <label>Insert a number:</label>
              <input
                type="number"
                value={count}
                min={0}
                onChange={(e) => setCount(+e.target.value)}
                className="w-20 p-1 border shadow-sm"
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <Counter value={count} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default AnimatedCounter;

function Counter({ value }) {
  return (
    <div className="flex h-6 ring-2 ring-green-500 shadow-lg overflow-y-auto">
      {value &&
        [...Array(Math.floor(Math.log10(value) + 1)).keys()]
          .reverse()
          .map((key) => {
            return <Digit key={key} value={value} place={Math.pow(10, key)} />;
          })}
    </div>
  );
}

const Digit = ({ value, place }) => {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative w-6">
      {[...Array(10).keys()].map((i) => (
        <Number mv={animatedValue} number={i} key={i} />
      ))}
    </div>
  );
};

function Number({ mv, number }) {
  let y = useTransform(mv, (latest) => {
    let height = 24;
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span style={{ y }} className="absolute inset-0 flex justify-center">
      {number}
    </motion.span>
  );
}
