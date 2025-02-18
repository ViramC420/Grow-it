Alright homies, react native is VERY VERY picky about 
system files, if you put something in the wrong folder
its not good, lol

YOU WILL NOTICE that the app folder has _layout and index files
_layout defines fonts and also uses globalprovider for the file (tab) system

WHAT is the file (tab) system???
MAGIC TBH

the pages defined in (tabs) are both the pages themselves AND 
act as navigation 
WOOOOO 

you'll notice another _layout file there 
this defines clickable tabs and what pages they'll go to using the name attribute!!
that being said, if you want to create a page with a tab, it has to be in the (tabs)
folder AND you need to add it to _layout.

BUT 

we can have more than one folder like this!!
that's what (auth) is, if a user isnt logged in they get sent into 
sign-in or sign-up, the files are basic examples, and we can change
them to what we need, but the base is nice to have

ALSO THERES A SEARCH PAGE THAT NEEDS A CERTAIN FILE SETUP BUT 
ME HAVE NO TIME TO LOOK INTO IT 

basically, in the apps folder we can add another folder called search,
in that file we can add a file that looks like [query].jsx 
where we can do searches by querying our database, ooooooh
I plan to add a similar folder called home where we use another 
[query].jsx folder, but that one handles user data and creates
graphs from it (thank you professor Lei for the roasts)

Be sure to read the rest of the readme files for more info
on certain folders and what their files do 
-Sophia