/**
 * Created by kaustubh on 11/18/16.
 */
var currentTab = null;
var prev = null;
var next = null;
var curr_index = 0;
var tabs = {0: "tab1default", 1: "tab2default", 2: "tab3default"};
var pizza = {};pizza.meats = [];pizza.non_meats = [];
var sankey_data = [];
var toppings = {};


$(document).ready(function () {
    curr_index = 0;
    currentTab = tabs[curr_index];
    if(curr_index>=2){
        $('#back_button').show();
        $('#next_button').hide();
    }else if(curr_index>0){
        $('#back_button').show();
        $('#next_button').show();
    }else {
        $('#back_button').hide();
        $('#next_button').show();
    }
    $('#next_button').on('click', function () {
        if (curr_index < 2) {
            curr_index = curr_index + 1;
            $('#next_button').attr('href', '#' + tabs[curr_index]);
            $('#back_button').attr('href', '#' + tabs[curr_index - 1]);

        }

        if(curr_index==2){

            pizza.meats.forEach(function (item,index) {

                set(pizza.cheese,item,1);
                set(pizza.sauce_type,item,1);

                if(pizza.cheese!="") set(pizza.size,pizza.cheese,1);

                if(pizza.sauce_type!="") set(pizza.size,pizza.sauce_type,1);

                if(item in toppings) toppings[item] = toppings[item]+1;
                else toppings[item] = 1;

            });

            pizza.non_meats.forEach(function (item,index) {
                set(pizza.cheese,item,1);
                set(pizza.sauce_type,item,1);

                if(pizza.cheese!="") set(pizza.size,pizza.cheese,1);
                if(pizza.sauce_type!="") set(pizza.size,pizza.sauce_type,1);

                if(item in toppings) toppings[item] = toppings[item]+1;
                else toppings[item] = 1;

            });

        }

        if(curr_index>=2){
            $('#back_button').show();
            $('#next_button').hide();
        }else if(curr_index>0){
            $('#back_button').show();
            $('#next_button').show();
        }else {
            $('#back_button').hide();
            $('#next_button').show();
        }
    });

    $('#b1').on('click', function () {
        curr_index = 0;
        $('#back_button').hide();
        $('#next_button').show();
    });

    $('#b2').on('click', function () {
        curr_index = 1;
        $('#back_button').show();
        $('#next_button').show();
    });

    $('#b3').on('click', function () {
        curr_index = 2;
        $('#back_button').show();
        $('#next_button').hide();
    });

    $('#back_button').on('click', function () {
        if (curr_index > 0) {
            curr_index = curr_index - 1;
            $('#back_button').attr('href', '#' + tabs[curr_index]);
            $('#next_button').attr('href', '#' + tabs[curr_index + 1]);

        }

        if(curr_index>=2){
            $('#back_button').show();
            $('#next_button').hide();
        }else if(curr_index>0){
            $('#back_button').show();
            $('#next_button').show();
        }else {
            $('#back_button').hide();
            $('#next_button').show();
        }

    });

    $('input:radio[name=pizza_size]').on('change', function () {
        pizza.size = $('input:radio[name=pizza_size]:checked').val();
    });

    $('#cheese_check').change(function () {
        $('#cheese_amount').toggle(this.checked);
        if (this.checked)pizza.cheese = $('#cheese_amount option:selected').text() + " Cheese";
        else pizza.cheese = ""
    }).change(); //ensure visible state matches initially

    $('#cheese_amount').change(function () {
        pizza.cheese = $('#cheese_amount option:selected').text() + " Cheese";
    });

    $('#sauce_check').change(function () {
        $('#sauce_options').toggle(this.checked);

        if (this.checked)pizza.sauce_amount = $('#sauce_amount option:selected').text() + " Sauce";
        else {
            pizza.sauce_amount = "";
            pizza.sauce_type = "";
        }

    }).change(); //ensure visible state matches initially

    $('input:radio[name=sauce_type]').on('change', function () {
        pizza.sauce_type = $('input:radio[name=sauce_type]:checked').val() + " Sauce";
    });

    $('#sauce_amount').change(function () {
        pizza.sauce_amount = $('#sauce_amount option:selected').text();
    });

    $('input:checkbox[name=meat]').change(function () {
        pizza.meats = $('input:checkbox[name=meat]:checked').map(function () {return this.value;}).get();
    });

    $('input:checkbox[name=non-meat]').change(function () {
        pizza.non_meats = $('input:checkbox[name=non-meat]:checked').map(function () {return this.value;}).get();
    });

    $('#build').on('click', function () {
        curr_index = 2;
        var orders = JSON.parse(localStorage.getItem('orders'));
        if(orders==null) orders = [];
        orders.push(pizza);

        localStorage.setItem('orders',JSON.stringify(orders));
        localStorage.setItem('sankey_data',JSON.stringify(sankey_data));

        if(curr_index==2){

            pizza.meats.forEach(function (item,index) {

                set(pizza.cheese,item,1);
                set(pizza.sauce_type,item,1);

                if(pizza.cheese!="") set(pizza.size,pizza.cheese,1);

                if(pizza.sauce_type!="") set(pizza.size,pizza.sauce_type,1);

                if(item in toppings) toppings[item] = toppings[item]+1;
                else toppings[item] = 1;

            });

            pizza.non_meats.forEach(function (item,index) {
                set(pizza.cheese,item,1);
                set(pizza.sauce_type,item,1);

                if(pizza.cheese!="") set(pizza.size,pizza.cheese,1);
                if(pizza.sauce_type!="") set(pizza.size,pizza.sauce_type,1);

                if(item in toppings) toppings[item] = toppings[item]+1;
                else toppings[item] = 1;

            });

            // $('#back_button').attr('href', '#' + tabs[2]);
            curr_index = 3
        }

        loadGraph();

    });

    var set = function(from,to,weight){

        if(from=="" || to=="" || weight==null) return;
        var i=0;
        for(; i<sankey_data.length; i++){
            var e = sankey_data[i];

            if(e!=null){
                if(e[0]==from && e[1] ==to){
                    e[2] = e[2] + weight;
                    return;
                }
            }
        }

        if(i==sankey_data.length)sankey_data.push([from,to,weight]);
    }
});