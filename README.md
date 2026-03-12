# SarahaMongoDb API

First release of a modular Express + MongoDB API for anonymous messaging.  
The app is bootstrapped from [`src/main.js`](./src/main.js), wired in [`src/app.controller.js`](./src/app.controller.js), and deployed through [`vercel.json`](./vercel.json). It exposes versioned routes for auth, users, and messages, stores uploads under [`uploads/`](./uploads/), and uses Mongoose models in [`src/database/model/`](./src/database/model).

## Description

This project provides:
- Authentication with signup/login/access-token flows in [`src/modules/auth/auth.controller.js`](./src/modules/auth/auth.controller.js)
- Profile read/update/delete and shareable profile URLs in [`src/modules/users/users.controller.js`](./src/modules/users/users.controller.js)
- Anonymous message send/read/delete flows with optional image attachments in [`src/modules/messages/messages.controller.js`](./src/modules/messages/messages.controller.js)
- Common middleware and validation helpers in [`src/common/`](./src/common/)

## How to Use

- Install dependencies: `npm install`
- Start the server (watch mode): `npm start`
- Default local base URL: `http://localhost:3000`
- API base path: `http://localhost:3000/api/v1`

Authentication format used by [`src/common/middleware/auth.js`](./src/common/middleware/auth.js):
- Send a `token` header, not `Authorization`
- Header value format: `bearer <accessToken>`

Example header:

```http
token: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Endpoints

### Auth Endpoints

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| POST | `/api/v1/auth/signup` | No | Create a user account with optional image upload | `multipart/form-data`: `name`, `email`, `password`, `confirmPassword`, `shareProfileName`, optional `role`, optional file field `images` |
| POST | `/api/v1/auth/login` | No | Validate credentials and return refresh/access tokens | JSON: `email`, `password` |
| POST | `/api/v1/auth/access-token` | Yes | Generate a new access token from authenticated user context | No body |

### Users Endpoints

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| GET | `/api/v1/users/profile` | Yes | Return current authenticated user profile | No body |
| PATCH | `/api/v1/users/profile` | Yes | Update current profile fields | JSON: optional `name`, optional `shareProfileName`, optional `image` |
| DELETE | `/api/v1/users/profile` | Yes | Delete current authenticated user | No body |
| GET | `/api/v1/users/get-url` | Yes | Return shareable profile URL for current user | No body |
| POST | `/api/v1/users/get-profile-by-url` | No | Resolve a profile by full URL string | JSON: `url` |

### Messages Endpoints

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| POST | `/api/v1/messages` | No | Send anonymous message to user with optional images | `multipart/form-data`: `receiverId`, `content`, optional files field `images` |
| GET | `/api/v1/messages` | Yes | Get all messages where authenticated user is receiver | No body |
| GET | `/api/v1/messages/:messageId` | Yes | Get one message by ID (receiver-scoped) | No body |
| DELETE | `/api/v1/messages/:messageId` | Yes | Delete one message by ID (receiver-scoped) | No body |

## Request Examples

Create account:

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -F "name=Mohamed" \
  -F "email=mohamed@example.com" \
  -F "password=123456" \
  -F "confirmPassword=123456" \
  -F "shareProfileName=mohamed-profile" \
  -F "role=user"
```

Login:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mohamed@example.com","password":"123456"}'
```

Get my profile:

```bash
curl -X GET http://localhost:3000/api/v1/users/profile \
  -H "token: bearer <ACCESS_TOKEN>"
```

Send anonymous message:

```bash
curl -X POST http://localhost:3000/api/v1/messages \
  -F "receiverId=<USER_ID>" \
  -F "content=Hello from anonymous sender"
```

## Interesting Techniques Used

- Layered router/service split with Express Router instances for each module in [`src/modules/`](./src/modules/)
- Middleware composition per route (upload + validation + handler) in [`src/modules/auth/auth.controller.js`](./src/modules/auth/auth.controller.js)
- File upload pipeline using Multer disk storage in [`src/common/middleware/multer.js`](./src/common/middleware/multer.js)
- Static asset serving for uploaded files with [`express.static()`](https://expressjs.com/en/api.html#express.static) in [`src/app.controller.js`](./src/app.controller.js)
- JWT auth middleware that decodes token payload and hydrates `req.user` in [`src/common/middleware/auth.js`](./src/common/middleware/auth.js)
- Central request-body validation wrapper using Joi in [`src/common/utils/validation.js`](./src/common/utils/validation.js)
- Mongoose schema design with refs and timestamps in [`src/database/model/message.model.js`](./src/database/model/message.model.js) and [`src/database/model/user.model.js`](./src/database/model/user.model.js)
- Use of JavaScript [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring), [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), and [Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) in service logic

## Non-Obvious Tech/Libraries

- [Express 5](https://expressjs.com/) (v5 line, not older v4)
- [Mongoose](https://mongoosejs.com/) for ODM modeling and query APIs
- [Joi](https://joi.dev/) for schema-first payload validation
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for signed access/refresh tokens
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing
- [Multer](https://github.com/expressjs/multer) for multipart file handling
- Node core [`node:dns/promises`](https://nodejs.org/api/dns.html#dnspromisessetserversservers) usage to set resolver servers at bootstrap

## Fonts

No custom fonts are configured in this repository (backend API project, no UI font assets detected).

## Project Structure

```txt
.
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
|-- vercel.json
|-- src/
|   |-- common/
|   |   |-- email/
|   |   |-- middleware/
|   |   `-- utils/
|   |-- database/
|   |   |-- model/
|   |   `-- connection.js
|   |-- modules/
|   |   |-- auth/
|   |   |-- messages/
|   |   `-- users/
|   |-- app.controller.js
|   `-- main.js
`-- uploads/
```

Interesting directories:
- [`src/modules/`](./src/modules/) contains route-level feature modules (auth, users, messages).
- [`src/common/middleware/`](./src/common/middleware/) centralizes cross-cutting auth/upload middleware.
- [`src/database/model/`](./src/database/model/) holds Mongoose schemas and collection models.
- [`uploads/`](./uploads/) stores runtime-uploaded images and is exposed as a static path.

