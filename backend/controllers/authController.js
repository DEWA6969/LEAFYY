const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { generateToken } = require('../middleware/auth');
const crypto = require('crypto');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/emailService');

// Helper: Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Semua field harus diisi'
      });
    }

    // Check if user exists
    const [existingUsers] = await db.query(
      'SELECT * FROM login WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email atau username sudah terdaftar'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Insert user with OTP (not verified yet)
    const [result] = await db.query(
      'INSERT INTO login (username, email, password, otp_code, otp_expires, is_verified) VALUES (?, ?, ?, ?, ?, FALSE)',
      [username, email, hashedPassword, otp, otpExpires]
    );

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp, username);
    
    if (!emailResult.success) {
      console.error('❌ Failed to send OTP email:', emailResult.error);
      // Continue anyway, user can resend OTP
    }

    console.log(`✅ User registered: ${email}, OTP: ${otp}`);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil! Silakan cek email untuk kode OTP',
      data: {
        userId: result.insertId,
        email,
        username,
        requiresOTP: true
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat registrasi'
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Validation
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'User ID dan OTP harus diisi'
      });
    }

    // Get user
    const [users] = await db.query(
      'SELECT * FROM login WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    const user = users[0];

    // Check if already verified
    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terverifikasi'
      });
    }

    // Check OTP
    if (user.otp_code !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP tidak valid'
      });
    }

    // Check OTP expiry
    if (new Date() > new Date(user.otp_expires)) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP sudah kadaluarsa'
      });
    }

    // Verify user
    await db.query(
      'UPDATE login SET is_verified = TRUE, otp_code = NULL, otp_expires = NULL WHERE id = ?',
      [userId]
    );

    // Generate token
    const token = generateToken(userId);

    // Send welcome email
    await sendWelcomeEmail(user.email, user.username);

    console.log(`✅ User verified: ${user.email}`);

    res.json({
      success: true,
      message: 'Email berhasil diverifikasi!',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          is_verified: true
        },
        token
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat verifikasi OTP'
    });
  }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID harus diisi'
      });
    }

    // Get user
    const [users] = await db.query(
      'SELECT * FROM login WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    const user = users[0];

    // Check if already verified
    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terverifikasi'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update OTP
    await db.query(
      'UPDATE login SET otp_code = ?, otp_expires = ? WHERE id = ?',
      [otp, otpExpires, userId]
    );

    // Send OTP email
    const emailResult = await sendOTPEmail(user.email, otp, user.username);
    
    if (!emailResult.success) {
      console.error('❌ Failed to send OTP email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengirim email OTP'
      });
    }

    console.log(`✅ OTP resent to: ${user.email}, OTP: ${otp}`);

    res.json({
      success: true,
      message: 'Kode OTP baru telah dikirim ke email Anda'
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengirim ulang OTP'
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi'
      });
    }

    // Find user
    const [users] = await db.query(
      'SELECT * FROM login WHERE email = ? OR username = ?',
      [email, email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    const user = users[0];

    // Check if email is verified
    if (!user.is_verified) {
      return res.status(403).json({
        success: false,
        message: 'Email belum diverifikasi. Silakan cek email Anda untuk kode OTP',
        requiresVerification: true,
        userId: user.id
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Update last login
    await db.query(
      'UPDATE login SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate token
    const token = generateToken(user.id);

    console.log(`✅ User logged in: ${user.email}`);

    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          avatar: user.avatar
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat login'
    });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email harus diisi'
      });
    }

    // Find user
    const [users] = await db.query(
      'SELECT * FROM login WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      // Don't reveal if email exists
      return res.json({
        success: true,
        message: 'Jika email terdaftar, link reset password akan dikirim'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const user = users[0];

    // Save reset token
    await db.query(
      'UPDATE login SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
      [resetToken, resetTokenExpires, email]
    );

    // Log reset token (in production, send via email)
    console.log(`\n🔐 ========== RESET PASSWORD TOKEN ==========`);
    console.log(`Email: ${email}`);
    console.log(`Username: ${user.username}`);
    console.log(`Reset Token: ${resetToken}`);
    console.log(`Reset Link: ${process.env.APP_URL}/reset-password?token=${resetToken}`);
    console.log(`Expires: 1 hour`);
    console.log(`==========================================\n`);

    res.json({
      success: true,
      message: 'Link reset password telah dikirim (check console log)',
      // For development only - remove in production
      resetToken: resetToken
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses permintaan'
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token dan password baru harus diisi'
      });
    }

    // Find user by reset token
    const [users] = await db.query(
      'SELECT * FROM login WHERE reset_token = ? AND reset_token_expires > NOW()',
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Token tidak valid atau sudah kadaluarsa'
      });
    }

    const user = users[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await db.query(
      'UPDATE login SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );

    console.log(`✅ Password reset successful for: ${user.email}`);

    res.json({
      success: true,
      message: 'Password berhasil direset! Silakan login dengan password baru'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mereset password'
    });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      'SELECT id, username, email, name, avatar, created_at, last_login FROM login WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: {
        user: users[0]
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data profil'
    });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, avatar, currentPassword, newPassword } = req.body;

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Password lama harus diisi'
        });
      }

      const [users] = await db.query(
        'SELECT password FROM login WHERE id = ?',
        [userId]
      );

      const isPasswordValid = await bcrypt.compare(currentPassword, users[0].password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Password lama salah'
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query(
        'UPDATE login SET password = ? WHERE id = ?',
        [hashedPassword, userId]
      );
    }

    // Update profile info
    if (name || avatar) {
      const updates = [];
      const values = [];

      if (name) {
        updates.push('name = ?');
        values.push(name);
      }
      if (avatar) {
        updates.push('avatar = ?');
        values.push(avatar);
      }

      values.push(userId);

      await db.query(
        `UPDATE login SET ${updates.join(', ')} WHERE id = ?`,
        values
      );
    }

    // Get updated profile
    const [users] = await db.query(
      'SELECT id, username, email, name, avatar FROM login WHERE id = ?',
      [userId]
    );

    console.log(`✅ Profile updated for: ${users[0].email}`);

    res.json({
      success: true,
      message: 'Profil berhasil diperbarui',
      data: {
        user: users[0]
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui profil'
    });
  }
};
