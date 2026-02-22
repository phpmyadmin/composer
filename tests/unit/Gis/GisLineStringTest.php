<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Gis;

use PhpMyAdmin\Gis\Ds\Extent;
use PhpMyAdmin\Gis\GisLineString;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

#[CoversClass(GisLineString::class)]
#[PreserveGlobalState(false)]
#[RunTestsInSeparateProcesses]
class GisLineStringTest extends AbstractTestCase
{
    /**
     * data provider for testGenerateWkt
     *
     * @return array<array{array<mixed>, int, string, string}>
     */
    public static function providerForTestGenerateWkt(): array
    {
        $temp1 = [
            [
                'LINESTRING' => [
                    'data_length' => 2,
                    0 => ['x' => 5.02, 'y' => 8.45],
                    1 => ['x' => 6.14, 'y' => 0.15],
                ],
            ],
        ];

        $temp2 = $temp1;
        $temp2[0]['LINESTRING']['data_length'] = 3;
        $temp2[0]['LINESTRING'][2] = ['x' => 1.56];

        $temp3 = $temp2;
        $temp3[0]['LINESTRING']['data_length'] = -1;

        $temp4 = $temp3;
        $temp4[0]['LINESTRING']['data_length'] = 3;
        unset($temp4[0]['LINESTRING'][2]['x']);

        return [
            [$temp1, 0, '', 'LINESTRING(5.02 8.45,6.14 0.15)'],
            // if a coordinate is missing, default is empty string
            [$temp2, 0, '', 'LINESTRING(5.02 8.45,6.14 0.15,1.56 )'],
            // if data_length is not valid, it is considered as 2
            [$temp3, 0, '', 'LINESTRING(5.02 8.45,6.14 0.15)'],
            // missing coordinates are replaced with provided values (3rd parameter)
            [$temp4, 0, '0', 'LINESTRING(5.02 8.45,6.14 0.15,0 0)'],
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
        $object = new GisLineString();
        self::assertSame($output, $object->generateWkt($gisData, $index, $empty));
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
        $object = new GisLineString();
        self::assertEquals($params, $object->generateParams($wkt));
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
                "'LINESTRING(5.02 8.45,6.14 0.15)',124",
                [
                    'srid' => 124,
                    0 => [
                        'LINESTRING' => [
                            'data_length' => 2,
                            0 => ['x' => 5.02, 'y' => 8.45],
                            1 => ['x' => 6.14, 'y' => 0.15],
                        ],
                    ],
                ],
            ],
            [
                '',
                [
                    'srid' => 0,
                    0 => [
                        'LINESTRING' => [
                            'data_length' => 1,
                            0 => [
                                'x' => 0,
                                'y' => 0,
                            ],
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
        $object = new GisLineString();
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
            ['LINESTRING(12 35,48 75,69 23,25 45,14 53,35 78)', new Extent(minX: 12, minY: 23, maxX: 69, maxY: 78)],
        ];
    }
}
