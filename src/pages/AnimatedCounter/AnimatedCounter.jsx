import { motion, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { CardWrapper } from "../../components";

const AnimatedCounter = () => {
  let [count, setCount] = useState(0);

  return (
    <CardWrapper
      title="Animated Counter"
      className="flex w-96 h-72 flex-col pb-4 gap-12 relative"
    >
      <div className="flex flex-col w-full h-full justify-evenly">
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
                className="w-20 border-none outline-none rounded-lg p-2 py-1 shadow-sm "
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 ">
          <Counter value={count} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default AnimatedCounter;

function Counter({ value }) {
  return (
    <div className="flex justify-center items-center p-2 bg-white shadow-sm border rounded-lg">
      <div className="flex h-8 overflow-y-hidden leading-8 text-xl">
        {value &&
          [...Array(Math.floor(Math.log10(value) + 1)).keys()]
            .reverse()
            .map((key) => {
              return (
                <Digit key={key} value={value} place={Math.pow(10, key)} />
              );
            })}
      </div>
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
