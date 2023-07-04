# F1ResultsApp
- Web application to show results from F1 races
- Data is crawled from `formula1.com`

## Prerequisite
- Node.js v18.16.1 
- npm 9.5.1
- The app is developed in Windows OS

## First set up
```
cd client 
npm install 
cd ../server 
npm install
```

## How to run dev environment 
- Step 1: Set up `.env` file in `./server` directory

- Step 2: Open 2 terminal for client and server 
    - Terminal 1: For server (default port 8000)
        ```
        cd server
        npm run dev 
        ```
    - Terminal 2: For client (default port 3000) 
        ```
        cd client
        npm run start
        ```

- Alternately, can run unittest to check API. Make sure that the server is on, then open another terminal:  
    ```
    cd server
    npm run test
    ```

## How to run production environment 
- Step 1: Build client code
    ```
    cd client 
    npm run build
    ```
- Step 2: Now the app's frontend can be accessed from backend entry points (by default is `localhost:8000/`)
    ```
    cd server 
    npm run start 
    ```

# Apps feature

- Documentation is provided at `http://localhost:8000/api-docs/`
    - Developer can get all APIs of the app as well as each API request and response format 
    - Also allow to quickly test each API during development      
- Teams with different names are treated as different team 
- Data models are described in `server/src/models`
- Data is from 2014 to 28-June-2023

- In overall the API allow to search by 4 categories:
    - By year
    - By driver 
    - By team 
    - By grandprix place 

### By year
- Based on 1 year and grandprix 
    - When choose to search with all grandprix, we have to retrieve a list of available grandprix of that year. Use query `sort` to choose whether to sort the grandprix by `date` (default) or by `place` 
    - All grandprix: 
        - Return the winner of each grandprix 
        - Query `top3=true` will show top 3 drivers of each grandprix
    - 1 grandprix: 
        - Return all participation (i.e. races) in that grandprix 
- Based on 1 year and driver 
    - When choose to search with all drivers, we have to retrieve a list of drivers of that year. Use query `sort` to choose whether to sort the grandprix by `lastname` (default) or by `firstname`
    - All drivers
        - Show `sumPoints` of each drivers and their `rank`
        - Also show the `percentage` of their sumPoints in total sumPoints 
    - 1 driver: 
        - Return the position at each grandprix 
        - Show `accumulativePoints` after each race in the year  
- Based on 1 year and team 
    - All team 
        - Show team `points`
        - Show the percentage of each team's points in total points 
    - One team 
      - Show `accumulativePoints` after each race in the year  
      - At each grandprix we show the `participation` of that `team's member` in that grandprix. So that we can see who the members are and how much points they contributed to team's points
      - Also return a list containing percentage of each member's sum points in team's total points

### By driver 
- Search by driver name, there are 2 ways to get driver information
    - Choose from list of drivers
        - query `sort=firstname` allow sort by firstname
        - default is sort by lastname
    - Input Text 
        + Search by last name (default) 
        + Search by first name 
        + However need to type the name exactly as in database, which means have to capitalize the name
- Yearly ranking of driver 
    - At each year show `sumpoints` and compare to previous year's rank 
   
### By team 
- Search by team name 
- Yearly ranking of team
    - At each year show `sumpoints` and compare to previous year's rank 
- Team's `best driver` over year 
    - Show percentage driver has contribute to team

### By grandprix place 
+ Search by place, for example Canada  
- Yearly top 3 winners of grandprix from 1 place



