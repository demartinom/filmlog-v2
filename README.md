# FilmLog

![Log example](client/public/sample.jpg)
## About

### What is FilmLog
FilmLog is a web application for film photography enthusiasts to track their rolls, as well as discover new film stocks.

### Why this project
In the past, I  used Next.js to create full-stack applications, as it takes care of many aspects such as routing, making API calls, etc. While extremely convenient, this doesn't necessarily allow for learning how these steps are done. Therefore I decided to write the backend of FilmLog using Express.

I had previously completed an earlier version of [FilmLog](https://github.com/demartinom/film-log), but wasn't particularly happy with the outcome. It needed both visual updates as well as more features.

This is also the first time I have included Python in a portfolio project. I completed the [Harvard CS50 Python course](https://cs50.harvard.edu/python/2022/) at the beginng of 2024, and wanted to apply some of the skills that I learned.

## Technologies Used
- React
- Express
- Prisma ORM
- SupaBase for hosting my Postgresql database
- Vercel for hosting both the frontend and backend
- OAuth for creating accounts and logging in
- Python for webscraping a list of film stocks in currently being produced

## Features
- Users can create an account to continously save film rolls to their log. Users also have the ability to demo the app using a one time account.
- Users can create a log of rolls they have shot/are shooting. Information that can be added includes film stock, format, ISO, date started/finished.
- Explore a list of film stocks which includes information such as maker, ISO, format and more.
- Compare two film stocks to see how they are both different and alike.

## Run Filmlog Locally

### Clone using HTTPS

Run `git clone https://github.com/demartinom/filmlog-v2.git`. A sample env with the API key to connect to SupaBase is included.

You don't need to work about the server folder so next `cd client && npm install`

With the necessary packages installed, run `npm run dev` to start the application.

## How to use FilmLog

**NOTE**: When logging in using OAuth, the website requesting access will be listed as "https://naexczynafocityunkwu.supabase.co". SupaBase's free tier does not allow domain renaming.
 
1. Log in using Google, GitHub, or anonymously using the demo button
2. Add your first roll to your log. You can edit or delete rolls after creating them.
3. Navigate to the explore page to learn more about film stocks.

## Ideas for future features
- Price tracker for film stocks.
- Search and favorite functionality on the explore page.
- Statistics page for both user and all users of site.
- UI improvements (visual design is not my strong suit).
