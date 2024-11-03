import React, { useRef } from "react";
import { CardWrapper } from "../../components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const macDockIcons = [
  {
    name: "Finder",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png",
  },
  {
    name: "Safari",
    url: "https://static-00.iconduck.com/assets.00/safari-icon-2048x2048-ulx2v5ea.png",
  },
  {
    name: "Mail",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5IUQP_D9dDEteCnvJ-nNv7d-UEMgu5pgRw&s",
  },
  {
    name: "Messages",
    url: "https://i.pinimg.com/736x/0f/c9/ba/0fc9ba0393fb07c14904a36425620eaf.jpg",
  },
  {
    name: "Photos",
    url: "https://help.apple.com/assets/65D6A902F480CEC17E026499/65D6A9031EC41481F009CB2C/en_US/b27be11281d58d9597fabdfcc67a3060.png",
  },
  {
    name: "Music",
    url: "https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png",
  },
  {
    name: "Calendar",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5vWYeXkngVRdaV5LtC7TCgp1Ir5iMgI4lA&s",
  },
  {
    name: "Settings",
    url: "https://i.pinimg.com/736x/50/8d/31/508d31017cc90ba75d476bcace05d4ef.jpg",
  },
  {
    name: "App Store",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png",
  },
  {
    name: "Trash",
    url: "https://e7.pngegg.com/pngimages/835/443/png-clipart-white-bucket-illustration-trash-computer-icons-os-x-yosemite-trash-can-glass-white.png",
  },
];

const MagnifiedDock = () => {
  let mouseX = useMotionValue(Infinity);

  return (
    <CardWrapper
      title="Magnified Dock"
      className="w-full flex flex-col pb-4 gap-4 relative"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-800 px-4 pb-3"
      >
        {macDockIcons.map((item, key) => (
          <AppIcon
            key={key}
            mouseX={mouseX}
            className="flex items-center justify-center text-white"
          >
            <img
              src={item.url}
              alt={item.name}
              className="rounded-lg w-full h-full object-cover "
            />
          </AppIcon>
        ))}
      </motion.div>
    </CardWrapper>
  );
};

export default MagnifiedDock;

const AppIcon = ({ mouseX, children, className }) => {
  const ref = useRef(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`aspect-square rounded-lg  ${className}`}
    >
      {children}
    </motion.div>
  );
};
