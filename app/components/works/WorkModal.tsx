import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { CiCircleRemove } from 'react-icons/ci'
import { gsap } from 'gsap'
import { WorkModalProps } from '@/app/types'

const WorkModal: React.FC<WorkModalProps> = ({ title, image, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    gsap.fromTo(
      '.modal-content',
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' },
    )
  }, [])

  // 開いた直後に閉じるボタンへフォーカスし、Escape で閉じ、Tab をモーダル内に閉じ込める。
  useEffect(() => {
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-gray-500/50"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* 背景クリックで閉じるための透明ボタン。キーボード操作は Escape と閉じるボタンが担う。 */}
      <button
        type="button"
        aria-label="モーダルを閉じる"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 size-full cursor-default bg-transparent"
      />
      <div
        ref={contentRef}
        className="modal-content z-60 pointer-events-auto relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-6"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="モーダルを閉じる"
          className="absolute right-4 top-4 cursor-pointer leading-none text-gray-600"
        >
          <CiCircleRemove className="text-4xl" />
        </button>
        <h2 className="mb-4 text-2xl">{title}</h2>
        <Image
          src={image}
          alt={title}
          className="h-auto max-w-full rounded"
          width={815}
          height={465}
          sizes="(max-width: 768px) 90vw, 815px"
        />
      </div>
    </div>
  )
}

export default WorkModal
