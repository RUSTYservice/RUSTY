# RUSTY

## How To Get Started
1. Run 'npm install' from the terminal in the root directory of the forked/cloned repo

2. Get your database instance running with the terminal command 'mongod'

3. Start your server with 'npm start'

4. Generate your bundle with 'npm run build'

Your static files are now being served on localhost:3000


## How to Seed Deployed Database
1. Run node ./seedmongo.js in the terminal and end the process with Ctrl-C when prompted.

2. If deploying with Heroku, a database can be provisioned through mLab and populated by running, for example, mongodump -h localhost:27017 -d rustydb -o ~/tmp/mongodump
mongorestore -h ds111496.mlab.com:11496 -d heroku_q2r416hr -u SOME_USERNAME -p SOME_PASSWORD ~/tmp/mongodump/rustydb1.


## Cloudinary API Info
1. In popup after first login, in 4/settings make sure to allow unsigned upload mode

2. Go to preset
    ##### Create 2 presets:
  ```
  Preset name : avqjuqpq
  mode : unsigned
  allowed formats : gif, jpeg, jpg, png
  ```
  ```
  Preset name : zahnf2xg
  mode : unsigned
  allowed formats : mp4
  ```
> ##### If you want custom names go into config/cloudinaryConfig.js
>  * Set the preset1 variable equal to your custom name1
>  * Set the preset2 variable equal to your custom name2

3. Name your cloud
Put your account name in variable : cloud_name, located in file: config/cloudinaryConfig.js
Make sure to give it the same name that you have set on cloudinary for your cloud name.


## Suggested Next Steps/Ideas For Expansion
- Incorporate mapping of results
- Save pet owner favorited places
- Make recommendations to users based on past favorites
- Link with Google Places or other API to populate additional dog-friendly business data
- Show businesses who have a RUSTY account as priority in search results
