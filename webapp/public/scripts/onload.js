$(document).ready(function() {
      $('#calendar-picker').hide();
      
      $('#date-time').focusin( function(){
        $('#calendar-picker').show();
      });
      
//      $('#date-time').focusout( function(){
//        $('#calendar-picker').hide();
//      });
      		
//  		$('.typeahead').typeahead({
//  		    source: function (query, process) {
//  		        return $.get('http://gd.geobytes.com/AutoCompleteCity?callback=?&q=',{query: query}, function (data) {
//  		            return process(data.options);
//  		        });
//  		    }
//  		});
  		
  		var allCities = ['Baltimore, MD', 'Boston, MA', 'New York, NY', 'Tampa Bay, FL', 'Chicago', 'Cleveland, OH', 'Detroit, MI', 'Kansas City, MO', 'Los Angeles, CA', 'Oakland, CA', 'Seattle, WA', 'Houston, TX ', 'Provo, UT', 'Salt Lake City, UT', 'Ogden, UT', 'Orem, UT', 'Sandy, UT', 'West Jordan, UT', 'Orem, UT', 'Saint George, UT'].sort();
  		$('#location').typeahead({source: allCities, items:8});
});