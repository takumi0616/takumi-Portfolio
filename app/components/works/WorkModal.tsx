import React, { useEffect } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { gsap } from 'gsap'
import { WorkModalProps } from '@/app/types'

const WorkModal: React.FC<WorkModalProps> = ({ title, image, onClose }) => {
  useEffect(() => {
    gsap.fromTo(
      '.modal-content',
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' },
    )
  }, [])

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-gray-500/50"
      onClick={handleOutsideClick}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOutsideClick(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }}
    >
      <div className="modal-content z-60 pointer-events-auto relative rounded-lg bg-white p-6">
        <CiCircleRemove
          className="absolute right-4 top-4 cursor-pointer text-4xl text-gray-600"
          onClick={onClose}
        />
        <h2 className="mb-4 text-2xl">{title}</h2>
        <img
          src={image}
          alt={title}
          className="h-auto max-w-full rounded"
          loading="lazy"
          width={815}
          height={465}
        />
      </div>
    </div>
  )
}

export default WorkModal
