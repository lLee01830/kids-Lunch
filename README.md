# Happy Lunchbox

A beginner-friendly React, Vite, and TypeScript demo for a school-lunch ordering website.

## What is included

- Responsive home page, menu, delivery information, about section, and contact placeholders.
- Search and category filters for the sample menu.
- Cart quantity controls, item removal, subtotal, and configurable delivery estimates.
- A checkout form with required-field validation and a clearly labelled demo-order preview.
- Central sample menu, business placeholders, and delivery settings in `src/menu.ts`.

This is a front-end demonstration only. It does not transmit orders, take payments, or confirm deliveries. Do not use it to collect real children's personal information. Sample menu prices are not confirmed supplier costs; check availability, ingredients, costs, and delivery routes before launch. All business contact details are placeholders.

## Requirements

Install a current Node.js LTS release, which includes npm. Install Git for Windows if you also want to use Git commands. Restart VS Code after installation so its terminal can find the tools.

## Run locally

In the VS Code terminal, opened in this project folder, run one command at a time:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Stop the development server with `Ctrl+C`.

To check the production build:

```powershell
npm run build
```

## Menu and delivery settings

Edit the sample products and prices in `src/menu.ts`. Delivery is R10 for one lunchbox or R15 for two or more lunchboxes in the same order to the same school. A food subtotal of R250 or more qualifies for free delivery to a participating school. An unconfirmed school or other location displays a quote-required message.

## Save changes and connect to GitHub

```powershell
git --version
```

This local folder is already set up as a Git repository on the `main` branch, and its `origin` remote points to `https://github.com/lLee01830/kids-Lunch.git`. The GitHub repository was checked and is empty. No files have been committed or pushed yet.

Before your first commit, set the author name and email for this project. Replace the examples with your own name and a GitHub-verified email address. These settings apply only to this project:

```powershell
git config user.name "Your Name"
git config user.email "you@example.com"
```

To save your website and publish it, open the VS Code terminal in this folder and run:

```powershell
git status
git add .
git status
git commit -m "Build Happy Lunchbox demo"
git push -u origin main
```

GitHub may ask you to sign in in a browser. To save later changes, run `git status`, `git add .`, `git commit -m "Describe your change"`, and `git push`. Check the staged-file list shown by `git status` before committing. Never put a password, access token, or API key into a source file or commit.

## Deploy on Render

The `render.yaml` file configures this project as a Render static site. Render builds the `main` branch with `npm ci && npm run build`, then publishes the generated `dist` folder. No server or environment variables are needed.

1. Commit and push the project to GitHub using the steps above. Render cannot deploy files that have not been pushed.
2. Sign in to the [Render Dashboard](https://dashboard.render.com/).
3. Choose **New > Blueprint**, connect your GitHub account if asked, and select the `lLee01830/kids-Lunch` repository.
4. Review the `happy-lunchbox` static site and click **Apply** to create and deploy it.
5. When the deployment finishes, open the `onrender.com` URL shown in the site dashboard.

Render will automatically redeploy when you push later changes to `main`. Keep real orders and payments disabled until a secure backend is connected.

## Before accepting real orders

Add a secure backend for order handling, privacy and retention practices, verified school routes, real contact details, and a payment provider integration. Keep all payment credentials on the server, never in frontend code. Review applicable South African privacy and business requirements before collecting learner information.
