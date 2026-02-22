<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Gis;

use PhpMyAdmin\Gis\Ds\Extent;
use PhpMyAdmin\Gis\GisPolygon;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

#[CoversClass(GisPolygon::class)]
#[PreserveGlobalState(false)]
#[RunTestsInSeparateProcesses]
class GisPolygonTest extends AbstractTestCase
{
    /**
     * Provide some common data to data providers
     *
     * @return mixed[][]
     */
    private static function getData(): array
    {
        return [
            'POLYGON' => [
                'data_length' => 2,
                0 => [
                    'data_length' => 5,
                    0 => ['x' => 35, 'y' => 10],
                    1 => ['x' => 10, 'y' => 20],
                    2 => ['x' => 15, 'y' => 40],
                    3 => ['x' => 45, 'y' => 45],
                    4 => ['x' => 35, 'y' => 10],
                ],
                1 => [
                    'data_length' => 4,
                    0 => ['x' => 20, 'y' => 30],
                    1 => ['x' => 35, 'y' => 32],
                    2 => ['x' => 30, 'y' => 20],
                    3 => ['x' => 20, 'y' => 30],
                ],
            ],
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
        $object = new GisPolygon();
        self::assertSame($output, $object->generateWkt($gisData, $index, $empty));
    }

    /**
     * data provider for testGenerateWkt
     *
     * @return array<array{array<mixed>, int, string, string}>
     */
    public static function providerForTestGenerateWkt(): array
    {
        $temp = [self::getData()];

        $temp1 = $temp;
        unset($temp1[0]['POLYGON'][1][3]['y']);

        $temp2 = $temp;
        $temp2[0]['POLYGON']['data_length'] = 0;

        $temp3 = $temp;
        $temp3[0]['POLYGON'][1]['data_length'] = 3;

        return [
            [$temp, 0, '', 'POLYGON((35 10,10 20,15 40,45 45,35 10),(20 30,35 32,30 20,20 30))'],
            // values at undefined index
            [$temp, 1, '', 'POLYGON(( , , , ))'],
            // if a coordinate is missing, default is empty string
            [$temp1, 0, '', 'POLYGON((35 10,10 20,15 40,45 45,35 10),(20 30,35 32,30 20,20 ))'],
            // missing coordinates are replaced with provided values (3rd parameter)
            [$temp1, 0, '0', 'POLYGON((35 10,10 20,15 40,45 45,35 10),(20 30,35 32,30 20,20 0))'],
            // should have at least one ring
            [$temp2, 0, '0', 'POLYGON((35 10,10 20,15 40,45 45,35 10))'],
            // a ring should have at least four points
            [$temp3, 0, '0', 'POLYGON((35 10,10 20,15 40,45 45,35 10),(20 30,35 32,30 20,20 30))'],
        ];
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
        $object = new GisPolygon();
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
                '\'POLYGON((35 10,10 20,15 40,45 45,35 10),(20 30,35 32,30 20,20 30))\',124',
                ['srid' => 124, 0 => self::getData()],
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
        $object = new GisPolygon();
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
            ['POLYGON((123 0,23 30,17 63,123 0))', new Extent(minX: 17, minY: 0, maxX: 123, maxY: 63)],
            [
                'POLYGON((35 10,10 20,15 40,45 45,35 10),(20 30,35 32,30 20,20 30)))',
                new Extent(minX: 10, minY: 10, maxX: 45, maxY: 45),
            ],
        ];
    }
}
