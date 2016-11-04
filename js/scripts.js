//UI Logic

$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();

    function getCheckboxInput(checkboxName){
      var inputs = [];

      $("input:checkbox[name=" + checkboxName + "]:checked").each(function(){
        var selection = $(this).val();
        inputs.push(selection);
      });
      return inputs;
    };

    var toppings = [];
    var size;

    size = $("#size").val();
    toppings = getCheckboxInput("toppings");
    $("#pizza-size").text(size);
    $("#pizza-toppings").text(toppings);
    yourPizza = new Pizza(size, toppings);
    console.log(size);
    console.log(toppings);
  });
});

//Business Logic

function Pizza(size, toppings) {
  this.diameter = size;
  this.toppings = toppings;
}

Pizza.prototype.cost = function() {
  
}
