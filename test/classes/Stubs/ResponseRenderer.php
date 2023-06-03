<?php
/**
 * Fake response stub for testing purposes
 *
 * It will concatenate HTML and JSON for given calls to addHTML and addJSON
 * respectively, what make it easy to determine whether the output is correct in test
 * suite. Feel free to modify for any future test needs.
 */

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Stubs;

use PhpMyAdmin\Footer;
use PhpMyAdmin\Header;
use PhpMyAdmin\Message;

use function is_array;

class ResponseRenderer extends \PhpMyAdmin\ResponseRenderer
{
    /**
     * HTML data to be used in the response
     *
     * @var string
     */
    protected $htmlString;

    /**
     * An array of JSON key-value pairs
     * to be sent back for ajax requests
     *
     * @var array
     */
    protected $json;

    /** @var int */
    private $responseCode = 200;

    /** @var bool */
    private $isHeadersSent = false;

    /**
     * Creates a new class instance
     */
    public function __construct()
    {
        $this->isSuccess = true;
        $this->htmlString = '';
        $this->json = [];
        $this->isAjax = false;

        $GLOBALS['lang'] = 'en';
        $this->header = new Header();
        $this->footer = new Footer();
    }

    /**
     * Append HTML code to the response stub
     */
    public function addHTML(string $content): void
    {
        $this->htmlString .= $content;
    }

    /**
     * Add JSON code to the response stub
     *
     * @param array-key|array<array-key, mixed> $json  Either a key (string) or an array or key-value pairs
     * @param mixed|null                        $value Null, if passing an array in $json otherwise
     *                                                 it's a string value to the key
     */
    public function addJSON($json, $value = null): void
    {
        if (is_array($json)) {
            foreach ($json as $key => $value) {
                $this->addJSON($key, $value);
            }
        } elseif ($value instanceof Message) {
            $this->json[$json] = $value->getDisplay();
        } else {
            $this->json[$json] = $value;
        }
    }

    /**
     * Return the final concatenated HTML string
     *
     * @return string
     */
    public function getHTMLResult()
    {
        return $this->htmlString;
    }

    /**
     * Return the final JSON array
     *
     * @return array
     */
    public function getJSONResult()
    {
        return $this->json;
    }

    /**
     * Current I choose to return PhpMyAdmin\Header object directly because
     * our test has nothing about the Scripts and PhpMyAdmin\Header class.
     *
     * @return Header
     */
    public function getHeader()
    {
        return $this->header;
    }

    /**
     * Set the status of an ajax response,
     * whether it is a success or an error
     *
     * @param bool $state Whether the request was successfully processed
     */
    public function setRequestStatus(bool $state): void
    {
        $this->isSuccess = $state;
    }

    /**
     * Get the status of an ajax response.
     */
    public function hasSuccessState(): bool
    {
        return $this->isSuccess;
    }

    /**
     * This function is used to clear all data to this
     * stub after any operations.
     */
    public function clear(): void
    {
        $this->isSuccess = true;
        $this->json = [];
        $this->htmlString = '';
    }

    /**
     * Set the ajax flag to indicate whether
     * we are servicing an ajax request
     *
     * @param bool $isAjax Whether we are servicing an ajax request
     */
    public function setAjax(bool $isAjax): void
    {
        $this->isAjax = $isAjax;
    }

    /**
     * Returns true or false depending on whether
     * we are servicing an ajax request
     */
    public function isAjax(): bool
    {
        return $this->isAjax;
    }

    public function setHttpResponseCode(int $responseCode): void
    {
        $this->responseCode = $responseCode;
    }

    public function getHttpResponseCode(): int
    {
        return $this->responseCode;
    }

    public function headersSent(): bool
    {
        return $this->isHeadersSent;
    }

    public function setHeadersSent(bool $isHeadersSent): void
    {
        $this->isHeadersSent = $isHeadersSent;
    }
}
