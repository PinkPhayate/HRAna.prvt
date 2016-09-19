
/*
 *  $Id: yoso.action.js 7764 2016-06-22 08:37:13Z ysimizu $
 */

//------------------------------------------------------------
// 予想商品リスト検索(予想家別)
//------------------------------------------------------------
function ShowGoodsListByYosoka( _show_id, _yosoka_id, _ary_kaisai_id, _sort, _limit, _api_url )
{
    console.log('ShowGoodsListByYosoka(%s,%s,%O,%s,%s,%s)',_show_id,_yosoka_id,_ary_kaisai_id,_sort,_limit,_api_url);

    var _data = { pid : 'api_get_goods_list' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.cond_type  = 'y';	// 予想家軸の検索
    _data.yosoka_id   = _yosoka_id;
    _data.kaisai_id   = _ary_kaisai_id;
    if(undefined != _sort){
	_data.sort   = _sort;
    }
    if(undefined != _limit){
	_data.limit  = _limit;
    }
    if(undefined != _api_url){
        _action_api_url = _api_url;
    }

    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                $("#"+_show_id).html( data )

            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// 予想商品リスト検索(レース別)
//------------------------------------------------------------
function ShowGoodsListByRace( _show_id, _race_id, _sort, _limit, _more_url, _api_url )
{
    console.log('ShowGoodsListByRace(%s,%s,%s,%s,%s,%s)',_show_id,_race_id,_sort,_limit,_more_url,_api_url);

    var _data = { pid : 'api_get_goods_list' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.cond_type  = 'r';	// レース軸の検索
    _data.race_id   = _race_id;
    if(undefined != _sort){
	_data.sort   = _sort;
    }
    if(undefined != _limit){
	_data.limit   = _limit;
    }
    if(undefined != _more_url){
        _data.more_url = _more_url;
    }
    if(undefined != _api_url){
        _action_api_url = _api_url;
    }
    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                $("#"+_show_id).html( data )

            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// 厳選予想トップ用の売れ筋商品
//------------------------------------------------------------
function ShowGoodsListBySales( _show_id )
{
    console.log('ShowGoodsListBySales(%s)',_show_id);
    
    var _data = { pid : 'api_get_goods_list' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.cond_type  = 'sales';
    $.ajax({type     : 'POST',
	    url      : _action_api_url,
	    data     : _data,
	    dataType : _data.output,
	    success:function( data ){
		$("#"+_show_id).html( data )
		
	    }, error: function( XMLHttpRequest, textStatus, errorThrown)
	    {
		console.log('XMLHttpRequest: %O',XMLHttpRequest);
		console.log('textStatus: %O',textStatus);
	    }
	   });
}

//------------------------------------------------------------
// 予想商品数(レース別)
//------------------------------------------------------------
function countGoodsByRace( _ary_race_id, _callback  )
{
    console.log('getGoodsCountByRace(%O,%O)',_ary_race_id,_callback);

    var _data = { pid : 'api_post_goods' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.action      = 'count';
    _data.cond_type  = 'r';	// レース軸の検索
    _data.race_id   = _ary_race_id;
    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( json ){
                 if(json.status == 'NG'){
                     console.log('status:NG reason:'+ json.reason);
		 }else if(undefined != _callback){
		     _callback( json.data );
		 }
            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// パック商品検索(レース別)
//------------------------------------------------------------
function ShowPackByRace( _show_id, _race_id )
{
    console.log('ShowPackByRace(%s,%s)',_show_id, _race_id);

    var _data = { pid : 'api_get_pack' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.type        = '1';
    _data.race_id     = _race_id;

    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                $("#"+_show_id).html( data )

            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// パック商品検索(商品確認)
//------------------------------------------------------------
function ShowPackByYosoConfirm( _show_id, _kaisai_date )
{
    console.log('ShowPackByRace(%s,%s)',_show_id, _race_id);

    var _data = { pid : 'api_get_pack' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.type        = '2';    //商品確認(同日のパックを一括表示)
    _data.kaisai_date = _kaisai_date;

    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                $("#"+_show_id).html( data )

            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// 予想商品(馬券イメージ)取得
//------------------------------------------------------------
function getBakenImage( _ary_yoso_id, _callback  )
{
    console.log('getBakenImage(%O,%O)',_ary_yoso_id,_callback);

    var _data = { pid : 'api_get_baken_view' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.yoso_id     = _ary_yoso_id;
    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( json ){
                 if(json.status == 'NG'){
                     console.log('status:NG reason:'+ json.reason);
		 }else if(undefined != _callback){
		     _callback( json.data );
		 }
            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// 購入履歴
//------------------------------------------------------------
function ShowPurchaseHistory( _show_id, _sort, _limit, _page, _pager_url, _callback )
{
    console.log('ShowPurchaseHistory(%s,%s,%s,%s,%s,%O)',_show_id, _sort, _limit, _page, _pager_url, _callback );

    var _data = { pid : 'api_get_purchase_history' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.sort        = _sort;
    _data.limit       = _limit;
    _data.page        = _page;
    _data.pager_url   = _pager_url;

    $.ajax({type     : 'GET',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                _callback(data,_show_id);
            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// ポイント利用履歴
//------------------------------------------------------------
function ShowPointHistory( _show_id, _sort, _limit, _page, _pager_url, _callback )
{
    console.log('ShowPointHistory(%s,%s,%s,%s,%s,%O)',_show_id, _sort, _limit, _page, _pager_url, _callback );

    var _data = { pid : 'api_get_point_history' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.sort        = _sort;
    _data.limit       = _limit;
    _data.page        = _page;
    _data.pager_url   = _pager_url;

    $.ajax({type     : 'GET',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                 _callback(data, _show_id);
            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// ポイント残高取得
//------------------------------------------------------------
function getUserPoint( _callback )
{
    console.log('getCurPoint(%O)',_callback);

    var _data = { pid : 'api_get_user_point' };
    _data.input     = 'UTF-8';
    _data.output = 'jsonp';
    $.ajax({ type     : 'POST',
	     url      : _action_api_url,
	     data     : _data,
	     dataType : _data.output,
	     success  : function( json )
             {
                 if(json.status == 'NG'){
                     console.log('status:NG reason:'+ json.reason);
		 }else if(undefined != _callback){
		     _callback( json.data );
		 }
             },
	     error  : function(XMLHttpRequest, textStatus, errorThrown)
             {
                 console.log('XMLHttpRequest: %O',XMLHttpRequest);
		 console.log('textStatus: %O',textStatus);
	     }
	   });
}

//------------------------------------------------------------
// 購入チェック
//------------------------------------------------------------
function checkPurchesItem( _ary_item_id, _callback )
{
    console.log('checkPurchesItem(%O,%O)',_ary_item_id,_callback);

    var _data = { pid : 'api_post_purchase' };
    _data.input     = 'UTF-8';
    _data.output = 'jsonp';
    _data.action = 'check';
    _data.item_id = _ary_item_id;
    $.ajax({ type     : 'POST',
	     url      : _action_api_url,
	     data     : _data,
	     dataType : _data.output,
	     success  : function( json )
             {
                 if(json.status == 'NG'){
                     console.log('status:NG reason:'+ json.reason);
		 }else if(undefined != _callback){
		     _callback( json.data );
		 }
             },
	     error  : function(XMLHttpRequest, textStatus, errorThrown)
             {
                 console.log('XMLHttpRequest: %O',XMLHttpRequest);
		 console.log('textStatus: %O',textStatus);
	     }
	   });
}

//------------------------------------------------------------
// キャッシュバンク判定リスト取得
//------------------------------------------------------------
function getCashbackList( _item_id, _callback )
{
    console.log('getCashbackList(%s,%O)',_item_id,_callback);

    var _data = { pid : 'api_post_purchase' };
    _data.input     = 'UTF-8';
    _data.output = 'jsonp';
    _data.action = 'cashback_stat';
    _data.item_id = _item_id;
    $.ajax({ type     : 'POST',
	     url      : _action_api_url,
	     data     : _data,
	     dataType : _data.output,
	     success  : function( json )
             {
                 if(json.status == 'NG'){
                     console.log('status:NG reason:'+ json.reason);
		 }else if(undefined != _callback){
		     _callback( json.data );
		 }
             },
	     error  : function(XMLHttpRequest, textStatus, errorThrown)
             {
                 console.log('XMLHttpRequest: %O',XMLHttpRequest);
		 console.log('textStatus: %O',textStatus);
	     }
	   });
}

//------------------------------------------------------------
// 予想印取得
//------------------------------------------------------------
function ShowYosoMarkList( _show_table_id, _race_id, _tag)
{
    var _data = { pid : 'api_get_yoso_marklist' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.race_id   = _race_id;
    _data.tag       = _tag;

    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                $('table#' + _show_table_id + ' tbody').append(data);
            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

//------------------------------------------------------------
// 予想家ブックマークリスト
//------------------------------------------------------------
function ShowYosokaBookmark( _show_id )
{
    console.log('ShowYosokaBookmark(%s)',_show_id);

    var _data = { pid : 'api_get_yosoka_bookmark' };
    _data.input     = 'UTF-8';
    _data.output = 'jsonp';
    _data.show_id= _show_id;
    $.ajax({ type     : 'POST',
	     url      : _action_api_url,
	     data     : _data,
	     dataType : _data.output,
	     success  : function( data )
             {
                $("#"+_show_id).html( data )
             },
	     error  : function(XMLHttpRequest, textStatus, errorThrown)
             {
                 console.log('XMLHttpRequest: %O',XMLHttpRequest);
		 console.log('textStatus: %O',textStatus);
	     }
	   });
}

//------------------------------------------------------------
// お気に入り登録ユーザー表示
//------------------------------------------------------------
function ShowFavoriteUser( _show_id, _yosoka_id )
{
    console.log('ShowFavoriteUser(%s,%s)',_show_id, _yosoka_id);

    var _data = { pid : 'api_get_yosoka_bookmarklist' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.id          = _yosoka_id;

    $.ajax({type     : 'POST',
            url      : _action_api_url,
            data     : _data,
            dataType : _data.output,
            success:function( data ){
                $("#"+_show_id).html( data )

            }, error: function( XMLHttpRequest, textStatus, errorThrown)
            {
                console.log('XMLHttpRequest: %O',XMLHttpRequest);
                console.log('textStatus: %O',textStatus);
            }
    });
}

