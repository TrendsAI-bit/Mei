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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2 tracking-wider">{comic.title}</h2>
          <p className="text-lg text-gray-600">Mei Manga AI - Featuring {MEI_CHARACTER.name}</p>
        </div>
        <button
          onClick={exportPng}
          className="bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
        >
          Export PNG
        </button>
      </div>
      
      <div className="bg-gray-50 border-2 border-black p-6 relative">
        <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
        <p className="text-gray-800 text-lg leading-relaxed">{comic.logline}</p>
      </div>
      
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comic.panels.map((p: any, idx: number) => (
          <div key={p.id} className="bg-white border-2 border-black p-6 space-y-6 relative">
            <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
            
            <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-black">
              {images[idx] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[idx]} alt={p.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600 font-medium">Generating image...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-black text-lg">{p.caption}</h3>
              <div className="space-y-3">
                {p.dialogue?.map((d:any, i:number) => (
                  <div key={i} className="bg-gray-50 border border-black p-4">
                    <p className="text-sm">
                      <span className="font-bold text-black">{d.speaker}:</span>
                      <span className="text-gray-800 ml-2">{d.text}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => onReroll(idx)}
              className="bg-black text-white w-full py-3 px-4 font-bold text-sm border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
            >
              Re-roll image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
