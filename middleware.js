module.exports = async (req, res) => {
  const isEnabled = process.env.DEMO_ENABLED === 'true';
  
  if (!isEnabled) {
    res.setHeader('Content-Type', 'text/html');
    res.status(403).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Demo Disabled</title>
        <style>
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f3f3f5; }
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
      </html>
    `);
    return;
  }
};