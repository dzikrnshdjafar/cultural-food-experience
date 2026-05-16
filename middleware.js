export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const isEnabled = process.env.DEMO_ENABLED === 'true';
  
  if (!isEnabled) {
    return new Response(
      `<!DOCTYPE html>
       <html>
       <head>
         <title>Demo Disabled</title>
         <style>
           body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f3f3f5; }
           .container { text-align: center; }
           h1 { color: #fb8533; }
         </style>
       </head>
       <body>
         <div class="container">
           <h1>🔒 Demo Sedang Ditutup</h1>
           <p>Hubungi admin untuk akses lebih lanjut.</p>
         </div>
       </body>
       </html>`,
      { status: 403, headers: { 'content-type': 'text/html' } }
    );
  }
}