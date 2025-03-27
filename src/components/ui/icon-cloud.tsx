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
    // 使用与主题相关的背景色，但确保有足够的对比度
    const bgHex = theme === "light" ? "#ffffff" : "#000000";
    const fallbackHex = theme === "light" ? "#333333" : "#ffffff";
    
    return renderSimpleIcon({
      icon,
      bgHex,
      fallbackHex,
      minContrastRatio: 2,
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
    // 返回一个简单的SVG作为备用
    return (
      <svg
        key={icon.slug || "fallback"}
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" opacity="0.3" />
        <text x="12" y="14" fontSize="10" textAnchor="middle" fill="currentColor">
          {icon.slug?.slice(0, 2) || "?"}
        </text>
      </svg>
    );
  }
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme = "light" } = useTheme();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchSimpleIcons({ slugs: iconSlugs })
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load icons:', err);
        setError('Failed to load icons');
        setIsLoading(false);
      });
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data || !theme) return null;

    try {
      // 添加额外的检查，确保data.simpleIcons是可迭代的
      if (!data.simpleIcons || typeof data.simpleIcons !== 'object') {
        console.error('Invalid icons data:', data.simpleIcons);
        return null;
      }
      
      return Object.values(data.simpleIcons)
        .filter(icon => icon && typeof icon === 'object')
        .map((icon) => renderCustomIcon(icon, theme));
    } catch (err) {
      console.error('Error rendering icons:', err);
      return null;
    }
  }, [data, theme]);

  if (error) {
    return (
      <div className="flex flex-wrap gap-4 justify-center items-center py-8">
        {iconSlugs.slice(0, 12).map((slug, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (isLoading || !renderedIcons) {
    return (
      <div className="flex flex-wrap gap-4 justify-center items-center py-8">
        {iconSlugs.slice(0, 12).map((slug, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <Cloud {...cloudProps}>
      {renderedIcons}
    </Cloud>
  );
}
