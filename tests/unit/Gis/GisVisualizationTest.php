<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Gis;

use Generator;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Gis\Ds\ScaleData;
use PhpMyAdmin\Gis\GisVisualization;
use PhpMyAdmin\Gis\GisVisualizationSettings;
use PhpMyAdmin\Image\ImageWrapper;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\RequiresPhpExtension;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;
use TCPDF;
use TCPDF_STATIC;
use Throwable;

use function array_map;
use function assert;
use function file_exists;
use function file_put_contents;
use function json_encode;
use function md5;
use function ob_get_clean;
use function ob_start;
use function php_uname;
use function str_replace;
use function strrpos;
use function strtolower;
use function substr_replace;

use const JSON_PRETTY_PRINT;
use const JSON_THROW_ON_ERROR;
use const PHP_INT_MAX;
use const PNG_ALL_FILTERS;

#[CoversClass(GisVisualization::class)]
class GisVisualizationTest extends AbstractTestCase
{
    private static string $testDataDir = '';

    /** @psalm-suppress PropertyNotSetInConstructor */
    private DatabaseInterface $dbi;

    public static function setUpBeforeClass(): void
    {
        self::$testDataDir = __DIR__ . '/../../test_data/gis';
        (new ReflectionProperty(TCPDF_STATIC::class, 'tcpdf_version'))->setValue(null, '6.6.2');
    }

    public static function tearDownAfterClass(): void
    {
        $property = new ReflectionProperty(TCPDF_STATIC::class, 'tcpdf_version');
        $property->setValue(null, $property->getDefaultValue());
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->dbi = $this->createDatabaseInterface();
        DatabaseInterface::$instance = $this->dbi;
    }

    private function getArch(): string
    {
        $arch = php_uname('m');
        if ($arch === 'x86_64' && PHP_INT_MAX === 2147483647) {
            $arch = 'x86';
        }

        return $arch;
    }

    /**
     * Scale the data set
     */
    public function testScaleDataSet(): void
    {
        $this->dbi->setVersion(['@@version' => '5.5.0']);
        $gis = GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc'));

        $dataSet = (new ReflectionMethod(GisVisualization::class, 'scaleDataSet'))->invokeArgs($gis, [
            [
                ['abc' => null],// The column is nullable
                ['abc' => 2],// Some impossible test case
            ],
        ]);
        self::assertNull($dataSet);

        $dataSet = (new ReflectionMethod(GisVisualization::class, 'scaleDataSet'))->invokeArgs($gis, [
            [
                ['abc' => null],// The column is nullable
                ['abc' => 2],// Some impossible test case
                ['abc' => 'MULTILINESTRING((36 140,47 233,62 75),(36 100,17 233,178 93))'],
                ['abc' => 'POINT(100 250)'],
                ['abc' => 'MULTIPOINT(125 50,156 250,178 143,175 80)'],
            ],
        ]);
        self::assertEquals(
            new ScaleData(
                offsetX: -45.35714285714286,
                offsetY: 42.85714285714286,
                scale: 2.1,
                height: 450,
            ),
            $dataSet,
        );

        // Regression test for bug with 0.0 sentinel values
        $dataSet = (new ReflectionMethod(GisVisualization::class, 'scaleDataSet'))->invokeArgs($gis, [
            [
                ['abc' => 'MULTIPOLYGON(((0 0,0 3,3 3,3 0,0 0),(1 1,1 2,2 2,2 1,1 1)))'],
                ['abc' => 'MULTIPOLYGON(((10 10,10 13,13 13,13 10,10 10),(11 11,11 12,12 12,12 11,11 11)))'],
            ],
        ]);
        self::assertEquals(
            new ScaleData(
                scale: 32.30769230769231,
                offsetX: -2.7857142857142865,
                offsetY: -0.4642857142857143,
                height: 450,
            ),
            $dataSet,
        );
    }

    /**
     * Modify the query for an old version
     */
    public function testModifyQueryOld(): void
    {
        $this->dbi->setVersion(['@@version' => '5.5.0']);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))
            ->invokeArgs(GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc')), ['']);

        self::assertSame('SELECT ASTEXT(`abc`) AS `abc`, SRID(`abc`) AS `srid` FROM () AS `temp_gis`', $queryString);
    }

    /**
     * Modify the query for an MySQL 8.0 version
     */
    public function testModifyQuery(): void
    {
        $this->dbi->setVersion(['@@version' => '8.0.0']);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))
            ->invokeArgs(GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc')), ['']);

        self::assertSame(
            'SELECT ST_ASTEXT(`abc`) AS `abc`, ST_SRID(`abc`) AS `srid` FROM () AS `temp_gis`',
            $queryString,
        );
    }

    /**
     * Modify the query for an MySQL 8.0 version and trim the SQL end character
     */
    public function testModifyQueryTrimSqlEnd(): void
    {
        $this->dbi->setVersion(['@@version' => '8.0.0']);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))->invokeArgs(
            GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc')),
            ['SELECT 1 FROM foo;'],
        );

        self::assertSame(
            'SELECT ST_ASTEXT(`abc`) AS `abc`, ST_SRID(`abc`) AS `srid` FROM (SELECT 1 FROM foo) AS `temp_gis`',
            $queryString,
        );
    }

    /**
     * Modify the query for an MySQL 8.0 version using a label column
     */
    public function testModifyQueryLabelColumn(): void
    {
        $this->dbi->setVersion(['@@version' => '8.0.0']);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))->invokeArgs(
            GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'country_geom', 'country name')),
            [''],
        );

        self::assertSame(
            'SELECT `country name`, ST_ASTEXT(`country_geom`) AS `country_geom`,'
            . ' ST_SRID(`country_geom`) AS `srid` FROM () AS `temp_gis`',
            $queryString,
        );
    }

    /**
     * Modify the query for an MySQL 8.0 version adding a LIMIT statement
     */
    public function testModifyQueryWithLimit(): void
    {
        $this->dbi->setVersion(['@@version' => '8.0.0']);
        $gis = GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc'));
        (new ReflectionProperty(GisVisualization::class, 'rows'))->setValue($gis, 10);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))->invokeArgs($gis, ['']);

        self::assertSame(
            'SELECT ST_ASTEXT(`abc`) AS `abc`, ST_SRID(`abc`) AS `srid` FROM () AS `temp_gis` LIMIT 10',
            $queryString,
        );

        $gis = GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc'));
        (new ReflectionProperty(GisVisualization::class, 'pos'))->setValue($gis, 10);
        (new ReflectionProperty(GisVisualization::class, 'rows'))->setValue($gis, 15);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))->invokeArgs($gis, ['']);

        self::assertSame(
            'SELECT ST_ASTEXT(`abc`) AS `abc`, ST_SRID(`abc`) AS `srid` FROM () AS `temp_gis` LIMIT 10, 15',
            $queryString,
        );
    }

    /**
     * Modify the query for an MySQL 8.0.1 version
     */
    public function testModifyQueryVersion8(): void
    {
        $this->dbi->setVersion(['@@version' => '8.0.1']);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))
            ->invokeArgs(GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc')), ['']);

        self::assertSame(
            'SELECT ST_ASTEXT(`abc`, \'axis-order=long-lat\') AS `abc`, ST_SRID(`abc`) AS `srid` FROM () AS `temp_gis`',
            $queryString,
        );
    }

    /**
     * Modify the query for a MariaDB 10.4 version
     */
    public function testModifyQueryMariaDB(): void
    {
        $this->dbi->setVersion(['@@version' => '8.0.0-MariaDB']);
        $queryString = (new ReflectionMethod(GisVisualization::class, 'modifySqlQuery'))
            ->invokeArgs(GisVisualization::getByData([], new GisVisualizationSettings(600, 450, 'abc')), ['']);

        self::assertSame(
            'SELECT ST_ASTEXT(`abc`) AS `abc`, ST_SRID(`abc`) AS `srid` FROM () AS `temp_gis`',
            $queryString,
        );
    }

    /** @return array<string,list{string,list<array{label:string,wkt:string,srid:int|null}>}> */
    public static function providerTestGisData(): array
    {
        return [
            'empty' => ['empty', []],
            'Geometries' => [
                'Geometries',
                [
                    [
                        'label' => 'Point',
                        'wkt' => 'POINT(85 0)',
                        'srid' => null,
                    ],
                    [
                        'label' => 'LineString',
                        'wkt' => 'LINESTRING(10 -10,0 -60,50 -50)',
                        'srid' => null,
                    ],
                    [
                        'label' => 'Polygon',
                        'wkt' => 'POLYGON((0 60,0 10,50 60,0 60),(7 47,7 27,16 37,7 47),(13 53,33 53,23 44,13 53))',
                        'srid' => null,
                    ],
                    [
                        'label' => 'MultiPoint',
                        'wkt' => 'MULTIPOINT(10 0,160 0)',
                        'srid' => null,
                    ],
                    [
                        'label' => 'MultiLineString',
                        'wkt' => 'MULTILINESTRING((120 60,165 60,120 50),(170 10,170 55,160 10))',
                        'srid' => null,
                    ],
                    [
                        'label' => 'MultiPolygon',
                        'wkt' => 'MULTIPOLYGON(((170 -60,170 -10,120 -60,170 -60),(160 -50,160 -35,145 -50,160 -50)),'
                            . '((160 -10,110 -10,110 -60,160 -10),(135 -20,120 -20,120 -35,135 -20)))',
                        'srid' => null,
                    ],
                ],
            ],
            'GeometryCollection' => [
                'GeometryCollection',
                [
                    [
                        'label' => 'GeometryCollection',
                        'wkt' => 'GEOMETRYCOLLECTION('
                        . 'POINT(85 0),'
                        . 'LINESTRING(10 -10,0 -60,50 -50),'
                        . 'POLYGON((0 60,0 10,50 60,0 60),(7 47,7 27,16 37,7 47),(13 53,33 53,23 44,13 53)),'
                        . 'MULTIPOINT(10 0,160 0),'
                        . 'MULTILINESTRING((120 60,165 60,120 50),(170 10,170 55,160 10)),'
                        . 'MULTIPOLYGON(((170 -60,170 -10,120 -60,170 -60),(160 -50,160 -35,145 -50,160 -50)),'
                        . '((160 -10,110 -10,110 -60,160 -10),(135 -20,120 -20,120 -35,135 -20))))',
                        'srid' => null,
                    ],
                ],
            ],
        ];
    }

    /** @return Generator<string,list{string,list<array{label:string,wkt:string,srid:int|null}>}> */
    public static function providerTestGisDataOl(): Generator
    {
        foreach (self::providerTestGisData() as $case) {
            yield $case[0] . '-null' => [$case[0] . '-null', $case[1]];

            if ($case[1] === []) {
                continue;
            }

            yield $case[0] . '-0' => [
                $case[0] . '-0',
                array_map(
                    static fn (array $geom) => ['label' => $geom['label'], 'wkt' => $geom['wkt'], 'srid' => 0],
                    $case[1],
                ),
            ];

            yield $case[0] . '-4326' => [
                $case[0] . '-4326',
                array_map(
                    static fn (array $geom) => ['label' => $geom['label'], 'wkt' => $geom['wkt'], 'srid' => 4326],
                    $case[1],
                ),
            ];
        }
    }

    /** @param list<array{label:string,wkt:string,srid:int|null}> $data */
    #[DataProvider('providerTestGisDataOl')]
    public function testOl(string $name, array $data): void
    {
        $vis = GisVisualization::getByData(
            $data,
            new GisVisualizationSettings(width: 200, height: 150, spatialColumn: 'wkt'),
        );
        $ol = $vis->asOl();

        $this->assertSameOrSaveNewVersion(
            'ol-' . $name,
            'json',
            json_encode($ol, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT),
        );
    }

    /** @param list<array{label:string,wkt:string,srid:int|null}> $data */
    #[DataProvider('providerTestGisData')]
    public function testSvg(string $name, array $data): void
    {
        $vis = GisVisualization::getByData(
            $data,
            new GisVisualizationSettings(width: 200, height: 150, spatialColumn: 'wkt', labelColumn: 'label'),
        );
        $svg = $vis->asSVG();

        $this->assertSameOrSaveNewVersion($name, 'svg', str_replace('><', ">\n<", $svg));
    }

    /** @param list<array{label:string,wkt:string,srid:int|null}> $data */
    #[DataProvider('providerTestGisData')]
    public function testPdf(string $name, array $data): void
    {
        $visualization = GisVisualization::getByData(
            $data,
            new GisVisualizationSettings(width: 560, height: 420, spatialColumn: 'wkt', labelColumn: 'label'),
        );
        $vis = new ReflectionClass($visualization);
        /** @var TCPDF $pdf */
        $pdf = $vis->getMethod('createEmptyPdf')->invoke($visualization, 'A4');
        $pdf->setDocCreationTimestamp(1700000000);
        $pdf->setDocModificationTimestamp(1700000000);
        $pdf->setCompression(false);
        (new ReflectionProperty($pdf, 'file_id'))->setValue($pdf, md5($name));

        $vis->getMethod('prepareDataSet')->invoke($visualization, $data, 'pdf', $pdf);
        $pdfBlob = $pdf->Output(dest: 'S');

        $this->assertSameOrSaveNewVersion($name, 'pdf', $pdfBlob);
    }

    /** @param list<array{label:string,wkt:string,srid:int|null}> $data */
    #[RequiresPhpExtension('gd')]
    #[DataProvider('providerTestGisData')]
    public function testPng(string $name, array $data): void
    {
        $vis = GisVisualization::getByData(
            $data,
            new GisVisualizationSettings(width: 200, height: 150, spatialColumn: 'wkt', labelColumn: 'label'),
        );
        /** @var ImageWrapper $image */
        $image = (new ReflectionMethod($vis, 'png'))->invoke($vis);
        ob_start();
        $image->png(null, 9, PNG_ALL_FILTERS);
        $blob = ob_get_clean();
        assert($blob !== false);

        $this->assertSameOrSaveNewVersion($name, 'png', $blob);
    }

    private function assertSameOrSaveNewVersion(string $name, string $extension, string $content): void
    {
        $name = strtolower($name);
        $fileExpectedArch = self::$testDataDir . '/' . $name . '-expected-' . $this->getArch() . '.' . $extension;
        $fileExpectedGeneric = self::$testDataDir . '/' . $name . '-expected.' . $extension;
        $fileExpected = file_exists($fileExpectedArch) ? $fileExpectedArch : $fileExpectedGeneric;
        try {
            self::assertStringEqualsFile($fileExpected, $content);
        } catch (Throwable $e) {
            $pos = strrpos($fileExpected, 'expected');
            assert($pos !== false);
            file_put_contents(substr_replace($fileExpected, 'actual', $pos, 8), $content);

            throw $e;
        }
    }
}
