# Waitlist setup

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/gayanes-projects-4b052111/v0-waitlist-setup)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/9GjnZC9spvZ)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/gayanes-projects-4b052111/v0-waitlist-setup](https://vercel.com/gayanes-projects-4b052111/v0-waitlist-setup)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/9GjnZC9spvZ](https://v0.dev/chat/projects/9GjnZC9spvZ)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository


## Required Environment Variables

1. SUPABASE_URL = URL of your Supabase project (database connection)
2. SUPABASE_ANON_KEY =	Public anonymous key for accessing Supabase
3. CLAUDE_API_KEY = API key to call Anthropic Claude for AI enrichment
4. SLACK_WEBHOOK_URL	= Webhook URL to send new waitlist submissions to Slack


## Short description of your Lead Score Logic:
The Lead Score is calculated based on three weighted factors:

1. ICP Match (B2B SaaS relevance) — 40% weight (Scores 1–5 depending on how closely the company matches a B2B SaaS ideal customer profile.) 
2. Company Size — 30% weight (Scores from 1 (very small, <5 employees) to 5 (ideal mid-size, 100–500 employees).)
3. Demo Friction — 30% weight (Scores from 1 (no clear demo option) to 5 (easy "Book Demo" button prominent on the site).)
   
Each factor is rated individually, then the weighted average is calculated to produce a final Lead Score between 1 and 5.
