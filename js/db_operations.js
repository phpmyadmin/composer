/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * @fileoverview    function used in server privilege pages
 * @name            Database Operations
 *
 * @requires    jQuery
 * @requires    jQueryUI
 * @requires    js/functions.js
 *
 */

/**
 * Ajax event handlers here for db_operations.php
 *
 * Actions Ajaxified here:
 * Rename Database
 * Copy Database
 * Change Charset
 * Drop Database
 */

/**
 * Unbind all event handlers before tearing down a page
 */
AJAX.registerTeardown('db_operations.js', function () {
    $(document).off('submit', '#rename_db_form.ajax');
    $(document).off('submit', '#copy_db_form.ajax');
    $(document).off('submit', '#change_db_charset_form.ajax');
    $(document).off('click', '#drop_db_anchor.ajax');
});

AJAX.registerOnload('db_operations.js', function () {
    /**
     * Ajax event handlers for 'Rename Database'
     */
    $(document).on('submit', '#rename_db_form.ajax', function (event) {
        event.preventDefault();

        var old_db_name = CommonParams.get('db');
        var new_db_name = $('#new_db_name').val();

        if (new_db_name === old_db_name) {
            Functions.ajaxShowMessage(Messages.strDatabaseRenameToSameName, false, 'error');
            return false;
        }

        var $form = $(this);

        var question = Functions.escapeHtml('CREATE DATABASE ' + new_db_name + ' / DROP DATABASE ' + old_db_name);

        Functions.prepareForAjaxRequest($form);

        $form.confirm(question, $form.attr('action'), function (url) {
            Functions.ajaxShowMessage(Messages.strRenamingDatabases, false);
            $.post(url, $('#rename_db_form').serialize() + CommonParams.get('arg_separator') + 'is_js_confirmed=1', function (data) {
                if (typeof data !== 'undefined' && data.success === true) {
                    Functions.ajaxShowMessage(data.message);
                    CommonParams.set('db', data.newname);

                    PMA_reloadNavigation(function () {
                        $('#pma_navigation_tree')
                            .find('a:not(\'.expander\')')
                            .each(function (index) {
                                var $thisAnchor = $(this);
                                if ($thisAnchor.text() === data.newname) {
                                    // simulate a click on the new db name
                                    // in navigation
                                    $thisAnchor.trigger('click');
                                }
                            });
                    });
                } else {
                    Functions.ajaxShowMessage(data.error, false);
                }
            }); // end $.post()
        });
    }); // end Rename Database

    /**
     * Ajax Event Handler for 'Copy Database'
     */
    $(document).on('submit', '#copy_db_form.ajax', function (event) {
        event.preventDefault();
        Functions.ajaxShowMessage(Messages.strCopyingDatabase, false);
        var $form = $(this);
        Functions.prepareForAjaxRequest($form);
        $.post($form.attr('action'), $form.serialize(), function (data) {
            // use messages that stay on screen
            $('div.success, div.error').fadeOut();
            if (typeof data !== 'undefined' && data.success === true) {
                if ($('#checkbox_switch').is(':checked')) {
                    CommonParams.set('db', data.newname);
                    CommonActions.refreshMain(false, function () {
                        Functions.ajaxShowMessage(data.message);
                    });
                } else {
                    CommonParams.set('db', data.db);
                    Functions.ajaxShowMessage(data.message);
                }
                PMA_reloadNavigation();
            } else {
                Functions.ajaxShowMessage(data.error, false);
            }
        }); // end $.post()
    }); // end copy database

    /**
     * Change tables columns visible only if change tables is checked
     */
    $('#span_change_all_tables_columns_collations').hide();
    $('#checkbox_change_all_tables_collations').on('click', function () {
        $('#span_change_all_tables_columns_collations').toggle();
    });

    /**
     * Ajax Event handler for 'Change Charset' of the database
     */
    $(document).on('submit', '#change_db_charset_form.ajax', function (event) {
        event.preventDefault();
        var $form = $(this);
        Functions.prepareForAjaxRequest($form);
        Functions.ajaxShowMessage(Messages.strChangingCharset);
        $.post($form.attr('action'), $form.serialize() + CommonParams.get('arg_separator') + 'submitcollation=1', function (data) {
            if (typeof data !== 'undefined' && data.success === true) {
                Functions.ajaxShowMessage(data.message);
            } else {
                Functions.ajaxShowMessage(data.error, false);
            }
        }); // end $.post()
    }); // end change charset

    /**
     * Ajax event handlers for Drop Database
     */
    $(document).on('click', '#drop_db_anchor.ajax', function (event) {
        event.preventDefault();
        var $link = $(this);
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = Messages.strDropDatabaseStrongWarning + ' ';
        question += Functions.sprintf(
            Messages.strDoYouReally,
            'DROP DATABASE `' + Functions.escapeHtml(CommonParams.get('db') + '`')
        );
        var params = Functions.getJsConfirmCommonParam(this, $link.getPostData());

        $(this).confirm(question, $(this).attr('href'), function (url) {
            Functions.ajaxShowMessage(Messages.strProcessingRequest);
            $.post(url, params, function (data) {
                if (typeof data !== 'undefined' && data.success) {
                    // Database deleted successfully, refresh both the frames
                    PMA_reloadNavigation();
                    CommonParams.set('db', '');
                    CommonActions.refreshMain(
                        'server_databases.php',
                        function () {
                            Functions.ajaxShowMessage(data.message);
                        }
                    );
                } else {
                    Functions.ajaxShowMessage(data.error, false);
                }
            });
        });
    });
});
