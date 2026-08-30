import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ResidenceTypology } from '../types';
import { ONA_IMAGES, ImageKey } from '../data/images';

interface FloorPlanModalProps {
  typology: ResidenceTypology | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FloorPlanModal: React.FC<FloorPlanModalProps> = ({ typology, isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !typology) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      id="floor-plan-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-typology-title"
    >
      {/* Modal Header */}
      <div className="w-full bg-[#171716] border-b border-[#D7D0C5]/20 px-6 sm:px-10 py-5 flex items-center justify-between z-10">
        <div>
          <span className="font-sans text-[11px] font-semibold tracking-[0.24em] text-[#AE9A7C] uppercase block">
            Project Drawing
          </span>
          <h2 id="modal-typology-title" className="font-display text-xl sm:text-2xl text-[#F7F5F0] font-semibold">
            {typology.name} &middot; {typology.areaDisplay}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-[#080808] border border-[#D7D0C5]/30 px-3 py-1.5 rounded-sm">
            <button
              onClick={handleZoomOut}
              className="p-1 text-[#D7D0C5] hover:text-[#AE9A7C] transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-sans text-xs text-[#D7D0C5] px-1 font-mono">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-[#D7D0C5] hover:text-[#AE9A7C] transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 text-[#D7D0C5] hover:text-[#AE9A7C] transition-colors ml-1 border-l border-[#D7D0C5]/20 pl-2 cursor-pointer"
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            id="close-floor-plan-modal"
            onClick={onClose}
            className="p-2.5 bg-[#080808] hover:bg-[#AE9A7C] text-[#F7F5F0] hover:text-[#080808] transition-colors rounded-sm border border-[#D7D0C5]/30 focus:outline-none cursor-pointer"
            aria-label="Close Fullscreen Floor Plan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal Main Content */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-10 gap-8 items-center bg-[#080808]">
        {/* Floor Plan Visual Area */}
        <div className="lg:col-span-8 h-full flex items-center justify-center bg-[#F7F5F0] p-6 sm:p-10 border border-[#D7D0C5] relative overflow-hidden rounded-sm">
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full max-w-2xl origin-center"
          >
            <img src={ONA_IMAGES[typology.planKey as ImageKey].url} alt={ONA_IMAGES[typology.planKey as ImageKey].alt} className="w-full h-auto max-h-[70vh] object-contain" />
          </div>

          <div className="absolute bottom-4 right-4 bg-[#080808]/80 backdrop-blur-sm text-[#F7F5F0] text-[10px] font-sans tracking-widest px-3 py-1.5 uppercase">
            {typology.code} &middot; {typology.areaDisplay}
          </div>
        </div>

        {/* Breakdown Inspector */}
        <div className="lg:col-span-4 bg-[#171716] border border-[#D7D0C5]/20 p-6 sm:p-8 h-full overflow-y-auto space-y-6">
          <div>
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#AE9A7C] uppercase block mb-1">
              {typology.code}
            </span>
            <h3 className="font-display text-2xl text-[#F7F5F0] font-semibold mb-2">
              {typology.name}
            </h3>
            <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed">
              {typology.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="py-4 border-y border-[#D7D0C5]/20 space-y-3">
            <div>
              <span className="font-sans text-[10px] tracking-wider text-[#78716C] uppercase block">
                Bedrooms
              </span>
              <span className="font-display text-2xl text-[#F7F5F0] font-semibold">
                {typology.bedrooms} Bedrooms
              </span>
            </div>
            <div>
              <span className="font-sans text-[10px] tracking-wider text-[#78716C] uppercase block">
                Approximate Total Area
              </span>
              <span className="font-display text-2xl text-[#AE9A7C] font-semibold">
                {typology.areaDisplay}
              </span>
            </div>
          </div>

          {/* Features List */}
          <div className="pt-2">
            <p className="font-sans text-xs font-semibold tracking-widest text-[#D7D0C5] uppercase mb-3">
              Confirmed Features
            </p>
            <ul className="space-y-2 text-xs text-[#D7D0C5]/90">
              {typology.features.map((feat, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AE9A7C] mt-1 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#D7D0C5]/20">
            <p className="font-sans text-[11px] text-[#78716C] italic">
              Approximate areas and plan imagery.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="w-full bg-[#171716] border-t border-[#D7D0C5]/20 px-6 sm:px-10 py-4 flex items-center justify-between text-xs text-[#D7D0C5] z-10 font-sans">
        <span className="tracking-wider">
          ONA Towers &middot; Zanzibar &middot; {typology.name}
        </span>
        <span className="text-[#AE9A7C] font-semibold tracking-widest uppercase">
          Press ESC to Exit Fullscreen
        </span>
      </div>
    </div>
  );
};
