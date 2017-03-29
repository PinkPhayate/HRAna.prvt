$(function(){
	$("table.race_table_01 tr:even").addClass("even");
	$("table.race_table_01 tr").hover(function(){
		$(this).addClass("hover");
	},
	function(){
		$(this).removeClass("hover");
	}
	);
});
$(function(){
	$("table.db_h_race_results tr:even").addClass("even");
	$("table.db_h_race_results tr").hover(function(){
		$(this).addClass("hover");
	},
	function(){
		$(this).removeClass("hover");
	}
	);
});
