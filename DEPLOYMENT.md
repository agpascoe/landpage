# 🚀 Alberto (JAG) Pascoe Landing Page - Deployment Guide

This guide provides step-by-step instructions to deploy the Alberto (JAG) Pascoe landing page from scratch.

## 📋 Prerequisites

- Ubuntu 22.04+ server with root access
- Domain name (e.g., `jagpascoe.info`)
- Basic knowledge of Linux commands and web servers

## 🛠️ Step 1: Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js and npm
```bash
# Install Node.js 18+ (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 1.3 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 1.4 Install Certbot for SSL
```bash
sudo apt install certbot python3-certbot-nginx -y
```

## 📁 Step 2: Application Setup

### 2.1 Clone Repository
```bash
# Navigate to web directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone https://github.com/yourusername/landpage.git
sudo chown -R ubuntu:ubuntu landpage
cd landpage
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Build for Production
```bash
npm run build
```

## 🌐 Step 3: Domain Configuration

### 3.1 Configure Nginx Site
Create nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/jagpascoe.info
```

Add the following configuration:

```nginx
server {
    server_name jagpascoe.info www.jagpascoe.info;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
```

### 3.2 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/jagpascoe.info /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 3.3 Configure DNS
Point your domain to your server's IP address:
- Add A record: `jagpascoe.info` → `YOUR_SERVER_IP`
- Add A record: `www.jagpascoe.info` → `YOUR_SERVER_IP`

## 🔒 Step 4: SSL Certificate Setup

### 4.1 Obtain SSL Certificate
```bash
sudo certbot --nginx -d jagpascoe.info -d www.jagpascoe.info
```

### 4.2 Verify Auto-renewal
```bash
sudo certbot renew --dry-run
```

## 🚀 Step 5: Production Deployment

### 5.1 Start Production Server
```bash
# Navigate to project directory
cd /var/www/landpage

# Start production server
npm start
```

### 5.2 Set Up Process Manager (PM2) - Recommended
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application with PM2
pm2 start npm --name "jagpascoe-site" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### 5.3 Verify Deployment
```bash
# Check if site is accessible
curl -I https://jagpascoe.info

# Check if API is working
curl -X POST https://jagpascoe.info/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 🔧 Step 6: Development Workflow

### 6.1 Development Mode
```bash
cd /var/www/landpage
npm run dev
```
Access at: http://localhost:3000

### 6.2 Production Mode
```bash
cd /var/www/landpage
npm run build
npm start
```
Access at: https://jagpascoe.info

### 6.3 Updating the Site
```bash
# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Build for production
npm run build

# Restart the server
pm2 restart jagpascoe-site
# OR if not using PM2:
# pkill -f "next start" && npm start
```

## 📁 Step 7: File Structure

```
/var/www/landpage/
├── app/
│   ├── components/
│   │   ├── sections/     # Page sections
│   │   ├── ui/          # UI components
│   │   └── layout/      # Header/Footer
│   ├── api/messages/    # Contact form API
│   └── globals.css      # Global styles
├── lib/
│   └── content.ts       # Content data
├── Messages/            # Contact form submissions
├── public/images/       # Static assets
├── package.json         # Dependencies
└── next.config.ts       # Next.js config
```

## 🔍 Step 8: Monitoring and Maintenance

### 8.1 Check Application Status
```bash
# Check PM2 status
pm2 status

# Check nginx status
sudo systemctl status nginx

# Check SSL certificate
sudo certbot certificates
```

### 8.2 View Logs
```bash
# Application logs
pm2 logs jagpascoe-site

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 8.3 Backup Contact Messages
```bash
# Backup contact form submissions
cp -r /var/www/landpage/Messages/ /backup/messages-$(date +%Y%m%d)
```

## 🛡️ Step 9: Security Considerations

### 9.1 Firewall Setup
```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 9.2 Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies
npm audit fix
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 3000 not accessible**
   ```bash
   # Check if Next.js is running
   ps aux | grep "next start"
   
   # Restart if needed
   pm2 restart jagpascoe-site
   ```

2. **SSL certificate issues**
   ```bash
   # Renew certificate
   sudo certbot renew
   
   # Check certificate status
   sudo certbot certificates
   ```

3. **Nginx configuration errors**
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Reload nginx
   sudo systemctl reload nginx
   ```

4. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

## 📞 Support

For issues or questions:
- Check logs: `pm2 logs jagpascoe-site`
- Verify nginx: `sudo nginx -t`
- Test SSL: `sudo certbot certificates`

---

**Last Updated**: July 2025  
**Version**: 1.0  
**Environment**: Ubuntu 22.04 + Node.js 18 + Nginx + Let's Encrypt 