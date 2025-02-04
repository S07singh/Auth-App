# Auth App 🔐

**Auth App** is a full-stack authentication system that provides secure user authentication with features like email OTP verification, password reset, and protected routes. It is built using **Node.js, Express.js, MongoDB**, and **React.js**.

## 🚀 Features

- 🔐 User Authentication (Signup, Login, Logout)
- 📧 Email OTP Verification for Account Activation
- 🔄 Password Reset with OTP
- ✔️ Check Authentication Status
- 🗄️ User Data Collection API
- 🌐 Secure API with JWT Authentication

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, bcrypt
- **Email Service:** Nodemailer (for OTP emails)
- **Database:** MongoDB

## 📂 Project Structure

```bash
/my-auth-app
│── /frontend  # React.js UI  
│── /backend   # Node.js API   
│── README.md  
```

## 🔧 Installation & Setup

Clone the repository and install dependencies for both frontend and backend:

```shell
git clone https://github.com/your-username/my-auth-app.git  
cd my-auth-app  

# Install frontend dependencies  
cd frontend  
npm install  

# Install backend dependencies  
cd ../backend  
npm install  
```

### 🔑 Environment Variables

Create a `.env` file in the backend directory and configure necessary environment variables, such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## 🔄 API Endpoints

### **Auth Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| \`POST\` | \`/register\` | User Registration |
| \`POST\` | \`/login\` | User Login |
| \`POST\` | \`/logout\` | User Logout |
| \`POST\` | \`/send-verify-otp\` | Send OTP for Email Verification |
| \`POST\` | \`/verify-account\` | Verify Email OTP |
| \`GET\`  | \`/is-auth\` | Check Authentication Status |
| \`POST\` | \`/send-reset-otp\` | Send OTP for Password Reset |
| \`POST\` | \`/reset-password\` | Reset Password |
| \`GET\`  | \`/user\` | Get User Data |

## 📜 About This Course:

- 🔧 Backend Setup
- 🗄️ Database Setup
- 🔐 Signup Endpoint
- 📧 Sending Verify Account Email
- 🔍 Verify Email Endpoint
- 🚪 Logout Endpoint
- 🔑 Login Endpoint
- 🔄 Forgot Password Endpoint
- 🔁 Reset Password Endpoint
- ✔️ Check Auth Endpoint
- 🌐 Frontend Setup
- 📋 Signup Page UI
- 🔓 Login Page UI
- ✅ Email Verification Page UI
- 📤 Implementing Signup
- 📧 Implementing Email Verification
- 🔒 Protecting Our Routes
- 🔑 Implementing Login
- 🏠 Dashboard Page
- 🔄 Implementing Forgot Password
- 🚀 Super Detailed Deployment

![Demo App]
