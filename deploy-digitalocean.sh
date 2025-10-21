#!/bin/bash

# Educha DigitalOcean Deployment Script
# This script deploys the Educha landing page to a DigitalOcean droplet

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Educha DigitalOcean Deployment Script${NC}"
echo "========================================"
echo ""

# Check if running on DigitalOcean droplet
read -p "Is this running on your DigitalOcean droplet? (y/n): " is_droplet

if [ "$is_droplet" != "y" ]; then
  echo -e "${YELLOW}This script should be run on your DigitalOcean droplet.${NC}"
  echo "Please SSH into your droplet first:"
  echo "  ssh root@your-droplet-ip"
  exit 1
fi

# Update system
echo -e "${GREEN}Step 1: Updating system...${NC}"
apt update && apt upgrade -y

# Install Node.js
echo -e "${GREEN}Step 2: Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Nginx
echo -e "${GREEN}Step 3: Installing Nginx...${NC}"
apt install -y nginx

# Get domain name
read -p "Enter your domain name (e.g., educha.com): " domain_name

# Create app directory
echo -e "${GREEN}Step 4: Setting up application directory...${NC}"
mkdir -p /var/www/educha
cd /var/www/educha

# Clone repository or upload files
echo -e "${GREEN}Step 5: Getting application files...${NC}"
read -p "Do you want to clone from Git? (y/n): " use_git

if [ "$use_git" == "y" ]; then
  read -p "Enter Git repository URL: " git_url
  git clone $git_url .
else
  echo -e "${YELLOW}Please upload your files to /var/www/educha${NC}"
  echo "You can use SCP: scp -r /path/to/educha-app/* root@your-droplet-ip:/var/www/educha/"
  read -p "Press enter when files are uploaded..."
fi

# Install dependencies and build
echo -e "${GREEN}Step 6: Installing dependencies and building...${NC}"
npm install
npm run build

# Configure Nginx
echo -e "${GREEN}Step 7: Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/educha << EOF
server {
    listen 80;
    server_name $domain_name www.$domain_name;

    root /var/www/educha/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/educha /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx

echo -e "${GREEN}Step 8: Nginx configured and running!${NC}"

# Set up SSL
read -p "Do you want to set up SSL with Let's Encrypt? (recommended) (y/n): " setup_ssl

if [ "$setup_ssl" == "y" ]; then
  echo -e "${GREEN}Step 9: Setting up SSL...${NC}"
  apt install -y certbot python3-certbot-nginx
  certbot --nginx -d $domain_name -d www.$domain_name --non-interactive --agree-tos --email admin@$domain_name
fi

# Set up firewall
echo -e "${GREEN}Step 10: Configuring firewall...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Your site is now live at:"
if [ "$setup_ssl" == "y" ]; then
  echo -e "  ${GREEN}https://$domain_name${NC}"
else
  echo -e "  ${GREEN}http://$domain_name${NC}"
fi
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Point your domain DNS A record to this droplet's IP"
echo "  2. Wait for DNS propagation (5-30 minutes)"
echo "  3. Visit your domain to see your site!"
echo ""
echo -e "${YELLOW}To update your site in the future:${NC}"
echo "  cd /var/www/educha"
echo "  git pull (or upload new files)"
echo "  npm install"
echo "  npm run build"
echo ""
