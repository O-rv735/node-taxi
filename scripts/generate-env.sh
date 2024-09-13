#!/usr/bin/env bash

# Abort script on non 0 staus code from any command
set -e

# Function which generate password
function generatePasword() {
  openssl rand -hex 24
}

# This function did all magic. Accept two parameters
# $1 = ./path/to/env.example path
# $2 = ./path/to/.env file
function generateEnvFile() {
  ENV_EXAMPLE=$1 
  DOT_ENV_FILE=$2;

  # Create .env file
  cat "$ENV_EXAMPLE" > "$DOT_ENV_FILE"

  # Loads variables from created .env file, needed for loading POSTGRES ENVs
  source "$DOT_ENV_FILE"

  # Create varable with password
  POSTGRES_PASSWORD=$(generatePasword)

  # Create prisma url
  USERS_PRISMA_DB_URL=\""postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB?schema=public\""

  # Replace empty password strings in .env with strings with values
  sed -i.bak \
    -e "s#POSTGRES_PASSWORD=.*#POSTGRES_PASSWORD=${POSTGRES_PASSWORD}#g" \
    -e "s#USERS_PRISMA_DB_URL=.*#USERS_PRISMA_DB_URL=${USERS_PRISMA_DB_URL}#g" \
    "$DOT_ENV_FILE"

  # Get return code of last command
  RC=$?

  # Check if last command was cuccess, if yes remove .env.bak file
  if [ $RC -eq 0 ]; then
    rm "$DOT_ENV_FILE.bak" 
  fi

  echo "File $DOT_ENV_FILE generated succesfully!"
}

# Array of prefixes for directories and env.example files
declare -a ENV_PREFIXES=("dev" "test" "prod")

# Iteration over each prefix and call generation of .env for each directory
for prefix in "${ENV_PREFIXES[@]}"; do
  generateEnvFile "./env-$prefix/$prefix.env.example"  "./env-$prefix/.env"
done
