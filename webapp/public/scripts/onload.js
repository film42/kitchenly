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
  		var cityList = ['Baltimore, MD', 'Boston, MA', 'New York, NY', 'Tampa Bay, FL', 'Chicago', 'Cleveland, OH', 'Detroit, MI', 'Kansas City, MO', 'Los Angeles, CA', 'Oakland, CA', 'Seattle, WA', 'Houston, TX ', 'Provo, UT', 'Salt Lake City, UT', 'Ogden, UT', 'Orem, UT', 'Sandy, UT', 'West Jordan, UT', 'Saint George, UT'].sort();
  		$('#location').typeahead({source: cityList, items:5});
  		
});