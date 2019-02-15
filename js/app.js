'use strict';
/*
TODO:
  connect form to constructor
  side column of shop totals
  render new constructors

User Stories (MVP)
Priotity 2: a footer row of totals for each column.

Technical Requirements (MVP)

Your JS will need an event listener and and event handler, and you may also want a variable to facilitate DOM access to the form.
  As we saw in class, the event handler should take the data from the input field, pass it into the constructor function, and create a new instance of a cookie stand that then appends to the table.
  Are you going to do any error correction on input? You probably should. Look at what kind of input validation is built in to HTML5.

If not complete from lab 7, continue to work on writing a stand-alone function to generate a footer row which will display the total number of cookies sold per hour for all locations. When a new store is added using your form, the totals in the footer row should update to include these new sales numbers.

Be attentive to overall code structure.
  This is a good point to refactor your code into smaller functions/methods if you have some huge functions going on. Remember that each function should do one thing, and then you can compose more complex behavior out of functions.
  Anywhere you have repeated chunks of code, maybe you can start to apply some DRY principles. Generally, once some chunk of code is appearing for a 3rd time or so, that's when you want to consider refactoring.
  When making code more DRY, look for repeated behaviors that act on different pieces of data. Put the behavior into a function that is declared with parameters to receive the unique data, and then replace the repeated code with the function called with the unique data in arguments.

=========================================================================================================================================

to add a new store:
  enter all data in constructor function
  add to store array
*/
function scaffold_table (){
  var table = document.createElement('table');
  table.setAttribute('id', 'sales_numbers');
  document.body.appendChild(table);

  var timerow = document.createElement ('tr');
  timerow.setAttribute('id','timerow');
  document.getElementById('sales_numbers').appendChild(timerow);

  var empty_box = document.createElement ('td');
  empty_box.textContent = '    ';
  document.getElementById('timerow').appendChild(empty_box);

  print_time_conversion(6, 20);
}
function print_footer (){
  var per_hour_total = document.createElement('tr');
  per_hour_total.textContent = 'Hourly Totals';
  per_hour_total.setAttribute('id', 'per_hour_total');
}
// helper funcitons

//this converts the time measure from 24 hour clock to 12 hour clock and prints it to the timerow

function print_time_conversion (open, close){

  for(var t= open; t< close;t++){

    if (t<12){
      var hour = t + 'am';

    }

    else if (t === 12){
      // eslint-disable-next-line no-redeclare
      var hour = t + 'pm';
    }

    else {
      // eslint-disable-next-line no-redeclare
      var hour = t-12+'pm';
    }

    var td = document.createElement('td');
    td.textContent = `${hour}`;
    document.getElementById('timerow').appendChild(td);
    if(t===20){
      break;
    }


  }
}

//this pulls the number of cookies perhour

function print_number_cookies (store){
  Store.prototype.cph();
  for(var t= 0; t< store.customer_array.length; t++){
    var td = document.createElement('td');
    td.textContent = `${store.customer_array[t]} Cookies`;
    document.getElementById(store.store_id).appendChild(td);
    if (t===20){
      break;
    }
  }
}

//this calculates the tottal number of hourly cookies and prints them in the bottom row



// constructor functions

var Store = function(store_location, store_id, store_open, store_closed, min_cust, max_cust, avg_cookie){
  this.store_location = store_location;
  this.store_id = store_id;
  this.store_open = store_open;
  this.store_closed = store_closed;
  this.duration = store_closed - store_open;
  this.min_cust = min_cust || 12;
  this.max_cust = max_cust || 36;
  this.avg_cookie = avg_cookie || 4;
  this.customer_array = [ ];
  this.cph();
  //this.hourly_totals();
};

Store.prototype.cph = function (){
  for (var i=0; i<this.duration; i++){
    var max = Math.ceil(this.max_cust);
    var min = Math.floor(this.min_cust);
    var num = Math.floor(Math.random()*(max-min+1))+min;
    this.customer_array.push(num);
  }
  //console.log(this.customer_array);
};

var hourly_totals = function (){
  //console.log(customer_array);
  var target = document.getElementById('sales_numbers');
  var hourly_td = document.createElement('td');
  var hourly_row = document.createElement('tr');
  hourly_td.textContent = 'Hourly Total';
  hourly_row.appendChild(hourly_td);
  //var table_footer = document.createElement('tfoot');

  for(var h=0; h < 14; h++){
    var sum = 0;
    for (var j=0; j<store_array.length; j++){
      sum += store_array[j].customer_array[h];
    }
    hourly_td = document.createElement('td');
    hourly_td.textContent = sum;
    hourly_row.appendChild(hourly_td);
  }
  target.appendChild(hourly_row);
};
// ============================

// function cookie_sum(store){
// }
scaffold_table();
//1st and Pike
var first_and_pike = new Store('First and Pike', 'firstpike', 6, 20, 23, 65, 6.3) ;

//SeaTac AirPort

var seatac = new Store ('SeaTac Airport', 'seatac', 6, 20, 3, 24, 1.2);

//Seattle Center

var sea_cen = new Store ('Seattle Center', 'seacen', 6, 20, 11, 38, 3.7);

//Capitol Hill

var cap_hill = new Store ('Capitol Hill', 'caphill', 6, 20, 20, 38, 2.3);

//Alki

var alki = new Store ('Alki', 'alki', 6, 20, 2, 16, 4.6);

var store_array = [first_and_pike, seatac, sea_cen, cap_hill, alki];


/* form code*/
var form_submit = function (event){
  event.preventDefault();
  var store_location = event.target.store_location.value;
  console.log(store_location);
  var store_id = event.target.store_id.value;
  console.log(store_id);
  var store_open = parseInt(event.target.store_open.value) || null;
  console.log(store_open);
  var store_closed = parseInt(event.target.store_closed.value) || null;
  console.log(store_closed);
  var min_cust = parseInt(event.target.min_cust.value) || null;
  console.log(min_cust);
  var max_cust = parseInt(event.target.max_cust.value) || null;
  console.log(max_cust);
  var avg_cookie = parseInt(event.target.avg_cookie.value) || null;
  console.log(avg_cookie);
  new Store (store_location, store_id, store_open, store_closed, min_cust, max_cust, avg_cookie);
};

var create_new = document.getElementById('create_new');
create_new.addEventListener('submit', form_submit);

/* and here we render */

// Store.store_location.prototype.render = function () {

// //   var row_store_name = document.createElement('tr');
// // }

function store_list(store){
  var store_name = document.createElement('tr');
  store_name.setAttribute('id', store.store_id);
  store_name.textContent = `${store.store_location}`;
  document.getElementById('sales_numbers').appendChild(store_name);


  print_number_cookies(store);


  // var tr_two = document.createElement('tr');
  // tr_two.textContent=`Tottal: ${cookie_sum(store)} Cookies`,
  // document.getElementById(store.store_list).appendChild(tr_two);

}
var total = document.createElement('td');
total.textContent = 'Daily Location Total';
document.getElementById('timerow').appendChild(total);



store_list(first_and_pike);

store_list(seatac);

store_list(sea_cen);

store_list(cap_hill);

store_list(alki);
print_footer();
hourly_totals();
