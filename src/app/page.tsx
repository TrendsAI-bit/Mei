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
        body: JSON.stringify({ idea, style }) 
      });
      const data: Comic = await res.json();
      if ((data as any).error) throw new Error((data as any).error);
      setComic(data);
      
      // Generate images per panel
      const outs: string[] = [];
      for (const p of data.panels) {
        const img = await fetch("/api/image", { 
          method: "POST", 
          body: JSON.stringify({ 
            prompt: `${style}. ${p.prompt}. Japanese manga panel style, consistent character design.` 
          }) 
        });
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
        setImages([...outs]);
      }
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function reroll(idx: number) {
    if (!comic) return;
    const p = comic.panels[idx];
    const img = await fetch("/api/image", { 
      method: "POST", 
      body: JSON.stringify({ 
        prompt: `${style}. ${p.prompt}. Japanese manga panel style, consistent character design.` 
      }) 
    });
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
  }

  return (
    <div className="min-h-screen manga-bg">
      {/* Japanese manga-style background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 border-2 border-black rounded-full ink-splash"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-black rounded-full ink-splash" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 border-2 border-black rounded-full ink-splash" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-10 h-10 border-2 border-black rounded-full ink-splash" style={{animationDelay: '3s'}}></div>
        {/* Japanese-style decorative elements */}
        <div className="absolute top-60 left-1/4 w-2 h-16 border-l-2 border-black"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-16 border-r-2 border-black"></div>
      </div>

      <main className="relative max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <header className="text-center space-y-6 pt-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src="/asset/Mei.png" 
                alt={MEI_CHARACTER.name}
                className="w-20 h-20 rounded-full floating border-2 border-black"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-black mb-2">
                メイ Manga AI
              </h1>
              <p className="text-xl text-gray-700 font-medium">
                Starring {MEI_CHARACTER.name}
              </p>
            </div>
          </div>
          
          <div className="manga-card rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-lg text-black leading-relaxed">
              Write a story idea and watch {MEI_CHARACTER.name} come to life in a beautiful Japanese manga! 
              Our AI will create panels, captions, dialogue, and generate artwork featuring your favorite elegant neko character.
            </p>
          </div>
        </header>

        {/* Input Section */}
        <section className="manga-card rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input 
              value={idea} 
              onChange={e => setIdea(e.target.value)} 
              placeholder="What adventure should メイ go on?" 
              className="col-span-2 p-4 rounded-lg text-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
            <button 
              onClick={generate} 
              disabled={loading} 
              className="manga-button p-4 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:transform-none"
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
            className="w-full p-4 rounded-lg text-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
          />
        </section>

        {/* Comic Display */}
        {comic && (
          <div className="manga-card rounded-2xl p-6">
            <ComicCanvas comic={comic} images={images} onReroll={reroll} />
          </div>
        )}

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="manga-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-3 font-bold">メ</div>
            <h3 className="text-black font-semibold mb-2">Character-Driven</h3>
            <p className="text-gray-700 text-sm">Every story features {MEI_CHARACTER.name} as the main protagonist</p>
          </div>
          <div className="manga-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-3 font-bold">イ</div>
            <h3 className="text-black font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-700 text-sm">Advanced AI generates stories and artwork with perfect consistency</p>
          </div>
          <div className="manga-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-3 font-bold">漫</div>
            <h3 className="text-black font-semibold mb-2">Manga Style</h3>
            <p className="text-gray-700 text-sm">Export your manga as high-quality PNG images</p>
          </div>
        </section>
      </main>
    </div>
  );
}
