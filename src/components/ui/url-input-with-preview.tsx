"use client";

import { useState, useEffect, useMemo } from "react";

interface URLInputWithPreviewProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const URLInputWithPreview: React.FC<URLInputWithPreviewProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imagePreview = useMemo(() => {
    if (!value.trim()) return null;
    const urlWithTimestamp = value.includes("?")
      ? `${value}&t=${Date.now()}`
      : `${value}?t=${Date.now()}`;
    return urlWithTimestamp;
  }, [value]);

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [value]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div>
      <div className="space-y-2">
        <div className="relative group">
          <input
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
            required={required}
          />
          <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

      {imagePreview && (
        <div className="mt-3">
          <span className="block mb-2 text-sm font-medium text-white">{label} Preview:</span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                key={imagePreview}
                src={imagePreview}
                alt={`${label} preview`}
                style={{
                  display: imageError ? "none" : "block",
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "5px"
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {!imageLoaded && !imageError && (
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-700 rounded">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF9B28]"></div>
                </div>
              )}
              {imageError && (
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-700 rounded">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.684-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              )}
            </div>
            {imageError && (
              <span className="text-sm text-red-400">
                Failed to load image
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 