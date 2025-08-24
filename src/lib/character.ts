import { z } from "zod";

export const MEI_CHARACTER = {
  name: "メイ (Mei)",
  description: "A mysterious and elegant black neko (cat girl) with long flowing hair, pointed ears, and a graceful demeanor. Mei is curious, intelligent, and has a gentle but adventurous spirit. She embodies the classic Japanese manga aesthetic with a touch of magical realism.",
  visualStyle: "Japanese manga style, clean line art, expressive eyes, flowing hair, elegant proportions, Studio Ghibli meets modern anime aesthetic, soft shading, detailed character design",
  personality: "Gentle, curious, and intelligent. Mei speaks with a calm, measured tone and often uses polite Japanese expressions. She's adventurous but thoughtful, always observing her surroundings with keen interest.",
  abilities: "Enhanced agility and senses like a cat, ability to see in the dark, graceful movement, and a mysterious connection to the supernatural world.",
  catchphrases: ["メイです (I'm Mei)", "面白いですね (How interesting)", "行きましょう (Let's go)", "何でしょうか (I wonder what it is)"],
  referenceImage: "/asset/Mei.png",
  imagePrompt: "exact replica of the reference image: elegant black neko (cat girl) character, long flowing black hair, pointed cat ears, large expressive eyes, graceful posture, Japanese manga style, clean line art, detailed character design, consistent proportions - this character must look exactly like the reference image in every panel",
  detailedDesign: {
    body: "Slender, graceful female figure with elegant proportions, wearing a flowing outfit",
    hair: "Long, flowing black hair that moves naturally, styled in a classic anime manner",
    ears: "Pointed cat ears on top of head, black to match hair color",
    eyes: "Large, expressive eyes with detailed iris and pupils, conveying emotion",
    face: "Delicate features with a gentle expression, small nose, soft lips",
    outfit: "Flowing, elegant clothing that complements the character's graceful nature",
    posture: "Graceful and poised, with natural cat-like movements",
    features: "Smooth skin, elegant hands, and a generally refined appearance",
    style: "Japanese manga art style with clean lines, soft shading, and detailed character design",
    proportions: "Classic anime proportions with slightly exaggerated features for expressiveness"
  }
};

export const CHARACTER_PROMPT = `
Main Character: ${MEI_CHARACTER.name}
Description: ${MEI_CHARACTER.description}
Visual Style: ${MEI_CHARACTER.visualStyle}
Personality: ${MEI_CHARACTER.personality}
Abilities: ${MEI_CHARACTER.abilities}

Character Design Specifications:
- Body: ${MEI_CHARACTER.detailedDesign.body}
- Hair: ${MEI_CHARACTER.detailedDesign.hair}
- Ears: ${MEI_CHARACTER.detailedDesign.ears}
- Eyes: ${MEI_CHARACTER.detailedDesign.eyes}
- Face: ${MEI_CHARACTER.detailedDesign.face}
- Outfit: ${MEI_CHARACTER.detailedDesign.outfit}
- Features: ${MEI_CHARACTER.detailedDesign.features}
- Style: ${MEI_CHARACTER.detailedDesign.style}
- Proportions: ${MEI_CHARACTER.detailedDesign.proportions}

Every story must feature ${MEI_CHARACTER.name} as the main protagonist. The character should be drawn consistently with long black hair, pointed cat ears, large expressive eyes, and an elegant, graceful appearance. The art style should be Japanese manga with clean lines, detailed character design, and a sophisticated aesthetic.
`;
