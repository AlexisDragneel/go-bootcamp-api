# Go-Bootcamp-Api
_______________________
this api is an exercise to apply to the go bootcamp on wizleine the project consist in

- the route / will display "Hello World!!"
- the route /pokemon will get a list of pokemons connecting to the PokeApi V2 also you can add the params offset and limit into the url
- the route /pokemon/:id will get a specific pokemon base on the global pokdex
- the route /tasks is a CRUD it has multiple routes
  - ```
    GET /tasks gets all the tasks prevviously added in to the database
    GET /tasks/:id get an specific task referenced by the id
    POST /tasks create a task into the database recives on the body and object { "description": "text" }
    PUT /tasks/:id update a task based on the id recieves needs and object with { "description": "edited description" }
    Delete /tasks/:id delete a task based on the id
    ```
  
## How to run the project ?

Is preferable to have installed NestJS
```
npm i -g @nestjs/cli
```
if you don't have installed nest the application will install the package as a dev dependency.

After cloning the repo and move into the root of the project is needed to run the following commands:
```
npm install
```
if you have installed nest cli you can, simple run 
```
nest start 
or
npm start
```
if you don't have nest cli then you can only use the npm commands.

After run the nest or the npm command the application will run on http://localhost:3000

for check the unit test you need to run: 
```
npm run test
```
