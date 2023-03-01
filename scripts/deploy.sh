green_back_black_text="\0033[0;30;42m"
red_back_white_text="\033[41m"
reset_color="\0033[0m"

function green_echo () {
  echo "" # For a new line
  echo -e "$green_back_black_text $1 $reset_color"
  echo "" # For a new line
}

function red_echo () {
  echo "" # For a new line
  echo -e "$red_back_white_text $1 $reset_color"
  echo "" # For a new line
}

function check_clean_working_tree () {
  if [[ -z $(git status -s) ]]
  then
    # Do nothing
    green_echo "Deploying to $deploy_env..."
  else
    red_echo "You have some uncommitted changes, please commit changes before running this"
    exit
  fi
}

script_dir=$(dirname "$(realpath $0)")
root_dir=$(dirname "$script_dir")

if [ -z "$DEPLOY_ENV" ]
then
  deploy_env="staging"
else
  deploy_env="$DEPLOY_ENV"
fi

deploy_time=`date | tr ' ' '_' | tr ':' '-'`
current_branch=$(git rev-parse --abbrev-ref HEAD)
tag_name="${deploy_env}_on_${deploy_time}"
branch_name="${deploy_env}/${deploy_time}"
last_commit_message=`git log -1 --pretty=%B`

check_clean_working_tree

# Switch to new temporary branch to generate assets
git checkout -b ${branch_name}

# Load env variables
source ${root_dir}/.env.${deploy_env}

# Run build script
yarn run build:${deploy_env}

# Commit the transpiled assets
git add -f build/*
git commit -m "${deploy_env}_deploy_at_${deploy_time} - ${last_commit_message}"

# Generate a github tag to log the release
git tag ${tag_name}
git push origin ${tag_name}


# Upload generate HTML files
green_echo "Syncing html files from build folder to $S3_HOST_FOLDER_URI"
aws s3 sync ${root_dir}/build ${S3_HOST_FOLDER_URI} --acl public-read --exclude "*" --include "*.html" --include "robots.txt"

# Upload generated assets to S3
green_echo "Syncing assets from build folder to $S3_ASSETS_FOLDER_URI"
aws s3 sync ${root_dir}/build ${S3_ASSETS_FOLDER_URI} --acl public-read --exclude "*.html" --exclude "robots.txt"

# Why are we storing html files and assets in separate s3 buckets?
# Because assets are uploaded to our assets CDN and html needs to be served
# through main Scaler distribution. The one that hosts html files needs to be
# private for cloudfront origins routing to work while the assets bucket needs
# to remain private for backward compatibility as that distribution is used
# accross multiple scaler apps which should not be played around with.

# Back to working tree
git checkout $current_branch
