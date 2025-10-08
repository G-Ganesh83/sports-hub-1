# SportsHub India – India Web3 Sports Talent Hub

## Develop locally

Requirements: Node.js and npm (recommend using nvm).

Steps:

```sh
# 1) Install dependencies
npm install

# 2) Start the dev server
npm run dev

# App runs at http://localhost:8080
```

## Tech stack

- Vite
- TypeScript
- React
- shadcn/ui
- Tailwind CSS

## Project structure

- `src/components` – shared UI and app components
- `src/pages` – routed pages (Dashboard, Profile, Leaderboard, etc.)
- `src/config/wagmi.ts` – Web3 wallet configuration
- `public` – static assets (favicon, images)

## Build & preview

```sh
npm run build
npm run preview
```
<!-- AIGNITE Banner (centered) -->
<div align="center">
  <h1> AIGNITE 2K25</h1>
  <p><strong>Powered by MLSC</strong></p>
</div>

---

<p align="center">
  <strong>🚀 SportsHub</strong><br/>
  <em>Connecting India's Hidden Sports Talent with Opportunities</em>
</p>

---

## 📖 Project Description
✨ **Problem Statement:**
 Talented athletes from Tier 2, Tier 3 cities and rural India lack structured visibility and access to coaches, selectors, and opportunities. Traditional talent discovery is limited to urban networks, leaving countless gifted athletes undiscovered. Selectors struggle to find genuine talent beyond their immediate circles, while fans have no organized platform to support emerging athletes early in their careers.

💡 **Proposed Solution:**
 Sports Hub is an digital platform that democratizes sports talent discovery by connecting athletes, selectors/coaches, and fans in one ecosystem. Athletes can create verified profiles, and apply to trials/events. Selectors can post events, discover talent through AI-powered matching, and manage applications efficiently. Fans can follow athletes, engage with their content, and offer micro-sponsorships to support their journey.
  
🎯 **Target Users / Use Cases:** 
- **Athletes (13-35 years):** Create digital portfolios, get AI coaching feedback, apply for trials, gain visibility
- **Selectors/Coaches:** Post events, discover talent with AI matching, manage applications, shortlist candidates
- **Fans:** Discover emerging talent, follow athletes, engage with content, provide micro-sponsorships
  

---

## 🔬 Methodology
1. **Research & Ideation**  
   - Identified the talent discovery gap in Indian sports ecosystem
   - Analyzed athlete, selector, and fan pain points through surveys
   - Defined MVP features prioritized for hackathon timeline

2. **Design**  
   - Created comprehensive App Requirement Document (ARD)
   - Designed user flows for 3 distinct roles (Athlete, Selector, Fan)
   - Developed wireframes and UI mockups with blue-themed Indian sports aesthetic
   - Architected database schema optimized for Supabase PostgreSQL
   - Planned 8-phase iterative development approach

3. **Develop**  
   - **Phase 1-2:** Authentication system and public pages
   - **Phase 3:** Athlete profile management and media gallery
   - **Phase 4:** Event creation, browsing, and application system
   - **Phase 5:** AI Coach for video analysis and AI Talent Matcher for selectors
   - **Phase 6:** Fan dashboard with social features (follow, like, comment)
   - **Phase 7:** Selector dashboard, messaging, and admin panel
   - Used Lovable AI for rapid frontend development with React + TypeScript
   - Implemented backend with Supabase (BaaS) for authentication, database, and storage

4. **Test**  
   - Created test accounts for all user roles
   - End-to-end testing of user journeys (signup → profile → events → applications)
   - Cross-browser testing (Chrome, Firefox, Safari)
   - Responsive design testing (mobile, tablet, desktop)
   - Performance testing (loading times, file uploads)
   - Security testing (RLS policies, authentication flows)

5. **Deploy**  
   - Frontend deployed via Lovable/Vercel
   - Supabase cloud for backend and database
   - Supabase Storage for media files
   - Environment variables configured for production
   - Continuous monitoring and error tracking

6. **Future Scope**  
   - **Real AI Integration:** Replace mock AI with TensorFlow.js or OpenAI API for actual video analysis
   - **Payment Gateway:** Integrate Razorpay/Stripe for real micro-sponsorships
   - **Video Streaming:** Implement HLS/DASH for optimized video playback
   - **Mobile App:** Native iOS and Android apps using React Native
   - **Regional Language Support:** Hindi and major Indian languages
   - **Advanced Analytics:** Detailed performance dashboards for athletes and selectors
   - **Blockchain Verification:** NFT-based achievement certificates
   - **Live Streaming:** Real-time event broadcasts
   - **Scholarship Portal:** Connect athletes with education scholarships
   - **Equipment Marketplace:** Buy/sell/rent sports equipment

---

## 👥 Team Details
**Team Name:** `Your Team Name Here`

| Name | Role | Email |
|---|---:|---|
| Member 1 Name| Team Lead | member1@example.com |
| Member 2 Name| Team Member| member2@example.com |
| Member 3 Name| Team Member | member3@example.com |(Optional)
| Member 4 Name| Team Member | member4@example.com |(Optional)

---

## 🛠️ Technology Stack

### Frontend
`React 18` | `TypeScript` | `Vite` | `Tailwind CSS` | `Shadcn UI` | `Lucide React` | `React Router` | `React Hook Form` | `Zod` | `Recharts` | `Lovable AI`

### Backend & Database
`Supabase` | `PostgreSQL` | `Supabase Auth` | `Supabase Storage` | `Row Level Security (RLS)` | `Edge Functions`

### AI & ML (MVP - Simulated)
`Mock AI Templates` (Future: `OpenAI API` | `TensorFlow.js`)

### Deployment & Hosting
`Vercel` | `Supabase Cloud` | `GitHub`

### Development Tools
`Git` | `VS Code` | `Postman` | `Figma` | `ESLint` | `Prettier`

---

## 📹 Demonstration Video
▶️ [YouTube / Google Drive Link](#)

---

## 🌐 Deployment
🔗 [Live Demo Link](#)

---


## 🖼️ Assets 
<p align="center">
  <img src="assets/hero-sports-illustration.jpg" alt="Application Screenshot" width="220" /><br/>
</p>

---

<p align="center">
  <b>Hackathon:</b> AIGNITE 2K25 | Organized by MLSC<br/>
</p>