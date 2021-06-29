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
    - implicit returns on single line arrow functions only
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
    - defining a function inside of another function
    - the inner function has access to the outer function's lexical environment
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
    - functions that will be invoked at a later time
    - a function passed into another function as one of its arguments. 
17. FUNCTION EXPRESSIONS
    - defining a function within an expression of a variable
18. DESTRUCTURING
    - allows us to quickly map variables to a collection of data
    - assigning variable names to values in a single moment
19. CONSTRUCTOR FUNCTIONS
    - a function that initializes an object with key-value pair properties. 
    - an object method for creating and initializing an object of that class. 
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
    - if the page refreshes, then you need a preventDefault
    - typically with forms, or buttons that send you somewhere else(think href)
24. Prototypal Inheritance / Prototype
    - Objects have a prototype object; the prototype object provides methods and properties for which the object inherits. 
25. Static
    - Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself.
    - Static methods are class-level methods - they are not callable on instances of a class, only the class itself. These are often used in 'utility' classes - classes that encapsulate a set of related methods but don't need to be made into instances.
26. Encapsulation
    - bundling data, methods and properties within one unit. 
27. Polymorphism
    -  the act of designing objects to have shared behaviors
28. JS "Class"
    - syntactic sugar
    - a way to classify and create JS objects
    - encapuslates data within one unit aka Object
29. SCOPE CHAIN
    - upon being invoked, a function creates a new scope and retains reference to the outer scope in which it was declared.




   // iterating through the array tasks
    // creating an element li for each task
    // setting the inner html of each li to the specific task's attrs.
    // appending each task to the page under the specified parent 
    // selecting the delete button of that instance and adding event listener


    // 1. fetch to specific endpoint specified by id
    // 2. remove from page
    // 3. method: DELETE, headers?
    // 4. pass in an event bc click = event, event.target == button
    //debugger
    // 5. alert message? error message?

    // 1. listen/wait for click event
    // 2. render form with preexisting field input
    // 3. replace current li with new li, map values
    // 4. clear & remove form