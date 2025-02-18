these are just export files lol, they're in constants
because they're constant, I guess
nothing changes in these files unless you want to add more to them
they just make it easier to call images and icons and junk
FOR EXAMPLE:
we have icons, which handles icons (duh)
these have their own names and we export them, then
in index.js we import icons and images and export them with,
you guessed it, ANOTHER SET OF NICKNAMES, so if you look in 
index.jsx, the sunflower image is called by: source = {images.sun1}
you can import icons and images with:
import { images } from "@/constants/index";
-Sophia