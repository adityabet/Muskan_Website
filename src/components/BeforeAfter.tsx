import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  heightClass?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  beforeImage,
  afterImage,
  heightClass = "aspect-[16/10] w-full",
  beforeLabel = "Original Site",
  afterLabel = "Gunjan Singh Atelier"
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden border border-[#E5DEC9] ${heightClass}`}
    >
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover grayscale"
        draggable="false"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/90">
        {beforeLabel}
      </div>

      {/* After Image (Foreground, clipped based on sliderPosition) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
          referrerPolicy="no-referrer"
          style={{ width: containerRef.current?.getBoundingClientRect().width }}
        />
        <div className="absolute top-4 right-4 bg-[#B5945B] backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
          {afterLabel}
        </div>
      </div>

      {/* Center sliding slider line */}
      <div
        className="absolute inset-y-0 w-[1px] bg-[#B5945B] z-20 cursor-ew-resize flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
        onPointerDown={handlePointerDown}
        data-cursor="drag"
      >
        <div className="absolute w-10 h-10 rounded-full bg-white border border-[#B5945B] shadow-xl flex items-center justify-center text-[#B5945B]">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
