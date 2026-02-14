"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageModal({ src, alt, className }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail - clickable */}
      <div
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          className="object-cover rounded"
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-zinc-300 transition-colors"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
