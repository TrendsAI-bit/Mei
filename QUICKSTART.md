# Quick Start Guide - メイ Manga AI

Get started with メイ Manga AI in just a few minutes!

## 🚀 Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/TrendsAI-bit/Mei.git
cd Mei
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 How to Use

### Generate Your First Manga

1. **Enter a Story Idea**
   - Example: "メイ discovers a mysterious Japanese garden at night"
   - Be creative! The AI will create a story around your idea

2. **Customize the Style** (Optional)
   - Default: Japanese manga style with clean lines
   - You can modify the visual style if desired

3. **Click "Generate Manga"**
   - The AI will create a story with 4-6 panels
   - Each panel will have dialogue and artwork

4. **Interact with Your Manga**
   - Re-roll individual panel images
   - Export the entire manga as PNG
   - Share your creation!

## 🎭 Character: メイ (Mei)

メイ (Mei) is your main character - a mysterious and elegant black neko (cat girl) with:
- Long flowing black hair
- Pointed cat ears
- Large expressive eyes
- Graceful and intelligent personality
- Enhanced cat-like abilities

## 💡 Story Ideas

Here are some example story ideas to get you started:

- "メイ explores an ancient Japanese temple"
- "メイ meets a magical fox spirit in the forest"
- "メイ discovers a hidden library of spells"
- "メイ helps a lost child find their way home"
- "メイ encounters a mysterious portal in the city"
- "メイ learns to control her supernatural powers"

## 🎨 Visual Styles

You can customize the visual style with prompts like:
- "Studio Ghibli style with soft colors"
- "Modern anime with bold lines"
- "Traditional manga with detailed backgrounds"
- "Chibi style with cute proportions"

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
```bash
npm run build
```
If this fails, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

**API Errors**
- Check your OpenAI API key is correct
- Ensure you have sufficient API credits
- Verify the key has access to GPT-4 and DALL-E 3

**Image Generation Fails**
- Check your internet connection
- Verify DALL-E 3 is available in your OpenAI account
- Try regenerating individual panels

## 📱 Deployment

Ready to deploy? Check out the [DEPLOYMENT.md](DEPLOYMENT.md) guide for detailed instructions on deploying to Vercel.

## 🎯 Tips for Best Results

1. **Be Specific**: Detailed story ideas create better narratives
2. **Use Japanese Elements**: Incorporate Japanese culture and settings
3. **Keep it Family-Friendly**: The AI is designed for wholesome content
4. **Experiment**: Try different styles and story ideas
5. **Save Your Favorites**: Export and save your best creations

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Open an issue on GitHub for bugs or feature requests

---

Happy manga creating! 🎨✨
