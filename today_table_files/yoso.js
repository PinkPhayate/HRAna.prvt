
/*
 *  $Id: yoso.action.js 7764 2016-06-22 08:37:13Z ysimizu $
 */

//------------------------------------------------------------
// ͽ�۾��ʥꥹ�ȸ���(ͽ�۲���)
//------------------------------------------------------------
function ShowGoodsListByYosoka( _show_id, _yosoka_id, _ary_kaisai_id, _sort, _limit, _api_url )
{
    console.log('ShowGoodsListByYosoka(%s,%s,%O,%s,%s,%s)',_show_id,_yosoka_id,_ary_kaisai_id,_sort,_limit,_api_url);

    var _data = { pid : 'api_get_goods_list' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.cond_type  = 'y';	// ͽ�۲ȼ��θ���
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
// ͽ�۾��ʥꥹ�ȸ���(�졼����)
//------------------------------------------------------------
function ShowGoodsListByRace( _show_id, _race_id, _sort, _limit, _more_url, _api_url )
{
    console.log('ShowGoodsListByRace(%s,%s,%s,%s,%s,%s)',_show_id,_race_id,_sort,_limit,_more_url,_api_url);

    var _data = { pid : 'api_get_goods_list' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.cond_type  = 'r';	// �졼�����θ���
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
// ����ͽ�ۥȥå��Ѥ����ھ���
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
// ͽ�۾��ʿ�(�졼����)
//------------------------------------------------------------
function countGoodsByRace( _ary_race_id, _callback  )
{
    console.log('getGoodsCountByRace(%O,%O)',_ary_race_id,_callback);

    var _data = { pid : 'api_post_goods' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.action      = 'count';
    _data.cond_type  = 'r';	// �졼�����θ���
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
// �ѥå����ʸ���(�졼����)
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
// �ѥå����ʸ���(���ʳ�ǧ)
//------------------------------------------------------------
function ShowPackByYosoConfirm( _show_id, _kaisai_date )
{
    console.log('ShowPackByRace(%s,%s)',_show_id, _race_id);

    var _data = { pid : 'api_get_pack' };
    _data.input       = 'UTF-8';
    _data.output      = 'jsonp';
    _data.show_id     = _show_id;
    _data.type        = '2';    //���ʳ�ǧ(Ʊ���Υѥå�����ɽ��)
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
// ͽ�۾���(�Ϸ����᡼��)����
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
// ��������
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
// �ݥ������������
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
// �ݥ���ȻĹ����
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
// ���������å�
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
// ����å���Х�Ƚ��ꥹ�ȼ���
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
// ͽ�۰�����
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
// ͽ�۲ȥ֥å��ޡ����ꥹ��
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
// ������������Ͽ�桼����ɽ��
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

