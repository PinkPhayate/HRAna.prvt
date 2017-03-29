/**
 * ������������û�
 *
 * @param string  _key            ��ˡ�������
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param string  _category_cd    ���ƥ��꡼������
 */
function access( _key, _subcategory_id, _category_cd )
{
  var _data = { pid : 'api_access' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.key            = _key;
  _data.subcategory_id = _subcategory_id;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data ) {}
          } );
}

/**
 * ���ܥܥ����ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param string  _key            ��ˡ�������
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param string  _notify_title   ���Υ����ȥ�
 * @param string  _notify_url     ����URL
 * @param integer _writer_id      ��Ƽ�SNS�桼����ID
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showAttentionButton( _show_id, _key, _subcategory_id, _notify_title, _notify_url, _writer_id, _category_cd )
{
  var _data = { pid : 'api_get_attention_button' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.key            = _key;
  _data.subcategory_id = _subcategory_id;
  _data.notify_title   = _notify_title;
  _data.notify_url     = _notify_url;

  if ( ! _empty( _writer_id ) )
  {
    _data.writer_id = _writer_id;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ���ܤ���
 *
 * @param string  _key            ��ˡ�������
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param string  _notify_title   ���Υ����ȥ�
 * @param string  _notify_url     ����URL
 * @param string  _replace_word   �ִ�ʸ����
 * @param integer _writer_id      ��Ƽ�SNS�桼����ID
 * @param string  _category_cd    ���ƥ��꡼������
 */
function postAttention( _key, _subcategory_id, _notify_title, _notify_url, _replace_word, _writer_id, _category_cd )
{
  var _data = { pid : 'api_post_attention' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.key            = _key;
  _data.subcategory_id = _subcategory_id;
  _data.notify_title   = _notify_title;
  _data.notify_url     = _notify_url;

  if ( ! _empty( _writer_id ) )
  {
    _data.writer_id = _writer_id;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( 'span.attention_button' ).html( _replace_word );
                         $( 'span.attention_count' ).html( _number_format( _intval( $( 'span.attention_count' ).html() ) + 1 ) );
                       }
          } );
}

/**
 * �����ȿ������ܿ���ɽ��
 *
 * @param string  _show_id       ɽ��ID
 * @param string  _key           ��ˡ�������
 * @param string  _attention_url ���ܰ����ؤ�URL
 * @param string  _category_cd   ���ƥ��꡼������
 */
function showCount( _show_id, _key, _attention_url, _category_cd )
{
  var _data = { pid : 'api_get_count' };

  _data.input  = 'UTF-8';
  _data.output = 'jsonp';
  _data.key    = _key;

  if ( ! _empty( _attention_url ) )
  {
    _data.attention_url = _attention_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ���ܤ��Ƥ��������ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param string  _key         ��ˡ�������
 * @param integer _limit       �������
 * @param integer _page        �ڡ����ֹ�
 * @param string  _pager_url   �ڡ����㡼URL
 * @param string  _category_cd ���ƥ��꡼������
 */
function showAttentionList( _show_id, _key, _limit, _page, _pager_url, _category_cd )
{
  var _data = { pid : 'api_get_attention_list' };

  _data.input  = 'UTF-8';
  _data.output = 'jsonp';
  _data.key    = _key;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _pager_url ) )
  {
    _data.pager_url = _pager_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����ȥե������ɽ��
 *
 * @param string  _show_id         ɽ��ID
 * @param string  _key             ��ˡ�������
 * @param integer _subcategory_id  ���֥��ƥ��꡼ID
 * @param string  _notify_title    ���Υ����ȥ�
 * @param string  _notify_url      ����URL
 * @param integer _max_length      ����ʸ����
 * @param string  _post_function   ��������Ƹ�˼¹Ԥ���ؿ�̾
 * @param string  _default_comment �ǥե���ȥ�����
 * @param string  _category_cd     ���ƥ��꡼������
 */
function showCommentForm( _show_id, _key, _subcategory_id, _notify_title, _notify_url, _max_length, _post_function, _default_comment, _category_cd )
{
  var _data = { pid : 'api_get_comment_form' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.key            = _key;
  _data.subcategory_id = _subcategory_id;
  _data.notify_title   = _notify_title;
  _data.notify_url     = _notify_url;
  _data.max_length     = _max_length;
  _data.post_function  = _post_function;

  if ( ! _empty( _default_comment ) )
  {
    _data.default_comment = _default_comment;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����Ƚ����ե������ɽ��
 *
 * @param string  _show_id       ɽ��ID
 * @param string  _key           ��ˡ�������
 * @param integer _comment_id    ������ID
 * @param integer _max_length    ����ʸ����
 * @param string  _post_function ��������Ƹ�˼¹Ԥ���ؿ�̾
 * @param string  _category_cd   ���ƥ��꡼������
 */
function showUpdateCommentForm( _show_id, _key, _comment_id, _max_length, _post_function, _category_cd )
{
  var _data = { pid : 'api_get_update_comment_form' };

  _data.input         = 'UTF-8';
  _data.output        = 'jsonp';
  _data.key           = _key;
  _data.comment_id    = _comment_id;
  _data.max_length    = _max_length;
  _data.post_function = _post_function;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����Ȥ����
 *
 * @param string   _key                  ��ˡ�������
 * @param integer  _subcategory_id       ���֥��ƥ��꡼ID
 * @param string   _comment_form_id      �����ȥե�����ID
 * @param string   _is_anonymous_form_id ƿ̾��ƥե�����ID
 * @param string   _notify_title         ���Υ����ȥ�
 * @param string   _notify_url           ����URL
 * @param integer  _max_length           ����ʸ����
 * @param funciton _post_function        ��������Ƹ�˼¹Ԥ���ؿ�
 * @param integer  _writer_id            ��Ƽ�SNS�桼����ID
 * @param string   _category_cd          ���ƥ��꡼������
 */
function postComment( _key, _subcategory_id, _comment_form_id, _is_anonymous_form_id, _notify_title, _notify_url, _max_length, _post_function, _writer_id, _category_cd )
{
  $( '#comment_button' ).attr( 'disabled', 'disabled' );

  if ( 0 == $( '#' + _comment_form_id ).val().length )
  {
    alert( '�����Ȥ����Ϥ��Ƥ���������' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( _max_length < $( '#' + _comment_form_id ).val().length )
  {
    alert( "�����Ȥ�" + _max_length + "ʸ����������Ϥ��Ƥ���������\n���ߤ�����ʸ������" + _number_format( $( '#' + _comment_form_id ).val().length ) + "ʸ��" );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }

  _is_ngword( $( '#' + _comment_form_id ).val(),
    function( is_ng ) {
      if ( is_ng )
      {
        alert( '�����Ȥ���Ŭ�ڤ�ɽ�����ޤޤ�Ƥ���ޤ�������ǧ����������' );
        $( '#comment_button' ).removeAttr( 'disabled' );
      }
      else
      {
        var _data = { pid : 'api_post_comment' };

        _data.input          = 'UTF-8';
        _data.output         = 'jsonp';
        _data.key            = _key;
        _data.subcategory_id = _subcategory_id;
        _data.comment        = $( '#' + _comment_form_id ).val();
        _data.is_anonymous   = ( $( '#' + _is_anonymous_form_id ).is( ':checked' ) ) ? 1 : 0;
        _data.notify_title   = _notify_title;
        _data.notify_url     = _notify_url;

        if ( ! _empty( _writer_id ) )
        {
          _data.writer_id = _writer_id;
        }

        if ( ! _empty( _category_cd ) )
        {
          _data.category_cd = _category_cd;
        }

        $.ajax( { type     : 'POST',
                  url      : _bbs_action_api_url,
                  data     : _data,
                  dataType : _data.output,
                  success  : function( data )
                             {
                               $( '#' + _comment_form_id ).val( '' );
                               $( '#' + _is_anonymous_form_id ).removeAttr( 'checked' );
                               $( '#comment_button' ).removeAttr( 'disabled' );
                               $( 'span.comment_count' ).html( _number_format( _intval( $( 'span.comment_count' ).html() ) + 1 ) );
                               _post_function();
                             }
                } );
      }
    }
  );

}

/**
 * �����Ȥ���
 *
 * @param string   _key             ��ˡ�������
 * @param integer  _comment_id      ������ID
 * @param string   _comment_form_id �����ȥե�����ID
 * @param integer  _max_length      ����ʸ����
 * @param funciton _post_function   �����Ƚ�����˼¹Ԥ���ؿ�
 * @param string   _category_cd     ���ƥ��꡼������
 */
function updateComment( _key, _comment_id, _comment_form_id, _max_length, _post_function, _category_cd )
{
  $( '#update_comment_button' ).attr( 'disabled', 'disabled' );

  if ( 0 == $( '#' + _comment_form_id ).val().length )
  {
    alert( '�����Ȥ����Ϥ��Ƥ���������' );
    $( '#update_comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( _max_length < $( '#' + _comment_form_id ).val().length )
  {
    alert( "�����Ȥ�" + _max_length + "ʸ����������Ϥ��Ƥ���������\n���ߤ�����ʸ������" + _number_format( $( '#' + _comment_form_id ).val().length ) + "ʸ��" );
    $( '#update_comment_button' ).removeAttr( 'disabled' );
    return;
  }

  _is_ngword( $( '#' + _comment_form_id ).val(),
    function( is_ng ) {
      if ( is_ng )
      {
        alert( '�����Ȥ���Ŭ�ڤ�ɽ�����ޤޤ�Ƥ���ޤ�������ǧ����������' );
        $( '#update_comment_button' ).removeAttr( 'disabled' );
      }
      else
      {
        var _data = { pid : 'api_update_comment' };

        _data.input      = 'UTF-8';
        _data.output     = 'jsonp';
        _data.key        = _key;
        _data.comment_id = _comment_id;
        _data.comment    = $( '#' + _comment_form_id ).val();

        if ( ! _empty( _category_cd ) )
        {
          _data.category_cd = _category_cd;
        }

        $.ajax( { type     : 'POST',
                  url      : _bbs_action_api_url,
                  data     : _data,
                  dataType : _data.output,
                  success  : function( data )
                             {
                               alert( '�����Ȥ������ޤ�����' );
                               $( '#update_comment_button' ).removeAttr( 'disabled' );
                               _post_function();
                             }
                } );
      }
    }
  );
}

/**
 * �����Ȥ���
 *
 * @param string   _key           ��ˡ�������
 * @param integer  _comment_id    ������ID
 * @param funciton _post_function �����Ⱥ����˼¹Ԥ���ؿ�
 * @param boolean  _is_penalty    true=�ڥʥ�ƥ������� false=�ڥʥ�ƥ����ʤ�
 * @param string   _category_cd   ���ƥ��꡼������
 */
function deleteComment( _key, _comment_id, _post_function, _is_penalty, _category_cd )
{
  if ( ! confirm( "�����Ȥ������ޤ���\n���ٺ�������ȡ������᤹���Ȥ��Ǥ��ޤ���\n\n������Ǥ�����" ) )
  {
    return;
  }

  var _data = { pid : 'api_delete_comment' };

  _data.input      = 'UTF-8';
  _data.output     = 'jsonp';
  _data.key        = _key;
  _data.comment_id = _comment_id;

  if ( ! _empty( _is_penalty ) )
  {
    _data.is_penalty = ( _is_penalty ) ? 1 : 0;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         if ( null != $( 'span.comment_count' ).html() )
                         {
                           $( 'span.comment_count' ).html( _number_format( _intval( $( 'span.comment_count' ).html() ) - 1 ) );
                         }
                         _post_function();
                       }
          } );
}

/**
 * �����Ȱ�����ɽ��
 *
 * @param string  _show_id           ɽ��ID
 * @param integer _sort              �����Ⱦ��(1:����� 2:�����Ϳ���)
 * @param string  _key               ��ˡ�������
 * @param string  _repry_comment_url �ֿ������Ȥؤ�URL
 * @param string  _update_form_id    �����ե�����ID
 * @param integer _max_length        ��������ʸ����
 * @param string  _notify_title      ���Υ����ȥ�
 * @param string  _notify_url        ����URL
 * @param string  _link_type         ��󥯤μ���(m:��äȸ��� p:�ڡ����㡼)
 * @param string  _link_url          ���URL
 * @param string  _post_function     �����Ƚ����ޤ��Ϻ����˼¹Ԥ���ؿ�̾
 * @param string  _report_url        ����URL
 * @param integer _limit             �������
 * @param integer _page              �ڡ����ֹ�
 * @param string  _like_comment_url  �����Ͱ����ؤ�URL
 * @param string  _category_cd       ���ƥ��꡼������
 */
function showCommentList( _show_id, _sort, _key, _repry_comment_url, _update_form_id, _max_length, _notify_title, _notify_url, _link_type, _link_url, _post_function, _report_url, _limit, _page, _like_comment_url, _category_cd, _version )
{
  var _data = { pid : 'api_get_comment_list' };

  _data.input             = 'UTF-8';
  _data.output            = 'jsonp';
  _data.sort              = _sort;
  _data.key               = _key;
  _data.repry_comment_url = _repry_comment_url;
  _data.update_form_id    = _update_form_id;
  _data.max_length        = _max_length;
  _data.notify_title      = _notify_title;
  _data.notify_url        = _notify_url;
  _data.link_type         = _link_type;
  _data.link_url          = _link_url;
  _data.post_function     = _post_function;
  _data.report_url        = _report_url;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _like_comment_url ) )
  {
    _data.like_comment_url = _like_comment_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����Ȱ�����ʰ�ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param integer _sort        �����Ⱦ��(1:����� 2:�����Ϳ���)
 * @param string  _key         ��ˡ�������
 * @param string  _link_url    ��äȸ�����URL
 * @param integer _max_length  ɽ������ʸ����
 * @param integer _limit       �������
 * @param string  _category_cd ���ƥ��꡼������
 */
function showCommentListSimple( _show_id, _sort, _key, _link_url, _max_length, _limit, _category_cd, _version )
{
  var _data = { pid : 'api_get_comment_list_simple' };

  _data.input      = 'UTF-8';
  _data.output     = 'jsonp';
  _data.sort       = _sort;
  _data.key        = _key;
  _data.link_url   = _link_url;
  _data.max_length = _max_length;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����Ȥ�ɽ��
 *
 * @param string  _show_id           ɽ��ID
 * @param string  _key               ��ˡ�������
 * @param integer _comment_id        ������ID
 * @param string  _repry_comment_url �ֿ������Ȥؤ�URL
 * @param string  _update_form_id    �����ե�����ID
 * @param integer _max_length        ��������ʸ����
 * @param string  _notify_title      ���Υ����ȥ�
 * @param string  _notify_url        ����URL
 * @param string  _post_function     �����Ƚ����ޤ��Ϻ����˼¹Ԥ���ؿ�̾
 * @param string  _report_url        ����URL
 * @param string  _like_comment_url  �����Ͱ����ؤ�URL
 * @param string  _category_cd       ���ƥ��꡼������
 */
function showComment( _show_id, _key, _comment_id, _repry_comment_url, _update_form_id, _max_length, _notify_title, _notify_url, _post_function, _report_url, _like_comment_url, _category_cd, _version )
{
  var _data = { pid : 'api_get_comment' };

  _data.input             = 'UTF-8';
  _data.output            = 'jsonp';
  _data.key               = _key;
  _data.comment_id        = _comment_id;
  _data.repry_comment_url = _repry_comment_url;
  _data.update_form_id    = _update_form_id;
  _data.max_length        = _max_length;
  _data.notify_title      = _notify_title;
  _data.notify_url        = _notify_url;
  _data.post_function     = _post_function;
  _data.report_url        = _report_url;

  if ( ! _empty( _like_comment_url ) )
  {
    _data.like_comment_url = _like_comment_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����ͤ򤹤�
 *
 * @param string  _key          ��ˡ�������
 * @param integer _comment_id   ������ID
 * @param string  _notify_title ���Υ����ȥ�
 * @param string  _notify_url   ����URL
 * @param string  _replace_word �ִ�ʸ����
 * @param string  _category_cd  ���ƥ��꡼������
 * @param string  _version      �С������
 */
function postLikeComment( _key, _comment_id, _notify_title, _notify_url, _replace_word, _category_cd, _version )
{
  var _data = { pid : 'api_post_like_comment' };

  _data.input        = 'UTF-8';
  _data.output       = 'jsonp';
  _data.key          = _key;
  _data.comment_id   = _comment_id;
  _data.notify_title = _notify_title;
  _data.notify_url   = _notify_url;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         if( _empty( _data.version ) ) {
                            $( 'span.like_comment_' + _comment_id ).html( _replace_word );
                         } else {
                            $( '.like_comment_' + _comment_id ).html( _replace_word );
                         }
                         $( 'span.like_count_' + _comment_id ).html( _number_format( _intval( $( 'span.like_count_' + _comment_id ).html() ) + 1 ) );
                       }
          } );
}

/**
 * ��ɽ���򤹤�
 *
 * @param string  _key          ��ˡ�������
 * @param integer _comment_id   ������ID
 * @param string  _replace_word �ִ�ʸ����
 * @param string  _category_cd  ���ƥ��꡼������
 * @param string  _version      �С������
 */
function postHiddenComment( _key, _comment_id, _replace_word, _category_cd, _version )
{
  var _data = { pid : 'api_post_hidden_comment' };

  _data.input        = 'UTF-8';
  _data.output       = 'jsonp';
  _data.key          = _key;
  _data.comment_id   = _comment_id;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         if( _empty( _data.version ) ) {
                            $( 'span.hidden_comment_' + _comment_id ).html( _replace_word );
                         } else {
                            $('div.hidden_vote_' + _comment_id ).html( _replace_word );
                         }

                       }
          } );
}

/**
 * ��ɽ�����ä�
 *
 * @param string  _key          ��ˡ�������
 * @param integer _comment_id   ������ID
 * @param string  _replace_word �ִ�ʸ����
 * @param string  _category_cd  ���ƥ��꡼������
 */
function cancelHiddenComment( _key, _comment_id, _replace_word, _category_cd, _version )
{
  var _data = { pid : 'api_cancel_hidden_comment' };

  _data.input        = 'UTF-8';
  _data.output       = 'jsonp';
  _data.key          = _key;
  _data.comment_id   = _comment_id;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         if( _empty( _data.version ) ) {
                            $( 'span.hidden_comment_' + _comment_id ).html( _replace_word );
                         } else {
                            $( 'span.hidden_vote_' + _comment_id ).html( _replace_word );
                         }

                       }
          } );
}

/**
 * �����Ͱ�����ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param string  _key         ��ˡ�������
 * @param integer _comment_id  ������ID
 * @param integer _limit       �������
 * @param integer _page        �ڡ����ֹ�
 * @param string  _pager_url   �ڡ����㡼URL
 * @param string  _category_cd ���ƥ��꡼������
 */
function showLikeCommentList( _show_id, _key, _comment_id, _limit, _page, _pager_url, _category_cd )
{
  var _data = { pid : 'api_get_like_comment_list' };

  _data.input      = 'UTF-8';
  _data.output     = 'jsonp';
  _data.key        = _key;
  _data.comment_id = _comment_id;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _pager_url ) )
  {
    _data.pager_url = _pager_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �����������ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showTotalCount( _show_id, _subcategory_id, _category_cd )
{
  var _data = { pid : 'api_get_total_count' };

  _data.input  = 'UTF-8';
  _data.output = 'jsonp';

  if ( ! _empty( _subcategory_id ) )
  {
    _data.subcategory_id = _subcategory_id;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * �¶������Ȱ�����ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param integer _sort           �����Ⱦ��(1:����� 2:�����Ϳ���)
 * @param string  _bbs_url        �Ǽ��Ĥؤ�URL
 * @param string  _notify_url     ����URL
 * @param string  _link_type      ��󥯤μ���(m:��äȸ��� p:�ڡ����㡼)
 * @param string  _link_url       �ڡ����㡼���URL
 * @param integer _max_length     ɽ������ʸ����
 * @param string  _post_function  �����Ⱥ����˼¹Ԥ���ؿ�̾
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param integer _limit          �������
 * @param integer _page           �ڡ����ֹ�
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showRealtimeCommentList( _show_id, _sort, _bbs_url, _notify_url, _link_type, _link_url, _max_length, _post_function, _subcategory_id, _limit, _page, _category_cd, _version )
{
  var _data = { pid : 'api_get_realtime_comment_list' };

  _data.input         = 'UTF-8';
  _data.output        = 'jsonp';
  _data.sort          = _sort;
  _data.bbs_url       = _bbs_url;
  _data.notify_url    = _notify_url;
  _data.link_type     = _link_type;
  _data.link_url      = _link_url;
  _data.max_length    = _max_length;
  _data.post_function = _post_function;

  if ( ! _empty( _subcategory_id ) )
  {
    _data.subcategory_id = _subcategory_id;
  }

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  if ( ! _empty( _version ) )
  {
    _data.version = _version;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                           if( ! _empty( _version ) && _page > 1 ) {
                            $("#"+_show_id).find("ul").append(data)
                           } else {
                            $( '#' + _show_id ).html( data );
                           }
                       }
          } );
}

/**
 * �¶������Ȥˤ����ͤ򤹤�
 *
 * @param string  _key          ��ˡ�������
 * @param integer _comment_id   ������ID
 * @param string  _notify_title ���Υ����ȥ�
 * @param string  _notify_url   ����URL
 * @param string  _replace_word �ִ�ʸ����
 * @param string  _category_cd  ���ƥ��꡼������
 */
function postRealtimeLikeComment( _key, _comment_id, _notify_title, _notify_url, _replace_word, _category_cd )
{
  var _data = { pid : 'api_post_like_comment' };

  _data.input        = 'UTF-8';
  _data.output       = 'jsonp';
  _data.key          = _key;
  _data.comment_id   = _comment_id;
  _data.notify_title = _notify_title;
  _data.notify_url   = _notify_url;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( 'span.like_comment_' + _key + '_' + _comment_id ).html( _replace_word );
                         $( 'span.like_count_' + _key + '_' + _comment_id ).html( _number_format( _intval( $( 'span.like_count_' + _key + '_' + _comment_id ).html() ) + 1 ) );
                       }
          } );
}

/**
 * �桼������󥭥󥰤�ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param integer _rank           ��󥭥󥰤μ���(1:�����ȿ� 2:�����Ϳ�)
 * @param string  _link_type      ��󥯤μ���(m:��äȸ��� p:�ڡ����㡼)
 * @param string  _link_url       ���URL
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param integer _limit          �������
 * @param integer _page           �ڡ����ֹ�
 * @param string  _history_url    �������ؤ�URL
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showUserRanking( _show_id, _rank, _link_type, _link_url, _subcategory_id, _limit, _page, _history_url, _category_cd )
{
  var _data = { pid : 'api_get_user_ranking' };

  _data.input     = 'UTF-8';
  _data.output    = 'jsonp';
  _data.rank      = _rank;
  _data.link_type = _link_type;
  _data.link_url  = _link_url;

  if ( ! _empty( _subcategory_id ) )
  {
    _data.subcategory_id = _subcategory_id;
  }

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _history_url ) )
  {
    _data.history_url = _history_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ������Υ桼������󥭥󥰤�ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param integer _rank           ��󥭥󥰤μ���(1:�����ȿ� 2:�����Ϳ�)
 * @param string  _link_type      ��󥯤μ���(m:��äȸ��� p:�ڡ����㡼)
 * @param string  _link_url       ���URL
 * @param integer _subcategory_id ���֥��ƥ��꡼ID
 * @param integer _limit          �������
 * @param integer _page           �ڡ����ֹ�
 * @param string  _history_url    �������ؤ�URL
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showUserRankingLastMonth( _show_id, _rank, _link_type, _link_url, _subcategory_id, _limit, _page, _history_url, _category_cd )
{
  var _data = { pid : 'api_get_user_ranking' };

  _data.input     = 'UTF-8';
  _data.output    = 'jsonp';
  _data.rank      = _rank;
  _data.link_type = _link_type;
  _data.link_url  = _link_url;
  _data.period = 'l';

  if ( ! _empty( _subcategory_id ) )
  {
    _data.subcategory_id = _subcategory_id;
  }

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _history_url ) )
  {
    _data.history_url = _history_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ����������ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param integer _sort           �����Ⱦ��(1:����� 2:�����Ϳ���)
 * @param integer _commentator_id ��Ƽ�SNS�桼����ID
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showUserHistoryCount( _show_id, _sort, _commentator_id, _category_cd )
{
  var _data = { pid : 'api_get_user_history_count' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.sort           = _sort;
  _data.commentator_id = _commentator_id;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ��������ɽ��
 *
 * @param string  _show_id        ɽ��ID
 * @param integer _sort           �����Ⱦ��(1:����� 2:�����Ϳ���)
 * @param integer _commentator_id ��Ƽ�SNS�桼����ID
 * @param string  _bbs_url        �Ǽ��Ĥؤ�URL
 * @param string  _link_url       �ڡ����㡼���URL
 * @param string  _post_function  �����Ⱥ����˼¹Ԥ���ؿ�̾
 * @param integer _limit          �������
 * @param integer _page           �ڡ����ֹ�
 * @param string  _category_cd    ���ƥ��꡼������
 */
function showUserHistory( _show_id, _sort, _commentator_id, _bbs_url, _link_url, _post_function, _limit, _page, _category_cd )
{
  var _data = { pid : 'api_get_user_history' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.sort           = _sort;
  _data.commentator_id = _commentator_id;
  _data.bbs_url        = _bbs_url;
  _data.link_url       = _link_url;
  _data.post_function  = _post_function;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ����ե������ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param string  _key         ��ˡ�������
 * @param integer _max_length  ����ʸ����
 * @param string  _category_cd ���ƥ��꡼������
 */
function showReportForm( _show_id, _key, _max_length, _category_cd )
{
  var _data = { pid : 'api_get_report_form' };

  _data.input          = 'UTF-8';
  _data.output         = 'jsonp';
  _data.key            = _key;
  _data.max_length     = _max_length;

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ���󤹤�
 *
 * @param string   _key                ��ˡ�������
 * @param string   _comment_id_form_id ������ID�ե�����ID
 * @param string   _reason_cd_form_id  ������ͳ�ե�����ID
 * @param string   _comment_form_id    �����ȥե�����ID
 * @param integer  _max_length         ����ʸ����
 * @param string   _category_cd        ���ƥ��꡼������
 */
function postReport( _key, _comment_id_form_id, _reason_cd_form_id, _comment_form_id, _max_length, _category_cd )
{
  $( '#comment_button' ).attr( 'disabled', 'disabled' );

  if ( 0 == $( '#' + _comment_id_form_id ).val().length )
  {
    alert( '����ֹ�����Ϥ��Ƥ���������' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( isNaN( $( '#' + _comment_id_form_id ).val() ) || 0 == $( '#' + _comment_id_form_id ).val() )
  {
    alert( '����ֹ�Ͽ��ͤ����Ϥ��Ƥ���������' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( '' == $( '#' + _reason_cd_form_id ).val() )
  {
    alert( '������ͳ�����򤷤Ƥ���������' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( _max_length < $( '#' + _comment_form_id ).val().length )
  {
    alert( "��ͳ���Ҥ�" + _max_length + "ʸ����������Ϥ��Ƥ���������\n���ߤ�����ʸ������" + _number_format( $( '#' + _comment_form_id ).val().length ) + "ʸ��" );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }

  var _data = { pid : 'api_post_report' };

  _data.input      = 'UTF-8';
  _data.output     = 'jsonp';
  _data.key        = _key;
  _data.comment_id = $( '#' + _comment_id_form_id ).val();
  _data.reason_cd  = $( '#' + _reason_cd_form_id ).val();
  _data.comment    = $( '#' + _comment_form_id ).val();

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _comment_id_form_id ).val( '' );
                         $( '#' + _reason_cd_form_id ).val( '' );
                         $( '#' + _comment_form_id ).val( '' );
                         $( '#comment_button' ).removeAttr( 'disabled' );
                         alert( '���󤷤ޤ�����' );
                       }
          } );
}

/**
 * �������ϰϰ�����ɽ��
 *
 * @param string  _show_id           ɽ��ID
 * @param integer _sort              �����Ⱦ��(1:����� 2:��ƽ� 3:�����Ϳ���)
 * @param string  _key               ��ˡ�������
 * @param integer _start_comment_id  ���ϥ�����ID
 * @param integer _end_comment_id    ��λ������ID
 * @param string  _repry_comment_url �ֿ������Ȥؤ�URL
 * @param string  _link_type         ��󥯤μ���(m:��äȸ��� p:�ڡ����㡼)
 * @param string  _link_url          ���URL
 * @param integer _limit             �������
 * @param integer _page              �ڡ����ֹ�
 * @param string  _like_comment_url  �����Ͱ����ؤ�URL
 * @param string  _category_cd       ���ƥ��꡼������
 */
function showCommentRangeList( _show_id, _sort, _key, _start_comment_id, _end_comment_id, _repry_comment_url, _link_type, _link_url, _limit, _page, _like_comment_url, _category_cd )
{
  var _data = { pid : 'api_get_comment_range_list' };

  _data.input             = 'UTF-8';
  _data.output            = 'jsonp';
  _data.sort              = _sort;
  _data.key               = _key;
  _data.start_comment_id  = _start_comment_id;
  _data.end_comment_id    = _end_comment_id;
  _data.repry_comment_url = _repry_comment_url;
  _data.link_type         = _link_type;
  _data.link_url          = _link_url;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _like_comment_url ) )
  {
    _data.like_comment_url = _like_comment_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ��ɽ���桼����������ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param string  _history_url ��ɽ������ؤ�URL
 * @param string  _link_url    �ڡ����㡼���URL
 * @param integer _limit       �������
 * @param integer _page        �ڡ����ֹ�
 * @param string  _category_cd ���ƥ��꡼������
 */
function showHiddenUserList( _show_id, _history_url, _link_url, _limit, _page, _category_cd )
{
  var _data = { pid : 'api_get_hidden_user_list' };

  _data.input       = 'UTF-8';
  _data.output      = 'jsonp';
  _data.history_url = _history_url;
  _data.link_url    = _link_url;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ��ɽ�������ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param integer _sns_user_id SNS�桼����ID
 * @param string  _hidden_url  ��ɽ�������ؤ�URL
 * @param string  _link_url    �ڡ����㡼���URL
 * @param integer _limit       �������
 * @param integer _page        �ڡ����ֹ�
 * @param string  _category_cd ���ƥ��꡼������
 */
function showUserHiddenHistory( _show_id, _sns_user_id, _hidden_url, _link_url, _limit, _page, _category_cd )
{
  var _data = { pid : 'api_get_user_hidden_history' };

  _data.input       = 'UTF-8';
  _data.output      = 'jsonp';
  _data.sns_user_id = _sns_user_id;
  _data.hidden_url  = _hidden_url;
  _data.link_url    = _link_url;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * ��ɽ��������ɽ��
 *
 * @param string  _show_id     ɽ��ID
 * @param string  _key         ��ˡ�������
 * @param integer _comment_id  ������ID
 * @param integer _limit       �������
 * @param integer _page        �ڡ����ֹ�
 * @param string  _pager_url   �ڡ����㡼URL
 * @param string  _category_cd ���ƥ��꡼������
 */
function showHiddenCommentList( _show_id, _key, _comment_id, _limit, _page, _pager_url, _category_cd )
{
  var _data = { pid : 'api_get_hidden_comment_list' };

  _data.input      = 'UTF-8';
  _data.output     = 'jsonp';
  _data.key        = _key;
  _data.comment_id = _comment_id;

  if ( ! _empty( _limit ) )
  {
    _data.limit = _limit;
  }

  if ( ! _empty( _page ) )
  {
    _data.page = _page;
  }

  if ( ! _empty( _pager_url ) )
  {
    _data.pager_url = _pager_url;
  }

  if ( ! _empty( _category_cd ) )
  {
    _data.category_cd = _category_cd;
  }

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            success  : function( data )
                       {
                         $( '#' + _show_id ).html( data );
                       }
          } );
}

/**
 * NG��ɤ��ޤޤ�Ƥ��뤫�ɤ���
 *
 * @param  string  _str ʸ����
 * @param string   _done_function �����å���λ��˼¹Ԥ���ؿ�̾
 * @return boolean true=NG��ɤ��� false=NG��ɤʤ�
 */
function _is_ngword( _str, _done_function )
{
  var _data = { pid : 'api_get_ngword' };

  _data.input  = 'UTF-8';
  _data.output = 'jsonp';

  $.ajax( { type     : 'POST',
            url      : _bbs_action_api_url,
            data     : _data,
            dataType : _data.output,
            async    : false, // dataType: "jsonp" requests do not support synchronous operation.
            success  : function( json )
                       {
                         var _ngword = false;
                         $.each( json.data.list, function( _key, _value ) {
                           var _reg = new RegExp( _value );
                           if ( _str.match( _reg ) )
                           {
                             _ngword = true;
                             return false;
                           }

                         } );

                         if ( undefined != _done_function )
                         {
                           _done_function( _ngword );
                         }
                       }
          } );

  return;
}

/**
 * ���Ǥ��뤫�ɤ���
 *
 * @param  mixd    _var �ѿ�
 * @return boolean      true=���Ǥ��� false=���ǤϤʤ�
 */
function _empty( _var )
{
  if ( undefined == _var || null == _var || '' == _var )
  {
    return true;
  }

  return false;
}

/**
 * ʸ�������ͤˤ���
 *
 * @param  string  _str ʸ����
 * @return integer      ����
 */
function _intval( _str )
{
  return eval( _str.replace( /,/g, '' ) );
}

/**
 * ���ͤ�3��Ƕ��ڤ�ʸ����ˤ���
 *
 * @param  integer _num ����
 * @return string       ʸ����
 */
function _number_format( _num )
{
  return _num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,' );
}
