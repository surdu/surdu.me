---
title:  "Automate Building GitHub Pages That Use Jekyll Plugins"
synopsis: "I wanted to add a plugin for my Jekyll-generated website, and now I need to have a custom build process, as GitHub doesn't support custom plugins. We'll go through what is needed for that."
tags: [devops]
---

As of the writing of this article, this blog's content is generated using [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/). Until recently all was well: I pushed my code to the `master` branch on my website's repository and GitHub took care of generating the website for me using Jekyll. All this changed when I started needing to use a custom Jekyll plugin, as GitHub Pages don't support custom plugins due to security concerns.

What is needed to use GitHub pages with custom plugins is to generate the website locally and then upload the generated content to a special branch on your repository named `gh-pages`.

The solution that I've implemented involves creating a pre-push git hook that will do the following if it sees a push on the `master` branch:

 1. build the Jekyll website locally
 2. moves the `_site` folder that contains the generated website somewhere outside of the current folder (I choose the parent folder for simplicity)
 3. checkout the `gh-pages` branch and remove everything from the working directory
 4. copy back the content of the `_site` folder directly into the current working directory
 5. commit and push the newly copied content on the `gh-pages` branch

What we need to do first is to set up our repository for this purpose.

The first thing that we need to do is make sure we have Jekyll installed locally. Please check [Jekyll documentation](https://jekyllrb.com/docs/installation/) for that.

Afterward, we need to make sure we have the `gh-pages` branch on the repository. To do this, run the following terminal command in your local repository folder:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

If you already have the `gh-pages`, just run `git checkout gh-pages`.

Next, we'll need to make sure this new branch doesn't contain anything. This is especially the case when we don't do this at the inception of the repository and the `gh-pages` will basically inherit the content from the branch we made it from.

To clean the `gh-pages` branch, run the following in the terminal:

```bash
git checkout gh-pages
rm -rf *
git add -A
git commit -m "Initialized gh-pages branch"
git push
```

Now that the `gh-pages` branch contains no file, we're ready to add the git hook that will take care of generating the content for us.

First, let's create the git hook file:

```bash
touch .git/hooks/pre-push
```

This will create a file in the `.git/hooks` folder called pre-push. Open it in your preferred editor and paste in the following content:

```bash
#!/bin/sh

# If any command fails in the bellow script, exit with error
set -e

# Set the name of the folder that will be created in the parent
# folder of your repo folder, and which will temporarily
# hold the generated content.
temp_folder="_gh-pages-temp"

# Make sure our main code runs only if we push the master branch
if [ "$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)" == "master" ]; then
	# Store the last commit message from master branch
	last_message=$(git show -s --format=%s master)

	# Build our Jekyll site
	jekyll build

	# Move the generated site in our temp folder
	mv _site ../${temp_folder}

	# Checkout the gh-pages branch and clean it's contents
	git checkout gh-pages
	rm -rf *

	# Copy the site content from the temp folder and remove the temp folder
	cp -r ../${temp_folder}/* .
	rm -rf ../${temp_folder}

	# Commit and push our generated site to GitHub
	git add -A
	git commit -m "Built \`$last_message\`"
	git push

	# Go back to the master branch
	git checkout master
else
	echo "Not master branch. Skipping build"
fi
```

<note>
If you look at the comments in the above code (lines starting with #) which explain what each section of the code does, you should find the steps that are listed at the beginning of this article.
</note>

And that's it! Now, every time you push a commit to the `master` branch, your `gh-pages` branch should be updated with the content of your website.

Hope this helps! 👍
