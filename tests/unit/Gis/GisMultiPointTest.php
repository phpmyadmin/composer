<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Gis;

use PhpMyAdmin\Gis\Ds\Extent;
use PhpMyAdmin\Gis\GisMultiPoint;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

#[CoversClass(GisMultiPoint::class)]
#[PreserveGlobalState(false)]
#[RunTestsInSeparateProcesses]
class GisMultiPointTest extends AbstractTestCase
{
    /**
     * data provider for testGenerateWkt
     *
     * @return array<array{array<mixed>, int, string, string}>
     */
    public static function providerForTestGenerateWkt(): array
    {
        $gisData1 = [
            [
                'MULTIPOINT' => [
                    'data_length' => 2,
                    0 => ['x' => 5.02, 'y' => 8.45],
                    1 => ['x' => 1.56, 'y' => 4.36],
                ],
            ],
        ];

        $gisData2 = $gisData1;
        $gisData2[0]['MULTIPOINT']['data_length'] = -1;

        return [
            [$gisData1, 0, '', 'MULTIPOINT(5.02 8.45,1.56 4.36)'],
            [$gisData2, 0, '', 'MULTIPOINT(5.02 8.45)'],
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
        $object = new GisMultiPoint();
        self::assertSame($output, $object->generateWkt($gisData, $index, $empty));
    }

    /**
     * test getShape method
     */
    public function testGetShape(): void
    {
        $gisData = ['numpoints' => 2, 'points' => [['x' => 5.02, 'y' => 8.45], ['x' => 6.14, 'y' => 0.15]]];

        $object = new GisMultiPoint();
        self::assertSame('MULTIPOINT(5.02 8.45,6.14 0.15)', $object->getShape($gisData));
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
        $object = new GisMultiPoint();
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
                "'MULTIPOINT(5.02 8.45,6.14 0.15)',124",
                [
                    'srid' => 124,
                    0 => [
                        'MULTIPOINT' => [
                            'data_length' => 2,
                            0 => ['x' => 5.02, 'y' => 8.45],
                            1 => ['x' => 6.14, 'y' => 0.15],
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
        $object = new GisMultiPoint();
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
            ['MULTIPOINT(12 35,48 75,69 23,25 45,14 53,35 78)', new Extent(minX: 12, minY: 23, maxX: 69, maxY: 78)],
        ];
    }
}
