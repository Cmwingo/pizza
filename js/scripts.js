//UI Logic

$(document).ready(function(){
  var pizzas = [];
  var clickCount = -1;
  var toppings = [];
  var size;


  function getCheckboxInput(checkboxName){
    var inputs = [];

    $("input:checkbox[name=" + checkboxName + "]:checked").each(function(){
      var selection = $(this).val();
      inputs.push(selection);
    });
    return inputs;
  };

  $("form#order").submit(function(event){
    alert("submisson");
    event.preventDefault();

    for(i = 0; i < clickCount; i++) {
      size = $("#size" + clickCount).val();
      toppings = getCheckboxInput("toppings" + clickCount + "");
      yourPizza = new Pizza(size, toppings);
      pizzas[i] = yourPizza;
    }
    $("#pizza-size").text(size);
    $("#pizza-toppings").text(toppings);
    price = yourPizza.cost();
    $("#pizza-price").text(price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $("#order-results").slideDown();
    console.log(price);
    console.log(size);
    console.log(toppings);
  });

  $("#add-pizza").click(function(){
    clickCount ++;
    size = $("#size").val();
    toppings = getCheckboxInput("toppings");
    var pizza = new Pizza(size, toppings);
    pizza.price = pizza.cost(size, toppings);
    pizzas[clickCount] = pizza;
    console.log(pizza);
    console.log(size);
    console.log(toppings);
    console.log(pizza.price);
    $("#order").prepend(
            '<div class="row" id="order"> \
              <div class="col-lg-6"> \
                <div class="form-group form-group-lg"> \
                  <div class="panel panel-default"> \
                    <div class="panel-heading"> \
                      <h3 class="panel-title">Size</h3> \
                    </div> \
                    <div class="panel-body"> \
                      <select id="size' + clickCount + '"> \
                        <option value="small">Small</option> \
                        <option value="large">Large</option> \
                        <option value="x-large">Extra Large</option> \
                      </select> \
                    </div> \
                  </div> \
                </div> \
              </div> \
              <div class="col-lg-6"> \
                <div class="form-group"> \
                   <div class="panel panel-default"> \
                     <div class="panel-heading"> \
                       <h3 class="panel-title">Toppings</h3> \
                     </div> \
                     <div class="panel-body" id="toppings' + clickCount + '"> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="pepperoni">Pepperoni<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="onion">Onion<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="olive">Olives<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="mushroom">Mushrooms<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="pepper">Peppers<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="bacon">Bacon<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="sausage">Sausage<br> \
                       <input type="checkbox" name="toppings' + clickCount + '" value="tomato">Tomato<br> \
                     </div> \
                   </div> \
                 </div> \
              </div> \
            </div>');
  });
});

//Business Logic

function Pizza(size, toppings) {
  this.diameter = size;
  this.toppings = toppings;
  this.price = 0.00;
}

Pizza.prototype.cost = function() {
  var sizePriceMod = [3.00, 6.00, 10.00];
  var toppingPrice = 0.89;
  var basePrice = 8.00;
  var price = 0.00;

  if(this.diameter === "small") {
    price = basePrice + (this.toppings.length * toppingPrice);
    return price;
  } else if(this.diameter === "medium") {
    price = sizePriceMod[0] + basePrice + (this.toppings.length * toppingPrice);
    return price;
  } else if(this.diameter === "large") {
    price = sizePriceMod[1] + basePrice + (this.toppings.length * toppingPrice);
    return price;
  } else {
    price = sizePriceMod[2] + basePrice + (this.toppings.length * toppingPrice);
    return price;
  }
};
