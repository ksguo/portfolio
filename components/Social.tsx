"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";
import { Link } from "@heroui/react";
import { IoLogoGithub, IoLogoLinkedin, IoMail } from "react-icons/io5";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";


export interface SocialDockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}


export interface SocialIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
  url: string;
}


const DEFAULT_MAGNIFICATION = 60; 
const DEFAULT_DISTANCE = 150;     
const DEFAULT_ICON_SIZE = 35;     
const DEFAULT_RISE = 12;          


const dockVariants = cva(
  "w-max p-1 flex items-end gap-2" 
);

// --- SocialDock 组件 ---
const SocialDock = React.forwardRef<HTMLDivElement, SocialDockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        {...props}
        className={cn(dockVariants({ className }), className)}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

SocialDock.displayName = "SocialDock";

// --- SocialIcon component ---
const SocialIcon = ({
  size = DEFAULT_ICON_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  url,
  ...props
}: SocialIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const ySync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [0, -DEFAULT_RISE, 0],
  );

  const y = useSpring(ySync, {
    mass: 0.2,
    stiffness: 150,
    damping: 15,
  });

  return (
    <Link isExternal color="foreground" href={url}>
      <motion.div
        ref={ref}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full",
          "text-gray-600 dark:text-gray-300",
          "hover:text-gray-900 dark:hover:text-white transition-colors duration-200",
          className,
        )}
        style={{ width, y }} // 添加y轴变换
        {...props}
      >
        {children}
      </motion.div>
    </Link>
  );
};

SocialIcon.displayName = "SocialIcon";


const Social = () => {
  return (
    // 移除默认内边距确保完全右对齐
    <div className="flex justify-end w-full" onMouseDown={(e) => e.stopPropagation()}>
      <SocialDock 
        magnification={60} 
        distance={150}
      >
        <SocialIcon url={siteConfig.links.github}>
          <IoLogoGithub className="h-6 w-6" />
        </SocialIcon>
        <SocialIcon url={siteConfig.links.linkedin}>
          <IoLogoLinkedin className="h-6 w-6" />
        </SocialIcon>
        <SocialIcon url={siteConfig.links.email}>
          <IoMail className="h-6 w-6" />
        </SocialIcon>
      </SocialDock>
    </div>
  );
};

export default Social;