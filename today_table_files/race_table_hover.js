$(function(){
	$(".race_result table.race_table_01 tr:even").addClass("even");
	$(".race_result table.race_table_01 tr").hover(function(){
		$(this).addClass("hover");
	},
	function(){
		$(this).removeClass("hover");
	}
	);
});
$(function(){
	$("table.soutei_tb tr:even").addClass("even");
	$("table.soutei_tb tr").hover(function(){
		$(this).addClass("hover");
	},
	function(){
		$(this).removeClass("hover");
	}
	);
});
$(function(){
	$("table.race_table_old tr:odd").addClass("even");
	$("table.race_table_old tr").hover(function(){
		$(this).addClass("hover");
	},
	function(){
		$(this).removeClass("hover");
	}
	);
});
