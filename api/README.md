# API

> This API assists in developing a sudoku manager application

## Functionalities

- Registration and login of a user
- Saving and retrieving data from finished and unfinished games
- Checking user's authenticity/permissions

---

## Prerequisites

> [!IMPORTANT]  
>
> - [Node.js](https://nodejs.org/en)
> - [PostgreSQL](https://www.postgresql.org)

---

## Cloning

```
https://github.com/zziiuull/Sudoku-Project.git
```

## Environment configuration

> [!IMPORTANT]  
>
> At [config](api/config/) in the .env file, set `PASSWORD` as your current postgreSQL password

```
HOST = localhost
PORT = 5432
USER = postgres
PASSWORD = password
DATABASE = sudoku
DIALECT = postgres
```

> [!IMPORTANT]  
>
> At [keys](api/config/keys/) generate your public and private key. You can do this at: [cryptotools](https://cryptotools.net/rsagen) (use a 2048 key length)
>
> You can also use the existing keys in the project

## Starting

Start server application 

```
cd api
npm install
cd server
nodemon server
```

---

Start front-end application

```
cd spa
npm install
npm run dev
```

> [!NOTE]  
> By default the server port is `8000`
>
> A token that expires in 15 minutes is generated with each user login

---

## Requests

> **Initial address:** `http://localhost:8000`

### Endpoints list

| Method | Endpoint                               | Descrição                                													|
|--------|----------------------------------------|---------------------------------------------------------------------------------------------|
| POST   | <kbd>/register</kbd>                   | [Register a user](#post---register) 														|
| POST   | <kbd>/login</kbd>                      | [User login](#post---login)                           										|
| POST   | <kbd>/unfinished</kbd>                 | [Save unfinished game](#post---save-unfinished-game)               							|
| POST   | <kbd>/finished</kbd>                   | [Save finished game](#post---save-finished-game)                    						|
| GET    | <kbd>/unfinished/:id/:difficulty</kbd> | [Retrieve unfinished game](#get---retrieve-unfinished-game)            						|
| GET    | <kbd>/finished/:id/:difficulty</kbd>   | [Retrieve finished game(s)](#get---retrieve-finished-games)               					|
| GET    | <kbd>/rank/:difficulty</kbd>           | [Retrieve finished games(s) rank](#get---retrieve-finished-gamess-rank) 					|
| GET    | <kbd>/play</kbd>                       | [Check authenticity/permissions](#get---check-authenticitypermissions)  					|
| DELETE | <kbd>/unfinished/:id/:difficulty</kbd> | [Delete unfinished game](#delete---delete-unfinished-game)                        			|

---

### POST - Register

| Method | Endpoint            | Content-Type       		 |
|--------|---------------------|-----------------------------|
| POST   | <kbd>/register</kbd> | <kbd>application/json</kbd> |

#### Request body

```js
{
    "username": "User",
    "email": "user@mail.com",
    "password": "1234"
}
```

#### Response

200 - OK

`{ "message": "User registered" }` 

400 - Bad request

`{ message: "Missing required user information" }`

401 - Unauthorized
 
`{ "message": "Invalid credentials" }`

404 - Not found

`{ message: "Page not found" }`

---

### POST - Login

| Method | Endpoint 		 | Content-Type                |
|--------|-------------------|-----------------------------|
| POST   | <kbd>/login</kbd> | <kbd>application/json</kbd> |

#### Request body

```js
{
    "username": "User",
    "email": "user@mail.com",
    "password": "1234"
}
```
#### Response

200 - OK

```js
{
	message: "Authenticated"
	token: "A39BK2",
	name: "User",
	email: "user@mail.com", 
	id: "12"
}
```

400 - Bad request

`{ message: "Missing required user information" }`

401 - Unauthorized

`{ message: "Invalid credentials" }`

404 - Not found

`{ message: "Page not found" }`

---

### POST - Save unfinished game

| Method | Endpoint 		 	  | Content-Type                 |
|--------|------------------------|------------------------------|
| POST   | <kbd>/unfinished</kbd> |  <kbd>application/json</kbd> |

#### Request body

```js
{
	id_p: "12",
	difficulty: "easy",
	board: {[
			[0, 8, 2, 0, 0, 3, 6, 9, 0],
			[7, 3, 1, 4, 0, 6, 2, 8, 0],
			[0, 0, 9, 0, 2, 8, 1, 3, 4],
			[0, 8, 2, 0, 0, 3, 6, 9, 0],
			[7, 3, 1, 4, 0, 6, 2, 8, 0],
			[0, 0, 9, 0, 2, 8, 1, 3, 4],
			[0, 8, 2, 0, 0, 3, 6, 9, 0],
			[7, 3, 1, 4, 0, 6, 2, 8, 0],
			[0, 0, 9, 0, 2, 8, 1, 3, 4]
	]},	
	minutes: 2,
	seconds: 43
}
```

#### Response

200 - OK

`{ message: "Unfinished game registered" }`

400 - Bad request

`{ message: "Missing required game information" }`

401 - Unauthorized

`{ message: "Invalid game credentials" }`

404 - Not found

`{ message: "Page not found" }`

---

### POST - Save finished game

| Method | Endpoint 		 	| Content-Type                |
|--------|----------------------|-----------------------------|
| POST   | <kbd>/finished</kbd> | <kbd>application/json</kbd> |

#### Request body

```js
{
	id_p: "12", 
	difficulty: "easy",
	minutes: 2, 
	seconds: 43
}
```

#### Response

200 - OK

`{ message: "Finished game registered" }`

400 - Bad request

`{ message: "Missing required game information" }`

401 - Unauthorized

Response example:

`{ message: "Invalid game credentials" }`

404 - Not found

`{ message: "Page not found" }`


### GET - Retrieve unfinished game

| Method | Endpoint 		 	  				  | Content-Type                |
|--------|----------------------------------------|-----------------------------|
| GET    | <kbd>/unfinished/:id/:difficulty</kbd> | <kbd>application/json</kbd> |

#### Request example

`/unfinished/5/easy`

`:id` - Player id

`:difficulty` - Game difficulty

#### Response

200 - OK

```js
{
	board: {[
			[0, 8, 2, 0, 0, 3, 6, 9, 0],
			[7, 3, 1, 4, 0, 6, 2, 8, 0],
			[0, 0, 9, 0, 2, 8, 1, 3, 4],
			[0, 8, 2, 0, 0, 3, 6, 9, 0],
			[7, 3, 1, 4, 0, 6, 2, 8, 0],
			[0, 0, 9, 0, 2, 8, 1, 3, 4],
			[0, 8, 2, 0, 0, 3, 6, 9, 0],
			[7, 3, 1, 4, 0, 6, 2, 8, 0],
			[0, 0, 9, 0, 2, 8, 1, 3, 4]
	]},	
	minutes: 2,
	seconds: 51
}
```

400 - Bad request

`{ message: "Missing required game information" }`

404 - Not found

`{ message: "Page not found" }`

---

### GET - Retrieve finished game(s)

| Method | Endpoint 		 	  				| Content-Type                |
|--------|--------------------------------------|-----------------------------|
| GET    | <kbd>/finished/:id/:difficulty</kbd> | <kbd>application/json</kbd> |

#### Request example

`/finished/1/medium`

`:id` - Player id

`:difficulty` - Game difficulty

#### Response

200 - OK

```js
{
	data: [{
		createdAt: "2024-05-31T13:48:02.598Z",
		difficulty: "easy",	
		id: 1,	
		id_p: 1,	
		minutes: 4,
		seconds: 3,
		updatedAt: "2024-05-31T13:48:02.598Z"
	}]
}
```

401 - Unauthorized

`{ message: "Invalid game credentials" }`

404 - Not found

`{ message: "Page not found" }`

---

### GET - Retrieve finished games(s) rank

| Method | Endpoint 		 	  		 | Content-Type                |
|--------|-------------------------------|-----------------------------|
| GET    | <kbd>/rank/:difficulty</kbd>  | <kbd>application/json</kbd> |

#### Request example

`/finished/8/hard`

`:id` - Player id

`:difficulty` - Game difficulty

#### Response

200 - OK

```js
{
	data: [{	
		createdAt: "2024-05-31T13:48:02.598Z",		
		difficulty: "easy",		
		id: 1,		
		id_p: 1,		
		minutes: 0,		
		seconds: 55,
		updatedAt: "2024-05-31T13:48:02.598Z",
		user: {
			name: "user"	
		}	
	}]
}
```

400 - Bad request

`{ message: "Missing required user information" }`

404 - Not found

`{ message: "Page not found" }`

---  

### GET - Check authenticity/permissions

| Method | Endpoint 		  | Content-Type                |
|--------|--------------------|-----------------------------|
| GET    | <kbd>/play</kbd>   | <kbd>application/json</kbd> |

#### Request example

`/finished/3/medium`

`:id` - Player id

`:difficulty` - Game difficulty


#### Response

200 - OK

```js
{
	message: "Authenticated"
}
```

400 - Bad request

`{ message: "Missing required user information" }`

404 - Not found

`{ message: "Page not found" }`

---

### DELETE - Delete unfinished game

| Method | Endpoint 		 	                  | Content-Type                |
|--------|----------------------------------------|-----------------------------|
| DELETE | <kbd>/unfinished/:id/:difficulty</kbd> | <kbd>application/json</kbd> |

#### Request example

`/unfinished/2/hard`

`:id` - Player id

`:difficulty` - Game difficulty

#### Response

200 - OK

`{ message: "Game deleted with success" }`

400 - Bad request

`{ message: "Missing required game information" }`


404 - Not found

`{ message: "Page not found" }`
