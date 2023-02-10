# lxplus
When Lightspeed breaks the X Series POS System, I fix it. Add JS injector extension that pulls and executes this code.

Inject this code into Lightspeed X domain in order to get updates:

var script= document.createElement('script');
script.src = "https://alxspiker.github.io/chromeextension.js";
document.head.appendChild(script);
