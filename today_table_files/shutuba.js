
/*
 * $Id: shutuba.js 4114 2015-09-03 08:18:17Z matsushima $
 */

function init_select_mark( _cart )
{
    //console.log('init_select_menu');

    var ary_item = new Object();

    for(var item_id in _cart)
    {
        if (item_id == '_utm') continue;     //更新時刻は飛ばす
    	var tmp = _cart[item_id]['_cd'];
    	var mark = tmp.split('_');
    	ary_item[ item_id ] = mark[1];
    	//console.log('item_id='+item_id+' client_data='+ary_item[ item_id ]);

        var mark_val=0;
    	switch(mark[1])
    	{
    	case "0":
    		mark_val="0";
    		break;
    	case "1":
    		mark_val="1";
    		break;
    	case "2":
    		mark_val="2";
    		break;
    	case "3":
    		mark_val="3";
    		break;
    	case "4":
    		mark_val="4";
    		break;
    	case "5":
    		mark_val="5";
    		break;
    	case "98":
    		mark_val="4";
    		break;
    	case "99":
    		mark_val="6";
    		break;
    	}

        //印の表示設定
	    $('#'+item_id).val(mark_val);
    }
    
    //カートとDBの更新日付を比較
    var db_dtm = new Date(_shutuba_update_datetime);
    var cart_dtm   = new Date(_cart['_utm']);
    
    if(cart_dtm > db_dtm && _shutuba_auth_flg)
    {
        //カートの更新時刻が新しい場合のみDB更新
        //(YosoMark()は出馬表テンプレート内のjs)
        YosoMark( $('#shutuba')[0], _shutuba_auth_flg);
    }
}

//-- カートを更新する(checkbox)
function update_cart_checkbox( _group, _name, _value, _mode )
{
    //console.log('update_cart_checkbox');
    //console.log('_group='+_group+' _name='+_name+' _value='+_value+' _mode='+_mode);
    var ary_client_data = _value;
    if(_mode == 'add'){
	cart_add_item( _group, _name, 1, 0, ary_client_data );
    }else if(_mode == 'remove'){
	cart_remove_item( _group, _name );
    }
}

