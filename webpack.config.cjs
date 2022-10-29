const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RtlCssPlugin = require('rtlcss-webpack-plugin');

module.exports = [
    {
        mode: 'none',
        devtool: 'source-map',
        entry: {
            'ajax': './js/src/ajax.js',
            'chart': './js/src/chart.js',
            'codemirror/addon/lint/sql-lint': './js/src/codemirror/addon/lint/sql-lint.js',
            'common': './js/src/common.js',
            'config': './js/src/config.js',
            'console': { import: './js/src/console.js', library: { name: 'Console', type: 'window', export: 'Console' } },
            'cross_framing_protection': './js/src/cross_framing_protection.js',
            'datetimepicker': './js/src/datetimepicker.js',
            'database/central_columns': './js/src/database/central_columns.js',
            'database/events': './js/src/database/events.js',
            'database/multi_table_query': './js/src/database/multi_table_query.js',
            'database/operations': './js/src/database/operations.js',
            'database/qbe': './js/src/database/qbe.js',
            'database/query_generator': './js/src/database/query_generator.js',
            'database/routines': './js/src/database/routines.js',
            'database/search': './js/src/database/search.js',
            'database/structure': './js/src/database/structure.js',
            'database/tracking': './js/src/database/tracking.js',
            'database/triggers': './js/src/database/triggers.js',
            'designer/database': './js/src/designer/database.js',
            'designer/history': './js/src/designer/history.js',
            'designer/init': './js/src/designer/init.js',
            'designer/move': './js/src/designer/move.js',
            'designer/objects': './js/src/designer/objects.js',
            'designer/page': './js/src/designer/page.js',
            'drag_drop_import': './js/src/drag_drop_import.js',
            'error_report': './js/src/error_report.js',
            'export': './js/src/export.js',
            'export_output': './js/src/export_output.js',
            'functions': './js/src/functions.js',
            'gis_data_editor': './js/src/gis_data_editor.js',
            'home': './js/src/home.js',
            'import': './js/src/import.js',
            'indexes': './js/src/indexes.js',
            'jqplot/plugins/jqplot.byteFormatter': './js/src/jqplot/plugins/jqplot.byteFormatter.js',
            'jquery.sortable-table': './js/src/jquery.sortable-table.js',
            'keyhandler': './js/src/keyhandler.js',
            'main': './js/src/main.js',
            'makegrid': './js/src/makegrid.js',
            'menu_resizer': './js/src/menu_resizer.js',
            'multi_column_sort': './js/src/multi_column_sort.js',
            'name-conflict-fixes': './js/src/name-conflict-fixes.js',
            'navigation': './js/src/navigation.js',
            'normalization': './js/src/normalization.js',
            'page_settings': './js/src/page_settings.js',
            'replication': './js/src/replication.js',
            'server/databases': './js/src/server/databases.js',
            'server/plugins': './js/src/server/plugins.js',
            'server/privileges': './js/src/server/privileges.js',
            'server/status/monitor': './js/src/server/status/monitor.js',
            'server/status/processes': './js/src/server/status/processes.js',
            'server/status/queries': './js/src/server/status/queries.js',
            'server/status/sorter': './js/src/server/status/sorter.js',
            'server/status/variables': './js/src/server/status/variables.js',
            'server/user_groups': './js/src/server/user_groups.js',
            'server/variables': './js/src/server/variables.js',
            'setup/ajax': './js/src/setup/ajax.js',
            'setup/scripts': './js/src/setup/scripts.js',
            'shortcuts_handler': './js/src/shortcuts_handler.js',
            'sql': './js/src/sql.js',
            'table/change': './js/src/table/change.js',
            'table/chart': './js/src/table/chart.js',
            'table/find_replace': './js/src/table/find_replace.js',
            'table/gis_visualization': './js/src/table/gis_visualization.js',
            'table/operations': './js/src/table/operations.js',
            'table/relation': './js/src/table/relation.js',
            'table/select': './js/src/table/select.js',
            'table/structure': './js/src/table/structure.js',
            'table/tracking': './js/src/table/tracking.js',
            'table/zoom_plot_jqplot': './js/src/table/zoom_plot_jqplot.js',
            'transformations/image_upload': './js/src/transformations/image_upload.js',
            'transformations/json': './js/src/transformations/json.js',
            'transformations/json_editor': './js/src/transformations/json_editor.js',
            'transformations/sql_editor': './js/src/transformations/sql_editor.js',
            'transformations/xml': './js/src/transformations/xml.js',
            'transformations/xml_editor': './js/src/transformations/xml_editor.js',
            'u2f': './js/src/u2f.js',
            'validator-messages': './js/src/validator-messages.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'js/dist'),
        },
        optimization: {
            runtimeChunk: 'single',
        },
        externals: {
            jquery: 'jQuery',
            codemirror: 'CodeMirror',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets:  ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'node_modules/codemirror/addon/hint/sql-hint.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/addon/hint/sql-hint.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/addon/hint/show-hint.css'), to: path.resolve(__dirname, 'js/vendor/codemirror/addon/hint/show-hint.css') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/addon/hint/show-hint.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/addon/hint/show-hint.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/addon/runmode/runmode.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/addon/runmode/runmode.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/addon/lint/lint.css'), to: path.resolve(__dirname, 'js/vendor/codemirror/addon/lint/lint.css') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/addon/lint/lint.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/addon/lint/lint.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/lib/codemirror.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/lib/codemirror.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/lib/codemirror.css'), to: path.resolve(__dirname, 'js/vendor/codemirror/lib/codemirror.css') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/mode/sql/sql.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/mode/sql/sql.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/mode/javascript/javascript.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/mode/javascript/javascript.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/mode/xml/xml.js'), to: path.resolve(__dirname, 'js/vendor/codemirror/mode/xml/xml.js') },
                    { from: path.resolve(__dirname, 'node_modules/codemirror/LICENSE'), to: path.resolve(__dirname, 'js/vendor/codemirror/LICENSE'), toType: 'file' },
                    { from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery.min.js') },
                    { from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.map'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery.min.map') },
                    { from: path.resolve(__dirname, 'node_modules/jquery/LICENSE.txt'), to: path.resolve(__dirname, 'js/vendor/jquery/MIT-LICENSE.txt') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-migrate/dist/jquery-migrate.min.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery-migrate.min.js') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-migrate/dist/jquery-migrate.min.map'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery-migrate.min.map') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-ui-dist/jquery-ui.min.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery-ui.min.js') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-validation/dist/jquery.validate.min.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery.validate.min.js') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-validation/dist/additional-methods.js'), to: path.resolve(__dirname, 'js/vendor/jquery/additional-methods.js') },
                    { from: path.resolve(__dirname, 'node_modules/js-cookie/dist/js.cookie.min.js'), to: path.resolve(__dirname, 'js/vendor/js.cookie.min.js') },
                    { from: path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'), to: path.resolve(__dirname, 'js/vendor/bootstrap/bootstrap.bundle.min.js') },
                    { from: path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'), to: path.resolve(__dirname, 'js/vendor/bootstrap/bootstrap.bundle.min.js.map') },
                    { from: path.resolve(__dirname, 'node_modules/@zxcvbn-ts/core/dist/zxcvbn-ts.js'), to: path.resolve(__dirname, 'js/vendor/zxcvbn-ts.js') },
                    { from: path.resolve(__dirname, 'node_modules/@zxcvbn-ts/core/dist/zxcvbn-ts.js.map'), to: path.resolve(__dirname, 'js/vendor/zxcvbn-ts.js.map') },
                    { from: path.resolve(__dirname, 'node_modules/tracekit/tracekit.js'), to: path.resolve(__dirname, 'js/vendor/tracekit.js') },
                    { from: path.resolve(__dirname, 'node_modules/u2f-api-polyfill/u2f-api-polyfill.js'), to: path.resolve(__dirname, 'js/vendor/u2f-api-polyfill.js') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-uitablefilter/jquery.uitablefilter.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery.uitablefilter.js') },
                    { from: path.resolve(__dirname, 'node_modules/tablesorter/dist/js/jquery.tablesorter.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery.tablesorter.js') },
                    { from: path.resolve(__dirname, 'node_modules/jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.js'), to: path.resolve(__dirname, 'js/vendor/jquery/jquery-ui-timepicker-addon.js') },
                    { from: path.resolve(__dirname, 'node_modules/ol/ol.css'), to: path.resolve(__dirname, 'js/vendor/openlayers/theme/ol.css') },
                    { from: path.resolve(__dirname, 'node_modules/locutus.sprintf/src/php/strings/sprintf.browser.js'), to: path.resolve(__dirname, 'js/vendor/sprintf.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.pieRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.pieRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.barRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.barRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.pointLabels.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.pointLabels.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.enhancedPieLegendRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.enhancedPieLegendRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.dateAxisRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.dateAxisRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.categoryAxisRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.categoryAxisRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.canvasTextRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.canvasTextRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.canvasAxisLabelRenderer.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.canvasAxisLabelRenderer.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.cursor.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.cursor.js') },
                    { from: path.resolve(__dirname, 'node_modules/updated-jqplot/build/plugins/jqplot.highlighter.js'), to: path.resolve(__dirname, 'js/vendor/jqplot/plugins/jqplot.highlighter.js') },
                ],
            }),
            new WebpackConcatPlugin({
                bundles: [
                    {
                        dest: './js/vendor/jqplot/jquery.jqplot.js',
                        src: [
                            './node_modules/updated-jqplot/build/jqplot.core.js',
                            './node_modules/updated-jqplot/build/jqplot.axisLabelRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.axisTickRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.canvasGridRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.divTitleRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.linePattern.js',
                            './node_modules/updated-jqplot/build/jqplot.lineRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.linearAxisRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.linearTickGenerator.js',
                            './node_modules/updated-jqplot/build/jqplot.markerRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.shadowRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.shapeRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.tableLegendRenderer.js',
                            './node_modules/updated-jqplot/build/jqplot.themeEngine.js',
                            './node_modules/updated-jqplot/build/jqplot.toImage.js',
                            './node_modules/updated-jqplot/build/jsdate.js',
                            './node_modules/updated-jqplot/build/jqplot.sprintf.js',
                            './node_modules/updated-jqplot/build/jqplot.effects.core.js',
                            './node_modules/updated-jqplot/build/jqplot.effects.blind.js',
                        ],
                    },
                ],
            }),
        ],
    },
    {
        name: 'OpenLayers',
        entry: './js/src/ol.mjs',
        devtool: 'source-map',
        mode: 'production',
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        output: {
            path: path.resolve('./js/vendor/openlayers'),
            filename: 'OpenLayers.js',
            library: 'ol',
            libraryTarget: 'umd',
            libraryExport: 'default',
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: 'OpenLayers (https://openlayers.org/)\nCopyright 2005-present, OpenLayers Contributors All rights reserved.\nLicensed under BSD 2-Clause License (https://github.com/openlayers/openlayers/blob/main/LICENSE.md)',
            }),
        ],
    },
    {
        name: 'CSS',
        mode: 'none',
        devtool: 'source-map',
        entry: {
            'themes/bootstrap/css/theme': './themes/bootstrap/scss/theme.scss',
            'themes/metro/css/blueeyes-theme': './themes/metro/scss/blueeyes-theme.scss',
            'themes/metro/css/mono-theme': './themes/metro/scss/mono-theme.scss',
            'themes/metro/css/redmond-theme': './themes/metro/scss/redmond-theme.scss',
            'themes/metro/css/teal-theme': './themes/metro/scss/teal-theme.scss',
            'themes/metro/css/theme': './themes/metro/scss/theme.scss',
            'themes/original/css/theme': './themes/original/scss/theme.scss',
            'themes/pmahomme/css/theme': './themes/pmahomme/scss/theme.scss',
            'setup/styles': './setup/scss/styles.scss',
        },
        output: {
            filename: 'build/css/[name].js',
            path: path.resolve(__dirname, ''),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [ autoprefixer() ],
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            new RtlCssPlugin({
                filename: '[name].rtl.css',
            }),
        ],
    },
];
