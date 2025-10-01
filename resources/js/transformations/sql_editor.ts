import $ from 'jquery';
import { AJAX } from '../modules/ajax.ts';
import { getSqlEditor } from '../modules/functions.ts';

/**
 * SQL syntax highlighting transformation plugin js
 *
 * @package PhpMyAdmin
 */
AJAX.registerOnload('transformations/sql_editor.js', function () {
    ($('textarea.transform_sql_editor') as JQuery<HTMLTextAreaElement>).each(function () {
        getSqlEditor($(this), {}, 'both');
    });
});
