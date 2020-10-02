//JavaScript file for Employee.html

//Global variables
var listOfEmployees = []; // array to store employees
var numOfEmployees = 0;
var numEmployeesAlreadyPrinted = 0; //tracks the employees already printed to the table

//Constructor
function Employee()
{
    //attributes
    this.firstName = "";
    this.surname = "";
    this.job = "";
    this.employeeID = "";
    
    //methods
    this.setName = setName;
    this.setJob = setJob;
    this.setEmployeeID = setEmployeeID;
    this.getName = getName;
    this.getJob = getJob;
    this.getEmployeeID = getEmployeeID;
}

function setName(firstName, surname)
{
    this.firstName = firstName;
    this.surname = surname;
}

function setJob(job)
{
    this.job = job;
}

function setEmployeeID()
{
    this.employeeID = numOfEmployees + 1;
}

function getName()
{
    return this.firstName + " " + this.surname;
}

function getJob()
{
    return this.job;
}

function getEmployeeID()
{
    return this.employeeID;
}

/*
    This function creates an Employee object. 
    It is a stand alone method that does not belong to the Employee object. 
*/
function createEmployee()
{   
    var myEmployee = new Employee();
    
    var firstName = document.getElementById("first_name").value;
    var surname = document.getElementById("surname").value;
    myEmployee.setName(firstName, surname);
    
    var job = document.getElementById("job_title").value;
    myEmployee.setJob(job);
    
    myEmployee.setEmployeeID();
    
    listOfEmployees[numOfEmployees] = myEmployee;
    
    numOfEmployees++;
    
    //clear the input text fields of the form
    document.getElementById("first_name").value = "";
    document.getElementById("surname").value = "";
    
    printEmployee(myEmployee);
    
}

//Hide form and print Employee to the screen
function printEmployee(myEmployee)
{
    //hide form
    document.getElementById("EmployeeForm").style.display = "none";
    
    document.getElementById("results").style.display = "block";
    
    //Print Employee to screen
    document.getElementById("name_result").innerHTML = "Employee Name: " + myEmployee.getName();
    document.getElementById("job_title_result").innerHTML = "Job Title: " + myEmployee.getJob();
    document.getElementById("employee_id_result").innerHTML = "Employee ID: " + myEmployee.getEmployeeID();
}

function resetScreenToAddAnotherEmployee()
{
    document.getElementById("EmployeeForm").style.display = "block";
    
    document.getElementById("results").style.display = "none";
    
    document.getElementById("empTable").style.display = "none";
}

function printAllEmployees()
{   
    //Remove 'no employees' message if present
    if(document.getElementById("noEmpMessage"))
    {
        var check = document.getElementById("noEmpMessage");
        check.remove();
    }
    
    if(numOfEmployees == 0)
    {
        var message = document.createElement('p');
        message.setAttribute("id", "noEmpMessage");
        message.innerHTML = "There are currently no employees created."
        document.getElementById("empTable").style.display = "none";
        document.body.appendChild(message);
        return;
    }
    
    /*
    var table = document.createElement('table'); //creates a html element
    
    table.setAttribute("border", "1");
    table.setAttribute("id", "resultsTable");
    
    var tr = document.createElement('tr');
    var th1 = document.createElement('th'); //table heading
    var th2 = document.createElement('th');
    
    th1.innerHTML = "Employee Name";
    th2.innerHTML = "Job Title";
    
    tr.appendChild(th1);
    tr.appendChild(th2);
    
    table.appendChild(tr);
    */
    
    document.getElementById("empTable").style.display = "table";
    
    var table = document.getElementById("empTable");
    
    for(numEmployeesAlreadyPrinted; numEmployeesAlreadyPrinted < numOfEmployees; numEmployeesAlreadyPrinted++)
    {
        //html elements consist of an element node and a text node
        
        var tr = document.createElement('tr'); //table row
        var td1 = document.createElement('td'); //table column 1 - Name
        var td2 = document.createElement('td'); //table column 2 - Job
        var td3 = document.createElement('td'); //employee id
        
        var name = document.createTextNode(listOfEmployees[numEmployeesAlreadyPrinted].getName());
        var job = document.createTextNode(listOfEmployees[numEmployeesAlreadyPrinted].getJob());
        var id = document.createTextNode(listOfEmployees[numEmployeesAlreadyPrinted].getEmployeeID());
        
        td1.appendChild(name); //join the text to the table cell
        td2.appendChild(job);
        td3.appendChild(id);
        
        tr.appendChild(td1); //append the data cell (i.e. column) to the table row
        tr.appendChild(td2);
        tr.appendChild(td3);
        
        table.appendChild(tr);
        
    }
    
}


/*
    TODO:
    
    CSS for page
*/

