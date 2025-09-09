# 📧 EmailJS Setup Instructions

Your website is now configured to use EmailJS for form submissions! Follow these steps to enable email functionality:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps for your provider
5. **Copy your Service ID** (you'll need this later)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Content:
**Subject:** New Tech Advice Request from {{from_name}}

**Body:**
```
New tech advice request received!

From: {{from_name}} ({{from_email}})
Category: {{category}}
Budget: {{budget}}
Timeline: {{timeline}}

Message:
{{message}}

---
Sent via Tech Advice Hub contact form
```

4. **Copy your Template ID** (you'll need this)

## Step 4: Get Your Public Key
1. Go to "Account" > "General"
2. Find your "Public Key"
3. **Copy this key**

## Step 5: Update Your Website
Open `script.js` and replace these values around line 36-40:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_ACTUAL_PUBLIC_KEY_HERE',
    SERVICE_ID: 'YOUR_ACTUAL_SERVICE_ID_HERE', 
    TEMPLATE_ID: 'YOUR_ACTUAL_TEMPLATE_ID_HERE'
};
```

## Step 6: Test It!
1. Save your changes
2. Refresh your website
3. Submit the contact form
4. Check your email!

## 🎯 Email Template Variables Available:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{category}}` - Tech category selected
- `{{budget}}` - Budget range
- `{{timeline}}` - When they need help
- `{{message}}` - Their detailed message
- `{{to_name}}` - Your name (currently "Tech Advice Hub")

## 📊 Free Tier Limits:
- 200 emails per month
- 2 email services
- Unlimited templates

## 🔧 Troubleshooting:
If emails aren't sending:
1. Check browser console for errors
2. Verify all IDs are correct (no extra spaces)
3. Make sure your email service is properly connected
4. Check EmailJS dashboard for delivery status

## 🛡️ Security Note:
Your Public Key is safe to include in frontend code - it's designed for client-side use.

---
Once configured, your contact form will automatically email you when someone requests tech advice!
