# Phantom REPL

Phantom REPL lets you program [PhantomJS](https://github.com/ariya/phantomjs) _from the inside_.

## How to use

### Start server

    $ phantomjs server.js

PhantomJS is now listening for connections on the default port 4242.

### Send request

    $ wget -O - \
      --post-data='{"jsonrpc":"2.0","method":"page.content","params":{"url":"https://www.google.com"}}' \
      http://127.0.0.1:4242

Ask PhantomJS to print the content of https://www.google.com to standard output.

    $ wget -O - --post-data='{"jsonrpc": "2.0", "method": "phantom.exit"}' http://127.0.0.1:4242/

Ask PhantomJS to quit.
