//JavaScript file for shopping website


//Global items
var tshirt = new ClothingItem("tshirt", "Oversized T-Shirt", "images/oversizedTshirt.jpg",30, "small");
var hoodie = new ClothingItem("hoodie", "Hoodie", "images/hoodie.jpg", 50, "small");
var runners = new ClothingItem("runners", "Runners", "images/runners.jpg", 40, 8);

var storeItems = [tshirt, hoodie, runners];


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


//Populate the item.html page with the requested item content
function populateItemPage()
{
    var itemID = getCurrentItem();
    var itemToView;
    
    //get item object    
    for(var i = 0; i < storeItems.length; i++)
    {
        if(itemID == storeItems[i].getItemID())
        {
            itemToView = storeItems[i];
        }
    }
    
    //populate page with values
    
    document.getElementById("itemName").innerHTML = itemToView.getItemDescription();
    document.getElementById("itemImage").setAttribute("src", itemToView.getImage());
    document.getElementById("itemPrice").innerHTML = "€" + itemToView.getItemPrice();
    
}

/*
    When the user clicks on an item to view, it is set in the session storage. 
    This info will then be used to populate the content on the item.html page
*/
function setCurrentItemToView(itemID)
{   
    sessionStorage.setItem("currentItem", itemID);
}

/*
    When the user navigates away from item.html, unset the current item. 
*/
function unsetCurrentItem()
{
    sessionStorage.removeItem("currentItem");
}

function getCurrentItem()
{
    return sessionStorage.getItem("currentItem");
}

/*
    Item object constructor and methods
*/

function ClothingItem(id, description, image, price, size)
{
    //attributes
    this.id = id;
    this.description = description;
    this.image = image;
    this.price = price;
    this.size = size;
    
    //methods
    this.getItemID = getItemID;
    this.getItemDescription = getItemDescription;
    this.getImage = getImage;
    this.getItemPrice = getItemPrice;
    this.getItemSize = getItemSize;
}

function getItemID()
{
    return this.id;
}

function getItemDescription()
{
    return this.description;
}

function getImage()
{
    return this.image;
}

function getItemPrice()
{
    return this.price;
}

function getItemSize()
{
    return this.size;
}