# Vercel Deployment Guide

This guide outlines the steps for building and deploying your project to Vercel for both preview and production environments.

## Prerequisites

- Vercel CLI installed (`npm i -g vercel`)
- Project initialized with Vercel (`vercel link`)

## Building and Deploying for Preview

1. Create a preview build:

   ```
   vercel build --preview
   ```

   This command will generate a build in `.vercel/output` for preview mode and deploy it to a preview URL.

2. (Optional) To deploy the preview build:
   ```
   vercel deploy --prebuilt
   ```
   This will deploy your preview build without promoting it to production.

## Building and Deploying for Production

1. Create a production-ready build:

   ```
   vercel build --prod
   ```

   This creates a build suitable for production in `.vercel/output`.

2. Deploy to production:
   ```
   vercel --prod --prebuilt
   ```
   This command deploys the prebuilt production output to your production environment.

## Additional Notes

- Always ensure your local environment matches your production environment as closely as possible to avoid build discrepancies.
- Use environment variables for any environment-specific configurations.
- If you encounter issues with prebuilt deployments, you can always fall back to letting Vercel handle the build process by omitting the `--prebuilt` flag:
  ```
  vercel --prod
  ```

## Troubleshooting

- If you encounter environment mismatch errors, ensure you're building for the correct environment before deploying.
- Clear your `.vercel/output` directory if you're switching between preview and production builds to avoid conflicts.
