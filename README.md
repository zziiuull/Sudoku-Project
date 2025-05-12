# User manual

> Go to [API](api) for more implementation details

## Registration and Log in

To create a valid account:
 - User name
 - Valid email 
 - Password (4 to 32 characters)

After creating an account you can log in

## How to play
To play choose a difficulty between **easy, medium and hard**

## The game

If you don't know how to play sudoku access [how to play sudoku](https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/)

Each match lasts 10 minutes and you must complete the game before time runs out

The game has a timer, a pause button and a button the generate a new game

## Functionalities

If the time is not up and you need to leave the match, you can save the current game and return to the main page (the game is saved automatically). When you return to game mode, a popup will appear asking if you want to continue the game or start a new one. **(Only 1 game per difficulty will be saved)**

You can view the 10 best times among all players (for each difficulty)

You can view your games history (for each difficulty)

You can log out, being necessary to log in to play again

## Cloning

```
git clone https://github.com/zziiuull/Sudoku-Project.git
```

## Building Docker images

At `/Sudoku-Project` run in your terminal:
```
docker build -t sudoku-postgres .
```

At `/Sudoku-Proect/api` run in your terminal:
```
docker build -t api .
```

At `/Sudoku-Proect/spa` run in your terminal:
```
docker build -t spa .
```

## Running Docker containers

### Create a network

```
docker network create sudoku-network
```

### Run containers

```
docker run -d --name postgres --network sudoku-network -p 5432:5432  sudoku-postgres
docker run -d --name api --network sudoku-network -p 8000:8000 api
docker run -d --name spa --network sudoku-network -p 5173:5173 spa
```


