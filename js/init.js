(function($){
  $(function(){

   // $('.button-collapse').sideNav();
	
      $(document).ready(function() {
		$('select').material_select();
		
		$('.collapsible').collapsible({
		   accordion : false
		});
	  });

  }); // end of document ready
  
})(jQuery); // end of jQuery name space
