<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers;

use PhpMyAdmin\Config;
use PhpMyAdmin\Core;
use PhpMyAdmin\Http\Factory\ResponseFactory;
use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\Routing\Route;
use PhpMyAdmin\Template;
use PhpMyAdmin\Url;

use function __;
use function array_keys;
use function basename;
use function file_get_contents;
use function htmlspecialchars;
use function is_readable;
use function ob_get_clean;
use function ob_start;
use function preg_replace;
use function readgzfile;
use function sprintf;
use function str_ends_with;

#[Route('/changelog', ['GET'])]
final class ChangeLogController implements InvocableController
{
    public function __construct(
        private readonly ResponseRenderer $response,
        private readonly Config $config,
        private readonly ResponseFactory $responseFactory,
        private readonly Template $template,
    ) {
    }

    public function __invoke(ServerRequest $request): Response
    {
        $response = $this->responseFactory->createResponse();
        foreach ($this->response->getHeader()->getHttpHeaders() as $name => $value) {
            $response = $response->withHeader($name, $value);
        }

        $filename = $this->config->getChangeLogFilePath();

        /**
         * Read changelog.
         */
        // Check if the file is available, some distributions remove these.
        if (! @is_readable($filename)) {
            return $response->write(sprintf(
                __('The %s file is not available on this system, please visit %s for more information.'),
                basename($filename),
                '<a href="' . Core::linkURL('https://www.phpmyadmin.net/')
                . '" rel="noopener noreferrer" target="_blank">phpmyadmin.net</a>',
            ));
        }

        // Test if the file is in a compressed format
        if (str_ends_with($filename, '.gz')) {
            ob_start();
            readgzfile($filename);
            $changelog = ob_get_clean();
        } else {
            $changelog = file_get_contents($filename);
        }

        /**
         * Whole changelog in variable.
         */
        $changelog = htmlspecialchars((string) $changelog);

        $githubUrl = 'https://github.com/phpmyadmin/phpmyadmin/';
        $faqUrl = 'https://docs.phpmyadmin.net/en/latest/faq.html';

        $replaces = [
            '@(https?://[./a-zA-Z0-9.-_-]*[/a-zA-Z0-9_])@' => '<a href="'
                . Url::getFromRoute('/url') . '&url=\\1">\\1</a>',

            // mail address
            '/([0-9]{4}-[0-9]{2}-[0-9]{2}) (.+[^ ]) +&lt;(.*@.*)&gt;/i' => '\\1 <a href="mailto:\\3">\\2</a>',

            // FAQ entries
            '/FAQ ([0-9]+)\.([0-9a-z]+)/i' => '<a href="'
                . Url::getFromRoute('/url') . '&url=' . $faqUrl . '#faq\\1-\\2">FAQ \\1.\\2</a>',

            // GitHub issues
            '/issue\s*#?([0-9]{4,5}) /i' => '<a href="'
                . Url::getFromRoute('/url') . '&url=' . $githubUrl . 'issues/\\1">issue #\\1</a> ',

            // CVE/CAN entries
            '/((CAN|CVE)-[0-9]+-[0-9]+)/' => '<a href="' . Url::getFromRoute('/url') . '&url='
                . 'https://www.cve.org/CVERecord?id=\\1">\\1</a>',

            // PMASAentries
            '/(PMASA-[0-9]+-[0-9]+)/' => '<a href="'
                . Url::getFromRoute('/url') . '&url=https://www.phpmyadmin.net/security/\\1/">\\1</a>',

            // Highlight releases (with links)
            '/([0-9]+)\.([0-9]+)\.([0-9]+)\.0 (\([0-9-]+\))/' => '<a id="\\1_\\2_\\3"></a>'
                . '<a href="' . Url::getFromRoute('/url') . '&url=' . $githubUrl . 'commits/RELEASE_\\1_\\2_\\3">'
                . '\\1.\\2.\\3.0 \\4</a>',
            '/([0-9]+)\.([0-9]+)\.([0-9]+)\.([1-9][0-9]*) (\([0-9-]+\))/' => '<a id="\\1_\\2_\\3_\\4"></a>'
                . '<a href="' . Url::getFromRoute('/url') . '&url=' . $githubUrl . 'commits/RELEASE_\\1_\\2_\\3_\\4">'
                . '\\1.\\2.\\3.\\4 \\5</a>',

            // Highlight releases (not linkable)
            '/(    ### )(.*)/' => '\\1<b>\\2</b>',

            // Links target and rel
            '/a href="/' => 'a target="_blank" rel="noopener noreferrer" href="',
        ];

        return $response->write($this->template->render('changelog', [
            'changelog' => preg_replace(array_keys($replaces), $replaces, $changelog),
        ]));
    }
}
