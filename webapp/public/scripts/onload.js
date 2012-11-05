$(document).ready(function() {

    var calHTML = $('#calendar-picker-contain').html();
    $('#calendar-picker-contain').remove();
    
    $('#date-time').popover({
      html: true,
      content: calHTML
    });
    
    $('#date-time').blur( function(){
      $('#date-time').popover('hide');
    });
    
    
    $('#guest-number-picker .dropdown-menu li a').click( function(){
      $('#guest-number-picker .dropdown-menu li a').removeClass('active');
      $(this).addClass('active');
      $('#guest-number-picker .dropdown-toggle span.num').html($(this).html());
    });

  // list of cities for typeahead feature 		
  		var cityList = ['Baltimore, MD', 'Boston, MA', 'New York, NY', 'Tampa Bay, FL', 'Chicago', 'Cleveland, OH', 'Detroit, MI', 'Kansas City, MO', 'Los Angeles, CA', 'Oakland, CA', 'Seattle, WA', 'Houston, TX ', 'Provo, Utah', 'Salt Lake City, Utah', 'Ogden, Utah', 'Orem, Utah', 'Sandy, Utah', 'West Jordan, Utah', 'Saint George, Utah'].sort();
  		$('#location').typeahead({source: cityList, items:5});


    $('.searchly').submit(function(e) {
      e.preventDefault();

      var query = "search/?";

      var loc = $("#city-picker input").val();
      if(loc != "") {
        var arr =loc.split(",");
        arr[1] = arr[1].replace(" ","");
        query += "&city="+arr[0]+"&state="+arr[1];
      }

      var guests = $("#guest-number-picker .dropdown-toggle .num").html();
      guests = guests.slice(0,1);
      if(guests != 1)
        query += "&guests="+guests;

      window.location = query;

    });

  		
});