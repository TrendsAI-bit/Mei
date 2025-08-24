"use client";
import { useState } from "react";
import ComicCanvas from "@/components/ComicCanvas";
import { MEI_CHARACTER } from "@/lib/character";

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Traditional Japanese background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Cherry blossoms */}
        <div className="absolute top-16 left-16 w-6 h-6 bg-pink-200 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute top-32 right-24 w-4 h-4 bg-pink-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-24 w-5 h-5 bg-pink-200 rounded-full opacity-80 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 right-16 w-3 h-3 bg-pink-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        {/* Traditional Japanese patterns */}
        <div className="absolute top-1/3 left-0 w-2 h-40 bg-gradient-to-b from-transparent via-orange-300 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 right-0 w-2 h-40 bg-gradient-to-b from-transparent via-red-300 to-transparent opacity-30"></div>
        
        {/* Wave patterns */}
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-orange-400 rounded-full opacity-20 transform rotate-45"></div>
        <div className="absolute bottom-1/2 right-1/4 w-16 h-16 border-2 border-red-400 rounded-full opacity-25 transform -rotate-45"></div>
      </div>

      <main className="relative max-w-7xl mx-auto p-8 space-y-10 z-10">
        {/* Hero Section */}
        <header className="text-center space-y-8 pt-12">
          <div className="flex items-center justify-center space-x-8 mb-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 border-4 border-orange-600 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-orange-800 text-4xl font-bold">猫</span>
              </div>
              {/* Traditional Japanese headband */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-red-600 rounded-full border-2 border-orange-800"></div>
            </div>
            <div>
              <h1 className="text-7xl font-bold text-orange-800 mb-4 tracking-wider">
                メイ 漫画 AI
              </h1>
              <p className="text-3xl text-red-700 font-medium">
                Featuring {MEI_CHARACTER.name}
              </p>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 max-w-5xl mx-auto border-4 border-orange-600 shadow-2xl">
            <p className="text-2xl text-gray-800 leading-relaxed font-medium">
              Write a story idea and watch {MEI_CHARACTER.name} come to life in a beautiful Japanese manga! 
              Our AI will create panels, captions, dialogue, and generate artwork featuring your favorite elegant neko character.
            </p>
          </div>
        </header>

        {/* Input Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 max-w-6xl mx-auto border-4 border-orange-600 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <input 
              value={idea} 
              onChange={e => setIdea(e.target.value)} 
              placeholder="What adventure should メイ go on?" 
              className="col-span-2 p-8 rounded-2xl text-2xl border-4 border-orange-600 bg-white focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 shadow-lg text-gray-800"
            />
            <button 
              onClick={generate} 
              disabled={loading} 
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl text-2xl font-bold disabled:opacity-50 disabled:transform-none border-4 border-orange-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
            className="w-full p-8 rounded-2xl text-2xl border-4 border-orange-600 bg-white focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 shadow-lg text-gray-800"
          />
        </section>

        {/* Comic Display */}
        {comic && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 border-4 border-orange-600 shadow-2xl">
            <ComicCanvas comic={comic} images={images} onReroll={reroll} />
          </div>
        )}

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 text-center border-4 border-orange-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="text-8xl mb-6 font-bold text-orange-600">和</div>
            <h3 className="text-gray-800 font-bold text-2xl mb-4">Character-Driven</h3>
            <p className="text-gray-700 text-xl">Every story features {MEI_CHARACTER.name} as the main protagonist</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 text-center border-4 border-red-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="text-8xl mb-6 font-bold text-red-600">技</div>
            <h3 className="text-gray-800 font-bold text-2xl mb-4">AI-Powered</h3>
            <p className="text-gray-700 text-xl">Advanced AI generates stories and artwork with perfect consistency</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 text-center border-4 border-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="text-8xl mb-6 font-bold text-pink-600">美</div>
            <h3 className="text-gray-800 font-bold text-2xl mb-4">Manga Style</h3>
            <p className="text-gray-700 text-xl">Export your manga as high-quality PNG images</p>
          </div>
        </section>
      </main>
    </div>
  );
}
