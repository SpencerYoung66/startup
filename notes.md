# Notes for CS260: Web Programming
Link to [README.md](https://github.com/SpencerYoung66/startup/blob/main/README.md)

### GitHub Notes:
- To resolve conflicts, I may need to configure my git first with `git config pull.rebase false` to have it merge on conflict. Then if they are in the same lines, I can proceed to check the file and decide on the merges from there.
- `git fetch` will get what changes are made without changing local repository
- Getting a fork from GitHub will get you a copy of the repository in your GitHub, then you can pull it to your development system.

### HTTPS Notes:
- Let's Encyrpt will dynamically check to make sure that the owner of the site is who they say they are, then they will issue a dynamically allocated/generated certificate

# Midterm Notes:
1. 
2. 
3. 
15. ![CSS Box Model](images/CSSBoxModel.png)
30. bozo.click is root, click is top level, banana.fruit is subdomain
32. DNS points to IP address for given domain name (cloudflare.com)
33. 443 - HTTPS, 80 - HTTP, 22 - SSH



# Final Notes:
1. 443 - HTTPS, 80 - HTTP, 22 - SSH
2. 300 - Multiple Choices (user or user-agent should choose one) - Redirect to some other location, 400 bad request (401 unauthorized, 403 forbidden, 404 file not found) - Client Errors, 500 Internal Server (generic catch all) - Server Errors
3. Content-type Tells browser what type of content is being transmitted
4. Domain - specifies who (which server) can receive the cookie, Path - specifies path that must exist in cookie, allows cookies to be sent to different websites, HTTPOnly - disallows javascript 
5. -
6. -
7. -
8. We should cryptographically hash passwords
9. -
10. WebSockets are used to have dual communication between server and client, websockets are still only between two parties
11. JSX - JavaScript XML, {} display variables/components
12. -
13. -
14. -
15. Hooks allow React to have class style functionality and more
16. useEffect - Run the functions inside everytime the condition is met (lifecycle events)
17. -
18. npm - Download node packages
19. package.json - metadata about project; scripts you can execute to run, test, or distribute code;packages that project depends on
20. fetch - Makes an API call
21. node.js - node, run javascript outside of browser
22. Vite - toolchain that completes process of going to JSX to minification to polyfills to bundling