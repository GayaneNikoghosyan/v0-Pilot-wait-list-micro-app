# Lumenarc - Waitlist Micro-App

This is a lightweight micro-app built for Lumenarc’s Stage-2 Take-home Project.  
It handles waitlist signups, AI enrichment of company data, and Slack notifications — using minimal hand-code and AI orchestration.

## Features

1. Landing page with Lumenarc branding (logo, color palette)
2. Waitlist form with validation (rejects public email domains)
3. Submission data saved to Supabase
4. Company enrichment and lead scoring via Claude AI
5. Instant Slack notification with signup details

## Overview

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/gayanes-projects-4b052111/v0-waitlist-setup)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/9GjnZC9spvZ)

This repository will stay in sync with deployed chats on [v0.dev](https://v0.dev).
Any changes you make to deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Access the live deployed version here:

**[https://v0-waitlist-setup-nine.vercel.app/](https://v0-waitlist-setup-nine.vercel.app/)**


## Installation & Local Run Instructions

1. Clone the repository:

```bash
git clone https://github.com/GayaneNikoghosyan/v0-Pilot-wait-list-micro-app/.git
```
```
cd v0-Pilot-wait-list-micro-app
```

2. Install dependencies:

```bash
npm install
```

3.Create a .env.local file in the root directory and add your environment variables (see below).

4. Start the development server:

```bash
npm run dev
```

The app will be running at http://localhost:3000.


## Required Environment Variables

1. SUPABASE_URL = URL of your Supabase project (database connection)
2. SUPABASE_ANON_KEY =	Public anonymous key for accessing Supabase
3. CLAUDE_API_KEY = API key to call Anthropic Claude for AI enrichment
4. SLACK_WEBHOOK_URL	= Webhook URL to send new waitlist submissions to Slack


## Short description of Lead Score Logic:
The Lead Score is calculated based on three weighted factors:

1. ICP Match (B2B SaaS relevance) — 40% weight (Scores 1–5 depending on how closely the company matches a B2B SaaS ideal customer profile.) 
2. Company Size — 30% weight (Scores from 1 (very small, <5 employees) to 5 (ideal mid-size, 100–500 employees).)
3. Demo Friction — 30% weight (Scores from 1 (no clear demo option) to 5 (easy "Book Demo" button prominent on the site).)
   
Each factor is rated individually, then the weighted average is calculated to produce a final Lead Score between 1 and 5.
