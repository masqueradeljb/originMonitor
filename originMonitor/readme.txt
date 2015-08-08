Origin Monitor
Our chrome extension provides functionalities for users to view and block origins on their browsers.
It has two operation modes, blacklist and whitelist.
Users can choose to use either of them in the main user interface, the pop-up menu, by clicking the icon of our extension on browser's tool bar.

Blacklist
In blacklist mode, all the origins are allowed by default. Users can view all the origins that the site in current tab communicated with. These origins are put into several categories, based on the web object types they send to the users' browser. Users can block, unblock these origins by clicking the button beside the origin. The origin will change to blue color if users click the block button. This means that although it is blocked by users, the packets have already been received by the browser. Next time, if our extension detects that some sites are trying to communicate with those blocked origins, it will show them in red color in pop-up menu.
No matter users block the origin on which page, it will be applied on all the tabs. It works in this way because we believe that if users want to blacklist an origin, they may not trust it anymore.

Whitelist
In our whitelist mode, all the origins are blocked by default. But in case user starts it accidentally, our extension requires user to double confirm using it by entering whitelist setting and click start whitelist. Users can add a particular origin into whitelist, search whitelist origin by its name, and delete it. These change will be applied on the origin blocking immediately after entering whitelist mode. 
After entering whitelist mode, users can monitor the origin on a particular tab as well. But the block and unblock button will not appear on the pop-up menu.

We implement both blacklist and whitelist in our extension because we believe ordinary users have little chance to use whitelist, even though it is much safer. The blacklist can help them avoid further impact of a malicious origin, while whitelist is for security experts.

Design obstacle
In our design, the pop-up menu is loaded each time when users click it. A background process is running persistently to collect and intercept all the web requests. As our extension shows the pop menu based on each tab, it requires to get the urls that associate with certain tabs. Although it is not very hard to get these information from background process, there are many useful cases we need to consider. For example, if the user refreshes the current tab, we should be able to reflect the change on origins in the pop-up menu. But in chrome, the navigation event does not has an consistent time stamp with web request. So it is possible that we get an new navigation event after receiving new web requests. We deal with this problem by detecting the domain change when intercepting web requests. 
