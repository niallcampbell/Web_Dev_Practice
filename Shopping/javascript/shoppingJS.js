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

function printUserNameInNavBar()
{
    var currentUsername = sessionStorage.getItem("currentUser");
    var currentUser = getUserObjectFromSessionStorage(currentUsername);
    var name = currentUser.getName().split(" ");
    var firstname = name[0];
    
    document.getElementById("userDropdownButtonID").innerHTML = "<i class=\"fa fa-fw fa-user\"></i> " + firstname + " <i class=\"fa fa-fw fa-caret-down\"></i>";
}

function showUserNavDropdown()
{
    /* Gets the div element by its ID and then toggles/adds 'show' as a class of the div.
        classList lists the classes associated with an element. 
    */
    document.getElementById("userDropdownContentID").classList.toggle("show");
}

/* If the user clicks anywhere else on the window, then the dropdown menu from the user nav is hidden. */
window.onclick = function(userAction)
{
    if(!userAction.target.matches('.userDropdownButton'))
    {
        var myDropdown = document.getElementById("userDropdownContentID");
        if(myDropdown.classList.contains('show'))
        {
            myDropdown.classList.remove('show');
        }
    }
}


function initialiseUserProfileHTMLPage()
{
    importNavBarIntoHTMLPage();
    //printUserNameInNavBar();
    printUserInfoToUserProfilePage();
}

function printUserInfoToUserProfilePage()
{
    var currentUser = sessionStorage.getItem("currentUser");
    var user = getUserObjectFromSessionStorage(currentUser);
    
    document.getElementById("userProfileName").innerHTML = "Name: " + user.getName();
    document.getElementById("userProfileUsername").innerHTML = "Username: " + user.getUsername();
    document.getElementById("userProfileEmail").innerHTML = "Email: " + user.getEmail();
}

function importNavBarIntoHTMLPage()
{
    var navBarDiv = $("#navBarDiv");
    navBarDiv.load("NavBar.html", function(){ printUserNameInNavBar() }); //function() is ran upon loading the html to the page
}
