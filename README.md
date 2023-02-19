<h1>2048 game pure JavaScript</h1>

The project is a web-based game that uses webpack as the bundler and implements the Model-View-Controller (MVC) pattern. The Model class is responsible for managing data, the View class is responsible for working with the Document Object Model (DOM), and the Controller class is responsible for handling the main logic, including event handling and data retrieval and storage.

Each class is implemented using the module pattern, with each class having its own file. The game state is saved to local storage, so that when the user refreshes the page, they can continue playing from where they left off.

A separate class is created to work with local storage. This class is responsible for managing the storage of game state and history. A small table is created to display the history of games, which is also saved to local storage.

The game includes music, that plays when the user clicks on the keyboard.
