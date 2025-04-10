'use client'

import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // 监听滚动事件，决定是否显示按钮
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null
    
    const toggleVisibility = () => {
      // 设置按钮是否可见（基于滚动位置）
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // 设置滚动状态
      setIsScrolling(true)
      
      // 清除之前的定时器
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
      
      // 设置新的定时器，在滚动停止200ms后将isScrolling设为false
      scrollTimer = setTimeout(() => {
        setIsScrolling(false)
      }, 200)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
    }
  }, [])

  // 点击滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-teal-400 p-2 text-white shadow-lg transition-all duration-200 hover:bg-teal-500 hover:shadow-xl ${isScrolling ? 'opacity-0' : 'opacity-20 hover:opacity-100'}`}
          aria-label="返回顶部"
        >
          <IoIosArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  )
} 