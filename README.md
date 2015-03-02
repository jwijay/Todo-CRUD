# Todo-CRUD
Todo List App

## Scope

- Create a ToDo List Application.
- The primary **list** page should display:
  - all list items in the ToDo List. Each list item should have:
    - a checkbox that indicates if the item is done
      - when checked, then update the list item in the database to be is_done = true
      - when unchecked, then update the list item in the database to be is_done = false
    - the title of the list item
      - when clicked, route the **edit item** form page
    - a delete button for the list item
  - a New Item button that links to the **new item** form page
  - counters that display:
    - the number of items that are complete
    - the number of items that are incomplete
- The **new item** form page should display:
  - **input field** for list item title
  - **textarea field** for list item description
  - **save** button that submits the form to be saved in database
- The **edit item** form page should display:
  - **input field** for list item title
    - value should be prefilled with current value
  - **textarea field** for list item description
    - value should be prefilled with current value
  - **save** button that submits the form to be updated in database

## Planning Process

1. Understand the Scope - Define User Stories
2. Map out all pages and layouts
3. Map out all Routes / Endpoints - Create a routing table
4. Define DBs and Schemas
5. Define user interactions
    1. Which actions trigger http requests?
    2. Which events get data?
    3. Which events post data?
    
## Setup

1. Create a new github repo named `Todo-CRUD` and clone it to your DevLeague directory.
2. Set up the project to use the **Express** framework
3. Set up the project to use **Mongodb** to store data
4. Use the [**ExpressJS method override**](https://github.com/expressjs/method-override) for DELETE and PUT methods.
5. Use **jade** node module for templating.
6. Use **body-parser** node module for parsing POST requests.
7. Use **express.static** for serving static assets.
8. Use **mongoose** for object relational mapping to your mongo database.

## Layouts
Consider this layout for the primary list page. Your layout may vary:

![1](http://new.tinygrab.com/24b84715c4be04970465399c65045584943d45bbee.png)

Create an html structure that will meet your needs in order to reproduce a similar layout.

#### Checkboxes:

Incomplete items:  
![2](http://new.tinygrab.com/24b84715c49cfc43dde170b2ba8399fddc285ffa25.png)  

Completed items:
![3](http://new.tinygrab.com/24b84715c42eae4b31316c9a40ef4f7e91104f1cd3.png)  

#### Counters that display incomplete and completed item counts

![5](http://new.tinygrab.com/24b84715c4241f070f1e51b6e94e3d3915cbae5c5e.png)