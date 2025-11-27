// Vercel serverless function wrapper for TanStack Start
import server from '../dist/server/server.js'

// Vercel serverless function handler
export default async function handler(req: Request): Promise<Response> {
  // Vercel passes a Request object directly in newer runtimes
  // Ensure the URL is properly formatted
  const url = new URL(req.url)
  
  // Create a new request with the proper URL
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  })
  
  return server.fetch(request)
}

