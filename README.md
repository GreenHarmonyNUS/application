# NUS Hack For Good 2024

## Getting Started

Ensure that PostgreSQL version `>15` is installed locally 

Configure the environment variables by creating a `.env` file and setting the following variables
```py
DATABASE_URL=<"postgresql://<username>:<password>@<host>:5432/<database_name>"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=<random_string>
```

> Note: `NEXTAUTH_SECRET` is used to securely encrypt cookies and hash tokens and is __required__ in production.
> To generate a random string, run `openssl rand -base64 32`.

Create a database and run the following command:
```sh
npx prisma db push
```

```sh
npm install
npm run dev
```

## Development

### Code style

Prettier is used as the code formatter for this application. It is recommended to use the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from Visual Studio Code.

### Prisma schema

After making changes to `prisma/schema.prisma`, format the schema and update the database.

```sh
npx prisma format
npx prisma db push
```