//
// �桼�����Υե�������.
//
// @package netkeiba.com
// @subpackage prof.netkeiba.com
// @author nishiyama <nishiyama@netdreamers.co.jp>
//
// _user_action_api_url �ѿ��ϡ��ƤӽФ�¦�ǻ����˥��åȤ��Ƥ���.
//
function addFollowAction( update_id, user_id, replace )
{
    var dofile      = _user_action_api_url + '/' + '?pid=relationship_action&action=add_following&id=' + user_id;

    $.ajax({
        type        : 'GET',
        url         : dofile,
        dataType    : 'jsonp',
        jsonp       : 'callBack',
        success     : function( json )
            {
                $( "span." + update_id ).html( replace );
            },
        complete    : function( json )
            {
            },
        error       : function( json )
            {
            }
    });
}

function hasAlert( update_id )
{
    var dofile      = _user_action_api_url + '/' + '?pid=check_alert';

    $.ajax({
        type        : 'GET',
        url         : dofile,
        dataType    : 'jsonp',
        jsonp       : 'callBack',
        success     : function( json )
            {
                $( "#" + update_id ).text( json.text );
            },
        complete    : function( json )
            {
            },
        error       : function( json )
            {
            }
    });
}

/**
 * �����ĥ����ȥե������ɽ������
 */
function showMessageBoardCommentForm( _show_id, _id )
{

    var _data = { pid : 'api_get_message_board_form' };

    _data.input  = 'UTF-8';
    _data.output = 'jsonp';

    if ( undefined != _id )
    {
        _data.id = _id;
    }

    jQuery.ajax({
            type    :   'GET', 
            url     :   _user_action_api_url,
            data    :   _data, 
            dataType    :   'jsonp', 
            success :   function( data )
            {
                jQuery( '#' + _show_id ).html( data );
            }
        } );

}

/**
 * �����ĤΥ����ȥꥹ�Ȥ�ɽ��
 */
function showMessageBoardCommentList( _show_id, _limit, _id )
{
    var _data = { pid : 'api_get_message_board_comment' };

    _data.output       = 'jsonp';

    if ( undefined != _limit )
    {
        _data.limit = _limit;
    }

    if ( undefined != _id )
    {
        _data.id = _id;
    }

    jQuery.ajax( { type     : 'GET',
            url      : _user_action_api_url,
            data     : _data,
            dataType : 'jsonp',
            success  : function( data )
            {
                jQuery( '#' + _show_id ).html( data );
            }
     } );

}

/**
 * ���������
 * @param string  _sns_user_id	            sns_user_id(ˬ���)
 * @param string  _owner_sns_user_id        sns_user_id(ˬ����)
 * @param string  _comment_area_id	        �����ȥ��ꥢ��ID
 * @param string  _is_refresh_list	        �����ȥꥹ�Ȥ򹹿����뤫�ɤ���
 * @param string  _refresh_limit	        �����ȥꥹ�Ȥ򹹿��������ɽ�����륳���ȿ�
 *
 */
function postMsgBoard( _sns_user_id, _owner_sns_user_id, _comment_area_id, _is_refresh_list, _refresh_limit )
{

  var _cmmnt_text = $( '#' + _comment_area_id ).val();

  if ( 0 == _cmmnt_text.length )
  {
    alert( '�����Ȥ����Ϥ��Ƥ���������' );
    return;
  }
  else if ( 140 < _cmmnt_text.length )
  {
    alert( "�����Ȥ�140ʸ����������Ϥ��Ƥ���������\n���ߤ�����ʸ������" + _number_format( _cmmnt_text.length ) + "ʸ��" );
    return;
  }
  else if ( _is_ngword( _cmmnt_text ) )
  {
    alert( '�����Ȥ���Ŭ�ڤ�ɽ�����ޤޤ�Ƥ���ޤ�������ǧ����������' );
    return;
  }

  var _data = { pid : 'api_post_msg_borad_comment' };

  _data.input             = 'UTF-8';
  _data.output            = 'jsonp';
  _data.sns_user_id       = _sns_user_id;
  _data.owner_sns_user_id = _owner_sns_user_id;
  _data.message           = _cmmnt_text;

  jQuery.ajax( { type     : 'POST',
            url      : _user_action_api_url,
            data     : _data,
            dataType : _data.output,
            async: true,
            success  : function( data )
                       {
                            if( _is_refresh_list == 1 )
                            {
                              showMessageBoardCommentList( 'message_board_list', _refresh_limit, _owner_sns_user_id );
                              $( '#' + _comment_area_id ).val('');
                            }
                       }
         } );

}

/**
 * NG��ɤ��ޤޤ�Ƥ��뤫�ɤ���
 *
 * @param  string  _str ʸ����
 * @return boolean      true=NG��ɤ��� false=NG��ɤʤ�
 */
function _is_ngword( _str )
{
  var _data = { pid : 'api_get_ngword' };

  _data.input  = 'UTF-8';
  _data.output = 'jsonp';

  var _ngword = false;

  jQuery.ajax( { type     : 'POST',
            url      : _user_action_api_url,
            data     : _data,
            dataType : _data.output,
            async    : false,
            success  : function( json )
                       {
                         jQuery.each( json.data.list, function( _key, _value ) {
                           var _reg = new RegExp( _value );
                           if ( _str.match( _reg ) )
                           {
                             _ngword = true;
                             return true;
                           }
                         } );
                       }
          } );
  return _ngword;
}
