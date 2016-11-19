/**
 * Created by kaustubh on 11/18/16.
 */
var currentTab = null;
var prev = null;
var next = null;
var curr_index = 0;
var tabs = {0: "tab1default", 1: "tab2default", 2: "tab3default"};
var pizza = {};
var pizzas = [];
pizza.meats = [];
pizza.non_meats = [];
var sankey = {};
$(document).ready(function () {
    curr_index = 0;
    currentTab = tabs[curr_index];

    $('#next_button').on('click', function () {
        if (curr_index < 2) {
            curr_index = curr_index + 1;
            $('#next_button').attr('href', '#' + tabs[curr_index]);
            $('#back_button').attr('href', '#' + tabs[curr_index - 1]);
        }
    });


    $('#b1').on('click', function () {
        curr_index = 0;
    });
    $('#b2').on('click', function () {
        curr_index = 1;
    });
    $('#b3').on('click', function () {
        curr_index = 2;
    });

    $('#back_button').on('click', function () {
        if (curr_index > 0) {
            curr_index = curr_index - 1;
            $('#back_button').attr('href', '#' + tabs[curr_index]);
            $('#next_button').attr('href', '#' + tabs[curr_index + 1]);
        }
    });

    $('input:radio[name=pizza_size]').on('change', function () {
        pizza.size = $('input:radio[name=pizza_size]:checked').val();
        console.log(pizza);
    });


    $('#cheese_check').change(function () {
        $('#cheese_amount').toggle(this.checked);
        if (this.checked)pizza.cheese = $('#cheese_amount option:selected').text();
        else pizza.cheese = ""
        console.log(pizza);
    }).change(); //ensure visible state matches initially

    $('#cheese_amount').change(function () {
        pizza.cheese = $('#cheese_amount option:selected').text();
        console.log(pizza);
    });

    $('#sauce_check').change(function () {
        $('#sauce_options').toggle(this.checked);

        if (this.checked)pizza.sauce_amount = $('#sauce_amount option:selected').text();
        else {
            pizza.sauce_amount = "";
            pizza.sauce_type = "";
        }
        console.log(pizza);
    }).change(); //ensure visible state matches initially


    $('input:radio[name=sauce_type]').on('change', function () {
        pizza.sauce_type = $('input:radio[name=sauce_type]:checked').val();
        console.log(pizza);
    });

    $('#sauce_amount').change(function () {
        pizza.sauce_amount = $('#sauce_amount option:selected').text();
        console.log(pizza);
    });

    $('input:checkbox[name=meat]').change(function () {
        pizza.meats = $('input:checkbox[name=meat]:checked').map(function () {
            return this.value;
        }).get();
        console.log(pizza);
    });

    $('input:checkbox[name=non-meat]').change(function () {
        pizza.non_meats = $('input:checkbox[name=non-meat]:checked').map(function () {
            return this.value;
        }).get();
        console.log(pizza);
    });

    $('#build').on('click', function () {
        pizza.size.indexOf()
    });



});