const nodemailer = require('nodemailer');

// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // true untuk 465, false untuk port lain
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error);
  } else {
    console.log('✅ Email service ready to send emails');
  }
});

/**
 * Send OTP verification email
 */
const sendOTPEmail = async (email, otp, username) => {
  try {
    const mailOptions = {
      from: `"Leafyy Mobile" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Kode Verifikasi Email - Leafyy Mobile',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 20px;
            }
            .email-wrapper {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            .logo {
              font-size: 64px;
              margin-bottom: 10px;
              animation: float 3s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin: 0;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }
            .content {
              padding: 50px 40px;
              background: #ffffff;
            }
            .greeting {
              font-size: 20px;
              color: #1f2937;
              margin-bottom: 20px;
              font-weight: 600;
            }
            .message {
              font-size: 16px;
              color: #6b7280;
              line-height: 1.8;
              margin-bottom: 30px;
            }
            .otp-container {
              background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
              border: 3px dashed #10b981;
              border-radius: 16px;
              padding: 30px;
              margin: 40px 0;
              text-align: center;
            }
            .otp-label {
              font-size: 14px;
              color: #059669;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 15px;
            }
            .otp-code {
              font-size: 48px;
              font-weight: 900;
              color: #10b981;
              letter-spacing: 12px;
              font-family: 'Courier New', monospace;
              text-shadow: 2px 2px 4px rgba(16, 185, 129, 0.2);
              user-select: all;
            }
            .timer {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              margin-top: 20px;
              padding: 15px;
              background: #fef3c7;
              border-radius: 10px;
              font-size: 14px;
              color: #92400e;
            }
            .timer-icon {
              font-size: 20px;
            }
            .info-box {
              background: #eff6ff;
              border-left: 4px solid #3b82f6;
              padding: 20px;
              border-radius: 8px;
              margin: 30px 0;
            }
            .info-box p {
              font-size: 14px;
              color: #1e40af;
              line-height: 1.6;
              margin: 8px 0;
            }
            .info-box strong {
              color: #1e3a8a;
            }
            .warning-box {
              background: #fef2f2;
              border: 2px solid #ef4444;
              border-radius: 12px;
              padding: 20px;
              margin-top: 30px;
              display: flex;
              gap: 15px;
            }
            .warning-icon {
              font-size: 24px;
              flex-shrink: 0;
            }
            .warning-content {
              font-size: 14px;
              color: #991b1b;
              line-height: 1.6;
            }
            .footer {
              background: #f9fafb;
              padding: 30px 40px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer-text {
              font-size: 13px;
              color: #9ca3af;
              line-height: 1.8;
              margin-bottom: 15px;
            }
            .footer-brand {
              font-size: 14px;
              color: #10b981;
              font-weight: 700;
              margin-top: 15px;
            }
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <!-- Header -->
            <div class="header">
              <div class="logo">🌿</div>
              <h1>Leafyy Mobile</h1>
            </div>
            
            <!-- Content -->
            <div class="content">
              <div class="greeting">Halo, ${username}! 👋</div>
              
              <div class="message">
                Terima kasih telah bergabung dengan <strong>Leafyy</strong> - platform IoT monitoring tanaman pintar! 
                Untuk melanjutkan, silakan verifikasi email Anda dengan memasukkan kode OTP di bawah ini:
              </div>
              
              <!-- OTP Box -->
              <div class="otp-container">
                <div class="otp-label">🔐 Kode Verifikasi Anda</div>
                <div class="otp-code">${otp}</div>
                <div class="timer">
                  <span class="timer-icon">⏱️</span>
                  <strong>Kode ini akan kadaluarsa dalam 10 menit</strong>
                </div>
              </div>
              
              <!-- Info Box -->
              <div class="info-box">
                <p><strong>📱 Cara menggunakan kode OTP:</strong></p>
                <p>1. Buka aplikasi Leafyy di smartphone Anda</p>
                <p>2. Masukkan 6 digit kode di atas pada layar verifikasi</p>
                <p>3. Klik tombol "Verifikasi" untuk menyelesaikan registrasi</p>
              </div>
              
              <div class="divider"></div>
              
              <!-- Warning Box -->
              <div class="warning-box">
                <div class="warning-icon">🛡️</div>
                <div class="warning-content">
                  <strong>Keamanan Akun Anda:</strong><br>
                  Jangan pernah membagikan kode OTP ini kepada siapapun, termasuk tim Leafyy. 
                  Kami tidak akan pernah meminta kode verifikasi Anda melalui email, telepon, atau media sosial.
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-text">
                Jika Anda tidak melakukan registrasi di Leafyy Mobile, abaikan email ini.<br>
                Email ini dikirim secara otomatis, mohon tidak membalas email ini.
              </div>
              <div class="divider"></div>
              <div class="footer-brand">🌿 Leafyy - Smart Plant Monitoring</div>
              <div class="footer-text" style="margin-top: 10px;">
                &copy; 2025 Leafyy Mobile. All rights reserved.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Halo ${username},
        
        Terima kasih telah mendaftar di Leafyy Mobile!
        
        Kode OTP Anda: ${otp}
        
        Kode ini akan kadaluarsa dalam 10 menit.
        
        Jika Anda tidak melakukan registrasi, abaikan email ini.
        
        Terima kasih,
        Tim Leafyy
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email after successful verification
 */
const sendWelcomeEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: `"Leafyy Mobile" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Selamat Datang di Leafyy Mobile! 🌿',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              border-radius: 10px;
              padding: 40px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 48px;
            }
            h1 {
              color: white;
              margin: 10px 0;
            }
            .content {
              background-color: white;
              color: #333;
              border-radius: 8px;
              padding: 30px;
              margin: 20px 0;
            }
            .feature {
              margin: 15px 0;
              padding-left: 30px;
              position: relative;
            }
            .feature:before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #10b981;
              font-weight: bold;
              font-size: 20px;
            }
            .button {
              display: inline-block;
              background-color: #10b981;
              color: white;
              padding: 15px 30px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌿</div>
              <h1>Selamat Datang di Leafyy!</h1>
            </div>
            
            <div class="content">
              <h2 style="color: #10b981;">Halo ${username}! 👋</h2>
              <p>Email Anda telah berhasil diverifikasi! Sekarang Anda dapat menikmati semua fitur Leafyy Mobile:</p>
              
              <div class="feature">Monitor kesehatan tanaman secara real-time</div>
              <div class="feature">Notifikasi otomatis untuk perawatan tanaman</div>
              <div class="feature">Analisis data sensor IoT</div>
              <div class="feature">Automasi perawatan tanaman</div>
              
              <p style="margin-top: 30px;">Mulai jelajahi aplikasi dan rawat tanaman Anda dengan lebih mudah!</p>
              
              <div style="text-align: center;">
                <a href="#" class="button">Mulai Sekarang</a>
              </div>
            </div>
            
            <div class="footer">
              <p>Butuh bantuan? Hubungi kami di support@leafyy.app</p>
              <p>&copy; 2025 Leafyy Mobile. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Selamat Datang di Leafyy Mobile!
        
        Halo ${username}!
        
        Email Anda telah berhasil diverifikasi!
        
        Fitur yang dapat Anda nikmati:
        - Monitor kesehatan tanaman secara real-time
        - Notifikasi otomatis untuk perawatan tanaman
        - Analisis data sensor IoT
        - Automasi perawatan tanaman
        
        Mulai jelajahi aplikasi sekarang!
        
        Terima kasih,
        Tim Leafyy
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
};

