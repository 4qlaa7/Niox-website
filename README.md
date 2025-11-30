# Niox.ai Website

A modern, production-ready website for Niox.ai featuring AI-powered solutions, project showcases, and comprehensive business pages.

## Features

- **Multi-page Website**: Home, About, Projects, Contact, Privacy Policy, and Terms of Service
- **Modern Design**: Beautiful AI-themed design with animations and 3D elements
- **Responsive**: Fully responsive design that works on all devices
- **Contact Form**: Integrated contact form with email functionality
- **3D Animations**: Three.js powered 3D robot animations
- **Particle Effects**: Animated background particles
- **Mobile Menu**: Hamburger menu for mobile navigation

## File Structure

```
website/
├── index.html          # Home page
├── about.html          # About us page
├── projects.html       # Projects showcase
├── contact.html        # Contact page with form
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── css/
│   └── styles.css      # All CSS styles
├── js/
│   └── script.js       # JavaScript functionality
├── assets/             # Assets folder (for future images, etc.)
└── README.md           # This file
```

## Setup Instructions

### 1. Contact Form Setup

The contact form uses Formspree for email functionality. To set it up:

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form endpoint URL
3. Open `contact.html`
4. Find the form element (line ~30) and replace `YOUR_FORM_ID` with your Formspree form endpoint:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

### 2. Customization

#### Update Contact Information

Edit `contact.html` to update:
- Email address
- Phone number
- Physical address
- Business hours

#### Update Company Information

Edit the following files to customize company details:
- `about.html` - Team members, company mission, values
- `index.html` - Stats, solutions, featured projects
- `projects.html` - Project listings

#### Update Social Media Links

All pages have footer sections with social media links. Update these in each HTML file:
- LinkedIn
- Twitter
- GitHub

### 3. Deployment

#### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository and enable Pages
- **AWS S3**: Upload files to an S3 bucket with static hosting

#### Option 2: Traditional Web Hosting

Upload all files via FTP to your web hosting provider's public_html or www directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive functionality
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **Three.js**: 3D graphics and animations (CDN)

## Customization Guide

### Colors

The main color scheme uses:
- Cyan: `#00d9ff`
- Purple: `#7c3aed`
- Pink: `#ec4899`

To change colors, update the CSS variables in `css/styles.css` or modify the Tailwind classes directly.

### Fonts

The site uses Inter font from Google Fonts. To change:
1. Update the `@import` in `css/styles.css`
2. Update the `font-family` in the body styles

### Animations

All animations are defined in `css/styles.css` using `@keyframes`. You can modify timing, effects, and behaviors there.

## Production Checklist

Before going live:

- [ ] Replace Formspree form ID in `contact.html`
- [ ] Update all contact information
- [ ] Update company information and team details
- [ ] Add real project data
- [ ] Update social media links
- [ ] Test contact form functionality
- [ ] Test on multiple devices and browsers
- [ ] Optimize images (if adding any)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure SEO meta tags
- [ ] Test all links and navigation

## Support

For questions or issues, please contact: contact@niox.ai

## License

© 2024 Niox.ai. All rights reserved.

