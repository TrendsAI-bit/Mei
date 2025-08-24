# Deployment Guide - メイ Manga AI

This guide will help you deploy the メイ Manga AI application to Vercel.

## Prerequisites

1. **GitHub Account**: Make sure your code is pushed to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `TrendsAI-bit/Mei`
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

1. In the Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environment**: Production, Preview, and Development

### 3. Deploy

1. Click "Deploy" in the Vercel dashboard
2. Vercel will automatically build and deploy your application
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

### 4. Custom Domain (Optional)

1. In your project settings, go to "Domains"
2. Add your custom domain if desired
3. Configure DNS settings as instructed by Vercel

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for AI generation | Yes |

## Build Configuration

The project is configured with:
- **Framework**: Next.js 14
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are properly installed
2. **API Errors**: Verify your OpenAI API key is correct and has sufficient credits
3. **Image Generation Fails**: Ensure DALL-E 3 is available in your OpenAI account

### Debugging

1. Check Vercel build logs for errors
2. Verify environment variables are set correctly
3. Test the API endpoints locally first

## Monitoring

- **Vercel Analytics**: Monitor performance and usage
- **Function Logs**: Check API route execution logs
- **Error Tracking**: Monitor for runtime errors

## Updates

To update your deployment:

1. Push changes to your GitHub repository
2. Vercel will automatically redeploy
3. Check the deployment status in your Vercel dashboard

## Security Notes

- Never commit your API keys to the repository
- Use environment variables for sensitive data
- Regularly rotate your OpenAI API key
- Monitor API usage to control costs

## Support

If you encounter issues:
1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check the project's README.md for setup instructions

---

Your メイ Manga AI application should now be live and ready to generate beautiful Japanese manga featuring メイ (Mei)!
