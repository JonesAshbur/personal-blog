'use client'

import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件，决定是否显示按钮
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
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
          className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary p-2 text-white shadow-lg transition-all duration-300 hover:bg-primary/80 hover:shadow-xl"
          aria-label="返回顶部"
        >
          <IoIosArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  )
} 