//JavaScript file for shopping website

//Global Variables
var listOfUsers = []; //Array of users
var numOfUsers = 0;

//User object constructor
function User(username, firstName, surname, email, password)
{
    //attributes
    this.username = username;
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.password = password;
    
    //methods
    this.getName = getName;
    this.getUsername = getUsername;
    this.getEmail = getEmail;
    this.getPassword = getPassword;
}

function getName()
{
    return this.firstName + " " + this.surname;
}

function getUsername()
{
    return this.username;
}

function getEmail()
{
    return this.email;
}

function getPassword()
{
    return this.password;
}

function createUserAndAddToList()
{
    var email = document.getElementById("signupEmail").value;
    var firstname = document.getElementById("firstname").value;
    var surname = document.getElementById("surname").value;
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    
    var user = new User(username, firstname, surname, email, password);
    
    listOfUsers[numOfUsers] = user;
    
    numOfUsers++;
    
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("successfulSignup").style.display = "block";
    
    document.getElementById("displaySignupName").innerHTML = "Name: " + user.getName();
    document.getElementById("displaySignupEmail").innerHTML = "Email: " + user.getEmail();
    document.getElementById("displaySignupUsername").innerHTML = "Username: " + user.getUsername();
    
}

function verifyUserLoginDetails()
{
    var login = document.getElementById("loginName").value;
    var pass = document.getElementById("loginPassword").value;
    
    //check if login is a username or email
    for(var i = 0; i < numOfUsers; i++)
    {
        if((listOfUsers[i].getEmail() == login || listOfUsers[i].getUsername() == login) && (listOfUsers[0].getPassword() == pass))
        {
            return true;
            //store the user details in the web storage (probably session)
            //redirect user to the main shopping page
            //https://stackoverflow.com/questions/40539097/redirect-user-to-another-html-page-if-the-condition-is-true/40539127
            //have the user logged in at the top right of all subsequent pages
        }
    }
    
    return false;
    
    
}