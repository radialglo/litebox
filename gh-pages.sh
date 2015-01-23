GH=gh-pages
M=master
OUTDIR="."
ORIGIN="origin"
DATE=$(date)


# If -B is given, <new_branch> is created if it doesn’t exist; otherwise, it is reset. This is the transactional equivale#

# $ git branch -f <branch> [<start point>]
# $ git checkout <branch>
# that is to say, the branch is not reset/created unless "git checkout" is successful.
git checkout -B $GH
git merge $M.
rm -rf  app.js package.json Gruntfile.js node_modules
mv assets/* .
rm -rf assets
rm -rf scss
git add --all .
git commit -m "$DATE"
git push --force $ORIGIN $GH

git checkout $M
