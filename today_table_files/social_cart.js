/*
 * $Id: social_cart.js 6882 2016-05-13 01:20:08Z ysimizu $
 */

//------------------------------------------------------------
// �����Ȥ򹹿�����(checkbox)
//------------------------------------------------------------
function save_cart_checkbox( _group, _item_id, _item_value, _client_data, _checked )
{
    console.log('save_cart_checkbox(%s,%s,%s,%s,%s)',_group,_item_id,_item_value,_client_data,_checked);

    if(true == _checked){
	cart_add_item( _group, _item_id, _item_value, '', _client_data );
    }else{
	cart_remove_item( _group, _item_id );
    }
}

//------------------------------------------------------------
// �����ȤΥ����ƥ�����������
//------------------------------------------------------------
function cart_get_itemcount( _group, _callback )
{
    console.log('cart_get_itemcount(%s,%O)',_group,_callback);

    var _data = { pid : 'api_post_social_cart' };
    _data.input  = 'UTF-8';
    _data.output = 'jsonp';
    _data.action = 'count';
    _data.group = _group; 
    jQuery.ajax( { type     : 'POST',
		   url      : _action_api_url,
		   data     : _data,
		   dataType : _data.output,
		   success  : function( json )
                   {
                       if(json.status == 'NG'){
                           console.log('status:NG reason: %s',json.reason);
		       }else if(undefined != _callback){
			   _callback( json.data );
		       }
                   },
		   error  : function(XMLHttpRequest, textStatus, errorThrown)
                   {
		       console.log('XMLHttpRequest: %O',XMLHttpRequest);
		       console.log('textStatus: %s',textStatus);
		   }
		 } );
}

//------------------------------------------------------------
// ���������Ƥ��������
//------------------------------------------------------------
function cart_get_itemlist( _group, _callback )
{
    console.log('cart_get_itemlist(%s,%O)',_group, _callback);

    var _data = { pid : 'api_post_social_cart' };
    _data.input  = 'UTF-8';
    _data.output = 'jsonp';
    _data.action = 'get';
    _data.group = _group; 
    jQuery.ajax( { type     : 'POST',
		   url      : _action_api_url,
		   data     : _data,
		   dataType : _data.output,
		   success  : function( json )
                   {
                       if(json.status == 'NG'){
                           console.log('status:NG reason: %s',json.reason);
		       }else if(undefined != _callback){
			   _callback( json.data );
		       }
                   },
		   error  : function(XMLHttpRequest, textStatus, errorThrown)
                   {
		       console.log('XMLHttpRequest: %O',XMLHttpRequest);
		       console.log('textStatus: %s',textStatus);
		   }
		 } );
}

//------------------------------------------------------------
// �����Ȥ˥����ƥ���ɲá���������
//------------------------------------------------------------
function cart_add_item( _group, _item_id, _item_value, _item_price, _client_data, _callback, _callback_err )
{
    console.log('cart_add_item(%s,%s,%s,%s,%s,%O,%O)',_group, _item_id, _item_value, _item_price, _client_data, _callback,_callback_err);

    var _data = { pid : 'api_post_social_cart' };
    _data.input     = 'UTF-8';
    _data.output    = 'jsonp';
    _data.action    = 'add';
    _data.group     = _group; 
    _data.item_id   = _item_id; 
    _data.item_value  = _item_value; 
    _data.item_price  = _item_price; 
    _data.client_data = _client_data; 
    jQuery.ajax( { type     : 'POST',
		   url      : _action_api_url,
		   data     : _data,
		   dataType : _data.output,
		   success  : function( data )
                   {
                       if(data.status == 'NG'){
                           console.log('status:NG reason: %s',data.reason);
			   if(undefined != _callback_err){
			       _callback_err( data );
			   }
                       }else{
                           console.log('status: %s ',data.status);
			   if(undefined != _callback){
			       _callback( data.data );
			   }
		       }
                   },
		   error  : function(XMLHttpRequest, textStatus, errorThrown)
                   {
		       console.log('XMLHttpRequest: %O',XMLHttpRequest);
		       console.log('textStatus: %s',textStatus);
		   }
		 } );
}
//-- Ʊ����ǥ�
function cart_add_item_sync( _group, _item_id, _item_value, _item_price, _client_data )
{
    console.log('cart_add_item_sync(%s,%s,%s,%s,%s)',_group, _item_id, _item_value, _item_price, _client_data);

    var dfd = $.Deferred();
    var _data = { pid : 'api_post_social_cart' };
    _data.input     = 'UTF-8';
    _data.output    = 'jsonp';
    _data.action    = 'add';
    _data.group     = _group; 
    _data.item_id   = _item_id; 
    _data.item_value  = _item_value; 
    _data.item_price  = _item_price; 
    _data.client_data = _client_data; 

    var ret = $.ajax({
        type: 'POST',
        url: _action_api_url,
	data: _data,
        async: false,
        dataType: _data.output
    }).done(function(response){
	console.log('response: %O',response);
    });
    return dfd.promise();
}

//------------------------------------------------------------
// �����Ȥ��饢���ƥ��������
// _item_id: ʣ�������ǽ
//------------------------------------------------------------
function cart_remove_item( _group, _item_id, _callback )
{
    console.log('cart_remove_item(%s,%s,%O)',_group, _item_id, _callback);

    var _data = { pid : 'api_post_social_cart' };
    _data.input     = 'UTF-8';
    _data.output    = 'jsonp';
    _data.action    = 'remove';
    _data.group     = _group; 
    _data.item_id   = _item_id; 
    jQuery.ajax( { type     : 'POST',
		   url      : _action_api_url,
		   data     : _data,
		   dataType : _data.output,
		   success  : function( data )
                   {
		       if(data.status == 'NG'){
                           console.log('status:NG reason: %s',data.reason);
		       }else if(undefined != _callback){
			   _callback();
		       }
                   },
		   error  : function(XMLHttpRequest, textStatus, errorThrown)
                   {
		       console.log('XMLHttpRequest: %O',XMLHttpRequest);
		       console.log('textStatus: %s',textStatus);
		   }
		 } );
}

//------------------------------------------------------------
// �����Ȥ򥯥ꥢ����
//------------------------------------------------------------
function cart_clear_item( _group, _callback )
{
    console.log('cart_clear_item(%s,%O)',_group, _callback);

    var _data = { pid : 'api_post_social_cart' };

    _data.input     = 'UTF-8';
    _data.output = 'jsonp';
    if(undefined == _group){
	_data.action = 'clear_all';
    }else{
	_data.action = 'clear';
    }
    _data.group = _group; 
    jQuery.ajax( { type     : 'POST',
		   url      : _action_api_url,
		   data     : _data,
		   dataType : _data.output,
		   success  : function( data )
                   {
                       if(data.status == 'NG'){
                           console.log('status:NG reason: %s',data.reason);
		       }else if(undefined != _callback){
			   _callback();
		       }
                   },
		   error  : function(XMLHttpRequest, textStatus, errorThrown)
                   {
		       console.log('XMLHttpRequest: %O',XMLHttpRequest);
		       console.log('textStatus: %s',textStatus);
		   }
		 } );
}
//-- Ʊ����ǥ�
function cart_clear_item_sync( _group )
{
    console.log('cart_clear_item_sync(%s)',_group);

    var dfd = $.Deferred();
    var _data = { pid : 'api_post_social_cart' };
    _data.input     = 'UTF-8';
    _data.output = 'jsonp';
    if(undefined == _group){
	_data.action = 'clear_all';
    }else{
	_data.action = 'clear';
    }
    _data.group = _group; 
    var ret = $.ajax({
        type: 'POST',
        url: _action_api_url,
	data: _data,
        async: false,
        dataType: _data.output
	//    }).responseText;
    }).done(function(response){
	console.log('response: %O',response);
    });
    return dfd.promise();
}

//------------------------------------------------------------
// �֥饦������¸���줿cookie�����
//------------------------------------------------------------
function getCookie(key,	tmp1, tmp2, xx1, xx2, xx3) {
    tmp1 = " " + document.cookie + ";";
    xx1 = xx2 = 0;
    len = tmp1.length;
    while (xx1 < len) {
	xx2 = tmp1.indexOf(";", xx1);
	tmp2 = tmp1.substring(xx1 + 1, xx2);
	xx3 = tmp2.indexOf("=");
	if (tmp2.substring(0, xx3) == key) {
	    return(unescape(tmp2.substring(xx3 + 1, xx2 - xx1 - 1)));
	}
	xx1 = xx2 + 1;
    }
    return("");
}

//------------------------------------------------------------
// URL�ѥ�᡼������Ϥ���������֤�
// _href: ���Ϥ���URL�����ꤷ�ʤ���硢���ߤ�URL
//------------------------------------------------------------
function get_url_query( _href ) {
    var delimiter = '&';
    var slice_point;
    if(undefined == _href){
        slice_point = window.location.href.indexOf('?');
    }else{
        slice_point = _href.indexOf('?');
    }
    if (slice_point < 0) {
        console.log("Not found query String.");
        return null;
    }
    var url_params;
    if(undefined == _href){
        url_params = window.location.href.slice(slice_point + 1).split(delimiter);
    }else{
        url_params = _href.slice(slice_point + 1).split(delimiter);
    }
    var query_strings = {};
    for(var i in url_params) {
        var query_string = url_params[i].split('=');
        query_strings[query_string[0]] = query_string[1];
    }
    return query_strings;
}
