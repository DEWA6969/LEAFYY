-- Add OTP columns to login table
USE leafyy;

-- Add otp_code column (6 digit OTP)
ALTER TABLE login 
ADD COLUMN otp_code VARCHAR(6) NULL AFTER password;

-- Add otp_expires column (timestamp when OTP expires)
ALTER TABLE login 
ADD COLUMN otp_expires DATETIME NULL AFTER otp_code;

-- Set is_verified default to FALSE
ALTER TABLE login 
MODIFY COLUMN is_verified BOOLEAN DEFAULT FALSE;

-- Show updated structure
DESCRIBE login;

SELECT 'OTP columns added successfully!' AS status;

