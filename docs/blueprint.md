# **App Name**: PortNet Vision AI Dashboard

## Core Features:

- Dashboard Header: Display the application title, navigation buttons (Configuration, Mission), and user avatar.
- Active Shipments Overview: Show an overview of active shipments including the type of goods (e.g., Sucre Roux), vessel name (e.g., MS-PORT GAIA), and remaining time.
- Workflow Timeline: Present a horizontal timeline visualizing the shipment workflow stages (e.g., En route, Terminal, Discharge, Storage, etc.), highlighting the current stage.
- Shipment Prediction: Employ AI as a tool to estimate information related to the shipments timeline such as, estimated exit date/time, congestion levels, and carrier availability, and provide a call to action, such as marking the shipment as ready for pickup.
- Shipments List: Display a table listing the shipments with details like Type, ID, and Status. Include an 'Action' button for each entry for quick access to the details.
- Surcharges Monitoring: Visually monitor overages, indicate the days remaining, costs per day and an action to prioritize with SIRA Agent.
- Crisis Room Alert: Provide visual indication with a clear alert of issues such as weight discrepancy along with actions that the user can take to address this alert
- SIRA Search Bar: Implement a fixed search bar at the bottom of the dashboard for querying SIRA (Systeme d'informations Relatives aux Abandons) using voice input and a text 'Envoyer' submit button.

## Style Guidelines:

- Primary color: Neon Blue (#51E2FF) for highlights, buttons and main information to draw attention.
- Background color: Dark navy blue (#0B1120) for a sophisticated and modern dark theme.
- Accent color: Soft gray-white (#D1D5DB) to highlight specific areas of the UI, approximately 30 degrees 'left' of Blue on the color wheel. (#51E2FF) in HSL
- Body and headline font: 'Inter' for a clean and modern sans-serif aesthetic.
- Lucide-React icons: Utilize Lucide-React for consistent and crisp vector icons throughout the dashboard.
- Glassmorphism effect: Apply a glassmorphism effect to cards with a translucent background (bg-white/5), backdrop blur (backdrop-blur-xl), and a thin white border (border-white/10).
- Subtle animations on hover interactions.