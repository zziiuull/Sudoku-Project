# API

> Essa é uma API que auxilia no desenvolvimento de uma aplicação que gerencia um jogo de sudoku.

## Funcionalidades

- Permite o login e cadastro de um usuário. 
- Permite salvamento e recuperação dos dados de jogos inacabados e acabados. 
- E permite a verificação de autenticidade/permissões de um usuário.

---
## Requisições

> **Endereço inicial:** `http://localhost/:8000`

---

### POST - Cadastrar usuário

| Método | Endpoint    | Content-Type       |
| ------ | ----------- | ------------------ |
| POST   | `/register` | `application/json` |

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

### POST - Realizar login

| Método | Endpoint | Content-Type       |
| ------ | -------- | ------------------ |
| POST   | `/login` | `application/json` |

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

### POST - Salvar tabuleiro inacabado

| Método | Endpoint      |  Content-Type       |
| ------ | ------------- |  ------------------ |
| POST   | `/unfinished` |  `application/json` |

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

### GET - Recuperar tabuleiro inacabado

| Método | Endpoint                      | Content-Type       |
| ------ | ----------------------------- | ------------------ |
| GET    | `/unfinished/:id/:difficulty` | `application/json` |

#### Request example

`/unfinished/5/easy`

`:id` - ID do player

`:difficulty` - Dificuldade do jogo

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

### DELETE deletar tabuleiro

| Método | Endpoint                      | Content-Type       |
| ------ | ----------------------------- | ------------------ |
| DELETE | `/unfinished/:id/:difficulty` | `application/json` |

#### Request example

`/unfinished/2/hard`

`:id` - ID do player

`:difficulty` - Dificuldade do jogo

#### Response

200 - OK

`{ message: "Game deleted with success" }`

400 - Bad request

`{ message: "Missing required game information" }`


404 - Not found

`{ message: "Page not found" }`

---

### POST - Salvar jogo acabado

| Método | Endpoint    | Content-Type       |
| ------ | ----------- | ------------------ |
| POST   | `/finished` | `application/json` |

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

---

### GET - Recuperar tabuleiros terminados

| Método | Endpoint                                                       | Content-Type |
| ------ | -------------------------------------------------------------- | ------------ |
| GET    | `/finished/:id/:difficulty`  						      |`application/json`|

#### Request example

`/finished/1/medium`

`:id` - ID do player

`:difficulty` - Dificuldade do jogo

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

### GET - Recuperar rank dos tabuleiros terminados

| Método | Endpoint                    | Content-Type       |
| ------ | --------------------------- | ------------------ |
| GET    | `/finished/:id/:difficulty` | `application/json` |

#### Request example

`/finished/8/hard`

`:id` - ID do player

`:difficulty` - Dificuldade do jogo

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

### GET - Verificação de permissão/autenticidade

| Método | Endpoint                    | Content-Type       |
| ------ | --------------------------- | ------------------ |
| GET    | `/finished/:id/:difficulty` | `application/json` |

#### Request example

`/finished/3/medium`

`:id` - ID do player

`:difficulty` - Dificuldade do jogo


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