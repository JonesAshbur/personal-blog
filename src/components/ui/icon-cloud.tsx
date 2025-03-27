"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import dynamic from "next/dynamic";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  try {
    return renderSimpleIcon({
      icon,
      // 不使用背景色，让图标保持原始颜色
      bgHex: "#0000",
      // 为浅色图标提供深色备用，为深色图标提供浅色备用
      fallbackHex: theme === "light" ? "#1f1f1f" : "#e5e5e5",
      minContrastRatio: 1,
      size: 42,
      aProps: {
        href: undefined,
        target: undefined,
        rel: undefined,
        onClick: (e: any) => e.preventDefault(),
      },
    });
  } catch (error) {
    console.error("Error rendering icon:", error, icon);
    return null;
  }
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

const IconCloud = ({ iconSlugs }: DynamicCloudProps) => {
  const [data, setData] = useState<IconData | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const { theme = "light", systemTheme } = useTheme();
  
  // 使用实际的主题值
  const currentTheme = theme === "system" ? systemTheme || "light" : theme;

  useEffect(() => {
    let mounted = true;
    
    const loadIcons = async () => {
      try {
        const result = await fetchSimpleIcons({ slugs: iconSlugs });
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        console.error('Failed to load icons:', err);
        if (mounted) {
          setError('Failed to load icons');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadIcons();
    return () => { mounted = false; };
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data?.simpleIcons || !currentTheme) return null;

    try {
      const icons = Object.values(data.simpleIcons)
        .filter(Boolean)
        .map(icon => renderCustomIcon(icon, currentTheme))
        .filter(Boolean);
      
      return icons.length > 0 ? icons : null;
    } catch (err) {
      console.error('Error rendering icons:', err);
      return null;
    }
  }, [data, currentTheme]);

  if (!renderedIcons || error) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden">
      <Cloud {...cloudProps}>
        {renderedIcons}
      </Cloud>
    </div>
  );
};

// 确保组件只在客户端渲染
export default dynamic(() => Promise.resolve(IconCloud), { ssr: false });
