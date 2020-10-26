# Travel-App

Last project from Udacity course.<br>
Combining all the Front End skills learned into a capstone project.

Note to self:
Because I used async, await with (ES6 or ES Next) then I needed to install @babel/polyfill but withou the need to write anything in babelrc file.
Just install npm install --save @babel/polyfill

From the documentation:

Because this is a polyfill (which will run before your source code), we need it to be a dependency, not a devDependency

And finally you need to import @bable/polyfill in your mainJS (App.js) file like:

import "@babel/polyfill";
