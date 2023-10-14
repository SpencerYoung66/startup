# Startup Application

## Startup Specification

### Elevator Pitch

Every year at our family Labor Day homemade ice cream contest, we fill out paper slips and write down our votes. This requires people to count the number of votes every year, which is a pain. However, if we had a website to vote on, we could have a website count and store the votes, making it much easier to decide who the winner is. On top of that, we could keep a history of who won what with which flavor. This would make our lives easier and make it possible to reflect on the past winning contestants and flavors. 

### Key Features

- Login system to securely login
- Number of votes for current year displayed in bottom
- Voting system to vote for favorite flavors
- Register System to register your ice cream flavor(s)
- History tab to see the past winners, overall and category

### Technologies

#### HTML
- HTML to render the page
- Links to other parts of page (Home, Vote, Register, History, Login)
- Lists for voting, inputs for registering
- Voting System

#### CSS
- Style the pages/buttons to make them look nice
- Have header with links to other parts of page
- Register/Vote buttons at bottom of page
- Number of votes at bottom of page

#### JavaScript
- Login system will login/register people
- Voting system will check to see if they have already voted, will store votes
- Register system will register ice cream flavors to the database

#### Authentication
- Login/Register system will have a page

#### Database Data
- Will store votes, ice creams, and winners
- Will store users and verify they only have one vote

#### Websocket Data
- The number of votes cast will dynamically be updated on the page

### Design Rough Draft
![Rough Draft 1](images/RoughDraft1.jpeg)

![Rough Draft 2](images/RoughDraft2.jpeg)


## HTML Deliverable
- HTML Pages: Added a home/index page, login page, voting page, register flavor page, and history page
- Links: There are links from any page to any other page
- Textual Content: There are various instructions and titles in the different pages (voting instructions, registering instructions, etc.)
- 3rd Party: A 3rd party quote about history on the history page
- Images: Image of ice cream on the home page
- Login Placeholder: Ask for first and last name on login page. I have a place holder there in a form
- Database Data: The various options to vote for will be the database data, as well as past entries on the history page
- Websocket: At bottom of vote page there are the total number of votes. At the bottom of register page, total number of flavors. On home page, total number of votes and flavors
- Various forms for registering flavors, voting, and logging in. All reroute to another page

## CSS Deliverable
- Header: Made the header/navigation bar Bootstrap, so looks nice
- Body: Made the body take up room that the header and footer don't use with flex. Also made various forms and inputs Bootstrap to make them look nicer
- Footer: Made a standard size that acknowledges use of Bootstrap and contains link to GitHub
- Navigation: As mentioned, Bootstrap navigation bar that links to other pages on site. Made dark-themed as well
- Responsive to window resizing: Bootstrap navigation and inputs respond to resizing. Everything is contained in either a flex or grid, so resizes properly
- Application Elements: Centered titles, added appropriate padding and margins, Bootstrap forms/inputs
- Application Text: Centered text where appropriate, made all text font standard to what Bootstrap uses, "Helvetica Neue"
- Application Images: Centered the image on the home page, that's the only image