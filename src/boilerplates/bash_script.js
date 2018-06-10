function generateScript() {
	return `
#!/usr/bin/env bash

DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"

WORDS=

usage() {
	echo 'Simple script to echo list of words'
	echo 'Usage:'
	echo
	echo '    script.sh [-h|--help] <word1> <word2>...'
	echo
	echo '-h|--help        Print this help screen and exit'
	echo
}

fatal() {
	echo "ERROR: $@" >&2
	exit 1
}

parse_args() {
	for arg in "$@"; do
		if [[ "\${arg:0:1}" != '-' ]]; then
			WORDS+=($arg)
		elif [[ "$arg" = '-h' || "$arg" = '--help' ]]; then
			usage
			exit 0
		else
			fatal "Invalid argument: '$arg'"
		fi
	done
}

main() {
	parse_args $@
	
	for word in "\${WORDS[@]}"; do
  	echo "\${word}"
	done
}

main $*
	`.trim();
}

export default {
	title: 'Bash script',
	description: `Bash script that readies its location and argument parsing`,
	
	options: {
	},
	
	blocks: [
		{
			title: 'script.sh',
			language: 'bash',
			instructions: `Add this to your bash script. Don't forget to make it executable`,
			code: generateScript
		}
	]
};