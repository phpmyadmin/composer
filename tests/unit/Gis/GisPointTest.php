<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Gis;

use PhpMyAdmin\Gis\Ds\Extent;
use PhpMyAdmin\Gis\GisPoint;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

#[CoversClass(GisPoint::class)]
#[PreserveGlobalState(false)]
#[RunTestsInSeparateProcesses]
class GisPointTest extends AbstractTestCase
{
    /**
     * data provider for testGenerateWkt
     *
     * @return array<array{array<mixed>, int, string, string}>
     */
    public static function providerForTestGenerateWkt(): array
    {
        return [
            [[['POINT' => ['x' => 5.02, 'y' => 8.45]]], 0, '', 'POINT(5.02 8.45)'],
            [[['POINT' => ['x' => 5.02, 'y' => 8.45]]], 1, '', 'POINT( )'],
            [[['POINT' => ['x' => 5.02]]], 0, '', 'POINT(5.02 )'],
            [[['POINT' => ['y' => 8.45]]], 0, '', 'POINT( 8.45)'],
            [[['POINT' => []]], 0, '', 'POINT( )'],
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
        $object = new GisPoint();
        self::assertSame($output, $object->generateWkt($gisData, $index, $empty));
    }

    /**
     * test getShape method
     *
     * @param array<string, float> $rowData array of GIS data
     * @param string               $shape   expected shape in WKT
     */
    #[DataProvider('providerForTestGetShape')]
    public function testGetShape(array $rowData, string $shape): void
    {
        $object = new GisPoint();
        self::assertSame($shape, $object->getShape($rowData));
    }

    /**
     * data provider for testGetShape
     *
     * @return array<array{array<string, float>, string}>
     */
    public static function providerForTestGetShape(): array
    {
        return [[['x' => 5.02, 'y' => 8.45], 'POINT(5.02 8.45)']];
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
        $object = new GisPoint();
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
                "'POINT(5.02 8.45)',124",
                [
                    'srid' => 124,
                    0 => [
                        'POINT' => [
                            'x' => 5.02,
                            'y' => 8.45,
                        ],
                    ],
                ],
            ],
            [
                '',
                [
                    'srid' => 0,
                    0 => [
                        'POINT' => [
                            'x' => 0.0,
                            'y' => 0.0,
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
        $object = new GisPoint();
        self::assertEquals($extent, $object->getExtent($spatial));
    }

    /**
     * data provider for testGetExtent
     *
     * @return array<array{string, Extent}>
     */
    public static function providerForTestGetExtent(): array
    {
        return [['POINT(12 35)', new Extent(minX: 12, minY: 35, maxX: 12, maxY: 35)]];
    }
}
