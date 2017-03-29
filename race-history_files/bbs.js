/**
 * アクセス数を加算
 *
 * @param string  _key            ユニークキー
 * @param integer _subcategory_id サブカテゴリーID
 * @param string  _category_cd    カテゴリーコード
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
 * 注目ボタンを表示
 *
 * @param string  _show_id        表示ID
 * @param string  _key            ユニークキー
 * @param integer _subcategory_id サブカテゴリーID
 * @param string  _notify_title   通知タイトル
 * @param string  _notify_url     通知URL
 * @param integer _writer_id      投稿者SNSユーザーID
 * @param string  _category_cd    カテゴリーコード
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
 * 注目する
 *
 * @param string  _key            ユニークキー
 * @param integer _subcategory_id サブカテゴリーID
 * @param string  _notify_title   通知タイトル
 * @param string  _notify_url     通知URL
 * @param string  _replace_word   置換文字列
 * @param integer _writer_id      投稿者SNSユーザーID
 * @param string  _category_cd    カテゴリーコード
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
 * コメント数、注目数を表示
 *
 * @param string  _show_id       表示ID
 * @param string  _key           ユニークキー
 * @param string  _attention_url 注目一覧へのURL
 * @param string  _category_cd   カテゴリーコード
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
 * 注目している一覧を表示
 *
 * @param string  _show_id     表示ID
 * @param string  _key         ユニークキー
 * @param integer _limit       取得件数
 * @param integer _page        ページ番号
 * @param string  _pager_url   ページャーURL
 * @param string  _category_cd カテゴリーコード
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
 * コメントフォームを表示
 *
 * @param string  _show_id         表示ID
 * @param string  _key             ユニークキー
 * @param integer _subcategory_id  サブカテゴリーID
 * @param string  _notify_title    通知タイトル
 * @param string  _notify_url      通知URL
 * @param integer _max_length      最大文字数
 * @param string  _post_function   コメント投稿後に実行する関数名
 * @param string  _default_comment デフォルトコメント
 * @param string  _category_cd     カテゴリーコード
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
 * コメント修正フォームを表示
 *
 * @param string  _show_id       表示ID
 * @param string  _key           ユニークキー
 * @param integer _comment_id    コメントID
 * @param integer _max_length    最大文字数
 * @param string  _post_function コメント投稿後に実行する関数名
 * @param string  _category_cd   カテゴリーコード
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
 * コメントを投稿
 *
 * @param string   _key                  ユニークキー
 * @param integer  _subcategory_id       サブカテゴリーID
 * @param string   _comment_form_id      コメントフォームID
 * @param string   _is_anonymous_form_id 匿名投稿フォームID
 * @param string   _notify_title         通知タイトル
 * @param string   _notify_url           通知URL
 * @param integer  _max_length           最大文字数
 * @param funciton _post_function        コメント投稿後に実行する関数
 * @param integer  _writer_id            投稿者SNSユーザーID
 * @param string   _category_cd          カテゴリーコード
 */
function postComment( _key, _subcategory_id, _comment_form_id, _is_anonymous_form_id, _notify_title, _notify_url, _max_length, _post_function, _writer_id, _category_cd )
{
  $( '#comment_button' ).attr( 'disabled', 'disabled' );

  if ( 0 == $( '#' + _comment_form_id ).val().length )
  {
    alert( 'コメントを入力してください。' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( _max_length < $( '#' + _comment_form_id ).val().length )
  {
    alert( "コメントは" + _max_length + "文字以内で入力してください。\n現在の入力文字数：" + _number_format( $( '#' + _comment_form_id ).val().length ) + "文字" );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }

  _is_ngword( $( '#' + _comment_form_id ).val(),
    function( is_ng ) {
      if ( is_ng )
      {
        alert( 'コメントに不適切な表現が含まれております。ご確認ください。' );
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
 * コメントを修正
 *
 * @param string   _key             ユニークキー
 * @param integer  _comment_id      コメントID
 * @param string   _comment_form_id コメントフォームID
 * @param integer  _max_length      最大文字数
 * @param funciton _post_function   コメント修正後に実行する関数
 * @param string   _category_cd     カテゴリーコード
 */
function updateComment( _key, _comment_id, _comment_form_id, _max_length, _post_function, _category_cd )
{
  $( '#update_comment_button' ).attr( 'disabled', 'disabled' );

  if ( 0 == $( '#' + _comment_form_id ).val().length )
  {
    alert( 'コメントを入力してください。' );
    $( '#update_comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( _max_length < $( '#' + _comment_form_id ).val().length )
  {
    alert( "コメントは" + _max_length + "文字以内で入力してください。\n現在の入力文字数：" + _number_format( $( '#' + _comment_form_id ).val().length ) + "文字" );
    $( '#update_comment_button' ).removeAttr( 'disabled' );
    return;
  }

  _is_ngword( $( '#' + _comment_form_id ).val(),
    function( is_ng ) {
      if ( is_ng )
      {
        alert( 'コメントに不適切な表現が含まれております。ご確認ください。' );
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
                               alert( 'コメントを修正しました。' );
                               $( '#update_comment_button' ).removeAttr( 'disabled' );
                               _post_function();
                             }
                } );
      }
    }
  );
}

/**
 * コメントを削除
 *
 * @param string   _key           ユニークキー
 * @param integer  _comment_id    コメントID
 * @param funciton _post_function コメント削除後に実行する関数
 * @param boolean  _is_penalty    true=ペナルティーあり false=ペナルティーなし
 * @param string   _category_cd   カテゴリーコード
 */
function deleteComment( _key, _comment_id, _post_function, _is_penalty, _category_cd )
{
  if ( ! confirm( "コメントを削除します。\n一度削除されると、元に戻すことができません。\n\nよろしいですか？" ) )
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
 * コメント一覧を表示
 *
 * @param string  _show_id           表示ID
 * @param integer _sort              ソート条件(1:新着順 2:いいね数順)
 * @param string  _key               ユニークキー
 * @param string  _repry_comment_url 返信コメントへのURL
 * @param string  _update_form_id    修正フォームID
 * @param integer _max_length        修正最大文字数
 * @param string  _notify_title      通知タイトル
 * @param string  _notify_url        通知URL
 * @param string  _link_type         リンクの種類(m:もっと見る p:ページャー)
 * @param string  _link_url          リンクURL
 * @param string  _post_function     コメント修正または削除後に実行する関数名
 * @param string  _report_url        通報URL
 * @param integer _limit             取得件数
 * @param integer _page              ページ番号
 * @param string  _like_comment_url  いいね一覧へのURL
 * @param string  _category_cd       カテゴリーコード
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
 * コメント一覧を簡易表示
 *
 * @param string  _show_id     表示ID
 * @param integer _sort        ソート条件(1:新着順 2:いいね数順)
 * @param string  _key         ユニークキー
 * @param string  _link_url    もっと見るリンクURL
 * @param integer _max_length  表示最大文字数
 * @param integer _limit       取得件数
 * @param string  _category_cd カテゴリーコード
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
 * コメントを表示
 *
 * @param string  _show_id           表示ID
 * @param string  _key               ユニークキー
 * @param integer _comment_id        コメントID
 * @param string  _repry_comment_url 返信コメントへのURL
 * @param string  _update_form_id    修正フォームID
 * @param integer _max_length        修正最大文字数
 * @param string  _notify_title      通知タイトル
 * @param string  _notify_url        通知URL
 * @param string  _post_function     コメント修正または削除後に実行する関数名
 * @param string  _report_url        通報URL
 * @param string  _like_comment_url  いいね一覧へのURL
 * @param string  _category_cd       カテゴリーコード
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
 * いいねをする
 *
 * @param string  _key          ユニークキー
 * @param integer _comment_id   コメントID
 * @param string  _notify_title 通知タイトル
 * @param string  _notify_url   通知URL
 * @param string  _replace_word 置換文字列
 * @param string  _category_cd  カテゴリーコード
 * @param string  _version      バージョン
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
 * 非表示をする
 *
 * @param string  _key          ユニークキー
 * @param integer _comment_id   コメントID
 * @param string  _replace_word 置換文字列
 * @param string  _category_cd  カテゴリーコード
 * @param string  _version      バージョン
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
 * 非表示を取消す
 *
 * @param string  _key          ユニークキー
 * @param integer _comment_id   コメントID
 * @param string  _replace_word 置換文字列
 * @param string  _category_cd  カテゴリーコード
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
 * いいね一覧を表示
 *
 * @param string  _show_id     表示ID
 * @param string  _key         ユニークキー
 * @param integer _comment_id  コメントID
 * @param integer _limit       取得件数
 * @param integer _page        ページ番号
 * @param string  _pager_url   ページャーURL
 * @param string  _category_cd カテゴリーコード
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
 * コメント総数を表示
 *
 * @param string  _show_id        表示ID
 * @param integer _subcategory_id サブカテゴリーID
 * @param string  _category_cd    カテゴリーコード
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
 * 実況コメント一覧を表示
 *
 * @param string  _show_id        表示ID
 * @param integer _sort           ソート条件(1:新着順 2:いいね数順)
 * @param string  _bbs_url        掲示板へのURL
 * @param string  _notify_url     通知URL
 * @param string  _link_type      リンクの種類(m:もっと見る p:ページャー)
 * @param string  _link_url       ページャーリンクURL
 * @param integer _max_length     表示最大文字数
 * @param string  _post_function  コメント削除後に実行する関数名
 * @param integer _subcategory_id サブカテゴリーID
 * @param integer _limit          取得件数
 * @param integer _page           ページ番号
 * @param string  _category_cd    カテゴリーコード
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
 * 実況コメントにいいねをする
 *
 * @param string  _key          ユニークキー
 * @param integer _comment_id   コメントID
 * @param string  _notify_title 通知タイトル
 * @param string  _notify_url   通知URL
 * @param string  _replace_word 置換文字列
 * @param string  _category_cd  カテゴリーコード
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
 * ユーザーランキングを表示
 *
 * @param string  _show_id        表示ID
 * @param integer _rank           ランキングの種類(1:コメント数 2:いいね数)
 * @param string  _link_type      リンクの種類(m:もっと見る p:ページャー)
 * @param string  _link_url       リンクURL
 * @param integer _subcategory_id サブカテゴリーID
 * @param integer _limit          取得件数
 * @param integer _page           ページ番号
 * @param string  _history_url    投稿履歴へのURL
 * @param string  _category_cd    カテゴリーコード
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
 * 先月末のユーザーランキングを表示
 *
 * @param string  _show_id        表示ID
 * @param integer _rank           ランキングの種類(1:コメント数 2:いいね数)
 * @param string  _link_type      リンクの種類(m:もっと見る p:ページャー)
 * @param string  _link_url       リンクURL
 * @param integer _subcategory_id サブカテゴリーID
 * @param integer _limit          取得件数
 * @param integer _page           ページ番号
 * @param string  _history_url    投稿履歴へのURL
 * @param string  _category_cd    カテゴリーコード
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
 * 投稿履歴数を表示
 *
 * @param string  _show_id        表示ID
 * @param integer _sort           ソート条件(1:新着順 2:いいね数順)
 * @param integer _commentator_id 投稿者SNSユーザーID
 * @param string  _category_cd    カテゴリーコード
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
 * 投稿履歴を表示
 *
 * @param string  _show_id        表示ID
 * @param integer _sort           ソート条件(1:新着順 2:いいね数順)
 * @param integer _commentator_id 投稿者SNSユーザーID
 * @param string  _bbs_url        掲示板へのURL
 * @param string  _link_url       ページャーリンクURL
 * @param string  _post_function  コメント削除後に実行する関数名
 * @param integer _limit          取得件数
 * @param integer _page           ページ番号
 * @param string  _category_cd    カテゴリーコード
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
 * 通報フォームを表示
 *
 * @param string  _show_id     表示ID
 * @param string  _key         ユニークキー
 * @param integer _max_length  最大文字数
 * @param string  _category_cd カテゴリーコード
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
 * 通報する
 *
 * @param string   _key                ユニークキー
 * @param string   _comment_id_form_id コメントIDフォームID
 * @param string   _reason_cd_form_id  通報理由フォームID
 * @param string   _comment_form_id    コメントフォームID
 * @param integer  _max_length         最大文字数
 * @param string   _category_cd        カテゴリーコード
 */
function postReport( _key, _comment_id_form_id, _reason_cd_form_id, _comment_form_id, _max_length, _category_cd )
{
  $( '#comment_button' ).attr( 'disabled', 'disabled' );

  if ( 0 == $( '#' + _comment_id_form_id ).val().length )
  {
    alert( '投稿番号を入力してください。' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( isNaN( $( '#' + _comment_id_form_id ).val() ) || 0 == $( '#' + _comment_id_form_id ).val() )
  {
    alert( '投稿番号は数値を入力してください。' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( '' == $( '#' + _reason_cd_form_id ).val() )
  {
    alert( '通報理由を選択してください。' );
    $( '#comment_button' ).removeAttr( 'disabled' );
    return;
  }
  else if ( _max_length < $( '#' + _comment_form_id ).val().length )
  {
    alert( "自由記述は" + _max_length + "文字以内で入力してください。\n現在の入力文字数：" + _number_format( $( '#' + _comment_form_id ).val().length ) + "文字" );
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
                         alert( '通報しました。' );
                       }
          } );
}

/**
 * コメント範囲一覧を表示
 *
 * @param string  _show_id           表示ID
 * @param integer _sort              ソート条件(1:新着順 2:投稿順 3:いいね数順)
 * @param string  _key               ユニークキー
 * @param integer _start_comment_id  開始コメントID
 * @param integer _end_comment_id    終了コメントID
 * @param string  _repry_comment_url 返信コメントへのURL
 * @param string  _link_type         リンクの種類(m:もっと見る p:ページャー)
 * @param string  _link_url          リンクURL
 * @param integer _limit             取得件数
 * @param integer _page              ページ番号
 * @param string  _like_comment_url  いいね一覧へのURL
 * @param string  _category_cd       カテゴリーコード
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
 * 非表示ユーザー一覧を表示
 *
 * @param string  _show_id     表示ID
 * @param string  _history_url 非表示履歴へのURL
 * @param string  _link_url    ページャーリンクURL
 * @param integer _limit       取得件数
 * @param integer _page        ページ番号
 * @param string  _category_cd カテゴリーコード
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
 * 非表示履歴を表示
 *
 * @param string  _show_id     表示ID
 * @param integer _sns_user_id SNSユーザーID
 * @param string  _hidden_url  非表示一覧へのURL
 * @param string  _link_url    ページャーリンクURL
 * @param integer _limit       取得件数
 * @param integer _page        ページ番号
 * @param string  _category_cd カテゴリーコード
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
 * 非表示一覧を表示
 *
 * @param string  _show_id     表示ID
 * @param string  _key         ユニークキー
 * @param integer _comment_id  コメントID
 * @param integer _limit       取得件数
 * @param integer _page        ページ番号
 * @param string  _pager_url   ページャーURL
 * @param string  _category_cd カテゴリーコード
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
 * NGワードが含まれているかどうか
 *
 * @param  string  _str 文字列
 * @param string   _done_function チェック完了後に実行する関数名
 * @return boolean true=NGワードあり false=NGワードなし
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
 * 空であるかどうか
 *
 * @param  mixd    _var 変数
 * @return boolean      true=空である false=空ではない
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
 * 文字列を数値にする
 *
 * @param  string  _str 文字列
 * @return integer      数値
 */
function _intval( _str )
{
  return eval( _str.replace( /,/g, '' ) );
}

/**
 * 数値を3桁で区切り文字列にする
 *
 * @param  integer _num 数値
 * @return string       文字列
 */
function _number_format( _num )
{
  return _num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,' );
}
