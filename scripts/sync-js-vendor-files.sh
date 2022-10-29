#!/bin/bash -eu

#
# vim: expandtab sw=4 ts=4 sts=4:
#

# This script will sync JS node_modules files with existing files in vendor folder.
# Warning: this will not add any more files, it uses existing files in vendor folder.

ROOT_DIR="$(realpath $(dirname $0)/../)"
echo "Using root dir: $ROOT_DIR"

cd ${ROOT_DIR}

# Remove each '-not -path' when a new package can be used from npm
echo 'Delete vendor files we can replace from source dists'
find ./js/vendor/ -type f -delete -print

echo 'Updating codemirror'
cp ./node_modules/codemirror/addon/hint/sql-hint.js ./js/vendor/codemirror/addon/hint/sql-hint.js
cp ./node_modules/codemirror/addon/hint/show-hint.css ./js/vendor/codemirror/addon/hint/show-hint.css
cp ./node_modules/codemirror/addon/hint/show-hint.js ./js/vendor/codemirror/addon/hint/show-hint.js
cp ./node_modules/codemirror/addon/runmode/runmode.js ./js/vendor/codemirror/addon/runmode/runmode.js
cp ./node_modules/codemirror/addon/lint/lint.css ./js/vendor/codemirror/addon/lint/lint.css
cp ./node_modules/codemirror/addon/lint/lint.js ./js/vendor/codemirror/addon/lint/lint.js
cp ./node_modules/codemirror/lib/codemirror.js ./js/vendor/codemirror/lib/codemirror.js
cp ./node_modules/codemirror/lib/codemirror.css ./js/vendor/codemirror/lib/codemirror.css
cp ./node_modules/codemirror/mode/sql/sql.js ./js/vendor/codemirror/mode/sql/sql.js
cp ./node_modules/codemirror/mode/javascript/javascript.js ./js/vendor/codemirror/mode/javascript/javascript.js
cp ./node_modules/codemirror/mode/xml/xml.js ./js/vendor/codemirror/mode/xml/xml.js
cp ./node_modules/codemirror/LICENSE ./js/vendor/codemirror/LICENSE
echo 'Updating jquery'
cp ./node_modules/jquery/dist/jquery.min.js ./js/vendor/jquery/jquery.min.js
cp ./node_modules/jquery/dist/jquery.min.map ./js/vendor/jquery/jquery.min.map
cp ./node_modules/jquery/LICENSE.txt ./js/vendor/jquery/MIT-LICENSE.txt
echo 'Updating jquery-migrate'
cp ./node_modules/jquery-migrate/dist/jquery-migrate.min.js ./js/vendor/jquery/jquery-migrate.min.js
cp ./node_modules/jquery-migrate/dist/jquery-migrate.min.map ./js/vendor/jquery/jquery-migrate.min.map
echo 'Updating jquery-ui'
cp ./node_modules/jquery-ui-dist/jquery-ui.min.js ./js/vendor/jquery/jquery-ui.min.js
# https://github.com/devongovett/jquery.event.drag/commit/2db3b7865f31eee6a8145532554f8b02210180bf#diff-ab8497cedd384270de86ee2e9f06530e
echo 'Updating jquery-validation'
cp ./node_modules/jquery-validation/dist/jquery.validate.min.js ./js/vendor/jquery/jquery.validate.min.js
cp ./node_modules/jquery-validation/dist/additional-methods.js ./js/vendor/jquery/additional-methods.js
echo 'Updating js-cookie'
cp ./node_modules/js-cookie/src/js.cookie.js ./js/vendor/js.cookie.js
echo 'Updating bootstrap'
cp ./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js ./js/vendor/bootstrap/bootstrap.bundle.min.js
cp ./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map ./js/vendor/bootstrap/bootstrap.bundle.min.js.map
echo 'Updating zxcvbn-ts'
cp ./node_modules/@zxcvbn-ts/core/dist/zxcvbn-ts.js ./js/vendor/zxcvbn-ts.js
cp ./node_modules/@zxcvbn-ts/core/dist/zxcvbn-ts.js.map ./js/vendor/zxcvbn-ts.js.map
echo 'Updating tracekit'
cp ./node_modules/tracekit/tracekit.js ./js/vendor/tracekit.js
echo 'Updating u2f-api-polyfill'
cp ./node_modules/u2f-api-polyfill/u2f-api-polyfill.js ./js/vendor/u2f-api-polyfill.js
echo 'Updating jquery-uitablefilter'
cp ./node_modules/jquery-uitablefilter/jquery.uitablefilter.js js/vendor/jquery/jquery.uitablefilter.js
echo 'Updating jquery-tablesorter'
cp ./node_modules/tablesorter/dist/js/jquery.tablesorter.js ./js/vendor/jquery/jquery.tablesorter.js
echo 'Updating jquery-debounce'
cp ./node_modules/jquery-debounce-throttle/index.js ./js/vendor/jquery/jquery.debounce-1.0.6.js
echo 'Updating jquery-Timepicker-Addon'
cp ./node_modules/jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.js ./js/vendor/jquery/jquery-ui-timepicker-addon.js
echo 'Updating OpenLayers'
cp ./node_modules/ol/ol.css ./js/vendor/openlayers/theme/ol.css
npx webpack-cli --config ./js/config/ol/webpack.config.js
echo "/*!
  * OpenLayers v$(php -r 'echo json_decode(file_get_contents("./node_modules/ol/package.json"))->version;') (https://openlayers.org/)
  * Copyright 2005-present, OpenLayers Contributors All rights reserved.
  * Licensed under BSD 2-Clause License (https://github.com/openlayers/openlayers/blob/main/LICENSE.md)
  *
  * @license $(yarn info -s ol license)
  */
$(cat ./js/vendor/openlayers/OpenLayers.js)" > ./js/vendor/openlayers/OpenLayers.js
echo 'Updating sprintf'
cp ./node_modules/locutus.sprintf/src/php/strings/sprintf.browser.js ./js/vendor/sprintf.js

echo 'Update jqplot'

echo 'Build jquery.jqplot.js'

JQPLOT_SOURCE_FILES=(
'jqplot.core.js' 'jqplot.axisLabelRenderer.js' 'jqplot.axisTickRenderer.js' 'jqplot.canvasGridRenderer.js'
'jqplot.divTitleRenderer.js' 'jqplot.linePattern.js' 'jqplot.lineRenderer.js' 'jqplot.linearAxisRenderer.js'
'jqplot.linearTickGenerator.js' 'jqplot.markerRenderer.js' 'jqplot.shadowRenderer.js' 'jqplot.shapeRenderer.js'
'jqplot.tableLegendRenderer.js' 'jqplot.themeEngine.js' 'jqplot.toImage.js' 'jsdate.js' 'jqplot.sprintf.js'
'jqplot.effects.core.js' 'jqplot.effects.blind.js'
)
for jqPlotFile in ${JQPLOT_SOURCE_FILES[@]}; do
    cat "./node_modules/updated-jqplot/build/$jqPlotFile" >> ./js/vendor/jqplot/jquery.jqplot.js
done
echo 'Successfully built jquery.jqplot.js'

cp ./node_modules/updated-jqplot/build/plugins/jqplot.pieRenderer.js ./js/vendor/jqplot/plugins/jqplot.pieRenderer.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.barRenderer.js ./js/vendor/jqplot/plugins/jqplot.barRenderer.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.pointLabels.js ./js/vendor/jqplot/plugins/jqplot.pointLabels.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.enhancedPieLegendRenderer.js ./js/vendor/jqplot/plugins/jqplot.enhancedPieLegendRenderer.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.dateAxisRenderer.js ./js/vendor/jqplot/plugins/jqplot.dateAxisRenderer.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.categoryAxisRenderer.js ./js/vendor/jqplot/plugins/jqplot.categoryAxisRenderer.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.canvasTextRenderer.js ./js/vendor/jqplot/plugins/jqplot.canvasTextRenderer.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.canvasAxisLabelRenderer.js ./js/vendor/jqplot/plugins/jqplot.canvasAxisLabelRenderer.js

cp ./node_modules/updated-jqplot/build/plugins/jqplot.cursor.js ./js/vendor/jqplot/plugins/jqplot.cursor.js
cp ./node_modules/updated-jqplot/build/plugins/jqplot.highlighter.js ./js/vendor/jqplot/plugins/jqplot.highlighter.js

echo 'Done.'
