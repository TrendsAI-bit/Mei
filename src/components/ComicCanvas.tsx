"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { clsx } from "clsx";
import { MEI_CHARACTER } from "@/lib/character";

export default function ComicCanvas({ comic, images, onReroll }: any) {
  const ref = useRef<HTMLDivElement>(null);

  async function exportPng() {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; 
    a.download = `${comic.title.replace(/\s+/g, "-")}-${MEI_CHARACTER.name}.png`; 
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">{comic.title}</h2>
          <p className="text-gray-700">Mei Manga AI - Featuring {MEI_CHARACTER.name}</p>
        </div>
        <button 
          onClick={exportPng} 
          className="manga-button px-6 py-3 rounded-lg font-semibold"
        >
          Export PNG
        </button>
      </div>
      
      <div className="bg-gray-100 border-2 border-black rounded-lg p-4">
        <p className="text-black text-lg leading-relaxed">{comic.logline}</p>
      </div>
      
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comic.panels.map((p: any, idx: number) => (
          <div key={p.id} className={clsx("manga-panel bg-white rounded-lg p-4 space-y-4")}>
            <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden rounded-lg border-2 border-black">
              {images[idx] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[idx]} alt={p.caption} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600 font-medium">Generating image…</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-black text-lg">{p.caption}</h3>
              <div className="space-y-2">
                {p.dialogue?.map((d:any, i:number) => (
                  <div key={i} className="bg-gray-100 border border-black rounded-lg p-3">
                    <p className="text-sm">
                      <span className="font-semibold text-black">{d.speaker}:</span> 
                      <span className="text-gray-800 ml-2">{d.text}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => onReroll(idx)} 
              className="manga-button w-full py-2 px-4 rounded-lg font-medium text-sm"
            >
              Re-roll image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
