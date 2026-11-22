# Lost and Found for Students

a basic web app for student to report lost items and delete items that are either found or not needed

## Name
Vamshi Charles

## Technologies used

html
css
javascript
Node.js

## Prerequisites

Web browser: google chrome, mozilla firefox or microsoft edge
Version Requirement: any version will work

Node.js: Version 18 or higher

## Installation
1. Download or clone this url to your local system using git bash
https://github.com/vcharles2/lost-and-found-list.git

2. Download Node.js 

## configuration

There is no config settings needed, this can run natively right away

## Running the application

1. Open the directory folder on your desktop
2. open the index.html file to launch web app in default browser

## Running Automated Tests

 Open a terminal (such as Git Bash) inside the root `lost-and-found-list` folder.

 In the terminal run the command 'npm test'

You should see all 6 unit tests in `tests/itemService.test.js` run and pass

## Trying the Sprint 1 functionality
follow these steps to evaluate current sprint
1. Open project inside browser of your choice(since you have not reported an lost item there will be a message that says "No lost items reported yet.).
2. Click inside text box labeled "Enter lost item (ie., wallet, phone).
3. Type any item that could be lost (try typing "blue water bottle" first and then add another item of your choice) and click "Submit" button or press Enter key.
4. Watch for the page to refresh automatically and show a item reported lost at the bottom of the text box
5. Click delete on eithier the blue water bottle item or the item you submitted located on the far right and instanly see it be cleared from the list
6. Click the manual refresh button to verify that the item is still there without losing save state

## Trying the Sprint 2 functionality
1. Select Lost or Found Status: Use the status dropdown at the top of the form to choose Lost or Found.
2. Add an Item Description: Enter an item name (e.g., Calculus Textbook) and add distinguishing details in the description box (e.g., 8th Edition, blue cover with sticky notes), then click Submit.
3. Verify Badges & Descriptions: Confirm the item displays with a yellow Lost badge or green Found badge alongside its description, and persists after refreshing the page.
4. Search by Keyword: Type a word (such as calculus or `"blue) into the search bar above the list to filter matching items in real time by name or description.
5. Filter by Category: Use the filter dropdown (All Items, Lost Only, Found Only) next to the search bar to view only Lost or Found items, or combine both search and category filters together.


## Known Limitations
 Local only boundaries: The data is locked onto your local computer only, you cannot view this list on another computer.

Image uploads and student contact verification are not yet implemented.
