<?php

declare(strict_types=1);

namespace PhpMyAdmin;

use function array_intersect;
use function array_map;
use function explode;
use function fclose;
use function feof;
use function fgets;
use function fopen;
use function function_exists;
use function fwrite;
use function iconv;
use function mb_convert_encoding;
use function mb_convert_kana;
use function mb_detect_encoding;
use function mb_list_encodings;
use function strtolower;
use function tempnam;
use function unlink;

/**
 * Encoding conversion helper class
 */
class Encoding
{
    /**
     * None encoding conversion engine
     */
    public const ENGINE_NONE = 0;

    /**
     * iconv encoding conversion engine
     */
    public const ENGINE_ICONV = 1;

    /**
     * mbstring encoding conversion engine
     */
    public const ENGINE_MB = 3;

    /**
     * Chosen encoding engine
     */
    private static int|null $engine = null;

    /**
     * Map of conversion engine configurations
     *
     * Each entry contains:
     *
     * - function to detect
     * - engine contant
     * - extension name to warn when missing
     *
     * @var mixed[]
     */
    private static array $enginemap = [
        'iconv' => ['iconv', self::ENGINE_ICONV, 'iconv'],
        'mb' => ['mb_convert_encoding', self::ENGINE_MB, 'mbstring'],
        'none' => ['isset', self::ENGINE_NONE, ''],
    ];

    /**
     * Order of automatic detection of engines
     *
     * @var mixed[]
     */
    private static array $engineorder = ['iconv', 'mb'];

    /**
     * Kanji encodings list
     */
    private static string $kanjiEncodings = 'ASCII,SJIS,EUC-JP,JIS';

    /**
     * Initializes encoding engine detecting available backends.
     */
    public static function initEngine(): void
    {
        $engine = 'auto';
        $config = Config::getInstance();
        if (isset($config->settings['RecodingEngine'])) {
            $engine = $config->settings['RecodingEngine'];
        }

        /* Use user configuration */
        if (isset(self::$enginemap[$engine])) {
            if (function_exists(self::$enginemap[$engine][0])) {
                self::$engine = self::$enginemap[$engine][1];

                return;
            }

            Core::warnMissingExtension(self::$enginemap[$engine][2]);
        }

        /* Autodetection */
        foreach (self::$engineorder as $engine) {
            if (function_exists(self::$enginemap[$engine][0])) {
                self::$engine = self::$enginemap[$engine][1];

                return;
            }
        }

        /* Fallback to none conversion */
        self::$engine = self::ENGINE_NONE;
    }

    /**
     * Setter for engine. Use with caution, mostly useful for testing.
     *
     * @param int $engine Engine encoding
     */
    public static function setEngine(int $engine): void
    {
        self::$engine = $engine;
    }

    /**
     * Checks whether there is any charset conversion supported
     */
    public static function isSupported(): bool
    {
        if (self::$engine === null) {
            self::initEngine();
        }

        return self::$engine != self::ENGINE_NONE;
    }

    /**
     * Converts encoding of text according to parameters with detected
     * conversion function.
     *
     * @param string $srcCharset  source charset
     * @param string $destCharset target charset
     * @param string $what        what to convert
     *
     * @return string   converted text
     */
    public static function convertString(
        string $srcCharset,
        string $destCharset,
        string $what,
    ): string {
        if ($srcCharset === $destCharset) {
            return $what;
        }

        if (self::$engine === null) {
            self::initEngine();
        }

        return match (self::$engine) {
            self::ENGINE_ICONV => iconv(
                $srcCharset,
                $destCharset . (Config::getInstance()->settings['IconvExtraParams'] ?? ''), $what,
            ),
            self::ENGINE_MB => mb_convert_encoding($what, $destCharset, $srcCharset),
            default => $what,
        };
    }

    /**
     * Detects whether Kanji encoding is available
     */
    public static function canConvertKanji(): bool
    {
        return Current::$lang === 'ja';
    }

    /**
     * Setter for Kanji encodings. Use with caution, mostly useful for testing.
     */
    public static function getKanjiEncodings(): string
    {
        return self::$kanjiEncodings;
    }

    /**
     * Setter for Kanji encodings. Use with caution, mostly useful for testing.
     *
     * @param string $value Kanji encodings list
     */
    public static function setKanjiEncodings(string $value): void
    {
        self::$kanjiEncodings = $value;
    }

    /**
     * Reverses SJIS & EUC-JP position in the encoding codes list
     */
    public static function kanjiChangeOrder(): void
    {
        $parts = explode(',', self::$kanjiEncodings);
        if ($parts[1] === 'EUC-JP') {
            self::$kanjiEncodings = 'ASCII,SJIS,EUC-JP,JIS';

            return;
        }

        self::$kanjiEncodings = 'ASCII,EUC-JP,SJIS,JIS';
    }

    /**
     * Kanji string encoding convert
     *
     * @param string $str  the string to convert
     * @param string $enc  the destination encoding code
     * @param string $kana set 'kana' convert to JIS-X208-kana
     *
     * @return string   the converted string
     */
    public static function kanjiStrConv(string $str, string $enc, string $kana): string
    {
        if ($enc === '' && $kana === '') {
            return $str;
        }

        $stringEncoding = mb_detect_encoding($str, self::$kanjiEncodings);
        if ($stringEncoding === false) {
            $stringEncoding = 'utf-8';
        }

        if ($kana === 'kana') {
            $dist = mb_convert_kana($str, 'KV', $stringEncoding);
            $str = $dist;
        }

        if ($stringEncoding !== $enc && $enc !== '') {
            return mb_convert_encoding($str, $enc, $stringEncoding);
        }

        return $str;
    }

    /**
     * Kanji file encoding convert
     *
     * @param string $file the name of the file to convert
     * @param string $enc  the destination encoding code
     * @param string $kana set 'kana' convert to JIS-X208-kana
     *
     * @return string   the name of the converted file
     */
    public static function kanjiFileConv(string $file, string $enc, string $kana): string
    {
        if ($enc === '' && $kana === '') {
            return $file;
        }

        $tmpfname = (string) tempnam(Config::getInstance()->getUploadTempDir(), $enc);
        $fpd = fopen($tmpfname, 'wb');
        if ($fpd === false) {
            return $file;
        }

        $fps = fopen($file, 'r');
        if ($fps === false) {
            return $file;
        }

        self::kanjiChangeOrder();
        while (! feof($fps)) {
            $line = fgets($fps, 4096);
            if ($line === false) {
                continue;
            }

            $dist = self::kanjiStrConv($line, $enc, $kana);
            fwrite($fpd, $dist);
        }

        self::kanjiChangeOrder();
        fclose($fps);
        fclose($fpd);
        unlink($file);

        return $tmpfname;
    }

    /**
     * Defines radio form fields to switch between encoding modes
     *
     * @return string HTML code for the radio controls
     */
    public static function kanjiEncodingForm(): string
    {
        $template = new Template();

        return $template->render('encoding/kanji_encoding_form');
    }

    /**
     * Lists available encodings.
     *
     * @return mixed[]
     */
    public static function listEncodings(): array
    {
        if (self::$engine === null) {
            self::initEngine();
        }

        /* Most engines do not support listing */
        $config = Config::getInstance();
        if (self::$engine != self::ENGINE_MB) {
            return $config->settings['AvailableCharsets'];
        }

        return array_intersect(
            array_map(strtolower(...), mb_list_encodings()),
            $config->settings['AvailableCharsets'],
        );
    }
}
