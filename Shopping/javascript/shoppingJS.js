//JavaScript file for shopping website

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


/*
    session storage can only store strings, it cannot store an object
    convert the object to a string in order to store it
*/
function saveUserToSessionStorage(user)
{
    //convert the user to json object
    var userObj = { username: user.getUsername(), name: user.getName(), email: user.getEmail(), password: user.getPassword() };
    
    var userObjString = JSON.stringify(userObj); //converts json object to string
    
    //save it to session storage
    sessionStorage.setItem(user.getUsername(), userObjString);
    
}

function getUserObjectFromSessionStorage(username)
{
    var userString = sessionStorage.getItem(username);
    
    if(userString == null)
    {
        return null;
    }
    
    //convert the string back to an object
    var userJSON = JSON.parse(userString);
    
    var name = userJSON.name.split(" ");
    var firstname = name[0];
    var surname = name[1];
    
    var userObj = new User(userJSON.username, firstname, surname, userJSON.email, userJSON.password);
    
    return userObj;
}

function createUserAndAddToList()
{
    var email = document.getElementById("signupEmail").value;
    var firstname = document.getElementById("firstname").value;
    var surname = document.getElementById("surname").value;
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    
    var user = new User(username, firstname, surname, email, password);
    
    saveUserToSessionStorage(user);
    
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("successfulSignup").style.display = "block";
    
    document.getElementById("displaySignupName").innerHTML = "Name: " + user.getName();
    document.getElementById("displaySignupEmail").innerHTML = "Email: " + user.getEmail();
    document.getElementById("displaySignupUsername").innerHTML = "Username: " + user.getUsername();
    
}

function verifyUserLoginDetails()
{
    var username = document.getElementById("loginName").value;
    var pass = document.getElementById("loginPassword").value;
    
    var userObj = getUserObjectFromSessionStorage(username);
    
    if(userObj == null)
    {
        document.getElementById("loginBody").style.display = "none";
        document.getElementById("incorrectLoginDetails").style.display = "block";
    }
    else
    {
        if(pass != userObj.getPassword())
        {
            document.getElementById("loginBody").style.display = "none";
            document.getElementById("incorrectLoginDetails").style.display = "block";
        }
        
        sessionStorage.setItem("currentUser", userObj.getUsername());
        
        //redirect to shopping page
        window.location.href = "shop.html";
    }
    
}