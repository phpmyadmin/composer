<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Gis;

use PhpMyAdmin\Gis\Ds\Extent;
use PhpMyAdmin\Gis\GisMultiLineString;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

#[CoversClass(GisMultiLineString::class)]
#[PreserveGlobalState(false)]
#[RunTestsInSeparateProcesses]
class GisMultiLineStringTest extends AbstractTestCase
{
    /**
     * data provider for testGenerateWkt
     *
     * @return array<array{array<mixed>, int, string, string}>
     */
    public static function providerForTestGenerateWkt(): array
    {
        $temp = [
            [
                'MULTILINESTRING' => [
                    'data_length' => 2,
                    0 => ['data_length' => 2, 0 => ['x' => 5.02, 'y' => 8.45], 1 => ['x' => 6.14, 'y' => 0.15]],
                    1 => ['data_length' => 2, 0 => ['x' => 1.23, 'y' => 4.25], 1 => ['x' => 9.15, 'y' => 0.47]],
                ],
            ],
        ];

        $temp1 = $temp;
        unset($temp1[0]['MULTILINESTRING'][1][1]['y']);

        $temp2 = $temp;
        $temp2[0]['MULTILINESTRING']['data_length'] = 0;

        $temp3 = $temp;
        $temp3[0]['MULTILINESTRING'][1]['data_length'] = 1;

        return [
            [$temp, 0, '', 'MULTILINESTRING((5.02 8.45,6.14 0.15),(1.23 4.25,9.15 0.47))'],
            // if a coordinate is missing, default is empty string
            [$temp1, 0, '', 'MULTILINESTRING((5.02 8.45,6.14 0.15),(1.23 4.25,9.15 ))'],
            // missing coordinates are replaced with provided values (3rd parameter)
            [$temp1, 0, '0', 'MULTILINESTRING((5.02 8.45,6.14 0.15),(1.23 4.25,9.15 0))'],
            // at least one line should be there
            [$temp2, 0, '', 'MULTILINESTRING((5.02 8.45,6.14 0.15))'],
            // a line should have at least two points
            [$temp3, 0, '0', 'MULTILINESTRING((5.02 8.45,6.14 0.15),(1.23 4.25,9.15 0.47))'],
        ];
    }

    /**
     * Test for generateWkt
     *
     * @param array<mixed> $gisData
     * @param int          $index   index in $gis_data
     * @param string       $empty   empty parameter
     * @param string       $output  expected output
     */
    #[DataProvider('providerForTestGenerateWkt')]
    public function testGenerateWkt(array $gisData, int $index, string $empty, string $output): void
    {
        $object = new GisMultiLineString();
        self::assertSame($output, $object->generateWkt($gisData, $index, $empty));
    }

    /**
     * test getShape method
     */
    public function testGetShape(): void
    {
        $rowData = [
            'numparts' => 2,
            'parts' => [
                ['points' => [['x' => 5.02, 'y' => 8.45], ['x' => 6.14, 'y' => 0.15]]],
                ['points' => [['x' => 1.23, 'y' => 4.25], ['x' => 9.15, 'y' => 0.47]]],
            ],
        ];

        $object = new GisMultiLineString();
        self::assertSame(
            'MULTILINESTRING((5.02 8.45,6.14 0.15),(1.23 4.25,9.15 0.47))',
            $object->getShape($rowData),
        );
    }

    /**
     * test generateParams method
     *
     * @param string       $wkt    point in WKT form
     * @param array<mixed> $params expected output array
     */
    #[DataProvider('providerForTestGenerateParams')]
    public function testGenerateParams(string $wkt, array $params): void
    {
        $object = new GisMultiLineString();
        self::assertSame($params, $object->generateParams($wkt));
    }

    /**
     * data provider for testGenerateParams
     *
     * @return array<array{string, array<mixed>}>
     */
    public static function providerForTestGenerateParams(): array
    {
        return [
            [
                "'MULTILINESTRING((5.02 8.45,6.14 0.15),(1.23 4.25,9.15 0.47))',124",
                [
                    'srid' => 124,
                    0 => [
                        'MULTILINESTRING' => [
                            'data_length' => 2,
                            0 => ['data_length' => 2, 0 => ['x' => 5.02,'y' => 8.45], 1 => ['x' => 6.14,'y' => 0.15]],
                            1 => ['data_length' => 2, 0 => ['x' => 1.23,'y' => 4.25], 1 => ['x' => 9.15,'y' => 0.47]],
                        ],
                    ],
                ],
            ],
        ];
    }

    /**
     * test getExtent method
     *
     * @param string $spatial spatial data of a row
     * @param Extent $extent  expected results
     */
    #[DataProvider('providerForTestGetExtent')]
    public function testGetExtent(string $spatial, Extent $extent): void
    {
        $object = new GisMultiLineString();
        self::assertEquals($extent, $object->getExtent($spatial));
    }

    /**
     * data provider for testGetExtent
     *
     * @return array<array{string, Extent}>
     */
    public static function providerForTestGetExtent(): array
    {
        return [
            [
                'MULTILINESTRING((36 14,47 23,62 75),(36 10,17 23,178 53))',
                new Extent(minX: 17, minY: 10, maxX: 178, maxY: 75),
            ],
        ];
    }
}
