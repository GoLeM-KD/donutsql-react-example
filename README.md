# IMPORTANT

**React.js is a browser-based library, so credentials and other configuration values used directly in the client-side application may be exposed to users.**

Therefore, **do not use this architecture for applications that handle sensitive data or require secret credentials to remain confidential.**

If you are building a React.js application that requires secure database access, we recommend using a **server-side backend** such as **Express.js, Next.js, or another suitable server-side framework/runtime** to establish the DonutSQL connection.

In this architecture, your DonutSQL credentials remain securely on the server and are not exposed to the browser.


## Getting Started

Clone the repository, install the required packages, and run the project using the commands below.

```bash
git https://github.com/GoLeM-KD/donutsql-react-example
cd donutsql-react-example
npm install
npm run dev
# or
git https://github.com/GoLeM-KD/donutsql-react-example
cd donutsql-react-example
yarn
yarn dev
# or
git https://github.com/GoLeM-KD/donutsql-react-example
cd donutsql-react-example
pnpm install
pnpm dev
# or
git https://github.com/GoLeM-KD/donutsql-react-example
cd donutsql-react-example
bun install
bun dev
```