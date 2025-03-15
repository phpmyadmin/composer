<?php
/**
 * Handles actions related to GIS POINT objects
 */

declare(strict_types=1);

namespace PhpMyAdmin\Gis;

use PhpMyAdmin\Gis\Ds\Extent;
use PhpMyAdmin\Gis\Ds\ScaleData;
use PhpMyAdmin\Image\ImageWrapper;
use TCPDF;

use function mb_substr;
use function round;
use function sprintf;

/**
 * Handles actions related to GIS POINT objects
 */
class GisPoint extends GisGeometry
{
    private static self $instance;

    /**
     * A private constructor; prevents direct creation of object.
     */
    private function __construct()
    {
    }

    /**
     * Returns the singleton.
     *
     * @return GisPoint the singleton
     */
    public static function singleton(): GisPoint
    {
        if (! isset(self::$instance)) {
            self::$instance = new GisPoint();
        }

        return self::$instance;
    }

    /**
     * Get coordinate extent for this wkt.
     *
     * @param string $wkt Well Known Text represenatation of the geometry
     *
     * @return Extent the min, max values for x and y coordinates
     */
    public function getExtent(string $wkt): Extent
    {
        // Trim to remove leading 'POINT(' and trailing ')'
        $point = mb_substr($wkt, 6, -1);

        return $this->getCoordinatesExtent($point);
    }

    /**
     * Adds to the PNG image object, the data related to a row in the GIS dataset.
     *
     * @param string    $spatial   GIS POLYGON object
     * @param string    $label     Label for the GIS POLYGON object
     * @param int[]     $color     Color for the GIS POLYGON object
     * @param ScaleData $scaleData Array containing data related to scaling
     */
    public function prepareRowAsPng(
        string $spatial,
        string $label,
        array $color,
        ScaleData $scaleData,
        ImageWrapper $image,
    ): void {
        // allocate colors
        $black = $image->colorAllocate(0, 0, 0);
        $pointColor = $image->colorAllocate(...$color);

        // Trim to remove leading 'POINT(' and trailing ')'
        $point = mb_substr($spatial, 6, -1);
        $pointsArr = $this->extractPoints1dLinear($point, $scaleData);

        // draw a small circle to mark the point
        if ($pointsArr[0] == '' || $pointsArr[1] == '') {
            return;
        }

        $image->arc(
            (int) round($pointsArr[0]),
            (int) round($pointsArr[1]),
            7,
            7,
            0,
            360,
            $pointColor,
        );
        if ($label === '') {
            return;
        }

        // print label if applicable
        $image->string(
            1,
            (int) round($pointsArr[0]),
            (int) round($pointsArr[1]),
            $label,
            $black,
        );
    }

    /**
     * Adds to the TCPDF instance, the data related to a row in the GIS dataset.
     *
     * @param string    $spatial   GIS POINT object
     * @param string    $label     Label for the GIS POINT object
     * @param int[]     $color     Color for the GIS POINT object
     * @param ScaleData $scaleData Array containing data related to scaling
     */
    public function prepareRowAsPdf(
        string $spatial,
        string $label,
        array $color,
        ScaleData $scaleData,
        TCPDF $pdf,
    ): void {
        $line = ['width' => 1.25, 'color' => $color];

        // Trim to remove leading 'POINT(' and trailing ')'
        $point = mb_substr($spatial, 6, -1);
        $pointsArr = $this->extractPoints1dLinear($point, $scaleData);

        if ($pointsArr[0] == '' || $pointsArr[1] == '') {
            return;
        }

        // draw a small circle to mark the point
        $pdf->Circle($pointsArr[0], $pointsArr[1], 2, 0, 360, 'D', $line);
        if ($label === '') {
            return;
        }

        // print label if applicable
        $pdf->setXY($pointsArr[0], $pointsArr[1]);
        $pdf->setFontSize(5);
        $pdf->Cell(0, 0, $label);
    }

    /**
     * Prepares and returns the code related to a row in the GIS dataset as SVG.
     *
     * @param string    $spatial   GIS POINT object
     * @param string    $label     Label for the GIS POINT object
     * @param int[]     $color     Color for the GIS POINT object
     * @param ScaleData $scaleData Array containing data related to scaling
     *
     * @return string the code related to a row in the GIS dataset
     */
    public function prepareRowAsSvg(string $spatial, string $label, array $color, ScaleData $scaleData): string
    {
        $pointOptions = [
            'data-label' => $label,
            'id' => $label . $this->getRandomId(),
            'class' => 'point vector',
            'fill' => 'white',
            'stroke' => sprintf('#%02x%02x%02x', $color[0], $color[1], $color[2]),
            'stroke-width' => 2,
        ];

        // Trim to remove leading 'POINT(' and trailing ')'
        $point = mb_substr($spatial, 6, -1);
        $pointsArr = $this->extractPoints1dLinear($point, $scaleData);

        $row = '';
        if ($pointsArr[0] !== 0.0 && $pointsArr[1] !== 0.0) {
            $row .= '<circle cx="' . $pointsArr[0]
                . '" cy="' . $pointsArr[1] . '" r="3"';
            foreach ($pointOptions as $option => $val) {
                $row .= ' ' . $option . '="' . $val . '"';
            }

            $row .= '/>';
        }

        return $row;
    }

    /**
     * Prepares data related to a row in the GIS dataset to visualize it with OpenLayers.
     *
     * @param string $spatial GIS POINT object
     * @param int    $srid    Spatial reference ID
     * @param string $label   Label for the GIS POINT object
     * @param int[]  $color   Color for the GIS POINT object
     *
     * @return mixed[]
     */
    public function prepareRowAsOl(
        string $spatial,
        int $srid,
        string $label,
        array $color,
    ): array {
        $fillStyle = ['color' => 'white'];
        $strokeStyle = ['color' => $color, 'width' => 2];
        $style = ['circle' => ['fill' => $fillStyle, 'stroke' => $strokeStyle, 'radius' => 3]];
        if ($label !== '') {
            $style['text'] = ['text' => $label, 'offsetY' => -9];
        }

        // Trim to remove leading 'POINT(' and trailing ')'
        $point = mb_substr($spatial, 6, -1);
        $geometry = [
            'type' => 'Point',
            'coordinates' => $this->extractPoints1dLinear($point, null),
            'srid' => $srid,
        ];

        return ['geometry' => $geometry, 'style' => $style];
    }

    /**
     * Generate the WKT with the set of parameters passed by the GIS editor.
     *
     * @param mixed[] $gisData GIS data
     * @param int     $index   Index into the parameter object
     * @param string  $empty   Point does not adhere to this parameter
     *
     * @return string WKT with the set of parameters passed by the GIS editor
     */
    public function generateWkt(array $gisData, int $index, string $empty = ''): string
    {
        $wktCoord = $this->getWktCoord($gisData[$index]['POINT'] ?? null, '');

        return 'POINT(' . $wktCoord . ')';
    }

    /**
     * Generate the WKT for the data from ESRI shape files.
     *
     * @param mixed[] $rowData GIS data
     *
     * @return string the WKT for the data from ESRI shape files
     */
    public function getShape(array $rowData): string
    {
        return 'POINT(' . ($rowData['x'] ?? '')
        . ' ' . ($rowData['y'] ?? '') . ')';
    }

    /**
     * Generate coordinate parameters for the GIS data editor from the value of the GIS column.
     *
     * @param string $wkt Value of the GIS column
     *
     * @return mixed[] Coordinate params for the GIS data editor from the value of the GIS column
     */
    protected function getCoordinateParams(string $wkt): array
    {
        // Trim to remove leading 'POINT(' and trailing ')'
        $wktPoint = mb_substr($wkt, 6, -1);
        $points = $this->extractPoints1d($wktPoint, null);

        return ['x' => $points[0][0], 'y' => $points[0][1]];
    }

    protected function getType(): string
    {
        return 'POINT';
    }
}
