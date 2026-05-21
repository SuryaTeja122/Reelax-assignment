# Reelax – Assignment Submission

A pixel-perfect React implementation of the Reelax checkout/billing UI.

## Tech Stack

- React 18
- Component-based architecture
- Inline styles (no external CSS libraries)
- Inter font (Google Fonts)

## Project Structure

```
src/
├── components/
│   └── ReelaxCheckout.jsx   # Main checkout page component
├── App.jsx                  # Root component
└── index.js                 # React entry point
```

## Getting Started

### Prerequisites
- Node.js v16 or higher
- npm

### Installation & Run

```bash
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Features

- **Billing Information Form** – Company Name, Email, GST, PAN, Address fields with State/City dropdowns
- **Order Summary** – Plan details, wallet balance toggle, coupon code system
- **Interactive Coupons** – WELCOME20 (20% off) and ANNUAL50 (50% off) with live total recalculation
- **Dynamic Totals** – Subtotal, GST (18%), discounts, and grand total update in real time
- **Sticky Navbar** – Search bar, Upgrade and Create Campaign buttons
