#!/bin/sh

git config --global user.email "contact.reallyfatyoshi@gmail.com" 
git config --global user.name "Workflow"
git config --global --unset credential.helper
git config --global url."https://ReallyFatYoshi:%token%@github.com".insteadOf "https://github.com"

git add . 
git commit -m "Update Config.json" 
git push https://@github.com/ReallyFatYoshi/bds-updater.git
