import React, { useEffect, useState } from "react";
import { CardWrapper } from "../../components";
import { IoAdd } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { motion, useSpring, useTransform } from "framer-motion";

const VARIABLE_VALUE = 100;

const AnimatedNumber = () => {
  const [number, setNumber] = useState(1000);

  return (
    <CardWrapper className="w-96 h-60">
      <div className="flex items-center justify-center gap-10">
        <Button
          Icon={FiMinus}
          onClick={() => setNumber(number - VARIABLE_VALUE)}
          disabled={number <= 0}
        />
        <Number number={number} />
        <Button
          Icon={IoAdd}
          onClick={() => setNumber(number + VARIABLE_VALUE)}
          disabled={number >= 5000}
        />
      </div>
    </CardWrapper>
  );
};

export default AnimatedNumber;

const Button = ({ Icon, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-lg cursor-pointer border text-black/60 hover:text-black hover:shadow-sm hover:bg-gray-200 ${
        disabled
          ? "cursor-not-allowed hover:shadow-none hover:bg-transparent hover:text-black/60"
          : ""
      }`}
      disabled={disabled}
    >
      <Icon size={26} />
    </button>
  );
};

const Number = ({ number }) => {
  let spring = useSpring(number, { mass: 0.8, stiffness: 75, damping: 15 });

  let display = useTransform(spring, (latest) => {
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    spring.set(number);
  }, [number, spring]);

  return <motion.span>{display}</motion.span>;
};
