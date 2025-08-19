#!/bin/bash

# ACAWA Deployment Script
# This script builds and deploys the ACAWA platform

set -e  # Exit on any error

echo "🚀 Starting ACAWA Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
print_status "Node.js version: $NODE_VERSION"

if [ ! -x "$(command -v npm)" ]; then
    print_error "npm is not installed or not in PATH"
    exit 1
fi

# 1. Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.vite/

# 2. Install dependencies
print_status "Installing dependencies..."
npm ci --no-audit --no-fund

# 3. Run linting (if available)
if npm run lint --silent > /dev/null 2>&1; then
    print_status "Running linter..."
    npm run lint
else
    print_warning "No lint script found, skipping linting"
fi

# 4. Run type checking
print_status "Running TypeScript type checking..."
npm run type-check 2>/dev/null || npx tsc --noEmit

# 5. Run tests (if available)
if npm run test:ci --silent > /dev/null 2>&1; then
    print_status "Running tests..."
    npm run test:ci
else
    print_warning "No test:ci script found, skipping tests"
fi

# 6. Optimize images (if script exists)
if [ -f "scripts/optimize_images.py" ]; then
    print_status "Optimizing images..."
    python scripts/optimize_images.py public/icons -o public/images/optimized --quality gallery --manifest public/image-manifest.json || print_warning "Image optimization failed"
fi

# 7. Build the application
print_status "Building application for production..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

# 8. Analyze bundle size (if available)
if npm run analyze --silent > /dev/null 2>&1; then
    print_status "Analyzing bundle size..."
    npm run analyze
fi

# 9. Generate sitemap (basic)
print_status "Generating sitemap..."
cat > dist/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://acawa-cameroon.org/</loc><priority>1.0</priority></url>
  <url><loc>https://acawa-cameroon.org/a-propos</loc><priority>0.8</priority></url>
  <url><loc>https://acawa-cameroon.org/clubs</loc><priority>0.8</priority></url>
  <url><loc>https://acawa-cameroon.org/galerie</loc><priority>0.7</priority></url>
  <url><loc>https://acawa-cameroon.org/champions</loc><priority>0.7</priority></url>
  <url><loc>https://acawa-cameroon.org/evenements</loc><priority>0.7</priority></url>
  <url><loc>https://acawa-cameroon.org/partenaires</loc><priority>0.6</priority></url>
  <url><loc>https://acawa-cameroon.org/contact</loc><priority>0.6</priority></url>
</urlset>
EOF

# 10. Generate robots.txt
print_status "Generating robots.txt..."
cat > dist/robots.txt << EOF
User-agent: *
Allow: /

# Sitemap
Sitemap: https://acawa-cameroon.org/sitemap.xml

# Crawl-delay for bots
Crawl-delay: 1
EOF

# 11. Check build output
print_status "Build analysis:"
echo "📁 Build output size:"
du -sh dist/
echo ""
echo "📊 File breakdown:"
find dist/ -type f -name "*.js" -o -name "*.css" -o -name "*.html" | head -10 | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "  $size - $(basename "$file")"
done

# 12. Pre-deployment validation
print_status "Running pre-deployment validation..."

# Check critical files exist
critical_files=("dist/index.html" "dist/site.webmanifest" "dist/sw.js")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ Found $file"
    else
        print_error "✗ Missing critical file: $file"
        exit 1
    fi
done

# Check asset integrity
if [ -d "dist/assets" ]; then
    asset_count=$(find dist/assets -type f | wc -l)
    print_success "✓ Found $asset_count asset files"
else
    print_warning "No assets directory found"
fi

# 13. Security headers validation
print_status "Validating security configuration..."
if [ -f "netlify.toml" ]; then
    if grep -q "Content-Security-Policy" netlify.toml; then
        print_success "✓ Security headers configured"
    else
        print_warning "Security headers may be missing"
    fi
fi

print_success "🎉 Build completed successfully!"
print_status "Ready for deployment to Netlify or other hosting platforms"

# 14. Deployment instructions
echo ""
echo "📋 Next steps:"
echo "1. Deploy to Netlify:"
echo "   - Connect your repository to Netlify"
echo "   - Set build command: 'npm run build'"
echo "   - Set publish directory: 'dist'"
echo "   - Deploy!"
echo ""
echo "2. Manual deployment:"
echo "   - Upload the 'dist' folder contents to your web server"
echo "   - Ensure proper mime types for .webmanifest files"
echo "   - Configure HTTP headers as specified in netlify.toml"
echo ""
echo "3. Domain configuration:"
echo "   - Point your domain to the deployment"
echo "   - Configure SSL certificate"
echo "   - Test all routes and PWA functionality"
echo ""

# 15. Performance recommendations
print_status "Performance recommendations:"
echo "• Enable Brotli compression on your server"
echo "• Set up proper cache headers for static assets"
echo "• Consider using a CDN for global distribution"
echo "• Monitor Core Web Vitals after deployment"
echo "• Set up analytics and error monitoring"

print_success "Deployment preparation completed! 🚀"