function generateScript() {
	return `
#!/usr/bin/env bash

set -o errexit

REL_DIR="\`dirname \\"$0\\"\`"
DIR=\`readlink -e $REL_DIR\`

WORDS=()

usage() {
	cat <<END
Simple script to echo a list of words

Usage:
  $(basename "$0") [-h|--help] <word1> <word2>...

Switches:
  -h|--help        Print this help screen and exit

END
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
			usage "$*"
			exit 0
		else
			fatal "Invalid argument: '$arg'"
		fi
	done
}

main() {
	parse_args "$*"
	
	for word in "\${WORDS[@]}"; do
  		echo "\${word}"
	done
}

main "$*"
	`.trim();
}

export default {
	title: 'Bash script',
	description: `Bash script with a few basic amenities and command line parsing`,
	
	blocks: [
		{
			language: 'bash',
			instructions: `Add this to your bash script. Don't forget to make it executable`,
			code: generateScript
		}
	]
};