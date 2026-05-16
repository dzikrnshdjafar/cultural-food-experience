export function middleware(request) {
  const isEnabled = process.env.DEMO_ENABLED === 'true';
  
  if (!isEnabled) {
    return new Response(
      `<!DOCTYPE html>
       <html>
       <head><title>Demo Disabled</title>
       <style>body{font-family:Arial;display:flex;justify-content:center;align-items:center;height:100vh;background:#f3f3f5}
       .container{text-align:center}</style>
       </head>
       <body><div class="container"><h1>🔒 Demo Sedang Ditutup</h1>
       <p>Hubungi admin untuk akses</p></div></body></html>`,
      { status: 403, headers: { 'content-type': 'text/html' } }
    );
  }
}

export const config = {
  matcher: '/:path*',
};