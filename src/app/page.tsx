"use client";
import { useState } from "react";
import ComicCanvas from "@/components/ComicCanvas";
import { MEI_CHARACTER } from "@/lib/character";
import Image from "next/image";

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

export default function Page() {
  const [idea, setIdea] = useState("メイ discovers a mysterious Japanese garden at night");
  const [style, setStyle] = useState("Japanese manga style, clean line art, expressive eyes, flowing hair, elegant proportions, Studio Ghibli meets modern anime aesthetic, soft shading, detailed character design");
  const [comic, setComic] = useState<Comic | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", { 
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea, style }) 
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data: Comic = await res.json();
      if ((data as any).error) throw new Error((data as any).error);
      setComic(data);
      
      // Generate images per panel
      const outs: string[] = [];
      for (const p of data.panels) {
        const img = await fetch("/api/image", { 
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: `${style}. ${p.prompt}. Japanese manga panel style, consistent character design.` 
          }) 
        });
        
        if (!img.ok) {
          console.error("Image generation failed:", img.status);
          outs.push(""); // Add empty string for failed image
        } else {
          const imgData = await img.json();
          if (imgData.error) {
            console.error("Image generation error:", imgData.error);
            outs.push(""); // Add empty string for failed image
          } else {
            // Handle URL format
            if (imgData.url) {
              outs.push(imgData.url);
            } else {
              console.error("No image data returned");
              outs.push(""); // Add empty string for failed image
            }
          }
        }
        setImages([...outs]);
      }
    } catch (e) {
      console.error("Generation error:", e);
      alert(`Error: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  async function reroll(idx: number) {
    if (!comic) return;
    const p = comic.panels[idx];
    try {
      const img = await fetch("/api/image", { 
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `${style}. ${p.prompt}. Japanese manga panel style, consistent character design.` 
        }) 
      });
      
      if (!img.ok) {
        console.error("Image reroll failed:", img.status);
        return;
      }
      
      const imgData = await img.json();
      const next = images.slice(); 
      if (imgData.error) {
        console.error("Image generation error:", imgData.error);
        next[idx] = ""; // Clear failed image
      } else {
        // Handle URL format
        if (imgData.url) {
          next[idx] = imgData.url;
        } else {
          console.error("No image data returned for reroll");
          next[idx] = ""; // Clear failed image
        }
      }
      setImages(next);
    } catch (e) {
      console.error("Reroll error:", e);
    }
  }

  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Manga Book Cover Effect */}
      <div className="relative">
        {/* Book Spine Shadow */}
        <div className="fixed left-0 top-0 w-8 h-full bg-gradient-to-r from-black/20 to-transparent z-10"></div>
        
        {/* Main Content */}
        <div className="relative z-20">
          {/* Header - Manga Book Cover Style */}
          <header className="bg-black text-white py-8 relative overflow-hidden">
            {/* Ink Splash Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-black rounded-full transform rotate-12"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-black rounded-full transform -rotate-12"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-black rounded-full transform rotate-45"></div>
            </div>
            
            <div className="max-w-6xl mx-auto px-8 relative z-10">
              <div className="flex items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full border-4 border-black shadow-2xl flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/asset/Mei.png" 
                        alt="Mei Character" 
                        width={80} 
                        height={80}
                        className="object-cover" priority
                      />
                    </div>
                    {/* Manga Speed Lines */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-white transform rotate-45"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-white transform rotate-45"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-wider mb-2">メイ MANGA AI</h1>
                    <p className="text-lg opacity-80">Featuring {MEI_CHARACTER.name}</p>
                  </div>
                </div>
                
                {/* Manga Volume Number */}
                <div className="text-right">
                  <div className="text-6xl font-bold opacity-20">01</div>
                  <div className="text-sm uppercase tracking-widest">Volume</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="max-w-6xl mx-auto px-8 py-12">
            {/* Introduction Panel */}
            <div className="bg-gray-50 border-2 border-black p-8 mb-12 relative">
              <div className="absolute top-4 left-4 w-3 h-3 bg-black"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-black"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-black"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-black"></div>
              
              <p className="text-lg leading-relaxed text-gray-800 text-center max-w-4xl mx-auto">
                Write a story idea and watch {MEI_CHARACTER.name} come to life in a beautiful Japanese manga. 
                Our AI will create panels, captions, dialogue, and generate artwork featuring your favorite elegant neko character.
              </p>
            </div>

            {/* Input Section - Manga Panel Style */}
            <div className="bg-white border-2 border-black p-8 mb-12 relative">
              <div className="absolute top-4 left-4 w-3 h-3 bg-black"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-black"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-black"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-black"></div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <input 
                    value={idea} 
                    onChange={e => setIdea(e.target.value)} 
                    placeholder="What adventure should メイ go on?" 
                    className="col-span-2 p-4 border-2 border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                  />
                  <button 
                    onClick={generate} 
                    disabled={loading} 
                    className="bg-black text-white p-4 font-bold border-2 border-black hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <span>Generate Manga</span>
                    )}
                  </button>
                </div>
                
                <input 
                  value={style} 
                  onChange={e => setStyle(e.target.value)} 
                  placeholder="Visual style for メイ character (optional)" 
                  className="w-full p-4 border-2 border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                />
              </div>
            </div>

            {/* Comic Display */}
            {comic && (
              <div className="bg-white border-2 border-black p-8 relative">
                <div className="absolute top-4 left-4 w-3 h-3 bg-black"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-black"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-black"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-black"></div>
                <ComicCanvas comic={comic} images={images} onReroll={reroll} />
              </div>
            )}

            {/* Features Section - Manga Panels */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-50 border-2 border-black p-6 relative">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">和</div>
                  <h3 className="font-bold text-lg mb-2">Character-Driven</h3>
                  <p className="text-sm text-gray-700">Every story features {MEI_CHARACTER.name} as the main protagonist</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border-2 border-black p-6 relative">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">技</div>
                  <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-700">Advanced AI generates stories and artwork with perfect consistency</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border-2 border-black p-6 relative">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-black"></div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">美</div>
                  <h3 className="font-bold text-lg mb-2">Manga Style</h3>
                  <p className="text-sm text-gray-700">Export your manga as high-quality PNG images</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
