#/bin/bash

# really dirty start script ;-)

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo $HERE > /tmp/log

pushd $HERE
	npm i express
	npm i dotenv
	nodejs app.js >> /tmp/log 2>&1
popd


