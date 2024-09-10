#!/usr/bin/env bash

# Abort script on non 0 staus code from any command
set -e

# Function which generate password
function generatePasword() {
  openssl rand -hex 24
}

# This function did all magic. Accept two parameters
# $1 = env example path
# $2 = destination for .env file
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

  # Get return code of last co
  RC=$?

  # Check if last command was cuccess, if yes remove .env.bak file
  if [ $RC -eq 0 ]; then
    rm "$DOT_ENV_FILE.bak" 
  fi
}

# Path defenition for development env
DEV_ENV_EXAMPLE="./env.example"
DEV_DOT_ENV="./.env"

# Path defenition for test env
TEST_ENV_EXAMPLE="./test.env.example"
TEST_DOT_ENV="./test/.env"

# Call generate env file for dev and test environment
generateEnvFile "$DEV_ENV_EXAMPLE" "$DEV_DOT_ENV"
generateEnvFile "$TEST_ENV_EXAMPLE" "$TEST_DOT_ENV"
