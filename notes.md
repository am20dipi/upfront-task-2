PROJECT NOTES
1. JSON
    -  JAVASCRIPT OBJECT NOTATION
    - anything you write in JSON is valid in JS
    - represents data in a clearer, more concise format
2. HOISTING
    - invoking a variable before it is declared
    - JS reads the file twice, that is why we can do this. 
    - "var" gets hoisted
    - ** Function declarations can be hoisted ONLY. (the whole function block)
3. ARROW FUNCTIONS
    - provides a shorter syntax to a typical function expression
    - cannot be used a function constructor i.e "new"
4. ES6
     - ECMASCRIPT
     - changes & updates to JS
     - ES6 version includes:
        - class notation, arrow functions, const & let, spread operator, destructuring, rest operator
5. "THIS" KEYWORD
    - refers to the current object
    - changes based on the context
    - Think: "self"
6. REST / SPREAD OPERATOR
    - REST
        - when defining a function
        - allows you to collect the rest of the remaining parameters being passed into the function into an array
    - SPREAD
        - when calling a function
        - allows you to pass elements of an array into a function as an argument
7. FETCH
    - returns a Promise Object
    - takes in an endpoint as an argument
    - both GET and POST
    - request to retrieve / send data
8. PROMISES
    - Promise Object will return (3) statuses: Fulfilled, Pending or Denied.
    - Promise Object responds to (3) instance methods: .then(), .catch(), & .finally()
    - .catch() handles errors
    - .then() returns a new Promise resolving to the return value
    - .finally() returns a Promise, always invokes a response
9. EVENT LISTENERS
    - (1) listens for a specific event
    - (2) calls on a callback function when an event occurs
10. OBJECT.ASSIGN()
    - allows you to combine properties from multiple objects into a single object
    - SYNTAX =>Object.assign(firstObj, secondObj)
    - the return value is the firstObj after the secondObj's properties have been merged in
11. CLOSURE
    -
12. SERIALIZERS
     - serializing: modifying what data(such as specific attributes) is allowed/to show
     - serializer classes respond to model associations!
13. RACK / CORS
    - allows us to fire requests from the frontend
    - middleware
    - cross origin reference sharing (CORS)
    - stored in config/initializers/cors.rb
    - RACK-CORS is a gem
    - allows us to protect our application from requests we do not want to accept
14. API
     - Application Program Interface
     - exposes data to the public via requests
15. SCAFFOLD
     - generator used for backend
     - creates table, model class, resources, routes, controller, etc.
16. CALLBACK FUNCTIONS

17. FUNCTION EXPRESSIONS

18. DESTRUCTURING
    - allows us to quickly map variables to a collection of data
    - 
19. CONSTRUCTOR FUNCTIONS


20. event.target
    - will always return the element that triggered the event
    - usually a button 
21. ANONYMOUS FUNCTION
    - a function without a name 
    - arrow functions provide a shorthand for declaring anonymous functions
    - anonymous functions can be used as an argument to other functions
22. MAP
    - returns a new array of modified elements
    - "collection processor"
    - SYNTAX =>  array.map(element => test)
23. e.preventDefault()
    - preventing default behavior
    - if the page refreshes, that is a page default