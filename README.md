# Tetris

![nico_logo](https://github.com/ardnyx/tetris/assets/86859621/b304376c-361f-4569-8591-40af96745928)

Play here: https://ardnyx.github.io/tetris/

<b>Note: </b> If one of the game modes load really slow, try restarting the page, loading a different game mode, or playing classic first. 

A custom-made classic tetris + 4 different complex gamemodes. Currently, the website is not available for mobile and it is not meant to be played in it (for now). If there are any issues (aside from the ones that are stated below), please open an issue in the "Issues" tab. You can also open suggestions and advices in this tab, not just issues. As of now, the website still suffers from a few styling issues provided below. However, here are some of their workarounds: 

## Issues
### Broken Homepage Format
![image](https://github.com/ardnyx/tetris/assets/86859621/4af51511-d716-46e1-8625-c70ef825a264)
<b>Workaround:</b> For Windows based OS, Press Ctrl - or + to zoom in or out. For MacOS, Cmd - or + to zoom in or out.

### Scrollable Gameplay Layout
![image](https://github.com/ardnyx/tetris/assets/86859621/2d06fcea-6dd2-4d49-a358-2220d0feb42c)
<b>Workaround:</b> For Windows based OS, Press Ctrl - to zoom out. For MacOS, Cmd - to zoom out.

## Missing Features
### Hold
The hold feature proved to be a challenge. We actually "did" manage to implement the hold feature, but one of the challeneges in implementing this feature was clearing out the current tetromino from the place where the hold was initiated. When the "C" key was clicked, it would hold the tetromino, but at the same time, that same tetromino would be stuck at the position where we started the hold, and it would only disappear once a tetromino got into its way. It was weird and we cannot fix it, possibly due to the structure of the tetris gameplay itself not being friendly to feature addition.

### Next Tetrominoes
In the recent versions of tetris, you can see what the current tetrominoes are upcoming next. Due to the nature of the Math.random method, we could not formulate the logic to show the upcoming "n" tetrominoes using the method.

### Responsiveness and Movement Snap
If you've observed in tetr.io and jstris, when you move a tetromino left or right, the key immediately "responds", like there's a snap. In our version of tetris, you need to hold the left/right keys for about ~~ a second before it registers as a hold. Again, limited by our knowledge as beginners. Because of this, fast and quick plays aren't possible, and you will have a hard time in the Chromatic Cascade mode at higher levels, where the tetrominoes drop faster. 

## The Team, MJ's Servants
Quilatan, Marcis Joseph - Team Leader, and Time Trial & Reversed Flex Mod Developer <br>
Tagle, Jel Kyann - Programmer and Lead Design Artist <br>
Leyesa, Dann Martin (<b>ardnyx</b>) - Lead Developer and Control Manager <br>
Diazana, Darren - Design and Concept Artist <br>
De Gula, Kerby Brent - Flashlight Mod Developer <br>
Mercado, Nico - Chromatic Cascade Mod Developer <br>
Samaco, Cyrus - Features Developer
