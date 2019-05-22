<?php

/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 **/

/**
 * @link http://phantomjs.org/api/webpage/method/open.html
 **/

$options = array(
	'http' => array(
		  'method'  => 'POST'
		, 'header'  => "Content-Type: application/x-www-form-urlencoded"
		, 'content' => json_encode(array(
			  'jsonrpc' => '2.0'
			, 'method' => 'page.content'
			, 'params' => array(
					  'url' => 'https://www.google.com'
				)
			))
	)
);

$context  = stream_context_create($options);
$result = file_get_contents('http://127.0.0.1:4242/', false, $context);

var_dump($result);
