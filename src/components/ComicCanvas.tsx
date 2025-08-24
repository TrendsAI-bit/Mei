"use client";
import { useRef } from "react";
import { MEI_CHARACTER } from "@/lib/character";
import html2canvas from "html2canvas";

type Comic = { 
  title: string; 
  logline: string; 
  panels: { 
    id: string; 
    prompt: string; 
    caption: string; 
    dialogue: { speaker: string; text: string; }[] 
  }[] 
};

export default function ComicCanvas({ 
  comic, 
  images, 
  onReroll 
}: { 
  comic: Comic; 
  images: string[]; 
  onReroll: (idx: number) => void; 
}) {
  const ref = useRef<HTMLDivElement>(null);

  async function exportPng() {
    if (!ref.current) return;
    try {
      const canvas = await html2canvas(ref.current, {
        background: "#ffffff",
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement("a");
      link.download = `${comic.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_manga.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2 tracking-wider font-serif">{comic.title}</h2>
          <p className="text-base text-gray-600 font-medium">Mei Manga AI - Featuring {MEI_CHARACTER.name}</p>
        </div>
        <button
          onClick={exportPng}
          className="bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-all duration-300 font-medium"
        >
          Export PNG
        </button>
      </div>
      
      <div className="bg-gray-50 border-2 border-black p-6 relative">
        <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
        <p className="text-lg text-gray-800 leading-relaxed font-medium">{comic.logline}</p>
      </div>
      
      {/* 4-Panel Manga Layout */}
      <div ref={ref} className="bg-white border-2 border-black p-6 relative">
        <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
        
        <div className="grid grid-cols-2 gap-4 h-[600px]">
          {/* Panel 1 - Large top left */}
          <div className="bg-gray-50 border border-black p-4 relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-black"></div>
            
            <div className="h-3/4 bg-white flex items-center justify-center overflow-hidden border border-black mb-3">
              {images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[0]} alt={comic.panels[0]?.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600 font-medium">Generating...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-black text-sm font-serif">{comic.panels[0]?.caption}</h3>
              {comic.panels[0]?.dialogue?.map((d:any, i:number) => (
                <div key={i} className="bg-white border border-black p-2">
                  <p className="text-xs">
                    <span className="font-bold text-black">{d.speaker}:</span>
                    <span className="text-gray-800 ml-2 font-medium">{d.text}</span>
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onReroll(0)}
              className="bg-black text-white w-full py-2 px-3 font-bold text-xs border border-black hover:bg-white hover:text-black transition-all duration-300 font-medium mt-2"
            >
              Re-roll
            </button>
          </div>

          {/* Panel 2 - Small top right */}
          <div className="bg-gray-50 border border-black p-4 relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-black"></div>
            
            <div className="h-1/2 bg-white flex items-center justify-center overflow-hidden border border-black mb-3">
              {images[1] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[1]} alt={comic.panels[1]?.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-gray-600 font-medium">Generating...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="font-bold text-black text-xs font-serif">{comic.panels[1]?.caption}</h3>
              {comic.panels[1]?.dialogue?.map((d:any, i:number) => (
                <div key={i} className="bg-white border border-black p-1">
                  <p className="text-xs">
                    <span className="font-bold text-black">{d.speaker}:</span>
                    <span className="text-gray-800 ml-1 font-medium">{d.text}</span>
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onReroll(1)}
              className="bg-black text-white w-full py-1 px-2 font-bold text-xs border border-black hover:bg-white hover:text-black transition-all duration-300 font-medium mt-1"
            >
              Re-roll
            </button>
          </div>

          {/* Panel 3 - Small bottom left */}
          <div className="bg-gray-50 border border-black p-4 relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-black"></div>
            
            <div className="h-1/2 bg-white flex items-center justify-center overflow-hidden border border-black mb-3">
              {images[2] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[2]} alt={comic.panels[2]?.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-gray-600 font-medium">Generating...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="font-bold text-black text-xs font-serif">{comic.panels[2]?.caption}</h3>
              {comic.panels[2]?.dialogue?.map((d:any, i:number) => (
                <div key={i} className="bg-white border border-black p-1">
                  <p className="text-xs">
                    <span className="font-bold text-black">{d.speaker}:</span>
                    <span className="text-gray-800 ml-1 font-medium">{d.text}</span>
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onReroll(2)}
              className="bg-black text-white w-full py-1 px-2 font-bold text-xs border border-black hover:bg-white hover:text-black transition-all duration-300 font-medium mt-1"
            >
              Re-roll
            </button>
          </div>

          {/* Panel 4 - Large bottom right */}
          <div className="bg-gray-50 border border-black p-4 relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-black"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-black"></div>
            
            <div className="h-3/4 bg-white flex items-center justify-center overflow-hidden border border-black mb-3">
              {images[3] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[3]} alt={comic.panels[3]?.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600 font-medium">Generating...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-black text-sm font-serif">{comic.panels[3]?.caption}</h3>
              {comic.panels[3]?.dialogue?.map((d:any, i:number) => (
                <div key={i} className="bg-white border border-black p-2">
                  <p className="text-xs">
                    <span className="font-bold text-black">{d.speaker}:</span>
                    <span className="text-gray-800 ml-2 font-medium">{d.text}</span>
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onReroll(3)}
              className="bg-black text-white w-full py-2 px-3 font-bold text-xs border border-black hover:bg-white hover:text-black transition-all duration-300 font-medium mt-2"
            >
              Re-roll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
