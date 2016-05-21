$(document).ready(function(){
    $("#test").click(function(){
        $.ajax({
			url: 'http://localhost/database.json',
            success: function(res){
                console.log(res)
            }
		
		})
    })
})