"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  options: {
    reverse: true, // 反向旋转
    depth: 1, // 3D 深度
    wheelZoom: false, // 禁用滚轮缩放
    imageScale: 2, // 图标缩放比例
    activeCursor: "default", // 鼠标悬停时的光标样式
    tooltip: "native", // 使用原生工具提示
    initial: [0.1, -0.1], // 初始旋转角度
    clickToFront: 500, // 点击图标时将其移到前面
    tooltipDelay: 0, // 工具提示的延迟时间
    outlineColour: "#0000", // 图标轮廓颜色（透明）
    maxSpeed: 0.04, // 最大旋转速度
    minSpeed: 0.02, // 最小旋转速度
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";//background color
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";//fallback color
  const minContrastRatio = theme === "dark" ? 2 : 1.2;//minimum contrast ratios

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,//禁用链接
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

const IconCloud = ({ iconSlugs }: DynamicCloudProps) => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);//确保只在客户端渲染
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);//加载图标数据
    }
  }, [iconSlugs, isClient]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light"),
    );
  }, [data, theme]);

  if (!isClient) {
    return null; // Do not render anything server-side
  }

  return (
    <Cloud {...cloudProps}>{renderedIcons}</Cloud>
  );
};

export default IconCloud;