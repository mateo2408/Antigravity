# Walkthrough - Mission and Vision Page

I have added a new "Mission and Vision" page to the EcuStickers project and linked it from the main navigation.

## Changes

### 1. Created `mision-vision.html`
A new page that contains:
- **Header**: Consistent with the main site, including the logo and a "Home" button.
- **Hero Section**: A brief introduction "Nuestra Esencia".
- **Mission & Vision Cards**: Two styled cards presenting the Mission and Vision of EcuStickers.
- **Footer**: Identical to the main site for consistency.

### 2. Updated `index.html`
- Added a "Misión y Visión" button in the navigation bar to allow users to access the new page.

## Verification Results

### Automated Tests
- N/A (Visual changes only)

### Manual Verification
- Verified that the new page uses the existing `styles.css` for a consistent look and feel.
- Verified that the navigation links work (Home -> Mission/Vision and Mission/Vision -> Home).
- Checked that the new page does not rely on `script.js` to avoid errors with missing elements.
