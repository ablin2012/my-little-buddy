# My Little Buddy
[Current Version](https://ablin2012.github.io/my-little-buddy/)

### Background
Meet your new best buddy, INSERT PET NAME HERE! Your best buddy loves hanging out with you, but he/she needs some good food and a bit of TLC to stay alive. Give your pet some pets to increase its happiness level and give it some food to maintain a healthy hunger level. You can play mini-games with your pet to earn exp and currency to buy new toys and upgrades for your pet. Level up your pet and take on bosses. Defeat the final boss to make your pet live forever.

My Little Buddy is a game about pet care. Maintain your hunger and happiness health bars in order to keep your pet alive. Neglect your pet for too long and it will die. The longer you can keep your pet alive the more it will grow. The more your pet grows, the stronger it will get. Get your pet strong to defeat boss monsters.

### Instructions
Getting Started
* Pick a name for your pet
* Select a Pet Type by clicking the icons
* Click the Start Game button

Playing The Game
* Drag and drop food items to increase the Hunger Bar
* Click and drag mouse over pet to increase the Happiness Bar
* The Level and Score of the game will increase as time progresses
* If your pet dies click the Restart button to play again

Other Functionalities
* Click on the sound icon to mute/unmute
* Click on the pause icon to pause/unpause

### Functionality and MVP
In My Little Buddy, users will be able to
* Pet the pet
* Drag and drop foods to feed the pet
* Level up the pet
* Play minigames to earn currency/exp
* Fight bosses

In addition, this project will include:
* A home page to name your pet and display a game description
* A production README

### Wireframe
[wireframe](https://wireframe.cc/O107Qz)
* Model of pet displayed in the middle of the screen
* Display at the top to show pet’s level
* Progress bars to display experience, hunger level, and happiness
* Inventory shelf at the bottom to hold food to feed to the pet
* Scrollbar on the left for minigames
* Buttons on the top right for a store and entering boss battles
* Buttons on the bottom right to redirect to my LinkedIn, GitHub and Facebook

### Technologies and APIs
* Three.js for creating pet model
* Canvas to render images for food
* FontAwesome for button icons
* Google Fonts
* Webpack
* npm

### Technical Implementation
#### The 3D Models
To create my 3D models I used three.js. Each of the specific models are defined in the class of the pet. A selection on the intro page tells the code which model to build/render onto the page.

To have the head follow the mouse cursor I utilize an event listener to keep track of the x and y positions of the mouse at all times. This information is passed into a function within the pet model that updates the rotation of the head.


#### The Food Models
Each food item has a fixed position that scales with the size of the screen. An event listener is used to determine if the user is clicking and holding onto a food item. If the user is, then the selected food is temperarily stored as a variable and it's position is updated as the user moves the mouse while holding down of the item. The variable is cleared once the user's finger is off the click.

#### User/Pet Interations
A hitbox for the pet was created by setting a top, bottom, left, and right margin that scales with screen size. This hitbox is used in the logic for feeding and petting.

#### Pet Info/Updates
The data for the pet is updated and rendered onto the screen through the use of setIntervals. These intervals are cleared when the game is paused and then resumed when unpaused.

### Implementation Timeline
* ***Friday/Weekend:*** Setup project and make sure webpack is working. Start learning about Three.js and confirm that creating a pet model will be feasible. Learn how to utilize a Three model and 2D sprites in the same render. Create my pet and food classes
* ***Monday:*** Work on the 3D model. Have the model be basic for now and get the basic model and some food sprites rendered. Test the food and pet interactions and bars for hunger and happiness.
* ***Tuesday:*** Fine tune the 3D model. Add some animation to the pet. If time permits, create eating animations.
* ***Wednesday:*** Fine tune styling and implement a home page. Work on reach features; throwable food, boss battles, minigames.
* ***Friday:*** Miscellaneous changes, deploy GitHub pages, rewrite proposal as production README

### Todos
* Add sounds for each pet type that play on mouse click
* Create animations and buttons to trigger those animations
    * Dance
    * Happy
    * Eating
* Have food types randomized
* Add more unique characteristics for pets
    * Favorite food
* Create a database for saving your pet
* Create a leaderboard for highest scores and pet levels
* Add addition game functionality
    * Minigames
    * Boss fights
    * Store
