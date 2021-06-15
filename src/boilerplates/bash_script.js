import { Boilerplate, FIELD_TYPES } from '../lib/types';

function generateScript({ name }) {
  return `
#!/usr/bin/env bash

set -o errexit

REL_DIR="\`dirname \\"$0\\"\`"
DIR=\`readlink -e $REL_DIR\`

LOG_FILE="/tmp/${name}.log"

WORDS=()

usage() {
	cat <<END
${name}: A simple script to echo a list of words

Usage:
  $(basename "$0") [-h|--help] <word1> <word2>...

Switches:
  -h|--help        Print this help screen and exit

END
}

log() {
	echo "$@"
	echo "> $@" >> "$LOG_FILE"
}

error() {
  echo "ERROR: $@" >&2
  echo "ERROR: $@" >> "$LOG_FILE"
}

fatal() {
	error $*
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
			fatal "Invalid argument: '$arg'."
		fi
	done
}

main() {
  echo -e "Executed at $(date)\\n----------------------------" > "$LOG_FILE"

	parse_args "$*"
	
	for word in "\${WORDS[@]}"; do
  		echo "\${word}"
	done
}

main $*
	`.trim();
}

export default new Boilerplate({
  title: 'Bash script',
  description: `Bash script with a few basic amenities and command line parsing`,

  fields: [
    {
      key: 'name',
      label: 'Script name',
      type: FIELD_TYPES.TEXT,
      defaultValue: 'my-script',
    },
  ],

  blocks: [
    {
      language: 'bash',
      instructions: `Add this to your bash script. Don't forget to make it executable`,
      code: generateScript,
    },
  ],
});
