# Test task for Yoldi
by Aleksandr Shatskikh

##Stack

- [Next.js](https://nextjs.org/) with TypeScript
- [And Design](https://ant.design/) for fast prototyping. I did manual styling and components, but to make the app for 5 days, i had to use Modal and Form from Ant.Design to spare some time.

**Attention!** - there is a documented [issue](https://github.com/vercel/next.js/issues/42427) with Yarn so please use NPM

## Known problems
1. I didn't find the way to refresh the API Token after PATCHing the slug without relogin. So i added the little text about it above the slug snippet
2. OK, the auth method is not perfect. I know i should refactor the profile edit section one day.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Routes
- [http://localhost:3000/](http://localhost:3000)
- [http://localhost:3000/login](http://localhost:3000/login)
- [http://localhost:3000/register](http://localhost:3000/dashboard)
