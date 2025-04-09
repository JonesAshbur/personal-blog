'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// 使用localStorage持久化存储滚动位置，确保页面刷新后仍能工作
export function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 组合pathname和searchParams作为唯一键
  const key = `${pathname}?${searchParams?.toString() || ''}`;

  // 页面加载时恢复滚动位置
  useEffect(() => {
    try {
      // 从sessionStorage中读取保存的滚动位置
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      
      if (savedPosition !== null) {
        // 使用requestAnimationFrame确保在DOM完全渲染后滚动
        window.requestAnimationFrame(() => {
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'auto'
          });
          console.log(`恢复滚动位置到：${savedPosition}px`);
        });
      }
    } catch (e) {
      console.error('恢复滚动位置时出错:', e);
    }
  }, [pathname]);

  // 保存滚动位置
  useEffect(() => {
    try {
      // 保存当前滚动位置的函数
      const saveScrollPosition = () => {
        const scrollY = window.scrollY;
        sessionStorage.setItem(`scroll-${pathname}`, String(scrollY));
        console.log(`保存滚动位置：${scrollY}px 到路径：${pathname}`);
      };

      // 在导航离开前保存滚动位置
      window.addEventListener('beforeunload', saveScrollPosition);
      
      // 如果用户滚动，也更新保存的位置 (防抖)
      let scrollTimer: NodeJS.Timeout | null = null;
      const handleScroll = () => {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(saveScrollPosition, 200);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        // 在组件卸载时保存最终位置
        saveScrollPosition();
        window.removeEventListener('beforeunload', saveScrollPosition);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (e) {
      console.error('保存滚动位置时出错:', e);
    }
  }, [pathname]);

  return null;
}
