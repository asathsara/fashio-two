export const baseTemplate = (title, content) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #fff; padding: 30px;
        text-align: center; border-radius: 10px 10px 0 0; }
      .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
      .button { display: inline-block; padding: 12px 30px; background: #1a1a1a; color: #fff !important;
        text-decoration: none; border-radius: 5px; margin: 20px 0; }
      .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>${title}</h1></div>
      <div class="content">${content}</div>
      <div class="footer"><p>&copy; 2025 Fashio. All rights reserved.</p></div>
    </div>
  </body>
</html>
`;
