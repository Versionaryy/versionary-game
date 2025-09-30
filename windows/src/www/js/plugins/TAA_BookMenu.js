//=============================================================================
// TAA_BookMenu.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.bm = {};
TAA.bm.Version = "1.7.0";
TAA.bm.PluginName = "TAA_BookMenu";
TAA.bm.alias = {};
var Imported = Imported || {};
var Luna = Luna || undefined;

/*:
 * @target MV MZ
 *
 * @plugindesc [1.7.0] Create a Book Menu
 * @author T. A. A. (taaspider)
 * @url http://taaspider.itch.io/
 * 
 * @help
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Any plugins developed by taaspider are free for use for both commercial and 
 * noncommercial RPG Maker games, unless specified otherwise. Just remember to
 * credit "Taaspider".
 * 
 * Redistribution of parts or the whole of taaspider plugins is forbidden, unless
 * it comes from the official website: http://taaspider.itch.io. You are allowed 
 * to edit and change the plugin code for your own use, but you're definitely not 
 * allowed to sell or reuse any part of the code as your own. Although not 
 * required to use my plugins, a free copy of your game would be nice!
 * 
 * If you enjoy my work, consider offering a donation when downloading my plugins, 
 * or offering a monthly pledge to my Patreon account. It would be of great help!
 * Also, follow me on facebook to get firsthand news on my activities!
 *  Facebook: https://www.facebook.com/taaspider 
 *  Patreon: https://www.patreon.com/taaspider
 *  
 * =============================================================================
 * Introduction
 * =============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * You don't need any specific version if you're using MZ.
 * 
 * -----------------------------------------------------------------------------
 * 
 * When we create a game, we usually create a whole new world rich in lore and 
 * details, and want to make it all available to the players, so that they can
 * understand every single detail we develop. However, just dumping it all in 
 * lengthy dialogues usually bore and scare most of the players, who will simply
 * give up on your world.
 * 
 * A common alternative used by many AAA games is to minimize dialogue and
 * exposition, and provide additional details through in-game books.
 * 
 * This plugin aims to provide just that for your game: a book menu where the
 * player can read up additional lore when he feels up to it. You can place books
 * throughout your game, providing a bit more of context for hungry players as
 * they progress, and keeping exposition to a minimum.
 * 
 * =============================================================================
 * Instructions - Scene Differences
 * =============================================================================
 * 
 * This plugin provides two different types of scenes. 
 * 
 * The first one is a detached book window, that shows only one book at a time 
 * (title and book contents). It is a simpler version meant to be used when the
 * player finds a new book while exploring your world. You can set it up so that
 * the book will then be made available in the menu so that the player can read
 * it anytime he wants, or not.
 * 
 * The second scene is kind of a "player library". It is meant to be accessed from
 * the main menu and list all books known to the player (you can set it up to show
 * all books EVER, or only those the player has found while exploring).
 * 
 * 
 * =============================================================================
 * Instructions - Setting Up the Scenes
 * =============================================================================
 * 
 * The plugin parameters that configures the windows can be left as it is by
 * default and they should work fine. But, should you wish to customize them,
 * here's a few things you should know.
 * 
 * -----------------------------------------------------------------------------
 * Detached Title Window
 * -----------------------------------------------------------------------------
 * 
 * This parameter configures the title bar from the detached window scene. All
 * options are meant to control a specific aspect of the window.
 * 
 * Hide Title Bar
 *  - Use this to hide the Title Window and show only the Text window.
 * 
 * Default:
 *  false
 * 
 * 
 * Default:
 * 
 * X: Graphics.boxWidth / 12
 * Y: Graphics.boxHeight / 10
 * Width: Graphics.boxWidth * 4/5
 * Height: this.fittingHeight(1)
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Text Alignment: center
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Detached Text Window
 * -----------------------------------------------------------------------------
 * 
 * This one configures the detached text window scene, where the book contents
 * are displayed. Most of the options here are used to control the window aspect.
 * 
 * There's one, however, that can be used to customize the text display:
 * 
 * Book Text Format
 *  - This defines how the book text is shown to the players. You can use text
 * codes to customize the window as you wish, and use this placeholders to
 * set up book data:
 *    - %1 will reference the book title (should you wish to hide the title bar)
 *    - %2 will reference the book category
 *    - %3 will reference the book text
 * I highly recommend using Yanfly's Message Core plugin, or any other that provides
 * wordwrapping functions. Be sure to place the plugin's wordwrap tag here, 
 * so that you don't have to worry setting up your books' text lines yourself.
 * This plugin does not implement wordwrapping as to not be redundant to many
 * other popular and commonly used plugins, as well as try to remain compatible
 * to all of them.
 * 
 * Default: 
 *  <Wordwrap>%3
 * 
 * 
 * Y
 *  - There's a catch to this one: it is relative to the title window position.
 * So, 0 means it will be placed directly below the title window. If you wish to
 * hide the title window remember to set the "Hide Title Bar" property to "true".
 * 
 * 
 * Default:
 * X: Graphics.boxWdith / 12
 * Y: 0
 * Width: Graphics.boxWidth * 4/5
 * Height: Graphics.boxHeight * 2/3
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Menu List Window
 * -----------------------------------------------------------------------------
 * 
 * This will set up how the book list window is displayed in the book menu.
 * 
 * Show Categories
 *  - This will determine if books will be listed below their categories in the
 * list window. If set to false, categories will be hidden and the menu will list
 * only books.
 * 
 * Default:
 *  true
 * 
 * Closed / Opened Category Symbol
 *  - This two parameters defines what symbols we will be using to show the player
 * that a category is compressed or expanded. Think of categories like folders:
 * when you open a folder in the windows explorer menu, the folder will appear 
 * opened. Otherwise it will be closed.
 * 
 * Default:
 *  Closed Category Symbol: +
 *  Opened Category Symbol: -
 * 
 * Category Text Format
 *  - This defines how the categories are shown to the players in the list menu. 
 * You can use text codes to customize it as you wish, and use this placeholders to
 * set up the category entry:
 *    - %1 will reference the opened/closed symbols
 *    - %2 will reference the category name
 *    - %3 will reference the number of books available under that category
 * 
 * Default: 
 *  %1%2 (%3)
 * 
 * Load Closed Categories
 *  - This parameter defines if the book list in the menu scene should be loaded
 * with categories closed by default. If set to ON, they will be loaded as closed,
 * if OFF, as open.
 * 
 * Default:
 *  ON
 * 
 * Book Indent
 *  - This is how much to indent book names if the categories are shown, helping
 * players distinguish books from categories and which books belong to which
 * category.
 * 
 * Default:
 *  16
 * 
 * Hide Unread Books
 *  - This determines if we should hide books the player has not found by himself
 * in the book menu or not. If set to true, only books read while exploring the
 * world will be listed. If false, all available books are shown.
 * 
 * Default:
 *  true
 * 
 * 
 * Default:
 * X: 0
 * Y: 0
 * Width: Graphics.boxWidth * 1/3
 * Height: Graphics.boxHeight
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Standard Padding: 8
 * Text Padding: 6
 * Category Alignment: left
 * Book Alignment: left
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * Version 1.6.0 adds a new feature where books can change as the game progresses,
 * and a "New!" mark can be added over a listed book to identify for the player
 * which books have changed since the last time he entered the menu. The settings
 * for the changed book markings are included as part of the menu list configurations.
 * 
 * Changed Book Indicator
 *  This defines when a changed book mark will be included in the menu list:
 *      - None: Never identify changed books;
 *      - New Addition Only: Only books recently added to the menu and not yet
 *        read (be it by accessing the book menu or by using the detached scene)
 *        are marked;
 *      - Text Update Only: New books are not marked, only books which have their
 *        contents changed by plugin commands are identified;
 *      - All: Identify both new additions and text changes.
 * 
 * Changed Book Markings
 *  This is an object used to config whatever method you decide to use to identify
 * changed books. Use the "Mark Type" parameter to decide from one of the three types
 * of markings available:
 *      - Text: Sets up a text to write over a changed book list entry (example: New!)
 *      - Icon: Chooses an icon to show over a changed book list entry
 *      - Picture: Uses a picture located in img/pictures/ to mark a changed book.
 *        Keep in mind the picture should be small. If for some reason it exceeds the
 *        list item maximum space it will be automatically resized
 * 
 * -----------------------------------------------------------------------------
 * Menu Title Window
 * -----------------------------------------------------------------------------
 * 
 * This is very similar to the Detached Title Window parameters, but it defines
 * how the title bar will be displayed inside the book menu.
 * 
 * Empty Title Text
 *  - When the player is navigating the list of books, he can leave the cursor
 * on a category item, which have no text. This parameters allows you to setup a 
 * default text to be displayed when there is no book selected.
 * 
 * Default:
 *  Library
 * 
 * 
 * Default:
 * 
 * X: Graphics.boxWidth / 3
 * Y: 0
 * Width: Graphics.boxWidth * 2/3
 * Height: this.fittingHeight(1)
 * Line Height: 36
 * Font Size: 24
 * Font Face: GameFont
 * Text Alignment: center
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * -----------------------------------------------------------------------------
 * Menu Text Window
 * -----------------------------------------------------------------------------
 * 
 * This is very similar to the Detached Text Window parameters, but it defines
 * how the text window will be displayed inside the book menu.
 * 
 * Book Text Format
 *  - This defines how the book text is shown to the players. You can use text
 * codes to customize the window as you wish, and use this placeholders to
 * set up book data:
 *    - %1 will reference the book title (should you wish to hide the title bar)
 *    - %2 will reference the book category
 *    - %3 will reference the book text
 * I highly recommend using Yanfly's Message Core plugin, or any other that provides
 * wordwrapping functions. Be sure to place the plugin's wordwrap tag here, 
 * so that you don't have to worry setting up your books' text lines yourself.
 * This plugin does not implement wordwrapping as to not be redundant to many
 * other popular and commonly used plugins, as well as try to remain compatible
 * to all of them.
 * 
 * Default: 
 *  <Wordwrap>%3
 * 
 * 
 * Empty Book Text
 *  - When the player is navigating the list of books, he can leave the cursor
 * on a category item, which have no text. This parameters allows you to setup a 
 * default text to be displayed when there is no book selected.
 * 
 * Default:
 *  <blank>
 * 
 * 
 * Default:
 * X: Graphics.boxWdith / 3
 * Y: 0
 * Width: Graphics.boxWidth * 2/3
 * Height: Graphics.boxHeight - this._titleWindow.height
 * Line Height: 36
 * Font Size: 20
 * Font Face: GameFont
 * Standard Padding: 8
 * Text Padding: 6
 * Standard Opacity: 255
 * Back Opacity: 192
 * Window Skin: Window
 * 
 * 
 * =============================================================================
 * Background Images
 * =============================================================================
 * 
 * The plugin gives a lot of options for you to setup background images on both
 * scenes. Configurations are kept separate for each one, so you can set 
 * different backgrounds for each scene if you wish.
 * 
 * All images must be in png format and located in the img/pictures folder.
 * The parameters to config each type of background image is shared by all
 * possible options.
 * 
 * A warning though, the plugin won't manipulate, stretch or shrink images.
 * It will only place the images as they are. It's up to you to provide
 * images on the right size.
 * 
 * Apart from choosing the images, you must also inform the plugin how you
 * want it to present them. Options are a little different between scenes
 * because the Menu Scene has an additional window (the list window), but the
 * logic is the same. Here's a few things you should know:
 *  - If you set it up as "None", the plugin will paint a black background,
 * with no image;
 *  - If you set "Default Map Print", it will keep the base class default,
 * which is using a print screen from the map the player is located;
 *  - If you set "Full Background Image", the image will be place as a
 * background for the whole screen, regardless of the size of your windows;
 *  - There's a bunch of options saying "Multiple Images", and then a combo
 * highlighted between parenthesis, like "Title + Text", "Title / Text + List",
 * for example. The dash sign (/) means the windows will share a single image,
 * while the plus sign (+) means it will use a different image;
 *  - The option "Single Image" will set the same image across all windows
 * in the scene. If the scene takes the whole screen, it will work exactly
 * as the "Full Background Image". If not, it will be placed as best as possible
 * to cover all windows on the scene, and nothing more;
 *  - There are also options to allow you to combine different configurations,
 * so you can customize the background to your liking!
 * 
 * =============================================================================
 * Custom Backgrounds
 * =============================================================================
 * 
 * IMPORTANT: All images will be loaded from the img/pictures folder, and 
 * they must be in png format.
 * 
 * You can setup custom backgrounds for individual books, so that it will override
 * the global background configurations. You may set it to show on the detached
 * window or menu window separately, or on both, and you can define if it will
 * cover the text window only or both text and title windows. You can't setup 
 * different backgrounds for each scene though, for ease of use.
 * 
 * While using the Plugin Manager to load books, just set the "Custom Background"
 * parameter of a books to select an image, and the "Custom Background Mode" to
 * set the custom background behavior. Leave "Custom Background" empty if you
 * don't want a custom image to be displayed.
 * 
 * If using a JSON file as datasource, just add a "customBg" tag to specify the
 * file name and a customBgMode to define the custom background behavior. The
 * customBgMode tag must be an integer, as follows:
 *  - 5: Detached Text Window Only
 *  - 6: Menu Text Window Only
 *  - 7: All Text Window Only
 *  - 9: Detached Title + Text Window
 *  - 10: Menu Title + Text Window
 *  - 11: All Title + Text Window
 * Just to clarify, this code is read bitwise by the plugin. That's why it is not 
 * sequential. Bits are read as follows:
 *  - 1 (least significant bit): Affects the detached window
 *  - 2 (second least significant bit): Affects the menu window
 *  - 4 (second most significant bit): Affects the text window
 *  - 8 (most significant bit): Affects both text and title window
 * 
 * Do not include the custom background tags in your JSON file if you don't want
 * to use a custom image for the book, or leave "customBg" as an empty string.
 *  
 * 
 * =============================================================================
 * Inline Images
 * =============================================================================
 *  
 * The escape code % img("filename") (no space between % and img) can be used
 * to include an image along with the book text in its original size (or resized
 * to fit into window, see next section). The plugin will always look for images
 * in PNG format in the pictures folder.
 * 
 * Ex.: % img("Sword")
 * %img("Sword");
 * 
 * You can also include optional parameters to force the plugin to resize the 
 * image to your liking: % img("filename", width, height) (again, no space 
 * between % and img). The code parameters width and height are percentile
 * numbers. For instance, if you want the image to be displayed in half its
 * original size use % img("filename", 50, 50).
 * 
 * Ex.: % img("Sword", 50, 50)
 * %img("Sword", 50, 50)
 * 
 * Ex.: %img("Sword", 40, 20)
 * %img("Sword", 40, 20)
 * 
 * One additional note: images are loaded into memory asynchronously. Which means
 * the plugin won't wait for it to be ready to show the book's text. If, however,
 * the image finishes loading and the screen is already showing your book's text
 * it will be automatically updated. In other words, slower machines may
 * see the book load without the image, just to see the screen automatically
 * update a few seconds later including it.
 * 
 * -----------------------------------------------------------------------------
 * Inline Trailing Images
 * -----------------------------------------------------------------------------
 * 
 * You can insert small images at the start of paragraphs using the escape code
 * % in_img("filename") (no space between % and in_img). The same resizing
 * parameters as % img can be used here: % in_img("filename", 50, 50).
 * The image will always be aligned to the left of the screen, and any following
 * text will be displayed right next to it (at the same height as the bottom
 * of the image).
 * 
 * -----------------------------------------------------------------------------
 * 
 * WARNING: If you're using a plugin to provide wordwrapping functions, you'll
 * need to manually include the wordwrap tag before any text that follows an
 * inline image. It is required because to include such images this plugin
 * needs to break down the book text in sections, and the wordwrap tag included
 * in the "Book Text Format" parameter or at the start of the first block of
 * text won't have effect on any text following the image.
 * Ex.: <WordWrap>Before an inline image.%img("Sword")<WordWrap>After any image.
 * 
 * =============================================================================
 * Misc Parameters
 * =============================================================================
 * 
 * The Misc parameters are general configurations that don't fit into any
 * of other categories. Here you can find the following options:
 * 
 * Break Before Image
 *  - This defines if the plugin should automatically add a line break (a
 * blank line) before any images you insert. It's default value is false, 
 * since your book text will be more human friendly if you manually include
 * a new line before the inline image code.
 * 
 * Force Image Into Window
 *  - This basically tells the plugin if it is acceptable for an inline image
 * to be bigger than the window width. If set to true, an image bigger then the
 * window width will be resized to fit (using the same proportion for height).
 * If false, the image will be loaded into the window as is.
 * 
 * Reset Books Read On Load
 *  - This can be used to force books previously read to be forgotten when a
 * saved game is loaded. If set to "REMEMBER", the books read by the player will
 * be reloaded as they were when the game was saved. If set to "RESET", all books
 * will be forgotten on game load.
 * 
 * Native Touch/Click Support
 *  - This parameter has three possible values:
 *    * Disable: completely disables Touch/Click support;
 *    * Up/Down Arrows Only: Enables support only for scrolling by clicking / 
 *      touching on the up/down arrows;
 *    * Full Support: Enables support for scrolling using the up/down arrows
 *      and by touch/click and dragging up and down.
 * By default this option is set to 'Full Support', but if you're using another
 * plugin to provide custom touch behavior you may stumble into compatibility
 * issues. In that case, try disabling full support either total or partially.
 * I cannot guarantee compatibility with plugins which customize touch inputs
 * with Full Support on ('Up/Down Arrows Only' should be okay though).
 * 
 * Inline Image Preloading
 *  - This parameter enables or disables inline image preloading. If enabled,
 * the plugin will start loading inline images when the book is highlighted in 
 * the book list, before the book itself is loaded. This happens to try and
 * prevent text from appearing first, and the images a few seconds later. This,
 * however, can be memory heavy if you have a large number of books with 
 * different inline images. Disabling this option may help with performance,
 * but may also make the delay when loading images apparent.
 * 
 * Check Files First
 *  - This determines if the plugin should check if an inline book image
 * exists before trying to load it. This is a safeguard added to prevent
 * a game from crashing if the image is not found. I recommend to keep it
 * enabled at all times. But if for any reason you need you can disable it.
 * 
 * Load Before Title
 *  - If enabled, game will display "Now Loading..." until books are fully
 * loaded into memory before displaying the title screen. If disabled, they
 * will be loaded asynchronously (as it was with previous versions)
 * 
 * Line Break Between Texts
 *  - Starting at version 1.6.0, book texts can be updated as the game 
 * progresses. This parameter defines if automatic line breaks should be 
 * added between text chunks. You can choose either no line breaks, a single
 * one, or double automatic line breaks.
 * 
 * Line Break Pattern
 *  - This allows you to set the specific characters to insert as line breaks
 * between variable text chunks. Either use the default '\n', or change it to
 * a custom value like '<br>' (which would be needed for compatibility with
 * Vizustella's Message Core wordwrap feature).
 * 
 * =============================================================================
 * Instructions - DataSources
 * =============================================================================
 * 
 * This plugin was built to work with two main types of datasources: the Plugin
 * Manager and external JSON files.
 * 
 * DataSource Type
 *  - Use this parameters to define which datasource will be used. If you choose
 * 'Plugin Manager', you need to enter your books in the 'Plugin Manager Books'
 * parameter. If you choose the 'JSON File' option, you need to refine 
 * configurations in the 'JSON Config' parameter. Either way, you should use
 * only one. So by choosing one you can safely ignore the other parameters.
 * 
 * -----------------------------------------------------------------------------
 * JSON Config
 * -----------------------------------------------------------------------------
 * 
 * Type
 *  - This plugin provides two options when using a JSON file to load your book
 * data: 'Dedicated File' and 'Localization File'.
 *   * Dedicated File: You specify a dedicated file with the expected structure,
 * and the plugin will read your book texts as they are configured in the file.
 *   * Localization File: If you're using a localization plugin that reads text
 * from different files according to the language selected by the player (like 
 * Iavra's Localization Plugin, for example), you need to specify the structure
 * inside the files and how is you placeholders configured. Then, you need to 
 * point to ONE of the files. This plugin will use the selected file as a guide
 * to load the placeholders as needed.
 * 
 * File
 *  - This should point to a JSON file containing all your books. If you 'Type'
 * has been set to 'Localization File' (meaning you're using a Localization 
 * Plugin and different files for different languages), this parameter should
 * point to a just one of the language files.
 * The JSON file must have a structure similar to this, whichever Type has been
 * chosen:
 * 
 * {
 *  "library": {
 *      "categories": [
 *          "Category 1",
 *          "Category 2",
 *          ...
 *          "Category N"
 *      ],
 *      "books": {
 *          "title1": {
 *              "title": "Book Title",
 *              "titleColor": 0,
 *              "text": "Book's content.",
 *              "textArray": [
 *                  "if you want your book text to change throughout the game",
 *                  "add all text chunks inside this array"
 *              ],
 *              "visibleTexts": [
 *                  0
 *              ],
 *              "category": 0,
 *              "id": 0,
 *              "customBg": "Picture Name",
 *              "customBgMode": 11
 *          },
 *          "title2": {
 *              ...
 *          },
 *          ...,
 *          "titleN": {
 *              ...
 *          }
 *      }
 *  }
 * }
 * 
 * You can customize the object's tags as you wish using the next parameters.
 * 
 * IMPORTANT: 
 *   - The "category" tag must be a number, referencing the category index
 * in the "categories" array.
 *   - The "id" tag is used to control the ordering of books in the list window.
 * It must be a number, but it can also be omitted and the plugin will define the
 * order according to the order it reads the books from the file (usually the order
 * they're placed).
 *   - Each book must have an unique key tag. This tag will be used by most of
 * the plugin available commands.
 *   - The titleColor tag can be omitted if no custom color is needed.
 *   - textArray has been included in version 1.6.0. It allows you to enter multiple
 * text chunks that can be loaded separately inside the book using plugin commands.
 * If you want your book contents to change as the game progresses, each set of text
 * should be listed as an entry inside this array.
 *   - visibleTexts has also been included in version 1.6.0. It determine which 
 * textArray indexes will be displayed by default when the book is first read.
 * For backwards compatibility reasons, if the "text" tag is present it will 
 * automatically become index 0 of "textArray" when the game boots.
 * 
 * 
 * Localization Escape Code
 *  - This defines how the plugin must create the localization placeholders. {key}
 * will be replaced by the reference to each text, so that the Localization Plugin
 * of choice can search for the text in the correct language. This parameter can
 * be safely ignored if you're not using a localization plugin.
 * 
 * Default:
 *  #{{key}}
 * 
 * 
 * Category List
 *  - This defines the object inside the JSON file that contains the array of book
 * categories. Be advised that the order the categories are placed in the array
 * defines the order they will be loaded in the list menu.
 * 
 * Default:
 *   library.categories
 * 
 * 
 * Root Context Path
 *  - This defines the root context inside the JSON File to look for the books.
 * 
 * Default:
 *   library.books
 * 
 * 
 * Title Object
 *  - Use this parameter to customize the title tag of you JSON file. The title
 * tag will be used to reference each book title.
 * 
 * Default:
 *   title
 * 
 * 
 * Title Color Object
 *  - Use this parameter to customize the title color independently the list window.
 * 
 * Default:
 *   titleColor
 * 
 * 
 * Text Object
 *  - Use this parameter to customize the text tag of your JSON file. The Text tag
 * will be used to reference each book text.
 * 
 * Default:
 *   text
 * 
 * Text List Object
 *  - Use this parameter to customize the text list tag of your JSON file. This list
 * should be used to reference text chunks that can be added or removed from your book
 * as the game progresses.
 * 
 * Default:
 *  textArray
 * 
 * Visible Text Object
 *  - Use this parameter to customize the tag which describes which text chunks are
 * visible by default when a new book is learned.
 * 
 * Default:
 *   visibleTexts
 * 
 * Category Object
 *  - Use this parameter to customize the category tag of your JSON file. The 
 * category tag will be used to reference each book category.
 * 
 * Default:
 *   category
 * 
 * 
 * Id Object
 *  - Use this parameter to customize the Id tag of your JSON file. The id tag will
 * be used to reference each book id.
 * 
 * Default:
 *   id
 * 
 * 
 * Undefined Category
 *  - This defines a default text to be displayed instead of the category name if
 * the category could not be correctly loaded.
 * 
 * Default:
 *   Unknown
 * 
 * 
 * -----------------------------------------------------------------------------
 * Plugin Manager Books
 * -----------------------------------------------------------------------------
 * 
 * Category Order
 *  - This defines the order at which the categories will be listed in the list 
 * menu.
 * 
 * Books
 *  - Enter the book data directly through the Plugin Manager. Similarly to the
 * JSON File approach, you must specify a Title, Text, Category and Id for each 
 * book. If you leave the Id the same for all books, the plugin will load them
 * in the order they're placed in the plugin manager.
 * Starting on version 1.6.0, book data can also contain a Text List and
 * Visible Texts lists. Both parameters serve the same purpose as the Text List
 * Object and Visible Text Object do when using a JSON file.
 * 
 * IMPORTANT:
 *   - Each book must have an unique name. Book names will be used as keys by
 * almost all plugin available commands.
 *   - Each book category must match a category listed in the 'Category Order'
 * parameter.
 * 
 * 
 * ============================================================================
 * Instructions - Main Menu
 * ============================================================================
 * 
 * The following parameters are meant to configure the main menu entry:
 * 
 * Auto Place Command
 *  - If enabled, this parameters creates a main menu entry for the Book menu
 * automatically.
 * For those using Yanfly's Main Menu Manager (or other plugins to control main
 * menu entries as well) this parameter should be disabled.
 * As for Yanfly's Main Menu Manager, you can setup the Book command using
 * the following format:
 * 
 *      Menu Name: TAA.bm.Parameters.Menu.Name
 *      Menu Symbol: books
 *      Menu Show: $gameSystem.isShowBookMenu()
 *      Menu Enabled: $gameSystem.isBookMenuEnabled()
 *      Menu Ext:
 *      Menu Main Bind: this.commandBook.bind(this)
 *      Menu Actor Bind:
 * 
 * For MZ users who use Visustela's plugins, you can call the menu scene with
 * SceneManager.push(Scene_BookMenu)
 * 
 * Menu Name
 *  - This sets up the menu name in the main menu window.
 * 
 * Show Menu
 *  - This defines if the book menu is shown by default at the main menu.
 * 
 * Default:
 *   true
 * 
 * Enable Menu
 *  - This defines if the book menu is enabled by default at the main menu.
 * 
 * Default:
 *   true
 * 
 * 
 * ============================================================================
 * Compatibility Warnings
 * ============================================================================
 * 
 * Starting on version 1.6.4, TAA_BookMenu can be made compatible with Luna's
 * Engine by using an additional module called TAA_BookMenu_CompatLunaEngine.
 * It is available at the Book Menu's page in http://taaspider.itch.io.
 * 
 * To use it, make sure to have both plugins enabled above the Luna Engine 
 * plugin, with the compatibility module placed directly above TAA_BookMenu.
 * The compatibility module should only be enabled for it to take effect.
 * If you are not using Luna's Engine, using the compatibility module should
 * not affect your game in any way, but for ease of support purposes I highly
 * recommend it is not used unless strictly necessary.
 * 
 * Localization Compatibility
 * --------------------------
 * Although there were features in place to ease the use of localization since
 * the first versions, a lot of changes and new features were included with each
 * new plugin version, and some of them were bugged when trying to use a 
 * localization plugin (like inline images).
 * 
 * Version 1.7.0 fixes those bugs, but has also showed me that the plugin has
 * grown quite a bit in complexity, and although I did my best to make it the most
 * flexible I could, there is no way I can guarantee compatibility with all the
 * localization plugins out there. I have only thoroughly tested DK Tools Localization
 * plugin, and it is the only one I can fully consider compatible as of version 1.7.0.
 * 
 * DK Tools Localization Compatibility - Specific Instructions
 *  - DK Tools plugins MUST be placed BEFORE TAA_BookMenu in your plugin list. It
 *    won't work if ordered differently.
 *  - Since you're using a plugin that depends on JSON file editing to localize
 *    your game, we must assume you are comfortable with that. So, you MUST use
 *    external JSON files as your book datasource.
 *  - You will need one external JSON file for each language your game will support,
 *    and all of them must have the exact same structure, and the exact same object
 *    names (just translate the object text values, not the object key name).
 *    You will them point the JSON Config / File parameter to one of them (it can
 *    be any of them, as it will only serve as a starting point for TAA_BookMenu
 *    to build its internal structures). For example: locales/en/books.json
 *  - Adjust the parameter JSON Config / Localization Escape Code to {{key}}
 *    (removing the default # at the start).
 * 
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * There are a few script calls you can use with this plugin to test a few 
 * conditions or return a few statistics.
 * 
 * $gameSystem.isShowBookMenu()
 *  - Test if the book menu should be shown at the main menu.
 * 
 * $gameSystem.isBookMenuEnabled()
 *  - Test if the book menu should be enabled at the main menu.
 * 
 * $gameSystem.isBookCategoriesVisible()
 *  - Test if the books categories are visible in the list window.
 * 
 * $gameSystem.isUnreadBooksHidden()
 *  - Check if books not found by the player are shown at the list menu.
 * 
 * $gameSystem.getTotalBooks()
 *  - Return the total number of books in the game.
 * 
 * $gameSystem.getTotalBooksRead()
 *  - Return the number of books the player has found.
 * 
 * $gameSystem.getTotalBooksFromCategory(category)
 *  - Replace "category" with the category name, regardless of the datasource
 * type selected. This will return the total number of books under this category.
 * Remove blank spaces in the category name, if any.
 * Example: $gameSystem.getTotalBooksFromCategory("History");
 * 
 * $gameSystem.getTotalBooksReadFromCategory(category)
 *  - Replace "category" with the category name, regardless of the datasource
 * type selected. This will return the total number of books from the specified
 * category that has already been read by the player. Remove blank spaces in 
 * the category name, if any.
 * Example: $gameSystem.getTotalBooksReadFromCategory("History");
 * 
 * $gameSystem.isBookRead(bookKey)
 *  - "bookKey" should be replaced by the book tag, if you're using a JSON file
 * as your datasource, or the book title (minus blank spaces) if you're using 
 * Plugin Manager. This will return true if the player has already read the book, 
 * or false if he didn't.
 * Examples:
 *  $gameSystem.isBookRead("bookJsonTag");
 *  $gameSystem.isBookRead("PluginManagerTitle");
 * 
 * $gameSystem.isBookPassageKnown(bookKey, index)
 *  - This command returns true if the specified index is included in the visible
 * text list for the given book. index refers to the text chunk index inside the
 * Text List Object. For backwards compatibility purposes, whenever the "Text"
 * parameter is present it will be automatically assigned to index zero.
 * 
 * $gameSystem.resetLibrary()
 *  - Reload the whole book list and books read. It might be useful when testing
 * your game.
 * 
 * $gameSystem.resetLibraryBookList()
 *  - Reload all book data from your datasource, but keeps the list of books read.
 * This should be used carefully, as changing category/books names, order, or ids,
 * can be game breaking. It maybe useful for testing, but I recommend caution if
 * it is to be used on your released game.
 * 
 * $gameSystem.resetLibraryBooksRead()
 *  - Reload the list of books read, making the player forget all books read.
 * 
 * $gameSystem.createExportDummy()
 *  - Creates a dummy map with 1 tile and an event with commands to show every
 * inline image called from within books. This is a useful tool to run just before
 * exporting your game. This dummy map prevents inline images to be deleted when
 * selecting the option to exclude unused files. The command will always create
 * a new map with a high index (last map id + 1). To see the dummy map you'll need
 * to close and reopen the editor.
 * 
 * ============================================================================
 * Plugin Commands (MV)
 * ============================================================================
 * 
 * OpenBookMenu
 *  - Triggers the book menu to be displayed.
 * 
 * ReadBook key <true|false>
 *  - Replace key with the book tag, if using a JSON file as datasource, or the 
 * book title if using Plugin Manager. If the key contains blank spaces between 
 * words, you need to remove them in the plugin command call.
 * This will mark the book as read (if it isn't already) and display the detached
 * book window with the book contents.
 * Optionally, you can add a second argument that tells if the book will be
 * marked as read or not (true or false). If the argument is left blank, the
 * book is marked as read.
 * Examples:
 *  ReadBook bookJsonTag
 *  ReadBook PluginManagerTitle (instead of "Plugin Manager Title")
 *  ReadBook bookJsonTag false
 * 
 * LibraryData Menu Hide
 * LibraryData Menu Show
 *  - Use this commands to hide / show the book menu from the main menu list.
 * 
 * LibraryData Menu Enable
 * LibraryData Menu Disable
 *  - Use this commands to enable / disable the book menu at the main menu list.
 * 
 * LibraryData Learn Book key
 * LibraryData Forget Book key
 *  - Use this commands to make the player learn / forget books without opening the
 * detached book window. Replace 'key' with the book tag, if using a JSON File as 
 * datasource, or the book title if using the Plugin Manager. If the key contains
 * blank spaces between words, you need to remove them in the plugin command call.
 * 
 * LibraryData Learn Books key1 key2 key3 ... keyN
 * LibraryData Forget Books key1 key2 key3 ... keyN
 *  - Similar to the previous command, but this can be used to make the player learn / 
 * forget many books at once.
 * 
 * LibraryData Learn Category categoryName
 * LibraryData Forget Category categoryName
 *  - Use this commands to make the player learn / forget all books from a specific
 * category. Replace 'categoryName' with the category name (if it contains blank 
 * spaces, you need to remove them in the plugin command call)
 * 
 * LibraryData ShowCategories on
 * LibraryData ShowCategories off
 *  - Use this to show / hide categories in the list window menu.
 * 
 * LibraryData UnreadBooks hide
 * LibraryData UnreadBooks show
 *  - Use this to hide / show books not read by the player in the book list window.
 * 
 * LibraryData TitleBar hide
 * LibraryData TitleBar show
 *  - Use this to hide / show the title bar on the detached book 
 * window.
 * 
 * LibraryData Reset All
 *  - Reload the whole book list and books read. It might be useful when testing
 * your game.
 * 
 * LibraryData Reset BookList
 *  - Reload all book data from your datasource, but keeps the list of books read.
 * This should be used carefully, as changing category/books names, order, or ids,
 * can be game breaking. It may be useful for testing, but I recommend caution if
 * it is to be used on your released game.
 * 
 * LibraryData Reset BooksRead
 *  - Reload the list of books read, making the player forget all books read. 
 * 
 * LibraryData Preload on
 * LibraryData Preload true
 *  - Enables preloading of book inline images when loading from menu view.
 * 
 * LibraryData Preload off
 * LibraryData Preload false
 *  - Disables preloading of book inline images when loading from menu view.
 * 
 * LibraryData Preload book bookKey
 *  - Forces the plugin to preload the book reference by bookKey inline images. Useful
 * to prepare for scenes where a detached scene may be triggered. Works best if triggered
 * a few seconds before the scene.
 * 
 * LibraryData TextUpdate key Add index
 * LibraryData TextUpdate key Add index At position
 *  - Changes visible text for the book key adding the text array of index 'index'.
 * If "At position" is present, the text is added at the designated array position.
 * Both index and position can reference a variable value by using the v[n] pattern, 
 * where n is the variable number.
 * 
 * LibraryData TextUpdate key Remove index
 * LibraryData TextUpdate key Remove At position
 *  - Changes visible text for the book key removing the text array of index 'index'.
 * You can also remove by the text position in the visible text array. Both index and 
 * position can reference a variable value by using the v[n] pattern, where n is the 
 * variable number.
 * 
 * LibraryData TextUpdate key Replace index
 *  - Changes visible text for the book key removing all visible text entries and
 * adding back only the specified index.
 * 
 * LibraryData TextUpdate key Clear
 *  - Clear all visible text for the book key.
 * 
 * ============================================================================
 * Plugin Commands (MZ)
 * ============================================================================
 * 
 * Main Menu Options
 *  - Use this plugin command to enable / disable / show / hide the main menu entry for
 * the book menu.
 * 
 * Book Commands
 *  - Use this to read / learn / forget / preload images / read and learn books. Here's
 * what each option means:
 *      + Read: opens the detached window with the book contents, but do not add the book
 *        to the books read list;
 *      + Learn: only adds the book to the books read list;
 *      + Forget: only removes the book from the books read list;
 *      + Preload Images: force preload all inline images from the book, to make a close
 *        Read command faster;
 *      + Read and Learn: opens the detached window with the book contents and also add
 *        the book to the books read list;
 *  You can specify a comma separated list of books.
 * 
 * Book Text Update
 *  - Use this to manage variable book text updates. You will need to provide a book key
 * for all possible actions. A list index and position may be required according to which
 * action is chosen. Both index and position can be set as an absolute number or as a
 * variable value.
 * 
 * Category Commands
 *  - Use this to learn / forget all books from the specified category. You can specify
 * a comma separated list of categories.
 * 
 * Book List Features
 *  - Handle the following commands:
 *      + Show Categories: Enable to show book categories, Disable to hide them;
 *      + Hide Unread Books: Enable to hide unread books, Disable to show all books;
 *      + Show Title Bar: Enable to show title bar for the detached book window or
 *        Disable to hide it;
 *      + Preload Inline Images: Enable to preload inline images when highlighting a book
 *        in the book menu, Disable to load images only when the book is loaded;
 * 
 * Reset
 *  - Reset read books, book list or both.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0:
 * - First version out!
 * Version 1.0.1:
 * - Fixed mouse wheel scrolling by including a customization to
 *   TouchInput._onMouseMove.
 * Version 1.1.0:
 * - Reorganized all aliases inside an object, to make them easier to track down
 * - Included the possibility to customize scene backgrounds with images.
 * The Detached Scene and Menu Scene have different configurations, so that
 * they can have different backgrounds if the dev wishes.
 * Version 1.2.0:
 * - Included a new feature allowing books to have custom background images that
 * override the default ones. It comes with options to use the custom images on 
 * the detached scene only, menu scene only, or both. The image can also be set 
 * to cover only the text window or title + text windows.
 * Version 1.3.0:
 * - Fixed a bug caused by the custom background change of the previous version
 * that could cause the game to crash when opening a book with no custom 
 * background.
 * - Reworked the Window_BookText prototype to allow inline images to be included
 * along with a book text.
 * Version 1.3.1:
 * - Added a custom log function to help me debug future issues.
 * - Fixed compatibility with Olivia_StateTooltipDisplay.
 * Version 1.3.2:
 * - Fixed compatibility with MOG_MenuCursor (and probably with most plugins that
 * creates a new layer over the scene as long as it stays over the WindowLayer)
 * Version 1.3.3:
 * - Fixed bug that caused odd window behavior when two or more books in a row
 * had custom backgrounds.
 * - Fixed bugs that interfered with windowskin and window opacity parameters
 * - Option added to set a custom color for book titles only in the title section.
 * When in book menu, it will appear with default color in the list section while
 * using the custom color in the title section. Use escape codes if you wish to use
 * the same color on both sections.
 * - Included a small fix so that the first item on the list is automatically 
 * selected when the Book Menu is loaded.
 * - Fixed an issue when using inline images along with wordwrap
 * Version 1.3.4:
 * - Added new feature to allow trailing inline images into book texts
 * - Fixed bug with text padding not being applied to book text
 * - Fixed an issue when using RS_MessageAlign that caused the first line to
 * not be aligned correctly
 * Version 1.3.5:
 * - Included parameters that an be used to reset or keep book list on game
 * load. If set to reset, New books created into the selected datasource will 
 * be loaded into the game, otherwise it will keep the list of books previously
 * loaded by that save. Similarly, there's another new parameter that allows 
 * you to reset or remember books read on game load. Which means you can set 
 * the plugin to make it so all books listed on the book menu are forgotten, 
 * or remembered on game load;
 * - Added script calls and plugin commands to reset the whole library, only
 * the book list, and only books read (forget all books found);
 * Version 1.3.6:
 * - Added the 'Load Closed Categories' parameter to allow categories to be 
 * automatically closed when loading the plugin menu. If set to NO, the 
 * plugin will retain previous behavior of always showing every category open
 * Version 1.3.7:
 * - Added a handler to allow closing the detached window when pressing 'ok' as 
 * well as 'cancel';
 * - Fixed the black text window issue on large books with lots of line breaks;
 * Version 1.4.0:
 * - Fixed arrows not showing in the text window when scrolling;
 * - Fixed clipping text on text window when using wordwrapping plugins (enable 'Text Windows 
 * WordWrap Fix' to activate it);
 * - Fixed Auto Place, Enable and Show menu parameters;
 * - Added native plugin support to touch/click and drag scrolling, and scrolling
 * by clicking/touching the up/down arrows. Touch/click support can also be
 * disabled (total or partially) using the 'Native Touch/Click Support' parameter
 * Version 1.4.1:
 *  - Added a parameter to the ReadBook command, to allow a book to be read in
 * the detached window without marking it as read. Simply call the plugin command
 * as follows: ReadBook <BookName> false
 *  - Added a fix to prevent errors when loading save files created before the
 * plugin was enabled in the plugin manager;
 *  - Changed how save files are handled, so that only books read are stored
 * (not the whole library). This will make save files lighter. As a result, the
 * "Reset Book List On Load" parameter was removed (book list will always be
 * reset on load, as only books read are saved);
 *  - Added a "require 1" to each image background parameter, so that the 
 * editor will know to keep them when exporting with the exclude unused options
 * enabled. Thanks to Solar_Flare for pointing it out;
 *  - Added the script call $gameSystem.createExportDummy() to create a dummy
 * event calling a show picture for each inline image. This is a tool to be used
 * just before exporting your game, so that "exclude unused files" won't delete
 * inline images;
 *  - Changed the function used to load the library from DataManager.createGameObjects
 * to DataManager.loadDatabase;
 * Version 1.4.2:
 *  - Added the parameter 'Load Before Title', allowing to hold game load until
 * all books are loaded to memory, or running it asynchronously (as it was with
 * previous versions)
 *  - Fixed an issue with book counting when Hide Unread Books is disabled
 * Version 1.5.0:
 *  - Added MZ compatibility
 *  - Reworked a few functions, enhancing performance a bit
 *  - Discontinued the parameter "Text Windows WordWrap Fix", as it is no longer needed.
 *  - Added support to home/end keys into the book text window, allowing quick 
 * navigation to the start or end of your book text
 *  - Added some steps to validate runtime images (inline images and custom
 * backgrounds) exists before trying to load them. This way the game won't
 * crash if it tries to load an image that is not available in the filesystem
 *  - Added a plugin command to force inline image preloading of a specific book
 *  - Revised and enhanced detached scene book performance when inline images are present
 *  - Fixed an issue with hide categories plugin command
 *  - Added a parameter to allow a custom folder for inline images, making it easier to
 * copy them to an exported project (since default export with exclude unused files don't
 * consider such files)
 * Version 1.5.1:
 *  - Fixed an issue with window layers on MZ, which could cause incompatibility with other
 * plugins
 *  - Fixed a bug with the plugin command to learn all books from a category when books
 * didn't have sequential ids (like having books with ids 1, 4, 10 instead of 1, 2 and 3).
 * It would mess with category book count in the menu scene
 * Version 1.5.2:
 *  - Fixed a bug that caused a Full Background image to have right and bottom borders cut
 * off with MZ;
 *  - Fixed a bug that caused any combinations of Full Background / Default Map Print with
 * menu background images to fail (only the full background would appear);
 *  - Fixed a bug that could cause crashes with deployed projects (failure to load image
 * files);
 *  - Added a new background setting for both scenes: Map Print + Full Background. This
 * allows the use of transparencies with the full background image without having borders
 * around it;
 * Version 1.6.0:
 *  - Changed method that checks if image file exists before trying to load so it can
 * work properly on web and mobile deployments;
 *  - Fixed alignment of item names in the book menu list;
 *  - Added a new parameter to enable / disable checking if files exists before loading;
 *  - Added a new feature to allow book text to change with plugin commands. New plugin
 * parameters were added to allow including a list of texts and a list of visible texts.
 * All changes were implemented to have backwards compatibility;
 *  - Added a "new" indicator for books learned / changed and not yet read in the book menu.
 * This marking can be done with a static text, an icon or a picture. All settings for this
 * feature are located under the Menu List Window parameter;
 * Version 1.6.1:
 *  - Fixed a bug that could cause a custom window skin to not be loaded correctly the first
 * time a scene is activated;
 *  - Changed the code to prevent crashes when background image parameters are not set
 * correctly;
 * Version 1.6.2:
 *  - Fixed a compatibility bug with CGMV_Toast;
 * Version 1.6.3:
 *  - Fixed a bug that would prevent correct positioning of the text window in the detached
 * scene when it is not placed directly below the title window;
 * Version 1.6.4:
 *  - Fixed a bug that would cause the game to crash at boot trying to load the visible 
 * texts array from a JSON library;
 *  - Added compatibility to Luna's Engine, through an additional compatibility
 * module (TAA_BookMenu_CompatLunaEngine);
 * Version 1.6.5:
 *  - Fixed a bug that could prevent inline images from being correctly loaded when used
 * with the text list feature;
 * Version 1.6.6:
 *  - Fixed a bug that would cause a game crash if new categories are added and the player
 * tries to learn a book from them after loading a game saved before those categories were
 * created;
 *  - Fixed a bug that would cause a book created after a save file to not be displayed
 * correctly when the save was loaded.
 * Version 1.6.7:
 *  - Fixed a bug that would cause categories added after a save file not to be recognized
 * by the plugin when the game was loaded, and a book in that category was marked as read.
 *  - Added compatibility with the engine encrypt images feature for both MV and MZ.
 * Version 1.6.8:
 *  - Fixed a bug that would cause a large image to get its right side cropped when using 
 * the Force Image into Window parameter.
 * Version 1.7.0:
 *  - Fixed a number of bugs that could occur when trying to use the Localization File type
 * (tests were done with DK Tools Localization plugin).
 *  - Fixed a bug that could cause book keys to break when using the Localization File type
 * with keys containing dots within its text.
 *  - Added a new parameter 'Line Break Pattern'.
 *
 * ============================================================================
 * End of Help
 * ============================================================================
 * 
 * 
 * 
 * =================================================================================
 * Commands
 * =================================================================================
 * 
 * @command bookMenu
 * @text Main Menu Options
 * @desc Main menu options, like hide/show/enable/disable menu command.
 * 
 * @arg command
 * @text Command
 * @type select
 * @option Hide
 * @option Show
 * @option Enable
 * @option Disable
 * @default
 * @desc Choose which command to apply.
 * 
 * @command bookCommands
 * @text Book Commands
 * @desc Read, learn or forget one or more books.
 * 
 * @arg commandType
 * @text Command
 * @type select
 * @option Read
 * @option Read and Learn
 * @option Learn
 * @option Forget
 * @option Preload Images
 * @default Read
 * @desc 'Read' -> opens the detached window. 'Learn' -> mark the book as read. 'Forget' -> mark it as not read.
 * 
 * @arg bookList
 * @text Book List
 * @type text
 * @default
 * @desc Comma separated list of books to apply the selected command.
 * 
 * @command textUpdate
 * @text Book Text Update
 * @desc Manages variable book text formation.
 * 
 * @arg book
 * @text Book Key
 * @type text
 * @default
 * @desc Book key to apply the selected command.
 * 
 * @arg action
 * @text Action
 * @type select
 * @option Add
 * @option Remove
 * @option Replace
 * @option Clear
 * @default Add
 * @desc Choose which action to take.
 * 
 * @arg index
 * @text Text Array Index
 * @type number
 * @min 0
 * @max 999
 * @default 0
 * @desc Text item index to use with the selected action.
 * 
 * @arg indexVar
 * @text Text Index Variable
 * @type variable
 * @default
 * @desc If set, ignores "Text Array Index" and use a variable value as index.
 * 
 * @arg position
 * @text Visible Text Position
 * @type number
 * @min 0
 * @max 999
 * @default
 * @desc If set, specifies the visible text list position to be affected by the selected action.
 * 
 * @arg positionVar
 * @text Text Position Variable
 * @type variable
 * @default
 * @desc If set, ignore "Visible Text Position" and use a variable value as position.
 * 
 * @command categoryCommands
 * @text Category Commands
 * @desc Learn / forget one or more categories.
 * 
 * @arg commandType
 * @text Command
 * @type select
 * @option Learn
 * @option Forget
 * @default Learn
 * @desc 'Learn' -> mark all books from the specified category as read. 'Forget' -> mark all as not read.
 * 
 * @arg categoryList
 * @text Category List
 * @type text
 * @default
 * @desc Comma separated list of book categories to apply the selected command.
 * 
 * @command bookList
 * @text Book List Features
 * @desc Turn on / off a couple of book listing features at the book menu.
 * 
 * @arg feature
 * @text Feature
 * @type select
 * @option Show Categories
 * @option Hide Unread Books
 * @option Show Title Bar
 * @option Preload Inline Images
 * @default Hide Unread Books
 * @desc Select which feature to alter.
 * 
 * @arg action
 * @text Action
 * @type select
 * @option Enable
 * @option Disable
 * @default Enable
 * @desc Select which action to apply.
 * 
 * @command libraryReset
 * @text Reset
 * @desc Reset books read, book list or the entire library.
 * 
 * @arg type
 * @text Reset Type
 * @type select
 * @option All
 * @option Book List Only
 * @option Books Read Only
 * @default Books Read Only
 * @desc Select what to reset.
 * 
 * =================================================================================
 * Parameters
 * =================================================================================
 * 
 * @param ---DataSource Config---
 * @default
 * 
 * @param SourceType
 * @parent ---DataSource Config---
 * @text DataSource Type
 * @type combo
 * @option JSON File
 * @option Plugin Manager
 * @default JSON File
 * @desc Select the source type from where book data will be loaded into the game.
 * 
 * @param JSON Config
 * @parent ---DataSource Config---
 * @type struct<JsonConfig>
 * @desc Configure properties when using a JSON file as a datasource.
 * @default {"Type":"Dedicated File","File":"books.json","Localization Escape Code":"#{{key}}","Category List":"library.categories","Root Context Path":"library.books","Title Object":"title","Text Object":"text","Text List Object":"textArray","Category Object":"category","ID Object":"id","Undefined Category":"Unknown"}
 * 
 * @param Plugin Manager Books
 * @parent ---DataSource Config---
 * @type struct<BookSetup>
 * @desc Configure books through Plugin Manager if this datasource type is selected.
 * @default {"Category Order":"[]","Books":"[]"}
 * 
 * @param ---Main Menu---
 * @default
 * 
 * @param Auto Place Command
 * @parent ---Main Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Should this plugin decide the menu placement position?
 * @default true
 * 
 * @param Menu Name
 * @parent ---Main Menu---
 * @type text
 * @default Books
 * @desc What is our menu name in the main menu window?
 * 
 * @param Show Menu
 * @parent ---Main Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Should we show book menu by default?
 * 
 * @param Enable Menu
 * @parent ---Main Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Should we enable book menu by default?
 * 
 * @param ---Window Config---
 * @default
 * 
 * @param ---Detached Book Scene---
 * @parent ---Window Config---
 * @default
 * 
 * @param Detached Title Window Config
 * @parent ---Detached Book Scene---
 * @type struct<DetachedTitleWindow>
 * @desc Configure properties for the Title Window for detached Book Scene.
 * @default {"X":"Graphics.boxWidth / 12","Y":"Graphics.boxHeight / 10","Width":"Graphics.boxWidth * 4/5","Height":"this.fittingHeight(1)","Line Height":"36","Font Size":"20","Font Face":"GameFont","Text Alignment":"center","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window","Hide Title Bar":"false"}
 * 
 * @param Detached Text Window Config
 * @parent ---Detached Book Scene---
 * @type struct<DetachedTextWindow>
 * @desc Configure properties for the Text Window for detached Book Scene.
 * @default {"X":"Graphics.boxWidth/12","Y":"0","Width":"Graphics.boxWidth * 4/5","Height":"Graphics.boxHeight * 4/6","Line Height":"36","Font Size":"20","Font Face":"GameFont","Book Text Format":"%3","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Detached Background Options
 * @parent ---Detached Book Scene---
 * @type select
 * @option None
 * @value 0
 * @option Default Map Print
 * @value 1
 * @option Full Background Image
 * @value 2
 * @option Default Map Print + Full Background Image
 * @value 3
 * @option Multiple Images (Title + Text)
 * @value 4
 * @option Single Image (Title / Text)
 * @value 8
 * @option Full Background + Multiple Images (Title + Text)
 * @value 6
 * @option Full Background + Single Image (Title / Text)
 * @value 10
 * @option Default Map Print + Multiple Images (Title + Text)
 * @value 5
 * @option Default Map Print + Single Image (Title / Text)
 * @value 9
 * @default 1
 * @desc Defines how the scene background should be presented.
 * 
 * @param Detached Background Config
 * @parent ---Detached Book Scene---
 * @type struct<DetachedBgConfig>
 * @desc Configure images according to Background Image Options.
 * @default {"Full Background Image":"","Single Image":"","Multiple Images - Title":"","Multiple Images - Text":""}
 * 
 * @param ---Book Menu Scene---
 * @parent ---Window Config---
 * @default
 * 
 * @param Menu List Window Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuListWindow>
 * @desc Configure properties for the Menu List Window on the Book Menu.
 * @default {"X":"0","Y":"0","Width":"Graphics.boxWidth * 1/3","Height":"Graphics.boxHeight","Font Size":"20","Font Face":"GameFont","Line Height":"36","Show Categories":"true","Category Alignment":"left","Closed Category Symbol":"+","Opened Category Symbol":"-","Category Text Format":"%1 %2 (%3)","Load Closed Categories":"true","Book Alignment":"left","Book Indent":"16","Hide Unread Books":"true","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Menu Title Window Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuTitleWindow>
 * @desc Configure properties for the Menu Title Window on the Book Menu.
 * @default {"X":"Graphics.boxWidth / 3","Y":"0","Width":"Graphics.boxWidth * 2/3","Height":"this.fittingHeight(1)","Line Height":"36","Font Size":"20","Font Face":"GameFont","Empty Title Text":"Library","Text Alignment":"center","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Menu Text Window Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuTextWindow>
 * @desc Configure properties for the Menu Text Window on the Book Menu.
 * @default {"X":"Graphics.boxWidth / 3","Y":"0","Width":"Graphics.boxWidth * 2/3","Height":"Graphics.boxHeight - this._titleWindow.height","Line Height":"36","Font Size":"20","Font Face":"GameFont","Book Text Format":"%3","Empty Book Text":"","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 * 
 * @param Menu Background Options
 * @parent ---Book Menu Scene---
 * @type select
 * @option None
 * @value 0
 * @option Default Map Print
 * @value 1
 * @option Full Background Image
 * @value 2
 * @option Default Map Print + Full Background Image
 * @value 3
 * @option Multiple Images (Title / Text + List)
 * @value 4
 * @option Multiple Images (Text / List + Title)
 * @value 8
 * @option Multiple Images (Title / List + Text)
 * @value 16
 * @option Multiple Images (Title + Text + List)
 * @value 32
 * @option Single Image (Title / Text / List)
 * @value 64
 * @option Full Background + Multiple Images (Title / Text + List)
 * @value 6
 * @option Full Background + Multiple Images (Text / List + Title)
 * @value 10
 * @option Full Background + Multiple Images (Title / List + Text)
 * @value 18
 * @option Full Background + Single Image (Title / Text / List)
 * @value 34
 * @option Default Map Print + Multiple Images (Title / Text + List)
 * @value 5
 * @option Default Map Print + Multiple Images (Text / List + Title)
 * @value 9
 * @option Default Map Print + Multiple Images (Title / List + Text)
 * @value 17
 * @option Default Map Print + Single Image (Title / Text / List)
 * @value 65
 * @default 1
 * @desc Defines how the scene background should be presented.
 * 
 * @param Menu Background Config
 * @parent ---Book Menu Scene---
 * @type struct<MenuBgConfig>
 * @desc Configure images according to Background Image Options.
 * @default {"Full Background Image":"","Single Image":"","Multiple Images - Title":"","Multiple Images - Text":"","Multiple Images - List":""}
 * 
 * @param ---Misc---
 * @default
 * 
 * @param Break Before Image
 * @parent ---Misc---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically add a line break before inline images?
 * @default false
 * 
 * @param Force Image Into Window
 * @parent ---Misc---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If image is bigger than the text window, shrink it to fit?
 * @default true
 * 
 * @param Reset Books Read On Load
 * @parent ---Misc---
 * @type boolean
 * @on RESET
 * @off REMEMBER
 * @desc When loading a game, remember books read or reset the list?
 * @default false
 * 
 * @param Native Touch/Click Support
 * @parent ---Misc---
 * @type combo
 * @option Disable
 * @option Up/Down Arrows Only
 * @option Full Support
 * @desc Defines if and how this plugin will handle touch/click scrolling.
 * @default Full Support
 * 
 * @param Inline Image Folder
 * @parent ---Misc---
 * @type text
 * @default img/pictures
 * @decs Customize a folder to organize inline images. 
 * 
 * @param Inline Image Preloading
 * @parent ---Misc---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc If ON, plugin will try to preload inline images in the book menu when the cursor hovers on a book (before the book itself is loaded).
 * @default true
 * 
 * @param Check Files First
 * @parent ---Misc---
 * @type boolean
 * @on Enabled
 * @off Disable
 * @default true
 * @desc If enabled, the plugin will check if an inline image file exists in game's directory before loading it up.
 * 
 * @param Forced Preload List
 * @parent ---Misc---
 * @type text[]
 * @default []
 * @desc List of books to force inline image preloading at the start of the game. Use with caution.
 * 
 * @param Load Before Title
 * @parent ---Misc---
 * @type boolean
 * @on ENABLED
 * @off DISABLED
 * @desc If enabled, title screen will be delayed until all books are loaded to memory. Otherwise it will run asynchronously.
 * @default false
 * 
 * @param Scroll Options
 * @parent ---Misc---
 * @type struct<ScrollOptions>
 * @default {"Enable Home/End":"true","Home Key":"36","End Key":"35","Scroll Speed":"4"}
 * @desc Book text scrolling options.
 * 
 * @param Line Break Between Texts
 * @parent ---Misc---
 * @type select
 * @option None
 * @option Single
 * @option Double
 * @default Double
 * @desc Automatically add line breaks between text items for a given book.
 * @desc Book text scrolling options.
 * 
 * @param Line Break Pattern
 * @parent ---Misc---
 * @type text
 * @default \n
 * @desc Character pattern to use when inserting line breaks between variable text chunks.
 */ 

//=============================================================================
// Detached Book Scene - Title Structure
//=============================================================================
/*~struct~DetachedTitleWindow:
 * 
 * @param X
 * @type text
 * @default Graphics.boxWidth / 12
 * @desc Where do we place our Detached Book Scene? This is an eval. (default: Graphics.boxWidth / 12)
 * 
 * @param Y
 * @type text
 * @default Graphics.boxHeight / 10
 * @desc Where do we place our Detached Book Scene? This is an eval. (default: Graphics.boxHeight / 10)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 4/5
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 4/5
 * @desc What is the width of our title window when not in the Book Menu? This is an eval.
 *  
 * @param Height
 * @type combo
 * @option this.fittingHeight(1)
 * @option Graphics.boxHeight * 1/8
 * @option Graphics.boxHeight * 1/7
 * @option Graphics.boxHeight * 1/6
 * @default this.fittingHeight(1)
 * @desc What is the height of our title window when not in the Book Menu? This is an eval.
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the title window when not in the menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the title window when not in the menu?
 * 
 * @param Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc What is our title text alignment?
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 * @param Hide Title Bar
 * @parent ---Detached Book Scene---
 * @type boolean
 * @on Hide
 * @off Show
 * @default false
 * @desc Should we show the title war in the detached scene by default?
 * 
 */

//=============================================================================
// Detached Book Scene - Text Structure
//=============================================================================
 /*~struct~DetachedTextWindow:
 * @param X
 * @type text
 * @default Graphics.boxWidth/12
 * @desc Where do we place our Detached Book Scene? (default: Graphics.boxWidth/12)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our text window, relative to the title window? (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 4/5
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 4/5
 * @desc What is the width of our text window when not in the Book Menu? This is an eval.
 *  
 * @param Height
 * @type combo
 * @option Graphics.boxHeight - this._titleWindow.height
 * @option Graphics.boxHeight * 4/6
 * @option Graphics.boxHeight * 5/7
 * @option Graphics.boxHeight * 6/8
 * @default Graphics.boxHeight * 4/6
 * @desc What is the height of our text window when not in the Book Menu? This is an eval.
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the text window when not in the menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the text window when not in the menu?
 * 
 * @param Book Text Format
 * @type text
 * @default <Wordwrap>%3
 * @desc Format to display book texts. Supported escape codes:
 * %1 - Title  %2 - Category  %3 - Book Text
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// Book Menu - List Structure
//=============================================================================
 /*~struct~MenuListWindow:
 * @param X
 * @type text
 * @default 0
 * @desc Where do we place our Menu List Window? (default: 0)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our Menu List Window? (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth * 1/6
 * @option Graphics.boxWidth * 1/4
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 1/3
 * @desc What is the width of our Menu List Window? This is an eval. (default: Graphics.boxWidth * 1/3)
 *  
 * @param Height
 * @type combo
 * @option Graphics.boxHeight
 * @option Graphics.boxHeight * 1/2
 * @option Graphics.boxHeight * 1/3
 * @option Graphics.boxHeight * 1/4
 * @option Graphics.boxHeight - this._titleWindow.height
 * @default Graphics.boxHeight
 * @desc What is the height of our Menu List Window? This is an eval. (default: Graphics.boxHeight)
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the Menu List Window?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the Menu List Window?
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Show Categories
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Should book categories be displayed in the Book Menu? (default: Enable)
 * 
 * @param Category Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default left
 * @desc How should we align category names in the Menu List Window? (default: left)
 * 
 * @param Closed Category Symbol
 * @type text
 * @default +
 * @desc How should we indicate a category is closed? Closed categories won't show books within that category.
 * 
 * @param Opened Category Symbol
 * @type text
 * @default -
 * @desc How should we indicate a category is open? Open categories will list books within that category.
 * 
 * @param Category Text Format
 * @type text
 * @default %1 %2 (%3)
 * @desc Format to display book categories. Text codes supported:
 * %1 - Open/Closed  %2 - Category Name  %3 - Number of books within
 * 
 * @param Load Closed Categories
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 * @desc Should categories be closed by default when loading the menu scene?
 * 
 * @param Book Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default left
 * @desc How should we align book names in the Menu List Window? (default: left)
 * 
 * @param Book Indent
 * @type number
 * @default 16
 * @desc How much indentation should we place on book names in the Menu List Window? (default: 16)
 * 
 * @param Hide Unread Books
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * @desc Should we hide books that have not been read at least once? (default: Disabled)
 * 
 * @param Changed Book Indicator
 * @type select
 * @option None
 * @option New Addition Only
 * @option Text Update Only
 * @option All
 * @default All
 * @desc Turn on or off the changed book indicator.
 * 
 * @param Changed Book Marking
 * @type struct<ChangedMark>
 * @default {"Mark Type":"Text","Text Settings":"{\"Text\":\"New!\",\"Font Size\":\"12\",\"Font Face\":\"GameFont\",\"Text Color\":\"3\",\"Position\":\"Upper Left\"}","Icon Settings":"{\"Icon\":\"0\",\"Position\":\"Right\"}","Picture Settings":"{\"Picture\":\"\",\"Position\":\"Upper Left\"}"}
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// Changed Book Mark
//=============================================================================
 /*~struct~ChangedMark:
 * 
 * @param Mark Type
 * @type select
 * @option Text
 * @option Icon
 * @option Picture
 * @default Text
 * @desc Defines if changed book indicator should be a text or an icon.
 * 
 * @param Text Settings
 * @type struct<ChangedMarkText>
 * @default {"Text":"New!","Font Size":"12","Font Face":"GameFont","Position":"Upper Left"}
 * @desc Text to show over a book entry to identify it has changed.
 * 
 * @param Icon Settings
 * @type struct<ChangedMarkIcon>
 * @default {"Icon":"0","Position":"Right"}
 * @desc Icon to show over a book entry to identify it has changed.
 * 
 * @param Picture Settings
 * @type struct<ChangedMarkPicture>
 * @default {"Picture":"","Position":"Upper Left"}
 * 
 */

//=============================================================================
// Changed Book Mark - Text Settings
//=============================================================================
 /*~struct~ChangedMarkText:
 * 
 * @param Text
 * @type text
 * @default New!
 * @desc Text to show over a book entry to identify it has changed.
 * 
 * @param Font Size
 * @type number
 * @default 12
 * @desc Changed text mark font size.
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc Changed text mark font face.
 * 
 * @param Text Color
 * @type number
 * @min 0
 * @max 31
 * @default 0
 * @desc Changed text mark color.
 * 
 * @param Position
 * @type select
 * @option Upper Left
 * @option Lower Left
 * @option Upper Center
 * @option Lower Center
 * @option Upper Right
 * @option Lower Right
 * @default Upper Left
 * @desc How to position the changed text mark.
 * 
 */

//=============================================================================
// Changed Book Mark - Icon Settings
//=============================================================================
 /*~struct~ChangedMarkIcon:
 * 
 * @param Icon
 * @type number
 * @min 0
 * @max 9999
 * @default 
 * @desc Icon to show over a book entry to identify it has changed.
 * 
 * @param Position
 * @type select
 * @option Left
 * @option Center
 * @option Right
 * @default Right
 * @desc How to position the changed icon.
 * 
 */

//=============================================================================
// Changed Book Mark - Picture Settings
//=============================================================================
 /*~struct~ChangedMarkPicture:
 * 
 * @param Picture
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default 
 * @desc Picture to show over a book entry to identify it has changed.
 * 
 * @param Position
 * @type select
 * @option Upper Left
 * @option Lower Left
 * @option Upper Center
 * @option Lower Center
 * @option Upper Right
 * @option Lower Right
 * @default Upper Left
 * @desc How to position the changed pictures.
 * 
 */

//=============================================================================
// Book Menu - Title Structure
//=============================================================================
 /*~struct~MenuTitleWindow:
 * 
 * @param X
 * @type text
 * @default Graphics.boxWidth / 3
 * @desc Where do we place our Title Window in the Book Menu? This is an eval. (default: Graphics.boxWidth / 3)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our Title Window in the Book Menu? This is an eval. (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 2/3
 * @desc What is the width of our title window in the Book Menu? This is an eval. (default: Graphics.boxWidth * 2/3)
 *  
 * @param Height
 * @type combo
 * @option this.fittingHeight(1)
 * @option Graphics.boxHeight * 1/8
 * @option Graphics.boxHeight * 1/7
 * @option Graphics.boxHeight * 1/6
 * @default this.fittingHeight(1)
 * @desc What is the height of our title window in the Book Menu? This is an eval. (default: this.fittingHeight(1))
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the title window in the Book Menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the title window in the Book Menu?
 * 
 * @param Empty Title Text
 * @type text
 * @default Library
 * @desc What should we place in the title window when there is no book selected? (default: Library)
 * 
 * @param Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc What is our title text alignment?
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// Book Menu - Text Structure
//=============================================================================
 /*~struct~MenuTextWindow:
 * @param X
 * @type text
 * @default Graphics.boxWidth / 3
 * @desc Where do we place our text window in the Book menu? This is an eval. (default: Graphics.boxWidth / 3)
 * 
 * @param Y
 * @type text
 * @default 0
 * @desc Where do we place our text window, relative to the title window? This is an eval. (default: 0)
 *  
 * @param Width
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth * 5/6
 * @option Graphics.boxWidth * 4/5
 * @option Graphics.boxWidth * 3/4
 * @option Graphics.boxWidth * 2/3
 * @option Graphics.boxWidth * 1/3
 * @option Graphics.boxWidth * 1/2
 * @default Graphics.boxWidth * 2/3
 * @desc What is the width of our text window in the Book Menu? This is an eval. (default: Graphics.boxWidth * 2/3)
 *  
 * @param Height
 * @type combo
 * @option Graphics.boxHeight - this._titleWindow.height
 * @option Graphics.boxHeight * 4/6
 * @option Graphics.boxHeight * 5/7
 * @option Graphics.boxHeight * 6/8
 * @default Graphics.boxHeight - this._titleWindow.height
 * @desc What is the height of our text window in the Book Menu? This is an eval. (default: Graphics.boxHeight - this._titleWindow.height)
 * 
 * @param Line Height
 * @type number
 * @default 36
 * @desc What should be the height for each line entry?
 * 
 * @param Font Size
 * @type number
 * @default 20
 * @desc What font size should we use for the text window in the menu?
 * 
 * @param Font Face
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc What font should we use for the text window in the menu?
 * 
 * @param Book Text Format
 * @type text
 * @default <Wordwrap>%3
 * @desc Format to display book texts. Supported escape codes:
 * %1 - Title  %2 - Category  %3 - Book Text
 * 
 * @param Empty Book Text
 * @type text
 * @default
 * @desc What should we place in the text window when there is no book selected? (default: <blank>)
 * 
 * @param Standard Padding
 * @type number
 * @default 18
 * @desc What should be our window padding? (default: 18)
 * 
 * @param Text Padding
 * @type number
 * @default 6
 * @desc What should be our padding displayed before text? (default: 6)
 * 
 * @param Standard Opacity
 * @type number
 * @default 255
 * @desc What should be our standard opacity for the window? (default: 255)
 * 
 * @param Back Opacity
 * @type number
 * @default 192
 * @desc What should be our window opacity? (default: 192)
 * 
 * @param Window Skin
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc What window skin should we use?
 * 
 */

//=============================================================================
// JSON File Configuration
//=============================================================================
 /*~struct~JsonConfig:
 * @param Type
 * @type combo
 * @option Localization File
 * @option Dedicated File
 * @default Localization File
 * @desc What kind of JSON file are we dealing with?
 * 
 * @param File
 * @type text
 * @default en.json
 * @desc The path to the JSON file (if using Iavra Localization Core, path to one of the files)
 * 
 * @param Localization Escape Code
 * @type text
 * @default #{{key}}
 * @desc Code used to retrieve localized string by the plugin of choice. "{key}" is a placeholder for the text key.
 * 
 * @param Category List
 * @type text
 * @default library.categories
 * @desc What is the root context to our book category array? This determines category order. (default: library.categories)
 * 
 * @param Root Context Path
 * @type text
 * @default library.books
 * @desc What is the root context path to our book data? (default: library.books)
 * 
 * @param Title Object
 * @type text
 * @default title
 * @desc What is the name of the object within our context containing the book title?
 * 
 * @param Window Title Color Object
 * @type text
 * @default titleColor
 * @desc What is the name of the object within our context that specifies title window text color?
 * 
 * @param Text Object
 * @type text
 * @default text
 * @desc What is the name of the object within our context containing the book text?
 * 
 * @param Text List Object
 * @type text
 * @default textArray
 * @desc What is the name of the array object within our context containing a list of variable book texts?
 * 
 * @param Visible Text Object
 * @type text
 * @default visibleTexts
 * @desc What is the name of the array object within our context containing a list of texts shown when the book is learned?
 * 
 * @param Category Object
 * @type text
 * @default category
 * @desc What is the name of the object within our context containing the book category index?
 * 
 * @param ID Object
 * @type text
 * @default id
 * @desc What is the name of the object within our context containing the book ID number?
 * 
 * @param Undefined Category
 * @type text
 * @default Unknown
 * @desc What category to use if the book category undefined?
 * 
 */

//=============================================================================
// Detached Background Image Structure
//=============================================================================
/*~struct~DetachedBgConfig:
 * @param Full Background Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select an image for a full screen background on detached windows.
 * 
 * @param Single Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display through the whole detached window.
 * 
 * @param Multiple Images - Title
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display only at the detached title bar.
 * 
 * @param Multiple Images - Text
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display only at the detached text window.
 * 
 */

//=============================================================================
// Menu Background Image Structure
//=============================================================================
/*~struct~MenuBgConfig:
 * @param Full Background Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select an image for a full screen background on menu windows.
 * 
 * @param Single Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display through the whole menu window.
 * 
 * @param Multiple Images - Title
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display only at the menu title bar.
 * 
 * @param Multiple Images - Text
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display only at the menu text window.
 * 
 * @param Multiple Images - List
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display only at the menu text window.
 * 
 * @param Single Image - Title / Text
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display on both text and title window.
 * 
 * @param Single Image - Title / List
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display on both title and list window.
 * 
 * @param Single Image - Text / List
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Select and image to display on both text and list window.
 * 
 */

//=============================================================================
// Book Structure
//=============================================================================
 /*~struct~BookStructure:
 * @param Title
 * @type text
 * @default
 * @desc The book title.
 * 
 * @param Title Window Text Color
 * @type number
 * @default 0
 * @desc Custom color to use on the book title when inside the book menu.
 * 
 * @param Text
 * @type note
 * @default
 * @desc The book text.
 * 
 * @param Variable Text List
 * @type note[]
 * @default []
 * @desc List of texts a book can have. Which texts are displayed are controlled though plugin commands.
 * 
 * @param Visible Text List
 * @type number[]
 * @default ["0"]
 * @desc List of starting texts a book can have when learned, prior to any plugin command changes.
 * 
 * @param Category
 * @type text
 * @default
 * @desc The book category.
 * 
 * @param Id
 * @type number
 * @default 0
 * @desc This can be used to alter the order of books in the menu list. Leave default to use entry order.
 * 
 * @param customBg
 * @text Custom Background
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Custom background image.
 * 
 * @param customBgMode
 * @text Custom Background Mode
 * @type select
 * @option Detached Text Window Only
 * @value 5
 * @option Detached Title + Text Window
 * @value 9
 * @option Menu Text Window Only
 * @value 6
 * @option Menu Title + Text Window
 * @value 10
 * @option All Text Window Only
 * @value 7
 * @option All Title + Text Window
 * @value 11
 * @default 11
 * @desc Define how the custom image should be used.
 */

//=============================================================================
// Book Setup
//=============================================================================
 /*~struct~BookSetup:
 * @param Category Order
 * @type text[]
 * @default []
 * @desc This is the category order we should use at the menu list.
 * 
 * @param Books
 * @type struct<BookStructure>[]
 * @default []
 * @desc List of books to make available at your game.
 */

//=============================================================================
// Scrolling Options
//=============================================================================
/*~struct~ScrollOptions:
 * @param Enable Home/End
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Enable / disable keys 'home' and 'end' on book text windows. Disable if using another keyboard plugin.
 * 
 * @param Home Key
 * @type number
 * @min 1
 * @default 36
 * @desc Define the key code to use to scroll to the start of the text. Default: 36
 * 
 * @param End Key
 * @type number
 * @min 1
 * @default 35
 * @desc Define the key code to use to scroll to the end of the text. Default: 35
 * 
 * @param Scroll Speed
 * @type number
 * @min 1
 * @max 20
 * @default 4
 * @desc Set the scroll speed for each arrow key stroke.
 *
 */

//=============================================================================
// Parameters Setup
//=============================================================================

TAA.bm.Parameters = TAA.bm.Parameters || {};
var Parameters = PluginManager.parameters(TAA.bm.PluginName);

TAA.bm.Parameters.SourceType = Parameters['SourceType'] || 'JSON File';

TAA.bm.Parameters.DetachedTitleWindow = JSON.parse(Parameters['Detached Title Window Config']);
TAA.bm.Parameters.DetachedTextWindow = JSON.parse(Parameters['Detached Text Window Config']);
TAA.bm.Parameters.MenuListWindow = JSON.parse(Parameters['Menu List Window Config']);
TAA.bm.Parameters.MenuTitleWindow = JSON.parse(Parameters['Menu Title Window Config']);
TAA.bm.Parameters.MenuTextWindow = JSON.parse(Parameters['Menu Text Window Config']);
TAA.bm.Parameters.JsonConfig = JSON.parse(Parameters['JSON Config']);
TAA.bm.Parameters.LocalBooks = JSON.parse(Parameters['Plugin Manager Books']);

TAA.bm.Parameters.Menu = {};
TAA.bm.Parameters.Menu.MenuEntry = JSON.parse(Parameters['Auto Place Command']);
TAA.bm.Parameters.Menu.ShowMenu = JSON.parse(Parameters['Show Menu']);
TAA.bm.Parameters.Menu.EnableMenu = JSON.parse(Parameters['Enable Menu']);
TAA.bm.Parameters.Menu.Name = Parameters['Menu Name'];

TAA.bm.Parameters.DetachedBgImages = JSON.parse(Parameters['Detached Background Config']);
TAA.bm.Parameters.MenuBgImages = JSON.parse(Parameters['Menu Background Config']);

TAA.bm.Parameters.DetachedBgImages.Option = eval(Parameters['Detached Background Options']);
TAA.bm.Parameters.MenuBgImages.Option = eval(Parameters['Menu Background Options']);

TAA.bm.Parameters.Misc = TAA.bm.Parameters.Misc || {};
TAA.bm.Parameters.Misc['Break Before Image'] = JSON.parse(Parameters['Break Before Image']);
TAA.bm.Parameters.Misc['Force Image Into Window'] = JSON.parse(Parameters['Force Image Into Window']);
TAA.bm.Parameters.Misc.ResetBooksReadOnLoad = JSON.parse(Parameters['Reset Books Read On Load']);
TAA.bm.Parameters.Misc['Native Touch/Click Support'] = Parameters['Native Touch/Click Support'];
TAA.bm.Parameters.Misc['Inline Image Folder'] = Parameters['Inline Image Folder'];
TAA.bm.Parameters.Misc['Inline Image Preloading'] = JSON.parse(Parameters['Inline Image Preloading']);
TAA.bm.Parameters.Misc['Check Files First'] = Parameters['Check Files First'] === 'true';
TAA.bm.Parameters.Misc['Forced Preload List'] = JSON.parse(Parameters['Forced Preload List']);
TAA.bm.Parameters.Misc['Load Before Title'] = JSON.parse(Parameters['Load Before Title']);
TAA.bm.Parameters.Misc['Scroll Options'] = JSON.parse(Parameters['Scroll Options']);
TAA.bm.Parameters.Misc['Line Break Between Texts'] = Parameters['Line Break Between Texts'];
TAA.bm.Parameters.Misc['Line Break Pattern'] = Parameters['Line Break Pattern'];

//=============================================================================
// DataManager
//=============================================================================

TAA.bm.alias.DataManager = TAA.bm.alias.DataManager || {};
TAA.bm.alias.DataManager.loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function(){
    TAA.bm.alias.DataManager.loadDatabase.call(this);
    $dataBooks = new LibraryData();
};

TAA.bm.alias.DataManager.isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if(TAA.bm.Parameters.Misc['Load Before Title'] === true && $dataBooks && $dataBooks._source === 'JSON File' && !$dataBooks._doneLoading) return false;
    return TAA.bm.alias.DataManager.isDatabaseLoaded.call(this);
};

TAA.bm.alias.DataManager.makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function(){
    var contents = TAA.bm.alias.DataManager.makeSaveContents.call(this);
    contents.dataBooks = $dataBooks._booksRead;
    contents.dataBooksVisible = $dataBooks._visibleBookTexts;
    contents.dataBooksNewList = $dataBooks._newBookSign;
    return contents;
};

TAA.bm.alias.DataManager.extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
    TAA.bm.alias.DataManager.extractSaveContents.call(this, contents);
    if(contents.dataBooks === undefined) return;
    var loadedBooks = contents.dataBooks;
    // This is intended to keep compatibility with 1.4.0 or lower versions
    if(loadedBooks._booksRead === undefined)
        var booksRead = loadedBooks;
    else
        var booksRead = loadedBooks._booksRead;
    /////////
    
    if(TAA.bm.Parameters.Misc.ResetBooksReadOnLoad)
        $dataBooks.resetBooksRead();
    else{
        // Added in version 1.6.7 to fix an issue where newly added categories are not
        // recognized in previously saved games
        for(key in $dataBooks._booksRead){
            if(booksRead[key] === undefined)
                booksRead[key] = [];
        }
        $dataBooks._booksRead = booksRead;
    }

    if(contents.dataBooksVisible)
        $dataBooks._visibleBookTexts = contents.dataBooksVisible;
    if(contents.dataBooksNewList)
        $dataBooks._newBookSign = contents.dataBooksNewList;
};

//=============================================================================
// LibraryData
//=============================================================================

var $dataBooks = {};

function LibraryData() {
    this.initialize.apply(this, arguments);
};

LibraryData.prototype.initialize = function(){
    this._source = TAA.bm.Parameters.SourceType;
    this._categoryList = [];
    this._books = {};
    this._bookKeyByCategory = {};
    this._categoryByBookKey = {};
    this._booksRead = this._booksRead || {};
    this._visibleBookTexts = this._visibleBookTexts || {};
    this._newBookSign = this._newBookSign || {};
    this._inlineImageIndex = this._inlineImageIndex || {};
    this._preloadedImages = {};
    this._currentBook = undefined;
    this._allowImagePreload = TAA.bm.Parameters.Misc['Inline Image Preloading'] === true;
    this._inlineImageFolder = TAA.bm.Parameters.Misc['Inline Image Folder'];
    if(this._inlineImageFolder === undefined || !this._inlineImageFolder.match(/^img\//))
        this._inlineImageFolder = 'img/pictures/';
    if(this._inlineImageFolder.charAt(this._inlineImageFolder.length) !== '/')
        this._inlineImageFolder += '/';
    this._isDeployedProject = undefined;
    this._doneLoading = false;
    this._invalidFileList = [];
    this._existingFileList = [];
    this.loadBookData();
};

LibraryData.prototype.loadBookData = function(){
    if(this._source === 'JSON File')
        this.loadBooksFromFile();
    else
        this.loadBooksFromParameters();
};

LibraryData.prototype.loadBooksFromFile = function() {
    this._bookFile = TAA.bm.Parameters.JsonConfig.File;
    this._bookRootContext = TAA.bm.Parameters.JsonConfig['Root Context Path'];
    this._bookTitleObject = TAA.bm.Parameters.JsonConfig['Title Object'];
    this._bookMenuTitleColorObject = TAA.bm.Parameters.JsonConfig['Window Title Color Object'];
    this._bookTextObject = TAA.bm.Parameters.JsonConfig['Text Object'];
    this._bookCategoryObject = TAA.bm.Parameters.JsonConfig['Category Object'];
    this._bookIdObject = TAA.bm.Parameters.JsonConfig['ID Object'];
    this._bookTextArrayObject = TAA.bm.Parameters.JsonConfig['Text List Object'];
    this._bookVisibleTextObject = TAA.bm.Parameters.JsonConfig['Visible Text Object'];

    this.loadJSON(function(response){
        if(Object.keys($dataBooks._books).length > 0){
            return;
        }
        $dataBooks._books = $dataBooks.seekObject($dataBooks._bookRootContext, response);
        $dataBooks._categoryList = $dataBooks.loadCategoryList($dataBooks.seekObject(TAA.bm.Parameters.JsonConfig['Category List'], response));
        for(var i=0; i < $dataBooks._categoryList.length; i++){
            $dataBooks._booksRead[$dataBooks._categoryList[i]] = $dataBooks._booksRead[$dataBooks._categoryList[i]] || [];
            $dataBooks._newBookSign[$dataBooks._categoryList[i]] = $dataBooks._newBookSign[$dataBooks._categoryList[i]] || {};
        }

        for(var k in $dataBooks._books){
            var cat = $dataBooks.getBookCategory(k);
            var id = $dataBooks.getBookId(k);

            // ----------------------------------
            // This is required starting on version 1.6.0 to guarantee backwards compatibility
            if(!$dataBooks._books[k][$dataBooks._bookTextArrayObject] || $dataBooks._books[k][$dataBooks._bookTextArrayObject].length <= 0){
                $dataBooks._books[k][$dataBooks._bookTextArrayObject] = [];
				$dataBooks._books[k].arrayCompatibility = true;
            }
            if($dataBooks._books[k][$dataBooks._bookTextObject])
                $dataBooks._books[k][$dataBooks._bookTextArrayObject].splice(0, 0, $dataBooks._books[k][$dataBooks._bookTextObject]);
			$dataBooks._visibleBookTexts[k] = $dataBooks._visibleBookTexts[k] || [];
            if(!$dataBooks._books[k][$dataBooks._bookVisibleTextObject] || $dataBooks._books[k][$dataBooks._bookVisibleTextObject].length <= 0){
                $dataBooks._visibleBookTexts[k].push(0);
            }
            else{
                $dataBooks._visibleBookTexts[k] = $dataBooks._books[k][$dataBooks._bookVisibleTextObject];
            }

            if(!$dataBooks._books[k][$dataBooks._bookTextObject]){
                if($dataBooks._books[k][$dataBooks._bookTextArrayObject][0])
                    $dataBooks._books[k][$dataBooks._bookTextObject] = $dataBooks._books[k][$dataBooks._bookTextArrayObject][0];
                else
                    $dataBooks._books[k][$dataBooks._bookTextObject] = "";
            }
            // ----------------------------------

            $dataBooks.cacheInlineImages(k);

            // creates category subObject
            if(!$dataBooks._bookKeyByCategory[cat]){
                $dataBooks._bookKeyByCategory[cat] = [];
                if(!$dataBooks._booksRead[cat])
                    $dataBooks._booksRead[cat] = [];
            }

            // Fill in books under categories ordered by Ids, if they exist
            if(id !== undefined && $dataBooks._bookKeyByCategory[cat][id] === undefined){
                if(!$dataBooks._bookKeyByCategory[cat].contains(k))
                    $dataBooks._bookKeyByCategory[cat][id] = k;
            }
            else{
                if(!$dataBooks._bookKeyByCategory[cat].contains(k))
                    $dataBooks._bookKeyByCategory[cat].push(k);
            }

            if(!$dataBooks._categoryByBookKey[k])
                $dataBooks._categoryByBookKey[k] = cat;
        };
        $dataBooks._doneLoading = true;
        $dataBooks.processForcedPreloadList();
    }, this);
};

LibraryData.prototype.cacheInlineImages = function(key, data){
    let txtObj = data ? "Text" : this._bookTextObject;
    let txtArr = data ? "Variable Text List" : this._bookTextArrayObject;
    let book = data ? data : this._books[key];;
    let index = [];
    let inlineImages = [];
    if(book[txtArr] && book[txtArr].length > 0){
        let variableIndex = [];
        book[txtArr].forEach(function(txt){
            let tmp = {};
            inlineImages = txt !== null ? txt.match(/\%(?:in_)?img\(\s*["']([^"']+)["']/gm) : [];
            if(inlineImages && inlineImages.length > 0){
                inlineImages.forEach(function(i){
                    i.match(/\%(?:in_)?img\(\s*["']([^"']+)["']/m);
                    if(!tmp[RegExp.$1])
                        tmp[RegExp.$1] = true;
                });
                variableIndex = variableIndex.concat(Object.keys(tmp));
            }
        });
        if(variableIndex && variableIndex.length > 0)
            index = variableIndex;
    }
    else{
        inlineImages = book[txtObj].match(/\%(?:in_)?img\(\s*["']([^"']+)["']/gm);
        if(inlineImages && inlineImages.length > 0){
            let tmp = {};
            inlineImages.forEach(function(i){
                i.match(/\%(?:in_)?img\(\s*["']([^"']+)["']/m);
                if(!tmp[RegExp.$1])
                    tmp[RegExp.$1] = true;
            });
            index = Object.keys(tmp);
        }
    }

    if(index && index.length > 0)
        this._inlineImageIndex[key] = index;
};

LibraryData.prototype.loadJSON = function(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', this._bookFile, true);
    xobj.onload = function() { callback(JSON.parse(xobj.responseText)); };
    xobj.onerror = function() { throw new Error("There was an error loading the file '" + this._bookFile + "."); };
    xobj.send();
};

LibraryData.prototype.seekObject = function(path, data){
    var keys = path.split(/\./);
    var targetData = null;
    keys.forEach(function(k){
        targetData = (targetData === null) ? data[k] : targetData[k];
    });
    return targetData;
};

LibraryData.prototype.loadCategoryList = function(array){
    var returnArray = [];
    if(this._source === 'JSON File'){
        if(TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
            var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
            for(var k=0; k < array.length; k++){
                var keyCode = TAA.bm.Parameters.JsonConfig['Category List'] + "." + k;
                var category = escapeCode.replace(/{key}/, keyCode); 
                returnArray.push(category);
            }
        }
        else{
            returnArray = array;
        }
    }
    else{
        returnArray = JSON.parse(TAA.bm.Parameters.LocalBooks['Category Order']).slice();
    }

    return returnArray;
};

LibraryData.prototype.resetBooksRead = function(){
    this._booksRead = {};
    for(var cat in this._bookKeyByCategory){
        if(!this._booksRead[cat])
            this._booksRead[cat] = [];
    }
};

LibraryData.prototype.loadBooksFromParameters = function(){
    this._bookFile = undefined;
    this._bookRootContext = undefined;
    this._bookTitleObject = "Title";
    this._bookMenuTitleColorObject = "Title Window Text Color";
    this._bookTextObject = "Text";
    this._bookCategoryObject = "Category";
    this._bookIdObject = "Id";
    this._bookTextArrayObject = "Variable Text List";
    this._bookVisibleTextObject = "Visible Text List";

    this._categoryList = this.loadCategoryList();
    var books = JSON.parse(TAA.bm.Parameters.LocalBooks.Books) || {};
    for(var i=0; i < books.length; i++){
        var b = JSON.parse(books[i]);
        b.Text = JSON.parse(b.Text);
        b.Id = JSON.parse(b.Id);
        if(b[this._bookMenuTitleColorObject] === undefined) b[this._bookMenuTitleColorObject] = 0;
        else b[this._bookMenuTitleColorObject] = JSON.parse(b[this._bookMenuTitleColorObject]);
        var key = b.Title.replace(/[\s\t]+/g, '');
        var category = b.Category;
        var id = b.Id;
        if(this._books[key] !== undefined){
            console.error("Book '" + key + "' seems to be duplicated. We'll be keeping the first record and ditching the double for now, but please make sure Titles are unique.");
        }
        else{
            this._books[key] = b;

            // ----------------------------------
            // This is required starting on version 1.6.0 to guarantee backwards compatibility
            if(!this._books[key][this._bookTextArrayObject]){
                this._books[key][this._bookTextArrayObject] = [];
				this._books[key].arrayCompatibility = true;
            }
            else if(this._books[key][this._bookTextArrayObject]){
                var tmpList = JSON.parse(this._books[key][this._bookTextArrayObject]);
                this._books[key][this._bookTextArrayObject] = [null];
                for(var j=0; j<tmpList.length; j++){
                    this._books[key][this._bookTextArrayObject].push(JSON.parse(tmpList[j]));
                }
            }
            if(this._books[key][this._bookTextObject]){
                this._books[key][this._bookTextArrayObject].splice(0, 0, this._books[key][this._bookTextObject]);
            }
            if(!this._books[key][this._bookVisibleTextObject] || this._books[key][this._bookVisibleTextObject].length <= 0){
                this._visibleBookTexts[key] = [];
                this._visibleBookTexts[key].push(0);
            }
            else{
                var tmpArray = JSON.parse(this._books[key][this._bookVisibleTextObject]);
                this._visibleBookTexts[key] = this._visibleBookTexts[key] || [];
                for(var j=0; j<tmpArray.length; j++){
                    if(!isNaN(tmpArray[j]))
                        this._visibleBookTexts[key].push(parseInt(tmpArray[j]));
                }
                this._books[key][this._bookVisibleTextObject] = this._visibleBookTexts[key];
            }

            if(!this._books[key][this._bookTextObject]){
                if(this._books[key][this._bookTextArrayObject][0])
                    this._books[key][this._bookTextObject] = this._books[key][this._bookTextArrayObject][0];
                else
                    this._books[key][this._bookTextObject] = "";
            }
            // ----------------------------------

            this.cacheInlineImages(key, b);

            // creates category subObject
            if(!this._bookKeyByCategory[category]){
                this._bookKeyByCategory[category] = [];
                if(!this._booksRead[category])
                    this._booksRead[category] = [];
                if(!this._newBookSign[category])
                    this._newBookSign[category] = {};
            }

            // Fill in books under categories ordered by Ids, if they exist
            if(id !== undefined && this._bookKeyByCategory[category][id] === undefined){
                if(!this._bookKeyByCategory[category].contains(key))
                    this._bookKeyByCategory[category][id] = key;
            }
            else{
                if(!this._bookKeyByCategory[category].contains(key))
                    this._bookKeyByCategory[category].push(key);
            }

            if(!this._categoryByBookKey[key])
                this._categoryByBookKey[key] = category;
        }        
    }
    this.processForcedPreloadList();
};

LibraryData.prototype.processForcedPreloadList = function(){
    if(TAA.bm.Parameters.Misc['Forced Preload List'] === undefined || TAA.bm.Parameters.Misc['Forced Preload List'].length <= 0) return;

    for(var i=0; i<TAA.bm.Parameters.Misc['Forced Preload List'].length; i++){
        this.preloadBookImages(TAA.bm.Parameters.Misc['Forced Preload List'][i]);
    }
};

LibraryData.prototype.inlineImageFolder = function(){
    return this._inlineImageFolder;
};

LibraryData.prototype.markBookAsChanged = function(bookKey){
    if(!bookKey || !this._books[bookKey]) return;
    var category = this._categoryByBookKey[bookKey];
    if(!category) return;
    if(!this._newBookSign[category]) this._newBookSign[category] = {};
    this._newBookSign[category][bookKey] = true;
};

LibraryData.prototype.markBookAsNotChanged = function(bookKey){
    if(!bookKey || !this._books[bookKey]) return;
    var category = this._categoryByBookKey[bookKey];
    if(!category) return;
    if(!this._newBookSign[category]) this._newBookSign[category] = {};
    this._newBookSign[category][bookKey] = false;
};

LibraryData.prototype.isCategoryChanged = function(category){
    if(!this._categoryList.contains(category) || !this._newBookSign[category] || !this._newBookSign[category].length <= 0)
        return false;
    for(const item in this._newBookSign[category]){
        if(this._newBookSign[category][item] === true)
            return true;
    }
    return false;
};

LibraryData.prototype.isBookChanged = function(book, category){
    if(!category)
        category = this._categoryByBookKey[book];
    if(!book || !category || !this._newBookSign[category]) return false;
    return this._newBookSign[category][book] === true;
};

LibraryData.prototype.isBookPassageKnown = function(book, index){
    if(!this._visibleBookTexts[book] || isNaN(index)) return false;
    return this._visibleBookTexts[book].contains(index);
};

LibraryData.prototype.readBook = function(bookKey, markAsRead){
    this._currentBook = bookKey;
    var category = this._categoryByBookKey[bookKey];
    if(category === undefined) {
        this._currentBook = undefined;
        return;
    }
    if(markAsRead === undefined || markAsRead === true){
        if(!this._booksRead[category])
            this._booksRead[category] = [];
        if(!this._booksRead[category].contains(bookKey)){
            this._booksRead[category].push(bookKey);
        }

        // Added on 1.6.6 to ensure books created after a save file have their initial
        // variable text lists correctly setup
        if(this._visibleBookTexts[bookKey] === undefined){
            this._visibleBookTexts[bookKey] = this._books[bookKey][this._bookVisibleTextObject];
        }

        if(['New Addition Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator'])){
            if(!this._newBookSign[category])
                this._newBookSign[category] = {};
            this._newBookSign[category][bookKey] = true;
        }
    }
    else
        this._newBookSign[category][bookKey] = false;
};

LibraryData.prototype.resetCurrentBook = function(){
    this._currentBook = undefined;
};

LibraryData.prototype.isBookReady = function(){
    if(this._currentBook === undefined) return false;
    else return true;
}

LibraryData.prototype.getBookTitle = function(book){
    return this.getAttrValue(book, this._bookTitleObject);
};

LibraryData.prototype.getBookTitleColor = function(book){
    return (this.getAttrValue(book, this._bookMenuTitleColorObject) !== undefined) ? this.getAttrValue(book, this._bookMenuTitleColorObject) : 0;
};

LibraryData.prototype.getVisibleTextIndexes = function(book){
    // Added on 1.6.6 to ensure books created after a save file have their variable text 
    // lists correctly initialized
    if(book && this._visibleBookTexts[book] === undefined){
        this._visibleBookTexts[book] = this._books[book][this._bookVisibleTextObject];
    }
    if(!book || !this._visibleBookTexts[book])
        return [];
    else
        return this._visibleBookTexts[book];
};

LibraryData.prototype.isBookTextItemAvailable = function(book, index){
    if(!book || !this._books[book] || isNaN(index) || index < 0)
        return false;
    if(!this._books[book][this._bookTextArrayObject] || index >= this._books[book][this._bookTextArrayObject].length)
        return false;
    return true;
};

LibraryData.prototype.addVisibleText = function(book, index){
    if(!this.isBookTextItemAvailable(book, index))
        return;
    if(!this._visibleBookTexts[book])
        this._visibleBookTexts[book] = [];
    this._visibleBookTexts[book].push(index);
    if(['Text Update Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
        this.markBookAsChanged(book);
};

LibraryData.prototype.addVisibleTextAt = function(book, index, position){
    if(!this.isBookTextItemAvailable(book, index))
        return;
    if(!this._visibleBookTexts[book])
        this._visibleBookTexts[book] = [];
    if(position > this._books[book][this._bookTextArrayObject].length)
        this._visibleBookTexts[book].push(index);
    else if(position < 0)
        this._visibleBookTexts[book].splice(0, 0, index);
    else
        this._visibleBookTexts[book].splice(position, 0, index);
    if(['Text Update Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
        this.markBookAsChanged(book);
};

LibraryData.prototype.removeVisibleText = function(book, index){
    if(!this.isBookTextItemAvailable(book, index))
        return;
    var position = this._visibleBookTexts[book].indexOf(index);
    if(position >= 0){
        this._visibleBookTexts[book].splice(position, 1);
        if(['Text Update Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
            this.markBookAsChanged(book);
    }
};

LibraryData.prototype.removeVisibleTextAt = function(book, position){
    if(!this.isBookTextItemAvailable(book, index))
        return;
    if(position < 0 || position >= this._visibleBookTexts[book].length)
        return;
    this._visibleBookTexts[book].splice(position, 1);
    if(['Text Update Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
        this.markBookAsChanged(book);
};

LibraryData.prototype.clearVisibleText = function(book){
    this._visibleBookTexts[book] = [];
    if(['Text Update Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
        this.markBookAsChanged(book);
};

LibraryData.prototype.replaceVisibleText = function(book, index){
    if(!this.isBookTextItemAvailable(book, index))
        return;
    this._visibleBookTexts[book] = [index];
    if(['Text Update Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
        this.markBookAsChanged(book);
};

LibraryData.prototype.getBookText = function(book){
    var text = "";
    var textArray = this.getAttrValue(book, this._bookTextArrayObject);
    var visibleTexts = this.getVisibleTextIndexes(book);
    if(!textArray || !visibleTexts || this.getAttrValue(book, "arrayCompatibility") === true){
        return this.getAttrValue(book, this._bookTextObject);
	}
    for(var i=0; i<visibleTexts.length; i++){
        if(text !== ""){
            switch(TAA.bm.Parameters.Misc['Line Break Between Texts']){
                case 'Double':
                    text += TAA.bm.Parameters.Misc['Line Break Pattern'] + TAA.bm.Parameters.Misc['Line Break Pattern'];
                    break;
                case 'Single':
                    text += TAA.bm.Parameters.Misc['Line Break Pattern'];
                    break;
            }
        }
        if(textArray[visibleTexts[i]]){
			if(this._source === 'JSON File' && TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
				var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
				var keyCode = this._bookRootContext + "[\"" + book + "\"][\"" + this._bookTextArrayObject + "\"][" + visibleTexts[i] + "]";
				text += escapeCode.replace(/{key}/, keyCode);
			}
			else
				text += textArray[visibleTexts[i]];
		}
    }
    return text;
};

LibraryData.prototype.getBookCategory = function(book){
    var category = "";
    if(book === undefined) return;
    if(this._books[book][this._bookCategoryObject] !== undefined){
        category = this.getCatAttrValue(book);
    }
    else{
        category = TAA.bm.Parameters.JsonConfig['Undefined Category'];
    }
    return category;
};

LibraryData.prototype.getBookCategoryByIndex = function(index){
    var category = this._categoryList[index] || "undefined";
    return category;
};

LibraryData.prototype.getBookId = function(book){
    if(book === undefined) return;
    var result = $dataBooks._books[book][this._bookIdObject];
    return result;
};

LibraryData.prototype.getCatAttrValue = function(book){
    var result;
    var index = this._books[book][this._bookCategoryObject];
    if(index === undefined) 
        return TAA.bm.Parameters.JsonConfig['Undefined Category'];
    
    if(this._source === 'JSON File'){
        if(TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
            var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
            var keyCode = TAA.bm.Parameters.JsonConfig['Category List'] + "." + index;
            result = escapeCode.replace(/{key}/, keyCode);
        }
        else{
            result = this._categoryList[index];
        }
    }
    else{
        result = index;
    }
    return result;
};

LibraryData.prototype.getCatAttrValueByName = function(categoryName){
    var result = "";
    if(this._source === 'JSON File'){
        if(TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
            var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
            var index = 0;
            var i = 0;
            while(i < this._categoryList.length){
                if(this._categoryList[i] === categoryName){
                    index = i;
                    i += this._categoryList.length;
                }
                i++;
            }
            var keyCode = TAA.bm.Parameters.JsonConfig['Category List'] + "." + index;
            result = escapeCode.replace(/{key}/, keyCode);
        }
        else{
            result = categoryName;
        }
    }
    else{
        result = categoryName;
    }
    return result;
};

LibraryData.prototype.isLocalizable = function(value){
    return ![this._bookMenuTitleColorObject, this._bookIdObject, this._bookCategoryObject, this._bookTextArrayObject, this._bookVisibleTextObject, "arrayCompatibility"].contains(value);
};

LibraryData.prototype.getAttrValue = function(book, value){
    var result;
    if(this._source === 'JSON File' && TAA.bm.Parameters.JsonConfig.Type === 'Localization File' && this.isLocalizable(value)){
        var escapeCode = TAA.bm.Parameters.JsonConfig['Localization Escape Code'] || "#{{key}}";
		var keyCode = this._bookRootContext + "[\"" + book + "\"][\"" + value + "\"]";
		result = escapeCode.replace(/{key}/, keyCode);
    }
    else{
        result = this._books[book][value];
    }
    return result;
};

LibraryData.prototype.customBg = function(){
    if(this._currentBook === undefined || this._books[this._currentBook] === undefined) return undefined;

    var customBg = {};
    customBg.file = this._books[this._currentBook]["customBg"] || undefined;
    customBg.mode = parseInt(this._books[this._currentBook]["customBgMode"]) || 15;

    if(customBg.file === undefined) return undefined;
    return customBg;
};

LibraryData.prototype.customBgByKey = function(bookKey){
    if(bookKey === undefined || this._books[bookKey] === undefined) return undefined;

    var customBg = {};
    customBg.file = this._books[bookKey]["customBg"] || undefined;
    customBg.mode = parseInt(this._books[bookKey]["customBgMode"]) || 15;

    if(customBg.file === undefined) return undefined;
    return customBg;
};

LibraryData.prototype.imagePreloadingEnabled = function(){
    return this._allowImagePreload === true;
};

LibraryData.prototype.enableImagePreload = function(){
    this._allowImagePreload = true;
};

LibraryData.prototype.disableImagePreload = function(){
    this._allowImagePreload = false;
};

LibraryData.prototype.clearPreloadHistory = function(){
    this._preloadedImages = {};
};

LibraryData.prototype.preloadBookImages = function(book){
    if($dataBooks._inlineImageIndex[book] === undefined || $dataBooks._inlineImageIndex[book].length <= 0) return;

    $dataBooks._inlineImageIndex[book].forEach(function(i){
        if($dataBooks._preloadedImages[i] !== undefined || !this.imgExists(i)) return;
        $dataBooks._preloadedImages[i] = ImageManager.loadBitmap(this.inlineImageFolder(), i, undefined, true);
    }, this);
};

LibraryData.prototype.imgExists = function(file){
    if(TAA.bm.Parameters.Misc['Check Files First'] !== true)
        return true;
    if(!file || file === "" || this._invalidFileList.contains(file))
        return false;
    if(this._existingFileList.contains(file))
        return true;
    try{
		var url = this.inlineImageFolder() + file + ".png";
        var http = new XMLHttpRequest();
		if(Utils.RPGMAKER_NAME === 'MV' && !Decrypter.checkImgIgnore(url) && Decrypter.hasEncryptedImages){
			url = Decrypter.extToEncryptExt(url);
		}
		else if(Utils.RPGMAKER_NAME === 'MZ' && Utils.hasEncryptedImages()){
			url += "_";
		}
        http.open('HEAD', url, false);
        http.send();
        if(http.status >= 400){
            this._invalidFileList.push(file);
            return false;
        }
        this._existingFileList.push(file);
        return true;
    } catch(e){
        this._invalidFileList.push(file);
        return false;
    }
};

//=============================================================================
// Game_System
//=============================================================================

TAA.bm.alias.GameSystem = TAA.bm.alias.GameSystem || {};
TAA.bm.alias.GameSystem.initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    TAA.bm.alias.GameSystem.initialize.call(this);
    this.initializeBookLibrary();
};

Game_System.prototype.initializeBookLibrary = function(){
    this._showBookMenu = this._showBookMenu || JSON.parse(TAA.bm.Parameters.Menu.ShowMenu);
    this._enableBookMenu = this._enableBookMenu || JSON.parse(TAA.bm.Parameters.Menu.EnableMenu);
    this._showBookCategories = this._showBookCategories || JSON.parse(TAA.bm.Parameters.MenuListWindow['Show Categories']);
    this._hideUnreadBooks = this._hideUnreadBooks || JSON.parse(TAA.bm.Parameters.MenuListWindow['Hide Unread Books']);
    this._hideTitleBar = eval(TAA.bm.Parameters.DetachedTitleWindow['Hide Title Bar']) || false;
};

Game_System.prototype.isShowBookMenu = function(){
    return this._showBookMenu;
};

Game_System.prototype.setShowBookMenu = function(value){
    this._showBookMenu = value;
};

Game_System.prototype.isBookMenuEnabled = function(){
    return this._enableBookMenu;
};

Game_System.prototype.setEnableBookMenu = function(value){
    this._enableBookMenu = value;
};

Game_System.prototype.isBookCategoriesVisible = function(){
    return this._showBookCategories;
};

Game_System.prototype.setBookCategoriesVisibility = function(value){
    this._showBookCategories = value;
};

Game_System.prototype.isUnreadBooksHidden = function(){
    return this._hideUnreadBooks;
};

Game_System.prototype.setUnreadBooksVisibility = function(value){
    this._hideUnreadBooks = value;
};

Game_System.prototype.isTitleVisible = function(){
    return !this._hideTitleBar;
};

Game_System.prototype.setTitleBarVisibility = function(visible){
    this._hideTitleBar = !visible;
};

Game_System.prototype.readBook = function(bookKey, markAsRead){
    var mark = true;
    if(markAsRead === false) mark = false;
    $dataBooks.readBook(bookKey, mark);
    if($dataBooks.isBookReady()){
        SceneManager.push(Scene_Book);
    }
};

Game_System.prototype.getTotalBooks = function(){
    return Object.keys($dataBooks._books).length;
};

Game_System.prototype.getTotalBooksRead = function(){
    var bookCount = 0;
    for(var cat in $dataBooks._booksRead){
        bookCount += $dataBooks._booksRead[cat].length;
    }
    return bookCount;
};

Game_System.prototype.getTotalBooksFromCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    var books = $dataBooks._bookKeyByCategory[cat];
    if(books !== undefined)
        return books.length;
    else
        return 0;
};

Game_System.prototype.getTotalBooksReadFromCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    if($dataBooks._booksRead[cat] === undefined) return 0;
    var books = $dataBooks._booksRead[cat];
    if(books !== undefined)
        return books.length;
    else
        return 0;
};

Game_System.prototype.getBookCategory = function(key){
    return $dataBooks.getBookCategory(key);
};

Game_System.prototype.getBookId = function(key){
    return $dataBooks.getBookId(key);
}

Game_System.prototype.isBookRead = function(key){
    var cat = $dataBooks._categoryByBookKey[key];
    if($dataBooks._booksRead[cat] === undefined) return false;
    if($dataBooks._booksRead[cat].contains(key))
        return true;
    else
        return false;
};

Game_System.prototype.isBookPassageKnown = function(key, index){
    return $dataBooks.isBookPassageKnown(key, index);
};

Game_System.prototype.forgetBook = function(key){
    var cat = $dataBooks._categoryByBookKey[key];
    if($dataBooks._booksRead[cat] === undefined) return;
    var index = $dataBooks._booksRead[cat].indexOf(key);
    if(index > -1){
        $dataBooks._booksRead[cat].splice(index, 1);
    }
};

Game_System.prototype.forgetBooksByCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    cat = cat.replace(/[\s\t]+/g, '');
    var i = 0;
    var found = false;
    var keys = Object.keys($dataBooks._booksRead);
    while(i < keys.length && !found){
        var key = keys[i];
        var strippedKey = key.replace(/[\s\t]+/g, '');
        if(cat === strippedKey){
            $dataBooks._booksRead[key] = [];
            found = true;
        }
        i++;
    }
};

Game_System.prototype.learnBook = function(key){
    var cat = $dataBooks._categoryByBookKey[key];
    if($dataBooks._booksRead[cat] === undefined) return;
    if(!$dataBooks._booksRead[cat].contains(key)){
        $dataBooks._booksRead[cat].push(key);
        if(['New Addition Only', 'All'].contains(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator']))
            $dataBooks.markBookAsChanged(key);
    }
};

Game_System.prototype.learnBooksByCategory = function(category){
    var cat = $dataBooks.getCatAttrValueByName(category);
    cat = cat.replace(/[\s\t]+/g, '');
    var bookList = $dataBooks._bookKeyByCategory[cat];
    if(bookList === undefined || bookList.length <= 0) return;
    if(!Object.keys($dataBooks._booksRead).contains(cat)) $dataBooks._booksRead[cat] = [];
    for(var i=0; i < bookList.length; i++){
        if(bookList[i] !== null && bookList[i] !== undefined && !$dataBooks._booksRead[cat].contains(bookList[i]))
            $dataBooks._booksRead[cat].push(bookList[i]);
    }
};

Game_System.prototype.resetLibrary = function(){
    $dataBooks = new LibraryData();
};

Game_System.prototype.resetLibraryBookList = function(){
    var tmp = new LibraryData();
    $dataBooks._books = tmp._books;
    $dataBooks._bookKeyByCategory = tmp._bookKeyByCategory;
    $dataBooks._categoryList = tmp._categoryList;
    $dataBooks._categoryByBookKey = tmp._categoryByBookKey;
};

Game_System.prototype.resetLibraryBooksRead = function(){
    $dataBooks.resetBooksRead();
};

Game_System.prototype.preloadBookImagesEnabled = function(){
    return $dataBooks.imagePreloadingEnabled();
};

Game_System.prototype.enableBookImagePreload = function(){
    $dataBooks.enableImagePreload();
};

Game_System.prototype.disableBookImagePreload = function(){
    $dataBooks.disableImagePreload();
};

Game_System.prototype.preloadBookImages = function(bookKey){
    $dataBooks.preloadBookImages(bookKey);
};

Game_System.prototype.getVisibleTextIndexes = function(book){
    return $dataBooks.getVisibleTextIndexes(book);
};

Game_System.prototype.addBookVisibleTextItem = function(book, index){
    $dataBooks.addVisibleText(book, index);
};

Game_System.prototype.addBookVisibleTextItemAt = function(book, index, position){
    $dataBooks.addVisibleTextAt(book, index, position);
};

Game_System.prototype.removeBookVisibleTextItem = function(book, index){
    $dataBooks.removeVisibleText(book, index);
};

Game_System.prototype.removeBookVisibleTextItemAt = function(book, position){
    $dataBooks.removeVisibleTextAt(book, position);
};

Game_System.prototype.clearBookVisibleTextItems = function(book){
    $dataBooks.clearVisibleText(book);
};

Game_System.prototype.replaceBookVisibleTextItems = function(book, index){
    $dataBooks.replaceVisibleText(book, index);
};

Game_System.prototype.createExportDummy = function(){
    var index = $dataMapInfos.length;
    var tmp_register = [];
    var dummy = {
        "autoplayBgm":false,"autoplayBgs":false,"battleback1Name":"","battleback2Name":"","bgm":{"name":"","pan":0,"pitch":100,"volume":90},"bgs":{"name":"","pan":0,"pitch":100,"volume":90},"disableDashing":false,"displayName":"","encounterList":[],"encounterStep":30,"height":1,"note":"","parallaxLoopX":false,"parallaxLoopY":false,"parallaxName":"","parallaxShow":true,"parallaxSx":0,"parallaxSy":0,"scrollType":0,"specifyBattleback":false,"tilesetId":1,"width":1,
        "data":[0,0,0,0,0,0],
        "events":[
            null
        ]
    };
    var event = {"id":1,"name":"EV001","note":"","pages":[{"conditions":{"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":false,"switch1Id":1,"switch1Valid":false,"switch2Id":1,"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0},"directionFix":false,"image":{"characterIndex":0,"characterName":"","direction":2,"pattern":0,"tileId":0},"list":[],"moveFrequency":3,"moveRoute":{"list":[{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false},"moveSpeed":3,"moveType":0,"priorityType":0,"stepAnime":false,"through":false,"trigger":0,"walkAnime":true}],"x":0,"y":0};
    for(var key in $dataBooks._inlineImageIndex){
        for(var i in $dataBooks._inlineImageIndex[key]){
            var image = $dataBooks._inlineImageIndex[key][i];
            var code = {};
            if(tmp_register.indexOf(image) <= 0){
                code = {"code":231,"indent":0,"parameters":[1,image,0,0,0,0,100,100,255,0]};
                event.pages[0].list.push(code);
                tmp_register.push(image);
            }
        }
    }
    event.pages[0].list.push({"code":0,"indent":0,"parameters":[]});
    dummy.events.push(event);

    var data = JSON.stringify(dummy);
    var fs = require('fs');
    var mapName = "data/Map";
    if(index < 10) mapName = mapName + "00" + index + ".json";
    else if(index < 100) mapName = mapName + "0" + index + ".json";
    else mapName = mapName + index + ".json";
    fs.writeFile(mapName, data);
    var fs = require('fs');
    try {
        var jsonString = fs.readFileSync('data/MapInfos.json');
        var readData = JSON.parse(jsonString)
        var pushData = {"id":index,"expanded":false,"name":"Dummy","order":3,"parentId":0,"scrollX":467.4,"scrollY":420};
        readData.push(pushData);
        var writeData = JSON.stringify(readData);
        fs.writeFile('data/MapInfos.json', writeData);
    } catch(err) {
        console.error(err)
        return
    }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

TAA.bm.alias.Window_MenuCommand = TAA.bm.alias.Window_MenuCommand || {};
TAA.bm.alias.Window_MenuCommand.addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function(){
    TAA.bm.alias.Window_MenuCommand.addOriginalCommands.call(this);
    if(TAA.bm.Parameters.Menu.MenuEntry && $gameSystem.isShowBookMenu()){
        if(this.findSymbol('books') <= -1){
            var command = TAA.bm.Parameters.Menu.Name;
            var enabled = $gameSystem.isBookMenuEnabled();
            this.addCommand(command, 'books', enabled);
        }
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

TAA.bm.alias.Game_Interpreter = TAA.bm.alias.Game_Interpreter || {};
TAA.bm.alias.Game_Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    TAA.bm.alias.Game_Interpreter.pluginCommand.call(this, command, args);
    if(command.toLowerCase() === 'openbookmenu'){
        SceneManager.push(Scene_BookMenu);
    }
    else if(command.toLowerCase() === 'readbook'){
        if(args[0] !== undefined){
            var markAsRead = true;
            if(args[1] !== undefined)
                markAsRead = !(args[1].toLowerCase() === "false")
            $gameSystem.readBook(args[0], markAsRead);
        }
    }
    else if(command.toLowerCase() === 'librarydata'){
        this.processBookPluginCommands(args);
    }
};

Game_Interpreter.prototype.processBookPluginCommands = function(args){
    if(args[0].toLowerCase() === 'menu'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'hide'){
            $gameSystem.setShowBookMenu(false);
        }
        else if(args[1].toLowerCase() === 'show'){
            $gameSystem.setShowBookMenu(true);
        }
        else if(args[1].toLowerCase() === 'enable'){
            $gameSystem.setEnableBookMenu(true);
        }
        else if(args[1].toLowerCase() === 'disable'){
            $gameSystem.setEnableBookMenu(false);
        }
    }
    else if(args[0].toLowerCase() === 'forget'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'book'){
            if(args[2] !== undefined){
                $gameSystem.forgetBook(args[2]);
            }
        }
        else if(args[1].toLowerCase() === 'books'){
            for(var i = 2; i < args.length; i++){
                if(args[i] !== undefined)
                    $gameSystem.forgetBook(args[i]);
            }
        }
        else if(args[1].toLowerCase() === 'category'){
            if(args[2] !== undefined){
                $gameSystem.forgetBooksByCategory(args[2]);
            }
        }
    }
    else if(args[0].toLowerCase() === 'learn'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'book'){
            if(args[2] !== undefined)
                $gameSystem.learnBook(args[2]);
        }
        else if(args[1].toLowerCase() === 'books'){
            for(var i = 2; i < args.length; i++){
                if(args[i] !== undefined)
                    $gameSystem.learnBook(args[i]);
            }
        }
        else if(args[1].toLowerCase() === 'category'){
            if(args[2] !== undefined){
                $gameSystem.learnBooksByCategory(args[2]);
            }
        }
    }
    else if(args[0].toLowerCase() === 'textupdate'){
        if(args[1] === undefined) return;
        var bookKey = args[1];
        var index;
        var position;
        if(args[2] === undefined) return;
        if(args[2].toLowerCase() === 'add'){
            if(!isNaN(args[3])){
                index = parseInt(args[3])
            }
            else if(args[3] && args[3].match(/v\[(\d)+\]/i)){
                if(parseInt(RegExp.$1) < 0) return;
                index = $gameVariables.value(RegExp.$1);
            }
            if(args[4] !== undefined && args[4].toLowerCase() === 'at'){
                if(!isNaN(args[5])){
                    position = parseInt(args[5]);
                }
                else if(args[5] && args[5].match(/v\[(\d+)\]/i)){
                    if(parseInt(RegExp.$1) < 0) return;
                    position = $gameVariables.value(RegExp.$1);
                }
                if(!isNaN(position))
                    $gameSystem.addBookVisibleTextItemAt(bookKey, index, position);
            }
            else{
                $gameSystem.addBookVisibleTextItem(bookKey, index);
            }
        }
        else if(args[2].toLowerCase() === 'remove'){
            if(!isNaN(args[3])){
                index = parseInt(args[3])
            }
            else if(args[3] && args[3].match(/v\[(\d)+\]/i)){
                if(parseInt(RegExp.$1) < 0) return;
                index = $gameVariables.value(RegExp.$1);
            }
            else if(args[3] !== undefined && args[3].toLowerCase() === 'at'){
                if(!isNaN(args[4])){
                    position = parseInt(args[4]);
                }
                else if(args[4] && args[4].match(/v\[(\d+)\]/i)){
                    if(parseInt(RegExp.$1) < 0) return;
                    position = $gameVariables.value(RegExp.$1);
                }
            }
            if(!isNaN(index))
                $gameSystem.removeBookVisibleTextItem(bookKey, index);
            if(!isNaN(position))
                $gameSystem.removeBookVisibleTextItemAt(bookKey, position);
        }
        else if(args[2].toLowerCase() === 'replace'){
            if(!isNaN(args[3])){
                index = parseInt(args[3]);
            }
            else if(args[3] && args[3].match(/v\[(\d)+\]/i)){
                if(parseInt(RegExp.$1) < 0) return;
                index = $gameVariables.value(RegExp.$1);
            }
            if(!isNaN(index))
                $gameSystem.replaceBookVisibleTextItems(bookKey, index);
        }
        else if(args[2].toLowerCase() === 'clear'){
            $gameSystem.clearBookVisibleTextItems(bookKey);
        }
    }
    else if(args[0].toLowerCase() === 'showcategories'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'on'){
            $gameSystem.setBookCategoriesVisibility(true);
        }
        else if(args[1].toLowerCase() === 'off'){
            $gameSystem.setBookCategoriesVisibility(false);
        }
    }
    else if(args[0].toLowerCase() === 'unreadbooks'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'hide'){
            $gameSystem.setUnreadBooksVisibility(true);
        }
        else if(args[1].toLowerCase() === 'show'){
            $gameSystem.setUnreadBooksVisibility(false);
        }
    }
    else if(args[0].toLowerCase() === 'titlebar'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'hide'){
            $gameSystem.setTitleBarVisibility(false);
        }
        else if(args[1].toLowerCase() === 'show'){
            $gameSystem.setTitleBarVisibility(true);
        }
    }
    else if(args[0].toLowerCase() === 'reset'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'all'){
            $gameSystem.resetLibrary();
        }
        if(args[1].toLowerCase() === 'booklist'){
            $gameSystem.resetLibraryBookList();
        }
        if(args[1].toLowerCase() === 'booksread'){
            $gameSystem.resetLibraryBooksRead();
        }
    }
    else if(args[0].toLowerCase() === 'preload'){
        if(args[1] === undefined) return;
        if(args[1].toLowerCase() === 'on' || args[1].toLowerCase() === 'true'){
            $gameSystem.enableBookImagePreload();
        }
        if(args[1].toLowerCase() === 'off' || args[1].toLowerCase() === 'false'){
            $gameSystem.disableBookImagePreload();
        }
        if(args[1].toLowerCase() === 'images' && args[2] !== undefined && args[2] !== ''){
            $gameSystem.preloadBookImages(args[2]);
        }
    }
};

//=============================================================================
// PluginManager
//=============================================================================

if(Utils.RPGMAKER_NAME === 'MZ'){
    PluginManager.registerCommand(TAA.bm.PluginName, 'bookMenu', args => {
        const command = (args.command) ? args.command.toLowerCase() : '';
        if(command === '') return;
        switch(command){
            case 'hide':
                $gameSystem.setShowBookMenu(false);
                break;
            case 'show':
                $gameSystem.setShowBookMenu(true);
                break;
            case 'enable':
                $gameSystem.setEnableBookMenu(true);
                break;
            case 'disable':
                $gameSystem.setEnableBookMenu(false);
                break;
        }
    });

    PluginManager.registerCommand(TAA.bm.PluginName, 'bookCommands', args =>{
        const command = (args.commandType) ? args.commandType.toLowerCase() : '';
        if(command === '' || args.bookList === undefined) return;
        var list = args.bookList.split(/\s*,\s*/gi);
        for(var i=0; i<list.length; i++){
            switch(command){
                case 'read':
                    $gameSystem.readBook(list[i], false);
                    break;
                case 'learn':
                    $gameSystem.learnBook(list[i]);
                    break;
                case 'read and learn':
                    $gameSystem.readBook(list[i], true);
                    break;
                case 'forget':
                    $gameSystem.forgetBook(list[i]);
                    break;
                case 'preload images':
                    $gameSystem.preloadBookImages(list[i]);
                    break;
            }
        }
    });

    PluginManager.registerCommand(TAA.bm.PluginName, 'textUpdate', args => {
        const bookKey = args.book;
        const command = (args.action) ? args.action.toLowerCase() : '';
        if(command === '') return;
        const index = !isNaN(args.index) ? parseInt(args.index) : undefined;
        const indexVar = (!isNaN(args.indexVar) && parseInt(args.indexVar) > 0) ? $gameVariables.value(args.indexVar) : undefined;
        if(isNaN(index) && isNaN(indexVar) && command !== clear && command !== 'remove') return;
        const position = !isNaN(args.position) ? parseInt(args.position) : undefined;
        const positionVar = !isNaN(args.positionVar) && parseInt(args.positionVar) > 0 ? $gameVariables.value(args.positionVar) : undefined;
        var idx = isNaN(indexVar) ? index : indexVar;
        var pst = isNaN(positionVar) ? position : positionVar;
        switch(command){
            case 'add':
                if(isNaN(pst))
                    $gameSystem.addBookVisibleTextItem(bookKey, idx);
                else
                    $gameSystem.addBookVisibleTextItemAt(bookKey, idx, pst);
                break;
            case 'remove':
                if(isNaN(pst) && !isNaN(idx))
                    $gameSystem.removeBookVisibleTextItem(bookKey, idx);
                else if(!isNaN(pst))
                    $gameSystem.removeBookVisibleTextItemAt(bookKey, pst);
                break;
            case 'replace':
                $gameSystem.replaceBookVisibleTextItems(bookKey, idx);
                break;
            case 'clear':
                $gameSystem.clearBookVisibleTextItems(bookKey);
                break;
        }
    });

    PluginManager.registerCommand(TAA.bm.PluginName, 'categoryCommands', args => {
        const command = (args.commandType) ? args.commandType.toLowerCase() : '';
        if(command === '' || args.categoryList === undefined) return;
        var list = args.categoryList.split(/\s*,\s*/gi);
        for(var i=0; i<list.length; i++){
            switch(command){
                case 'learn':
                    $gameSystem.learnBooksByCategory(list[i]);
                    break;
                case 'forget':
                    $gameSystem.forgetBooksByCategory(list[i]);
                    break;
            }
        }
    });

    PluginManager.registerCommand(TAA.bm.PluginName, 'bookList', args => {
        const feature = (args.feature) ? args.feature.toLowerCase() : '';
        if(feature === '' || !(['Enable', 'Disable'].contains(args.action))) return;
        var action = args.action === 'Enable';
        switch(feature){
            case 'show categories':
                $gameSystem.setBookCategoriesVisibility(action);
                break;
            case 'hide unread books':
                $gameSystem.setUnreadBooksVisibility(action);
                break;
            case 'show title bar':
                $gameSystem.setTitleBarVisibility(action);
                break;
            case 'preload inline images':
                if(action) 
                    $gameSystem.enableBookImagePreload()
                else 
                    $gameSystem.disableBookImagePreload();
                break;
        }
    });

    PluginManager.registerCommand(TAA.bm.PluginName, 'libraryReset', args => {
        const type = (args.type) ? args.type.toLowerCase() : '';
        if(type === '') return;
        switch(type){
            case 'all':
                $gameSystem.resetLibrary();
                break;
            case 'book list only':
                $gameSystem.resetLibraryBookList()
                break;
            case 'books read only':
                $gameSystem.resetLibraryBooksRead();
                break;
        }
    });
}

//=============================================================================
// Localize_Prep
//=============================================================================

function Localize_Prep(){
    this.initialize.apply(this, arguments);
}

Localize_Prep.prototype = Object.create(Game_Message.prototype);
Localize_Prep.prototype.constructor = Localize_Prep;

Localize_Prep.prototype.initialize = function(){
    Game_Message.prototype.initialize();
};

TAA.bm.alias.Localize_Prep = TAA.bm.alias.Localize_Prep || {};
TAA.bm.alias.Localize_Prep.add = Localize_Prep.prototype.add;
Localize_Prep.prototype.add = function(text){
    this.clear();
    TAA.bm.alias.Localize_Prep.add.call(this, text);
};

Localize_Prep.prototype.getText = function(){
    return this.allText();
};

//=============================================================================
// Window_BookList
//=============================================================================

function Window_BookList() {
    this.initialize.apply(this, arguments);
}

// For Luna Engine compatibility
if(TAA.bmle){
    Window_BookList.prototype = Object.create(Window_BookCommand.prototype);
}
else{
    Window_BookList.prototype = Object.create(Window_Command.prototype);
}

Window_BookList.prototype.constructor = Window_BookList;

Window_BookList.prototype.initialize = function(ttlw, txtw) {
    this._titleWindow = ttlw;
    this._textWindow = txtw;
    this._closedBookCategories = [];
    this._closedCategorySymbol = TAA.bm.Parameters.MenuListWindow['Closed Category Symbol'];
    this._openCategorySymbol = TAA.bm.Parameters.MenuListWindow['Opened Category Symbol'];
    this._categoryTextFormat = TAA.bm.Parameters.MenuListWindow['Category Text Format'] || "%1 %2 (%3)";
    this._closeCategoriesByDefault = JSON.parse(TAA.bm.Parameters.MenuListWindow['Load Closed Categories']);
    this._newSignSprites = [];
    if(this._closeCategoriesByDefault === true)
        this._closedBookCategories = $dataBooks._categoryList.slice();

    var x = eval(TAA.bm.Parameters.MenuListWindow.X) || 0;
    var y = eval(TAA.bm.Parameters.MenuListWindow.Y) || 0;

    if(Utils.RPGMAKER_NAME === 'MZ'){
        var width = Math.round(eval(TAA.bm.Parameters.MenuListWindow.Width));
        var height = Math.round(eval(TAA.bm.Parameters.MenuListWindow.Height));
        var rect = new Rectangle(x, y, width, height);
        Window_Command.prototype.initialize.call(this, rect);
    }
    else{
        // For Luna Engine compatibility
        if(TAA.bmle)
            Window_BookCommand.prototype.initialize.call(this, x, y);
        else
            Window_Command.prototype.initialize.call(this, x, y);
    }
    this.setStandardOpacity();    
    this.selectLast();
};

Window_BookList._lastCommandSymbol = null;

Window_BookList.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_BookList.prototype.setStandardOpacity = function() {
    var opacity = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Standard Opacity']));
    if(opacity === undefined) opacity = 255;
    this.opacity = opacity;
};

Window_BookList.prototype.windowWidth = function(){
    if(this._windowWidth === undefined){
        this._windowWidth = Math.round(eval(TAA.bm.Parameters.MenuListWindow.Width)) || Graphics.boxWidth * 1/3;
    }
    return this._windowWidth;
};

Window_BookList.prototype.windowHeight = function(){
    if(this._windowHeight === undefined){
        this._windowHeight = Math.round(eval(TAA.bm.Parameters.MenuListWindow.Height)) || Graphics.boxHeight;
    }
    return this._windowHeight;
};

Window_BookList.prototype.lineHeight = function() {
    if (this._windowLineHeight === undefined)
        this._windowLineHeight = parseInt(TAA.bm.Parameters.MenuListWindow['Line Height']) || 36;
    return this._windowLineHeight;
};

Window_BookList.prototype.standardFontFace = function() {
    if (this._windowFontFace === undefined)
        this._windowFontFace = TAA.bm.Parameters.MenuListWindow['Font Face'];
    return this._windowFontFace;
};
  
Window_BookList.prototype.standardFontSize = function() {
    if (this._windowFontSize === undefined) {
        this._windowFontSize = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Font Size'])) || 20;
    }
    return this._windowFontSize;
};

TAA.bm.alias.Window_BookList = TAA.bm.alias.Window_BookList || {};
TAA.bm.alias.Window_BookList.resetFontSettings = Window_BookList.prototype.resetFontSettings;
Window_BookList.prototype.resetFontSettings = function(){
    if(Utils.RPGMAKER_NAME === 'MZ'){
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
        this.resetTextColor();
    }
    else
        TAA.bm.alias.Window_BookList.resetFontSettings.call(this);
};
  
Window_BookList.prototype.standardPadding = function() {
    if (this._windowStandardPadding === undefined)
        this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Standard Padding']));
    return this._windowStandardPadding;
};
  
Window_BookList.prototype.textPadding = function() {
    if (this._windowTextPadding === undefined)
        this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Text Padding']));
    return this._windowTextPadding;
};
  
Window_BookList.prototype.standardBackOpacity = function() {
    if (this._windowBackOpacity === undefined)
        this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.MenuListWindow['Back Opacity']));
    return this._windowBackOpacity;
};

Window_BookList.prototype.numVisibleRows = function() {
    return this.maxItems();
};

if(Utils.RPGMAKER_NAME === 'MZ'){
    Window_BookList.prototype.itemRectForText = function(index){
        var rect = this.itemRect(index);
        rect.x += this.textPadding();
        rect.width -= this.textPadding() * 2;
        return rect;
    };
};

Window_BookList.prototype.preloadChangedTextMarkPicture = function(){
    var settings = TAA.bm.Parameters.MenuListWindow['Changed Book Marking'] ? JSON.parse(TAA.bm.Parameters.MenuListWindow['Changed Book Marking']) : undefined;
    if(!settings) return;
    if(settings['Mark Type'] !== 'Picture') return;
    var pictureSettings = settings['Picture Settings'] ? JSON.parse(settings['Picture Settings']) : undefined;
    if(!pictureSettings) return;
    if(!pictureSettings['Picture']) return;
    ImageManager.loadPicture(pictureSettings['Picture']);
};

Window_BookList.prototype.drawNewBookSign = function(x, y){
    if(TAA.bm.Parameters.MenuListWindow['Changed Book Indicator'] !== 'None'){
        var settings = TAA.bm.Parameters.MenuListWindow['Changed Book Marking'] ? JSON.parse(TAA.bm.Parameters.MenuListWindow['Changed Book Marking']) : undefined;
        if(!settings) return;
        switch(settings['Mark Type']){
            case 'Text':
                var textSettings = settings['Text Settings'] ? JSON.parse(settings['Text Settings']) : undefined;
                if(!textSettings) return;
                var previousFont = this.contents.fontFace;
                var previousFontSize = this.contents.fontSize;
                var previousColor = this.contents.textColor;
                this.contents.fontFace = textSettings['Font Face'] ? textSettings['Font Face'] : previousFont;
                this.contents.fontSize = !isNaN(textSettings['Font Size']) ? parseInt(textSettings['Font Size']) : previousFontSize;
                if(Utils.RPGMAKER_NAME === 'MZ')
                    this.contents.textColor = !isNaN(textSettings['Text Color']) ? ColorManager.textColor(parseInt(textSettings['Text Color'])) : previousColor;
                else
                    this.contents.textColor = !isNaN(textSettings['Text Color']) ? this.textColor(parseInt(textSettings['Text Color'])) : previousColor;
                var indent = !isNaN(TAA.bm.Parameters.MenuListWindow["Book Indent"]) ? parseInt(TAA.bm.Parameters.MenuListWindow["Book Indent"]) : 0;
                switch(textSettings['Position']){
                    case 'Upper Left':
                        x = (x - indent) < 0 ? this.x : (x - indent);
                        y -= Math.floor(this.itemHeight() * 0.4);
                        break;
                    case 'Lower Left':
                        x = (x - indent) < 0 ? this.x : (x - indent);
                        y += Math.floor(this.itemHeight() * 0.3);
                        break;
                    case 'Upper Center':
                        x = Math.floor((this.windowWidth() - this.standardPadding() * 2 - this.textWidth(textSettings['Text'])) / 2);
                        y -= Math.floor(this.itemHeight() * 0.4);
                        break;
                    case 'Lower Center':
                        x = Math.floor((this.windowWidth() - this.standardPadding() * 2 - this.textWidth(textSettings['Text'])) / 2);
                        y += Math.floor(this.itemHeight() * 0.3);
                        break;
                    case 'Upper Right':
                        x = this.windowWidth() - this.standardPadding()*2 - this.textWidth(textSettings['Text']);
                        y -= Math.floor(this.itemHeight() * 0.4);
                        break;
                    case 'Lower Right':
                        x = this.windowWidth() - this.standardPadding()*2 - this.textWidth(textSettings['Text']);
                        y += Math.floor(this.itemHeight() * 0.3);
                        break;
                }
                this.drawText(textSettings['Text'], x, y, this.windowWidth() - 2*this.standardPadding(), 'left');
                this.contents.fontFace = previousFont;
                this.contents.fontSize = previousFontSize;
                this.contents.textColor = previousColor;
                break;
            case 'Icon':
                var iconSettings = settings['Icon Settings'] ? JSON.parse(settings['Icon Settings']) : undefined;
                if(!iconSettings) return;
                // For Luna Engine compatibility
                let iconWidth = (TAA.bmle) ? Window_BookBase._iconWidth : Window_Base._iconWidth
                switch(iconSettings['Position']){
                    case 'Left':
                        x = this.x;
                        break;
                    case 'Center':
                        x = Math.floor((this.windowWidth() - iconWidth) / 2);
                        break;
                    case 'Right':
                        x = this.windowWidth() - 2*this.standardPadding() - iconWidth;
                        break;
                }
                this.drawIcon(parseInt(iconSettings['Icon']), x, y);
                break;
            case 'Picture':
                var pictureSettings = settings['Picture Settings'] ? JSON.parse(settings['Picture Settings']) : undefined;
                if(!pictureSettings) return;
                if(!pictureSettings['Picture']) return;
                var img = ImageManager.loadPicture(pictureSettings['Picture']);
                var dw = img.width;
                var dh = img.height;
                if(img.width > this.windowWidth() || img.height > this.itemHeight()){
                    var proportion = this.windowWidth() / img.width > this.itemHeight() / img.height ? this.itemHeight() / img.height : this.windowWidth() / img.width;
                    dw = Math.floor(img.width * proportion);
                    dh = Math.floor(img.height * proportion);
                }
                var indent = !isNaN(TAA.bm.Parameters.MenuListWindow["Book Indent"]) ? parseInt(TAA.bm.Parameters.MenuListWindow["Book Indent"]) : 0;
                switch(pictureSettings['Position']){
                    case 'Upper Left':
                        x = (x - indent) < 0 ? this.x : (x - indent);
                        y -= Math.floor(this.itemHeight() * 0.4);
                        break;
                    case 'Lower Left':
                        x = (x - indent) < 0 ? this.x : (x - indent);
                        y += Math.floor(this.itemHeight() * 0.3);
                        break;
                    case 'Upper Center':
                        x = Math.floor((this.windowWidth() - this.standardPadding() * 2 - dw) / 2);
                        y -= Math.floor(this.itemHeight() * 0.4);
                        break;
                    case 'Lower Center':
                        x = Math.floor((this.windowWidth() - this.standardPadding() * 2 - dw) / 2);
                        y += Math.floor(this.itemHeight() * 0.3);
                        break;
                    case 'Upper Right':
                        x = this.windowWidth() - this.standardPadding()*2 - dw;
                        y -= Math.floor(this.itemHeight() * 0.4);
                        break;
                    case 'Lower Right':
                        x = this.windowWidth() - this.standardPadding()*2 - dw;
                        y += Math.floor(this.itemHeight() * 0.3);
                        break;
                }
                this.contents.blt(img, 0, 0, img.width, img.height, x, y, dw, dh);
                break;
        }
    }
};

Window_BookList.prototype.drawItem = function(index){
    var rect = this.itemRectForText(index);
    var text = this.commandName(index);
    var symbol = this.commandSymbol(index);
    var isNew = false;
    var ext = this._list[index].ext;
    if(symbol === 'category'){
        var align = TAA.bm.Parameters.MenuListWindow["Category Alignment"] || 'left';
        isNew = $dataBooks.isCategoryChanged(ext);
    }
    else{
        var align = TAA.bm.Parameters.MenuListWindow["Book Alignment"] || 'left';
        var indent = Math.round(eval(TAA.bm.Parameters.MenuListWindow["Book Indent"])) || 16;
        rect.x += indent;
        rect.width -= indent;
        isNew = $dataBooks.isBookChanged(ext);
    }
    var wx = this.getAlignedX(text, rect, align);
    if(Utils.RPGMAKER_NAME === 'MZ')
        var y = rect.y + Math.floor((this.lineHeight() - this.itemPadding() - this.standardFontSize())/2);
    else
        var y = rect.y + Math.floor((this.itemHeight() - this.contents.fontSize - 8)/2);
    this.drawTextEx(text, wx, y);
    if(isNew)
        this.drawNewBookSign(wx, y);
};

Window_BookList.prototype.getAlignedX = function(text, rect, align){
    var wx = 0;
    var ww = rect.width;
    if(align === 'left'){
        wx = rect.x;
    }
    else if(align === 'center'){
        wx += (ww - this.drawTextEx(text)) / 2;
    }
    else{
        wx += ww - this.drawTextEx(text) - this.textPadding();
    }
    return wx;
};

Window_BookList.prototype.currentExt = function(){
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        return this._forcedExt || Window_BookCommand.prototype.currentExt.call(this);
    else
        return this._forcedExt || Window_Command.prototype.currentExt.call(this);
};

Window_BookList.prototype.makeCommandList = function() {
    this.addBookList();
    this.initCursor();
};

Window_BookList.prototype.addBookList = function(){
    var listCategory;
    TAA.bm.functions.log(4, "Window_BookList: Starting addBookList loop");
    for(var cat in $dataBooks._bookKeyByCategory){
        var category = this.convertEscapeCharacters(cat);
        if($gameSystem.isBookCategoriesVisible())
            listCategory = true; // ensures category is listed
        else
            listCategory = false; // prevents the category from being listed

        for(var k=0; k < $dataBooks._bookKeyByCategory[cat].length; k++){
            // if the specified id in undefined, skip to the next element
            if($dataBooks._bookKeyByCategory[cat][k] === undefined) 
                continue;

            if(($dataBooks._booksRead[cat] && $dataBooks._booksRead[cat].contains($dataBooks._bookKeyByCategory[cat][k])) || !$gameSystem.isUnreadBooksHidden()){
                if(listCategory){
                    if(this._closedBookCategories.contains(category)){
                        var closed = this._closedCategorySymbol + " ";
                    }
                    else{
                        var closed = this._openCategorySymbol + " ";
                    }

                    if(!$gameSystem.isUnreadBooksHidden()){
                        var bookCount = $dataBooks._bookKeyByCategory[cat].filter(function(value){ return value !== undefined && value !== null }).length;
                    }
                    else{
                        var bookCount = $dataBooks._booksRead[cat].length;
                    }

                    var text = this.prepareCategoryText(category, closed, bookCount);

                    this.addCommand(text, 'category', true, category);
                    listCategory = false;
                }
                if(!$gameSystem.isBookCategoriesVisible()){
                    this.addBookItem($dataBooks._bookKeyByCategory[cat][k]);
                }

                if(!this._closedBookCategories.contains(category)){
                    this.addBookItem($dataBooks._bookKeyByCategory[cat][k]);
                }
            }
        }
    }
    
    TAA.bm.functions.log(4, "Window_BookList: addBookList loop end");
};

Window_BookList.prototype.addBookItem = function(item){
    var title = this.convertEscapeCharacters($dataBooks.getBookTitle(item));
    if(item !== undefined)
        this.addCommand(title, 'book', true, item);
};

Window_BookList.prototype.initCursor = function() {
    if(Window_BookList._lastCommandSymbol === undefined && this._list.length > 0){
        Window_BookList._lastCommandSymbol = this._list[0];
        this.selectSymbol(Window_BookList._lastCommandSymbol);
    }
};

Window_BookList.prototype.prepareCategoryText = function(category, closed, count){
    var text = this._categoryTextFormat.replace(/%1/g, closed);
    text = text.replace(/%2/g, category);
    text = text.replace(/%3/g, count);
    return text;
};

Window_BookList.prototype.selectLast = function() {
    this.selectSymbol(Window_BookList._lastCommandSymbol);
};

Window_BookList.prototype.update = function(){
    TAA.bm.functions.log(4, "Window_BookList: Starting bookList update");
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Window_BookCommand.prototype.update.call(this);
    else
        Window_Command.prototype.update.call(this);
    if(this._textWindow){
        if(this.currentSymbol() === 'book'){
            TAA.bm.functions.log(4, "Window_BookList: Selecting Book on text window");
            this._textWindow.setBook(this.currentExt(), true);
        }
        else{
            TAA.bm.functions.log(4, "Window_BookList: Deselecting book on text window");
            this._textWindow.setBook(undefined, true);
        }
        if(this._textWindow.isBookStatusChanged()){
            this.refresh();
            this._textWindow.clearBookStatusChange();
        }
    }
    if(this._titleWindow){
        if(this.currentSymbol() === 'book'){
            TAA.bm.functions.log(4, "Window_BookList: Setting the title window text");
            this._titleWindow.setBook(this.currentExt());
        }
        else{
            TAA.bm.functions.log(4, "Window_BookList: Clearing title window text");
            this._titleWindow.setBook(undefined);
        }
    }
    TAA.bm.functions.log(4, "Window_BookList: BookList update end");
};

Window_BookList.prototype.categoryToggle = function(category){
    TAA.bm.functions.log(4, "Window_BookList: categoryToggle start");
    if(this._closedBookCategories.contains(category)){
        var index = this._closedBookCategories.indexOf(category);
        this._closedBookCategories.splice(index, 1);
    }
    else{
        this._closedBookCategories.push(category);
    }
    TAA.bm.functions.log(4, "Window_BookList: categoryToggle end. Triggering refresh...");
    this.refresh();
};

Window_BookList.prototype.getVisibleRows = function() {
    var value = this.height - (this.standardPadding() * 2);
    value = Math.floor(value / this.lineHeight());
    return value;
};

Window_BookList.prototype.isInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput._mouseOverX);
    var y = this.canvasToLocalY(TouchInput._mouseOverY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_BookList.prototype.processWheel = function() {
    if (!this.isInsideFrame()) return;
        var threshold = 20;
    if (TouchInput.wheelY >= threshold) this.scrollDown();
    if (TouchInput.wheelY <= -threshold) this.scrollUp();
};
  
Window_BookList.prototype.loadWindowskin = function() {
    var windowSkin = TAA.bm.Parameters.MenuListWindow['Window Skin'];
    TAA.bm.functions.log(2, "Window Skin: " + windowSkin);
    this._windowskin = ImageManager.loadSystem(windowSkin);
};

//=============================================================================
// Window_BookTitle
//=============================================================================

function Window_BookTitle() {
    this._isBookScene = arguments[3];
    this._bookKey = undefined;
    this.initialize.apply(this, arguments);
};

// For Luna Engine compatibility
if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
    Window_BookTitle.prototype = Object.create(Window_BookBase.prototype);
else
    Window_BookTitle.prototype = Object.create(Window_Base.prototype);
Window_BookTitle.prototype.constructor = Window_BookTitle;

Window_BookTitle.prototype.initialize = function(x, y, width) {
    if(this._isBookScene)
        var height = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Height)) || this.fittingHeight(1);
    else{
        var height = this.fittingHeight(1);
    }
    if(Utils.RPGMAKER_NAME === 'MZ'){
        var rect = new Rectangle(x, y, width, height);
        Window_Base.prototype.initialize.call(this, rect);
    }
    else{
        // For Luna Engine compatibility
        if(TAA.bmle)
            Window_BookBase.prototype.initialize.call(this, x, y, width, height);
        else
            Window_Base.prototype.initialize.call(this, x, y, width, height);
    }
    this.setStandardOpacity();
    this.refresh();
};

Window_BookTitle.prototype.setBook = function(bookKey) {
    if(this._bookKey !== bookKey){
        this._bookKey = bookKey;
        this.refresh();
    }
};
  
Window_BookTitle.prototype.setStandardOpacity = function() {
    if(this._isBookScene)
        var opacity = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Standard Opacity']));
    else
        var opacity = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Standard Opacity']));
    if(opacity === undefined) opacity = 255;
    this.opacity = opacity;
};

Window_BookTitle.prototype.refresh = function() {
    this.contents.clear();
    if(this.contentsBack) this.contentsBack.clear();
    if(this._isBookScene)
        var align = TAA.bm.Parameters.DetachedTitleWindow['Text Alignment'];
    else
        var align = TAA.bm.Parameters.MenuTitleWindow['Text Alignment'];
    
    if(this._bookKey){
        this.drawBookTitle(align);
    }
    else{
        this.drawEmptyTitle(align);
    }
};

Window_BookTitle.prototype.drawBookTitle = function(align){
    var wx = this.getAlignedX($dataBooks.getBookTitle(this._bookKey), align);
    var title = "\\C[" + $dataBooks.getBookTitleColor(this._bookKey) + "]" + $dataBooks.getBookTitle(this._bookKey) + "\\C[0]";
    this.drawTextEx(title, wx, 0);
};

Window_BookTitle.prototype.drawEmptyTitle = function(align){
    var wx = this.getAlignedX(TAA.bm.Parameters.MenuTitleWindow['Empty Title Text'], align);
    this.drawTextEx(TAA.bm.Parameters.MenuTitleWindow['Empty Title Text'], wx, 0);
};

Window_BookTitle.prototype.getAlignedX = function(text, align){
    var wx = 0;
    var ww = this.contents.width;
    if(align === 'left'){
        wx = this.textPadding();
    }
    else if(align === 'center'){
        wx += (ww - this.drawTextEx(text, 0, this.contents.height)) / 2;
    }
    else{
        wx += ww - this.drawTextEx(text) - this.textPadding();
    }
    return wx;
};

Window_BookTitle.prototype.lineHeight = function() {
    if (this._windowLineHeight === undefined) {
        if(this._isBookScene)
            this._windowLineHeight = parseInt(TAA.bm.Parameters.DetachedTitleWindow['Line Height']) || 36;
        else
            this._windowLineHeight = parseInt(TAA.bm.Parameters.MenuTitleWindow['Line Height']) || 36;
    }
    
    return this._windowLineHeight;
};

Window_BookTitle.prototype.standardFontFace = function() {
    if (this._windowFontFace === undefined) {
        if(this._isBookScene)
            this._windowFontFace = TAA.bm.Parameters.DetachedTitleWindow['Font Face'];
        else
            this._windowFontFace = TAA.bm.Parameters.MenuTitleWindow['Font Face'];
    }
    return this._windowFontFace;
};
  
Window_BookTitle.prototype.standardFontSize = function() {
    if (this._windowFontSize === undefined) {
        if(this._isBookScene)
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Font Size'])) || 20;
        else
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Font Size'])) || 20;
    }
    return this._windowFontSize;
};

TAA.bm.alias.Window_BookTitle = TAA.bm.alias.Window_BookTitle || {};
TAA.bm.alias.Window_BookTitle.resetFontSettings = Window_BookTitle.prototype.resetFontSettings;
Window_BookTitle.prototype.resetFontSettings = function(){
    if(Utils.RPGMAKER_NAME === 'MZ'){
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
        this.resetTextColor();
    }
    else
        TAA.bm.alias.Window_BookTitle.resetFontSettings.call(this);
};
  
Window_BookTitle.prototype.standardPadding = function() {
    if (this._windowStandardPadding === undefined) {
        if(this._isBookScene)
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Standard Padding']));
        else
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Standard Padding']));
    }
    return this._windowStandardPadding;
};
  
Window_BookTitle.prototype.textPadding = function() {
    if (this._windowTextPadding === undefined) {
        if(this._isBookScene)
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Text Padding']));
        else
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Text Padding']));
    }
    return this._windowTextPadding;
};
  
Window_BookTitle.prototype.standardBackOpacity = function() {
    if (this._windowBackOpacity === undefined) {
        if(this._isBookScene)
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow['Back Opacity']));
        else
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow['Back Opacity']));
    }
    return this._windowBackOpacity;
};
  
Window_BookTitle.prototype.loadWindowskin = function() {
    if(this._isBookScene)
        var windowSkin = TAA.bm.Parameters.DetachedTitleWindow['Window Skin'];
    else
        var windowSkin = TAA.bm.Parameters.MenuTitleWindow['Window Skin'];
    this._windowskin = ImageManager.loadSystem(windowSkin);
};


//=============================================================================
// Window_BookText
//=============================================================================

function Window_BookText() {
    this._isBookScene = arguments[4];
    this._bookKey = undefined;
    this.initialize.apply(this, arguments);
};

// For Luna Engine compatibility
if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
    Window_BookText.prototype = Object.create(Window_BookSelectable.prototype);
else
    Window_BookText.prototype = Object.create(Window_Selectable.prototype);
Window_BookText.prototype.constructor = Window_BookText;

Window_BookText.prototype.initialize = function(x, y, width, height) {
    this._freezeFrames = 0;
    this._allTextHeight = 0;
    this._prepareToPrint = true;
    this._triggeredImgPreload = false;
    this._printableObjects = [];
    this._imgCount = 0;
    if(this._isBookScene)
        this._bookTextFormat = TAA.bm.Parameters.DetachedTextWindow['Book Text Format'] || "%3";
    else
        this._bookTextFormat = TAA.bm.Parameters.MenuTextWindow['Book Text Format'] || "%3";
    this._breakBeforeImage = TAA.bm.Parameters.Misc['Break Before Image'];
    if(this._breakBeforeImage === undefined) this._breakBeforeImage = false;
    this._forceImgIntoWindow = TAA.bm.Parameters.Misc['Force Image Into Window'];
    if(this._forceImgIntoWindow === undefined) this._forceImgIntoWindow = true;
    this._windowWidth = width;
    this._windowHeight = height;
    this._touchOriginY = undefined;
    this._bookStatusChanged = false;
    if(Utils.RPGMAKER_NAME === 'MZ'){
        var rect = new Rectangle(x, y, width, height);
        Window_Selectable.prototype.initialize.call(this, rect);
    }
    else{
        // For Luna Engine compatibility
        if(TAA.bmle)
            Window_BookSelectable.prototype.initialize.call(this, x, y, width, height);
        else
            Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    }

    // Localization workaround
    this._localizePrep = new Localize_Prep();

    this.setStandardOpacity();
    this.refresh();
};

Window_BookText.prototype.windowWidth = function(){
    return this._windowWidth;
};

Window_BookText.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_BookText.prototype.standardFontFace = function() {
    if (this._windowFontFace === undefined) {
        if(this._isBookScene)
            this._windowFontFace = TAA.bm.Parameters.DetachedTextWindow['Font Face'];
        else
            this._windowFontFace = TAA.bm.Parameters.MenuTextWindow['Font Face'];
    }
    return this._windowFontFace;
};
  
Window_BookText.prototype.standardFontSize = function() {
    if (this._windowFontSize === undefined) {
        if(this._isBookScene)
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Font Size']));
        else
            this._windowFontSize = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Font Size']));
    }
    return this._windowFontSize;
};

TAA.bm.alias.Window_BookText = TAA.bm.alias.Window_BookText || {};
TAA.bm.alias.Window_BookText.resetFontSettings = Window_BookText.prototype.resetFontSettings;
Window_BookText.prototype.resetFontSettings = function(){
    if(Utils.RPGMAKER_NAME === 'MZ'){
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
        this.resetTextColor();
    }
    else
        TAA.bm.alias.Window_BookText.resetFontSettings.call(this);
};

Window_BookText.prototype.delayLoadFrames = function() {
    this._delayLoad = 30;
    return this._delayLoad;
};

Window_BookText.prototype.setBook = function(book, delay){
    if(this._bookKey !== book){
        this._triggeredImgPreload = false;
        this.preloadInlineImages(book);
        this._prepareToPrint = true;
        this._bookKey = book;
        if(delay)
            this._freezeFrames = 30;
        this.refresh();
    }
};

Window_BookText.prototype.imgExists = function(file){
    return $dataBooks.imgExists(file);
};

Window_BookText.prototype.preloadInlineImages = function(book){
    if(!$dataBooks.imagePreloadingEnabled()) return;

    $dataBooks.preloadBookImages(book);
    this._triggeredImgPreload = true;
};
  
Window_BookText.prototype.setStandardOpacity = function() {
    if(this._isBookScene)
        var opacity = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Standard Opacity']));
    else
        var opacity = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Standard Opacity']));
    if(opacity === undefined) opacity = 255;
    this.opacity = opacity;
};

Window_BookText.prototype.refresh = function() {
    TAA.bm.functions.log(4, "Window_BookText: Starting refresh.");
    if(this._freezeFrames > 0)
        return;
    TAA.bm.functions.log(4, "Window_BookText: Clearing contents...");
    this.contents.clear();
    if(this.contentsBack) this.contentsBack.clear();
    TAA.bm.functions.log(4, "Window_BookText: Updating originY and textHeight");
    this.origin.y = 0;
    this._scrollY = 0;
    this._allTextHeight = 0;
    TAA.bm.functions.log(4, "Window_BookText: Verifying book content...");
    if(this._bookKey && this._bookKey !== ""){
        TAA.bm.functions.log(4, "Window_BookText: Preparing book...");
        if(this._prepareToPrint) this.prepareBookText(this._bookKey);
        TAA.bm.functions.log(4, "Window_BookText: Drawing objects...");
        this.drawPrintableObjects();
        $dataBooks.markBookAsNotChanged(this._bookKey);
        this._bookStatusChanged = true;
        TAA.bm.functions.log(4, "Window_BookText: Refresh finished.");
    }
    else{
        this.drawEmptyBook();
    }
};

Window_BookText.prototype.isBookStatusChanged = function(){
    return this._bookStatusChanged;
};

Window_BookText.prototype.clearBookStatusChange = function(){
    this._bookStatusChanged = false;
};

TAA.bm.alias.WindowSelectable = TAA.bm.alias.WindowSelectable || {};
// For Luna Engine compatibility
TAA.bm.alias.WindowSelectable.createContents = (TAA.bmle && Utils.RPGMAKER_NAME === 'MV') ? Window_BookSelectable.prototype.createContents : Window_Selectable.prototype.createContents;
Window_BookText.prototype.createContents = function() {
    TAA.bm.functions.log(4, "Window_BookText: createContents start");
    var currentY = 0;
    for(var i=0; i< this._printableObjects.length; i++){
        var obj = this._printableObjects[i];
        var position = undefined;
        switch(obj.type){
            case "text":
                obj.y = currentY;
                if(i === (this._printableObjects.length-1))
                    obj.content += '\n';
                if(i > 0 && this._printableObjects[i-1].type === 'inline_image'){
                    var fixAlign = this.alignTextToInlineImage(this._printableObjects[i-1]);
                    if(fixAlign !== undefined && fixAlign < this.width){
                        obj.content = fixAlign + obj.content;
                        obj.fixY = obj.y - Math.round(this.lineHeight() * 8/10);
                        currentY = obj.fixY;
                    }                    
                }
                if(i < this._printableObjects.length && this._breakBeforeImage) 
                    obj.content += '\n';
                obj.textState = this.setupTextState(obj.content);
                this._allTextHeight += obj.textState.estimatedHeight + this.lineHeight() * 2;
                currentY += obj.textState.estimatedHeight;
                break;
            case "inline_image":
                if(obj.content && obj.content.isReady()){
                    position = this.getImagePosition(obj.content, obj.dw, obj.dh, 'left');
                }
            case "resized_image":
                if(obj.content && obj.content.isReady()){
                    position = position || this.getImagePosition(obj.content, obj.dw, obj.dh, 'center');
                }
            case "image":
                if(obj.content && obj.content.isReady()){
                    position = position || this.getImagePosition(obj.content, undefined, undefined, 'center');
                    position.y = currentY;
                    if(position.dh === undefined){
                        position.dh = position.h;
                        position.dw = position.w;
                    }
                    
                    currentY += position.dh;
                    this._allTextHeight += position.dh;
                    obj.position = position;
                }
                break;
            default:
                console.error("Content type unknown");
        }
        if(this._allTextHeight - currentY > (this.lineHeight() * 2)){
            currentY += (this._allTextHeight - currentY - 2*this.lineHeight());
        }
        this._printableObjects[i] = obj;
    }
    var fix = Math.pow( 2, Math.round( Math.log( this._allTextHeight ) / Math.log( 2 ) ) );
    if(fix < this._allTextHeight) this._allTextHeight = fix * 2;
    else this._allTextHeight = fix;
    TAA.bm.alias.WindowSelectable.createContents.call(this);
    TAA.bm.functions.log(4, "Window_BookText: createContents end");
};

Window_BookText.prototype.alignTextToInlineImage = function(imgObj){
    var align = "";
    if(imgObj.position && imgObj.position.dw && ((imgObj.printed && imgObj.printed === true) || imgObj.printed === undefined)){
        do{
            align += " ";
        } while(this.drawTextEx(align, 0, 0) < imgObj.position.dw);    
    }
    return align;
};

Window_BookText.prototype.drawPrintableObjects = function(){
    TAA.bm.functions.log(4, "Window_BookText: starting drawPrintableObjects");
    this.createContents();
    TAA.bm.functions.log(4, "Window_BookText: Starting print loop...");
    this._allTextHeight = 0;
    var currentY = 0;
    for(var i=0; i< this._printableObjects.length; i++){
        var obj = this._printableObjects[i];
        switch(obj.type){
            case "text":
                TAA.bm.functions.log(4, "Window_BookText: Drawing text object...");
                if(obj.fixY && obj.fixY > 0){
                    obj.y = obj.fixY;
                }
                if(i > 0 && this._printableObjects[i-1].type === 'inline_image') 
                    currentY -= Math.round(this.lineHeight() * 4/5);
                if(obj.y !== currentY){
                    obj.y = currentY;
                }
                var tmpY = this.drawBookTextEx(obj.textState, this.textPadding(), obj.y);
                obj.printed = true;
                currentY += tmpY;
                break;
            case "inline_image":
            case "resized_image":
            case "image":
                if(obj.content && obj.content.isReady()) {
                    TAA.bm.functions.log(4, "Window_BookText: Drawing image...");
                    this._allTextHeight += obj.position.dh + this.lineHeight();
                    if(obj.position.y < currentY){
                        obj.position.y = currentY;
                    }
                    obj.position.y = currentY;
                    this.drawPicture(obj.content, obj.position);
                    obj.printed = true;
                    currentY += obj.position.dh;
                }
                break;
            default:
                console.error("Content type unknown");
        }
    }
    this._allTextHeight += this.lineHeight();
    TAA.bm.functions.log(4, "Window_BookText: drawPrintableObjects end.");
};

Window_BookText.prototype.prepareBookText = function(bookKey){
    let text = "";
    let title = $dataBooks.getBookTitle(bookKey);
    let category = $dataBooks.getBookCategory(bookKey);
    let bookText = $dataBooks.getBookText(bookKey);
    // Handling localization: START
    if(TAA.bm.Parameters.SourceType === 'JSON File' && TAA.bm.Parameters.JsonConfig.Type === 'Localization File'){
        this._localizePrep.add(title);
        title = this._localizePrep.getText();
        
        this._localizePrep.add(category);
        category = this._localizePrep.getText();
        
        this._localizePrep.add(bookText);
        bookText = this._localizePrep.getText();
    }
    // Handling localization: END

    text = this._bookTextFormat.replace(/%1/g, title);
    text = text.replace(/%2/g, category);
    text = text.replace(/%3/g, bookText);

    this.preparePrintableObjects(text);
    this._prepareToPrint = false;
};

Window_BookText.prototype.preparePrintableObjects = function(text){
    this._printableObjects = [];
    var splitArray = text.split(/(\%(?:in_)?img\(\s*["'][^"']+["']\s*(?:,\s*[0-9\.]+\s*,\s*[0-9\.]+)?\s*\))/gm);
    
    for(var i=0; i < splitArray.length; i++){
        var object = {};
        if(splitArray[i].match(/\%img\(\s*["']([^"']+)["']\s*(?:,\s*([0-9\.]+)\s*,\s*([0-9\.]+))?\s*\)/gm)){
            // If we get a match, this is an image tag.
            // In this case we gather the info and request the
            // image to be loaded
            var fileName = RegExp.$1;
            if(RegExp.$2 && RegExp.$3){
                object.type = "resized_image";
                object.dw = parseFloat(RegExp.$2);
                object.dh = parseFloat(RegExp.$3);
            }
            else{
                object.type = "image";
            }
            this._printableObjects.push(object);
            this.loadPicture(fileName, object);
        }
        else if(splitArray[i].match(/\%in_img\(\s*["']([^"']+)["']\s*(?:,\s*([0-9\.]+)\s*,\s*([0-9\.]+))?\s*\)/gm)){
            // If we get a match, this is an inline image tag.
            // For now, only left margin inline images are supported. Text
            // will follow the bottom of the image
            var fileName = RegExp.$1;
            object.type = "inline_image";
            if(RegExp.$2 && RegExp.$3){
                object.dw = parseFloat(RegExp.$2);
                object.dh = parseFloat(RegExp.$3);
            }
            this._printableObjects.push(object);
            this.loadPicture(fileName, object);
        }
        else if(splitArray[i] !== undefined && splitArray[i] !== ""){
            // if the pattern is not found, this is not an image.
            // Just push the text into the printable array
            object.type = "text";
            object.content = splitArray[i];
            this._printableObjects.push(object);
        }
    }
};

Window_BookText.prototype.drawEmptyBook = function(){
    var text = TAA.bm.Parameters.MenuTextWindow['Empty Book Text'] || "";
    if(text === undefined || text === "") return;
    var textState = this.setupTextState(text);
    this.drawBookTextEx(textState, 0, 0);
};

Window_BookText.prototype.getImagePosition = function(bitmap, dw, dh, align){
    var position = {};
    position.x = 0;
    position.w = bitmap.width;
    position.h = bitmap.height;
    var width = bitmap.width;
    var height = bitmap.height;
    if(dw !== undefined && dw > 0){
        width = Math.round(width * (dw/100));
        position.dw = width;
    }
    if(dh !== undefined && dh > 0){
        height = Math.round(height * (dh/100));
        position.dh = height;
    }
    if(width <= this.width){
        if(align === 'center') position.x = Math.round((this.width - width)/2);
    }
    else if(this._forceImgIntoWindow){
        position.x = 0;
        position.dw = this.width - this.standardPadding() * 2;
        position.dh = Math.round((this.width/width) * height);
    }
    return position;
};

Window_BookText.prototype.drawPicture = function(bitmap, position){
    this.contents.blt(bitmap, 0, 0, position.w, position.h, position.x, position.y, position.dw, position.dh);
};

Window_BookText.prototype.loadPicture = function(filename, printableObj) {
    var index = this._printableObjects.indexOf(printableObj);
    if(index < 0) return;

    if($dataBooks._preloadedImages[filename] !== undefined || this._triggeredImgPreload)
        printableObj.content = $dataBooks._preloadedImages[filename];
    else{
        if(!this.imgExists(filename)){
            console.error("Image file '" + filename + "' could not be located.");
            this._printableObjects[index].printed = true;
            return;
        }
        printableObj.content = ImageManager.loadBitmap($dataBooks.inlineImageFolder(), filename, undefined, true);
    }
    if(!printableObj.content) return;
    this._printableObjects[index] = printableObj;
    this._imgCount++;
    if (this._printableObjects[index].content.isReady()){
        return;
    }
     
    this._printableObjects[index].content.addLoadListener(this.processLoadedImages.bind(this));
};

Window_BookText.prototype.processLoadedImages = function(){
    this._imgCount--;
    if(this._imgCount <= 0)
        this.forceRefresh();
};

Window_BookText.prototype.forceRefresh = function(){
    this._freezeFrames = 0;
    this.refresh();
};

Window_BookText.prototype.isObjectPrintNeeded = function(index){
    if(this._printableObjects && this._printableObjects[index] && this._printableObjects[index].printed)
        return !this._printableObjects[index].printed;
    else
        return false;
};

Window_BookText.prototype.drawBookTextEx = function(textState, x, y){
    TAA.bm.functions.log(4, "Window_BookText: Starting drawBookTextEx...");
    if(textState){
        textState.x = x;
        textState.y = y;
        textState.left = x;
        textState.index = 0;
        textState.height = this.calcTextHeight(textState, false);
        this.resetFontSettings();
        if(Imported !== undefined && Imported.RS_MessageAlign === true){
            this.doFirstLineAlign(textState);
        }
        TAA.bm.functions.log(4, "Window_BookText: drawBookTextEx character processing loop...");
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        TAA.bm.functions.log(4, "Window_BookText: Updating TextHeight...");
        this._allTextHeight += textState.y - y + this.lineHeight();
        return textState.y - y + this.lineHeight();
    } else {
        return 0;
    }
};

Window_BookText.prototype.calcFullTextHeight = function(textState, all){
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;
    var lineCount = 0;
    var canvas = this.contents.canvas.getContext("2d");
    var globalMaxFontSize = this.contents.fontSize;

    for (var i = 0; i < maxLines; i++) {
        var maxFontSize = this.contents.fontSize;
        var regExp = /\x1b(?:\{|\}|fs\[[0-9]+\])/g;
        for (;;) {
            var array = regExp.exec(lines[i]);
            if (array) {
                if (array[0] === '\x1b{') {
                    this.makeFontBigger();
                }
                if (array[0] === '\x1b}') {
                    this.makeFontSmaller();
                }
                if (array[0].match(/\x1bfs\[([0-9]+)\]/gi)){
                    this.contents.fontSize = parseInt(RegExp.$1);
                }
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
            } else {
                break;
            }
        }
        canvas.font = maxFontSize + "px " + this.contents.fontFace;
        var tmpText = lines[i];

        if(maxFontSize > globalMaxFontSize)
            globalMaxFontSize = maxFontSize;

        // Had to reverse engineer to find out why VisuMZ Message Core WordWrap was 
        // messing with my functions. A few console.log later, found what seems to be
        // a placeholder for blank spaces. For my height estimative to work, that 
        // needs to go back to its original character
        if(Imported.VisuMZ_1_MessageCore === true)
            tmpText = lines[i].replace(/WrapBreak\[0\]/gi, ' ');
        var count = Math.ceil(canvas.measureText(tmpText).width / (this.windowWidth() - 2 * this.standardPadding()));
        textHeight += ((maxFontSize + 8) * Math.max(count, 1));
        lineCount += Math.max(count, 1);
    }

    this.contents.fontSize = lastFontSize;
    textState.estimatedHeight = textHeight;
    textState.lineCount = lineCount;
    textState.maxFontSize = globalMaxFontSize+8;
    return textState;
};

TAA.bm.alias.Window_BookText.createTextState = Window_BookText.prototype.createTextState;
Window_BookText.prototype.setupTextState = function(text, x, y){
    var textState = {};
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    if(Utils.RPGMAKER_NAME === 'MZ'){
        textState = TAA.bm.alias.Window_BookText.createTextState.call(this, text, x, y, this.windowWidth() - this.textPadding() * 2);
    }
    else{
        textState = { 
            index: 0,
            x: x,
            y: y,
            left: x };
    }
    textState.originalText = text;
    textState.text = this.convertEscapeCharacters(text);
    textState = this.calcFullTextHeight(textState, true);
    
    this.resetFontSettings();
    return textState;
};

Window_BookText.prototype.replaceCharAt = function(text, replacement, index){
    return text.substr(0, index) + replacement + text.substr(index+1);
};

Window_BookText.prototype.select = function(index) {
};

Window_BookText.prototype.contentsHeight = function(){
    var standard = this.height - 2 * this.standardPadding();
    return Math.max(standard, this._allTextHeight);
}

Window_BookText.prototype.update = function(){
    TAA.bm.functions.log(4, "Window_BookText: Update start");
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Window_BookSelectable.prototype.update.call(this);
    else
        Window_Selectable.prototype.update.call(this);
    if(this._freezeFrames > 0){
        this._freezeFrames -= 1;
        if(this._freezeFrames <= 0)
            this.refresh();
    }
    if (this.isOpenAndActive()) this.updateKeyScrolling();
    TAA.bm.functions.log(4, "Window_BookText: Update end");
};

TAA.bm.alias.Window_BookText.updateOrigin = Window_BookText.prototype.updateOrigin;
Window_BookText.prototype.updateOrigin = function(){
    TAA.bm.alias.Window_BookText.updateOrigin.call(this);
};

TAA.bm.alias.Window_BookText.itemHeight = Window_BookText.prototype.itemHeight;
Window_BookText.prototype.itemHeight = function(){
    return this.contentsHeight();
};

Window_BookText.prototype.maxScrollY = function() {
    if(Utils.RPGMAKER_NAME === 'MZ')
        return Math.max(0, this.overallHeight() - this.innerHeight);
    else
        return Math.max(0, this._allTextHeight - (this.height - 2 * this.standardPadding()));
};

Window_BookText.prototype.lineHeight = function() {
    if (this._windowLineHeight === undefined) {
        if(this._isBookScene)
            this._windowLineHeight = parseInt(TAA.bm.Parameters.DetachedTextWindow['Line Height']) || 36;
        else
            this._windowLineHeight = parseInt(TAA.bm.Parameters.MenuTextWindow['Line Height']) || 36;
    }
    
    return this._windowLineHeight;
};
  
Window_BookText.prototype.standardPadding = function() {
    if (this._windowStandardPadding === undefined) {
        if(this._isBookScene)
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Standard Padding']));
        else
            this._windowStandardPadding = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Standard Padding']));
    }
    return this._windowStandardPadding;
};
  
Window_BookText.prototype.textPadding = function() {
    if (this._windowTextPadding === undefined) {
        if(this._isBookScene)
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Text Padding']));
        else
            this._windowTextPadding = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Text Padding']));
    }
    return this._windowTextPadding;
};
  
Window_BookText.prototype.standardBackOpacity = function() {
    if (this._windowBackOpacity === undefined) {
        if(this._isBookScene)
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow['Back Opacity']));
        else
            this._windowBackOpacity = Math.round(eval(TAA.bm.Parameters.MenuTextWindow['Back Opacity']));
    }
    return this._windowBackOpacity;
};
  
Window_BookText.prototype.loadWindowskin = function() {
    if(this._isBookScene)
        var windowSkin = TAA.bm.Parameters.DetachedTextWindow['Window Skin'];
    else
        var windowSkin = TAA.bm.Parameters.MenuTextWindow['Window Skin'];
    this._windowskin = ImageManager.loadSystem(windowSkin);
};

Window_BookText.prototype.scrollSpeed = function() {
    var speed = parseInt(TAA.bm.Parameters.Misc['Scroll Options']['Scroll Speed']);
    this._scrollSpeed = isNaN(speed) ? 4 : speed;
    return this._scrollSpeed;
};

Window_BookText.prototype.scrollOriginDown = function(speed) {
    var value = this.contentsHeight() - this.height + 2 * this.standardPadding();
    if(Utils.RPGMAKER_NAME === 'MZ'){
        this.smoothScrollDown(speed/1000);
    }
    else{
        this.origin.y = Math.min(value, this.origin.y + speed);
        this._scrollY = this.origin.y;
    }
};

Window_BookText.prototype.scrollOriginUp = function(speed) {
    if(Utils.RPGMAKER_NAME === 'MZ'){
        this.smoothScrollUp(speed/1000);
    }
    else{
        this.origin.y = Math.max(0, this.origin.y - speed);
        this._scrollY = this.origin.y;
    }
};

Window_BookText.prototype.updateKeyScrolling = function() {
    TAA.bm.functions.log(4, "Window_BookText: Update key scrolling start");
    if (Input.isPressed('up')) {
        this.scrollOriginUp(this.scrollSpeed());
    } else if (Input.isPressed('down')) {
        this.scrollOriginDown(this.scrollSpeed());
    } else if (Input.isPressed('pageup')) {
        this.scrollOriginUp(this.scrollSpeed() * 4);
    } else if (Input.isPressed('pagedown')) {
        this.scrollOriginDown(this.scrollSpeed() * 4);
    }
    else if(Input.isPressed(TAA.bm.Parameters.Misc['Scroll Options'].HomeKeyName)){
        if(Utils.RPGMAKER_NAME === 'MZ'){
            this.smoothScrollTo(0, 0);
        }
        else{
            this.origin.y = 0;
            this._scrollY = 0;
        }
    }
    else if(Input.isPressed(TAA.bm.Parameters.Misc['Scroll Options'].EndKeyName)){
        if(Utils.RPGMAKER_NAME === 'MZ'){
            this.smoothScrollTo(0, this.maxScrollY());
        }
        else{
            this.origin.y = this.maxScrollY();
            this._scrollY = this.maxScrollY();
        }
    }
    else if(TouchInput.isPressed() && TAA.bm.Parameters.Misc['Native Touch/Click Support'] !== 'Disable'){
        var y = TouchInput.y;
        var x = TouchInput.x;
        if(this.upArrowVisible && x > this.x && x < (this.x + this.windowWidth()) && y > this.y && y < (this.y + this.standardPadding())){
            this.scrollOriginUp(this.scrollSpeed() * 2);
        }
        else if(this.downArrowVisible && x > this.x && x < (this.x + this.windowWidth()) && y > (this.y + this.windowHeight() - this.standardPadding()) && y < (this.y + this.windowHeight())){
            this.scrollOriginDown(this.scrollSpeed() * 2);
        }
        else if(TAA.bm.Parameters.Misc['Native Touch/Click Support'] === 'Full Support' && x > this.x && x < (this.x + this.windowWidth()) && y > this.y && y < (this.y + this.windowHeight())){
            if(this._touchOriginY !== undefined){
                if((y - this._touchOriginY) > 10){
                    this.scrollOriginUp(y - this._touchOriginY);
                    this._touchOriginY = y;
                }
                else if((y - this._touchOriginY) < -10){
                    this.scrollOriginDown((y - this._touchOriginY)*-1);
                    this._touchOriginY = y;
                }
            }
        }
    }
    TAA.bm.functions.log(4, "Window_BookText: Update key scrolling end");
};

TAA.bm.alias.WindowSelectable = TAA.bm.alias.WindowSelectable || {};
// For Luna Engine compatibility
TAA.bm.alias.WindowSelectable.updateArrows = (TAA.bmle && Utils.RPGMAKER_NAME === 'MV') ? Window_BookSelectable.prototype.updateArrows : Window_Selectable.prototype.updateArrows;
Window_BookText.prototype.updateArrows = function() {
    TAA.bm.functions.log(3, "updateArrows custom code start");
    if(Utils.RPGMAKER_NAME === 'MZ')
        TAA.bm.alias.WindowSelectable.updateArrows.call(this);
    else{
        this.downArrowVisible = this._scrollY < this.maxScrollY();
        this.upArrowVisible = this._scrollY > 0;
    }
    TAA.bm.functions.log(3, "updateArrows end");
};

Window_BookText.prototype.isInsideFrame = function() {
    if(Utils.RPGMAKER_NAME === 'MZ'){
        return this.isTouchedInsideFrame();
    }

    var x = this.canvasToLocalX(TouchInput._mouseOverX);
    var y = this.canvasToLocalY(TouchInput._mouseOverY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_BookText.prototype.processWheel = function(){
    this.processWheelScroll();
};

Window_BookText.prototype.processWheelScroll = function() {
    if (!this.isInsideFrame()) return;
    if(Utils.RPGMAKER_NAME === 'MZ' && !this.isWheelScrollEnabled()) return;
    var threshold = 20;
    if (TouchInput.wheelY >= threshold) {
        this.scrollOriginDown(this.scrollSpeed() * 4);
    }
    if (TouchInput.wheelY <= -threshold) {
        this.scrollOriginUp(this.scrollSpeed() * 4);
    }
};

if(TAA.bm.Parameters.Misc['Native Touch/Click Support'] === 'Full Support'){
    // For Luna Engine compatibility
    TAA.bm.alias.WindowSelectable.processTouch = (TAA.bmle && Utils.RPGMAKER_NAME === 'MV') ? Window_BookSelectable.prototype.processTouch : Window_Selectable.prototype.processTouch;
    Window_BookText.prototype.processTouch = function(){
        this._lastTouchingStatus = this._touching;
        TAA.bm.alias.WindowSelectable.processTouch.call(this);
        if(this._lastTouchingStatus !== this._touching){
            if(this._lastTouchingStatus === false){
                this._touchOriginY = TouchInput.y;
            }
            else
                this._touchOriginY = undefined;
        }
    };
};

//=============================================================================
// Scene_Boot
//=============================================================================

TAA.bm.alias.Scene_Boot = TAA.bm.alias.Scene_Boot || {};
if(Utils.RPGMAKER_NAME === 'MZ'){
    TAA.bm.alias.Scene_Boot.loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function(){
        TAA.bm.alias.Scene_Boot.loadSystemImages.call(this);
        this.preloadBookMenuSkins();
    };
};

if(Utils.RPGMAKER_NAME === 'MV'){
    TAA.bm.alias.Scene_Boot.loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
    Scene_Boot.prototype.loadSystemWindowImage = function(){
        TAA.bm.alias.Scene_Boot.loadSystemWindowImage.call(this);
        this.preloadBookMenuSkins();
    };
};

Scene_Boot.prototype.preloadBookMenuSkins = function(){
    var loaded = [];
    var scenes = ['DetachedTextWindow', 'DetachedTitleWindow', 'MenuListWindow', 'MenuTextWindow', 'MenuTitleWindow'];
    for(var i=0; i<scenes.length; i++){
        var skin = TAA.bm.Parameters[scenes[i]]['Window Skin'];
        if(skin && skin !== "" && !loaded.contains(skin)){
            if(Utils.RPGMAKER_NAME === 'MZ'){
                ImageManager.loadBitmap('img/system/' + skin, undefined, false);
            }
            else{
                ImageManager.reserveSystem(skin);
            }
            loaded.push(skin);
        }
    }
};

//=============================================================================
// Scene_Book
//=============================================================================

function Scene_Book() {
    this.initialize.apply(this, arguments);
}

// For Luna Engine compatibility
if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
    Scene_Book.prototype = Object.create(Scene_BookMenuBase.prototype);
else
    Scene_Book.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Book.prototype.constructor = Scene_Book;

Scene_Book.prototype.initialize = function() {
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookMenuBase.prototype.initialize.call(this);
    else
        Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Book.prototype.create = function() {
    this.createTitleWindow();
    this.createTextWindow();
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookMenuBase.prototype.create.call(this);
    else
        Scene_MenuBase.prototype.create.call(this);
    this.addWindows();
};

Scene_Book.prototype.start = function() {
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookMenuBase.prototype.start.call(this);
    else
        Scene_MenuBase.prototype.start.call(this);
};

Scene_Book.prototype.addWindows = function(){
    if($gameSystem.isTitleVisible())
        this.addWindow(this._titleWindow);
    this.addWindow(this._textWindow);
    this._textWindow.activate();
};

Scene_Book.prototype.createTitleWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.X));
    var y = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Y));
    var width = Math.round(eval(TAA.bm.Parameters.DetachedTitleWindow.Width)) || Graphics.boxWidth;
    this._titleWindow = new Window_BookTitle(x, y, width, true);
    this._titleWindow.setBook($dataBooks._currentBook);
};

Scene_Book.prototype.createTextWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.X));
    var y = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.Y) + eval(TAA.bm.Parameters.DetachedTitleWindow.Y) + this._titleWindow.height);
    var width = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.Width)) || Graphics.boxWidth;
    var height = Math.round(eval(TAA.bm.Parameters.DetachedTextWindow.Height)) || Graphics.boxHeight;
    this._textWindow = new Window_BookText(x, y, width, height, true);
    this._textWindow.setHandler('cancel', this.onTextCancel.bind(this));
    this._textWindow.setHandler('ok', this.onTextCancel.bind(this));
    this._textWindow.setBook($dataBooks._currentBook, false);
};

Scene_Book.prototype.onTextCancel = function(){
    this._titleWindow._bookKey = undefined;
    this._textWindow._bookKey = undefined;
    this._textWindow.deactivate();
    SoundManager.playCancel();
    $dataBooks.resetCurrentBook();
    $dataBooks.clearPreloadHistory();
    this.popScene();
};

Scene_Book.prototype.imgExists = function(file){
    return $dataBooks.imgExists(file);
};

// Background image functions
Scene_Book.prototype.createBackground = function(){
    var op = TAA.bm.Parameters.DetachedBgImages.Option;

    var customBg = $dataBooks.customBg();
    if(customBg && (customBg.mode & 1) !== 1) customBg = undefined;

    if(op === undefined) op = 1;
    if(op & 1){
        // For Luna Engine compatibility
        if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
            Scene_BookMenuBase.prototype.createBackground.call(this);
        else
            Scene_MenuBase.prototype.createBackground.call(this);
    }
    if(op & 2){
        this.createFullBackground();
    }

    if((op & 4) || (op & 8)){
        if(customBg !== undefined && customBg.mode & 8){
            this.createSingleBgImage(customBg.file);
        }
        else if(customBg !== undefined && customBg.mode & 4){
            if(op & 8){
                this.createSingleBgImage(TAA.bm.Parameters.DetachedBgImages["Single Image"]);
                this.createMultiBgImages(undefined, customBg.file);
            }
            else if(op & 4){
                this.createMultiBgImages(TAA.bm.Parameters.DetachedBgImages["Multiple Images - Title"], customBg.file);
            }
            else{
                this.createMultiBgImages(undefined, customBg.file);
            }
        }
        else{
            if(op & 4){
                this.createMultiBgImages(TAA.bm.Parameters.DetachedBgImages["Multiple Images - Title"], TAA.bm.Parameters.DetachedBgImages["Multiple Images - Text"]);
            }
            if(op & 8){
                this.createSingleBgImage(TAA.bm.Parameters.DetachedBgImages["Single Image"]);
            }
        }
    }
    else{
        if(customBg !== undefined && customBg.mode & 8){
            this.createSingleBgImage(customBg.file);
        }
        else if(customBg !== undefined && customBg.mode & 4){
            this.createMultiBgImages(undefined, customBg.file);
        }
    }
};

Scene_Book.prototype.createFullBackground = function(){
    var imgFile = TAA.bm.Parameters.DetachedBgImages["Full Background Image"];
    if(imgFile !== undefined && imgFile !== "" && this.imgExists(imgFile)){
        this._backgroundImage = new TilingSprite();
        this._backgroundImage.move(0, 0, Graphics.width, Graphics.height);
        this._backgroundImage.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._backgroundImage);
    }
};

Scene_Book.prototype.createMultiBgImages = function(titleFile, textFile){
    var ttlImgFile = titleFile;
    var txtImgFile = textFile;
    if(ttlImgFile !== undefined && ttlImgFile !== ""){
        this.createTitleBackground(ttlImgFile);
    }
    if(txtImgFile !== undefined && txtImgFile !== ""){
        this.createTextBackground(txtImgFile);
    }
};

Scene_Book.prototype.createSingleBgImage = function(imageFile){
    var imgFile = imageFile;
    if(imgFile !== undefined && imgFile !== "" && this.imgExists(imgFile)){
        var x = this._titleWindow.x;
        var y = this._titleWindow.y;
        var width = this._titleWindow.width;
        var height = this._titleWindow.height + this._textWindow.height;

        this._windowBackground = new TilingSprite();
        this._windowBackground.move(x, y, width, height);
        this._windowBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._windowBackground);
    }
};

Scene_Book.prototype.createTitleBackground = function(imgFile){
    if(!this.imgExists(imgFile)) return;

    var window = this._titleWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._titleBackground = new TilingSprite();
    this._titleBackground.move(x, y, width, height);
    this._titleBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._titleBackground);
};

Scene_Book.prototype.createTextBackground = function(imgFile){
    if(!this.imgExists(imgFile)) return;
    var window = this._textWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._textBackground = new TilingSprite();
    this._textBackground.move(x, y, width, height);
    this._textBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._textBackground);
};

// For Luna Engine compatibility
Scene_Book.prototype.isAnimating = function(){
    return false;
};

//=============================================================================
// Scene_BookMenu
//=============================================================================

function Scene_BookMenu() {
    this.initialize.apply(this, arguments);
}

// For Luna Engine compatibility
if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
    Scene_BookMenu.prototype = Object.create(Scene_BookMenuBase.prototype);
else
    Scene_BookMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BookMenu.prototype.constructor = Scene_BookMenu;

Scene_BookMenu.prototype.initialize = function() {
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookMenuBase.prototype.initialize.call(this);
    else
        Scene_MenuBase.prototype.initialize.call(this);
    this._previousBook = undefined;
    this._bgStackSize = 0;
    this._waitCounter = false;
};

Scene_BookMenu.prototype.create = function() {
    this.createTitleWindow();
    this.createTextWindow();
    this.createListWindow();
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookMenuBase.prototype.create.call(this);
    else
        Scene_MenuBase.prototype.create.call(this);
    TAA.bm.functions.log(3, "Scene_BookMenu: Children before adding windows:");
    TAA.bm.functions.log(3, this.children);
    this.addWindows();
    TAA.bm.functions.log(3, "Scene_BookMenu: Children after adding windows:");
    TAA.bm.functions.log(3, this.children);
};

Scene_BookMenu.prototype.start = function() {
    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookMenuBase.prototype.start.call(this);
    else
        Scene_MenuBase.prototype.start.call(this);
};

Scene_BookMenu.prototype.addWindows = function(){
    this.addWindow(this._titleWindow);
    this.addWindow(this._textWindow);
    this.addWindow(this._listWindow);
};

Scene_BookMenu.prototype.createTitleWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.X)) || Math.round(Graphics.boxWidth/3);
    var y = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.Y)) || 0;
    var width = Math.round(eval(TAA.bm.Parameters.MenuTitleWindow.Width)) || Math.round(Graphics.boxWidth * 4/6);
    this._titleWindow = new Window_BookTitle(x, y, width, false);
};

Scene_BookMenu.prototype.createTextWindow = function(){
    var x = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.X)) || Math.round(Graphics.boxWidth / 3);
    var y = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.Y)) ||this._titleWindow.height;
    var width = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.Width)) || Math.round(Graphics.boxWidth * 2/3);
    var height = Math.round(eval(TAA.bm.Parameters.MenuTextWindow.Height)) || Graphics.boxHeight - this._titleWindow.height;
    this._textWindow = new Window_BookText(x, y, width, height, false);
    this._textWindow.setHandler('cancel', this.onTextCancel.bind(this));
};

Scene_BookMenu.prototype.createListWindow = function(){
    this._listWindow = new Window_BookList(this._titleWindow, this._textWindow);
    this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
    this._listWindow.setHandler('category', this.onListCategoryToggle.bind(this));
    this._listWindow.setHandler('book', this.onListBook.bind(this));
    this._listWindow.setHandler('readBook', this.textWindowActivate.bind(this));
    this._listWindow.preloadChangedTextMarkPicture();
};

Scene_BookMenu.prototype.onListCancel = function(){
    this._titleWindow._bookKey = undefined;
    this._textWindow._bookKey = undefined;
    $dataBooks.resetCurrentBook();
    $dataBooks.clearPreloadHistory();
    this.popScene();
};

Scene_BookMenu.prototype.onListCategoryToggle = function(){
    this._listWindow.activate();
    this._listWindow.categoryToggle(this._listWindow.currentExt());
};

Scene_BookMenu.prototype.onListBook = function(){
    this.textWindowActivate();
};

Scene_BookMenu.prototype.textWindowActivate = function(){
    this._textWindow.activate();
};

Scene_BookMenu.prototype.onTextCancel = function(){
    this._textWindow.deactivate();
    this._listWindow.activate();
};

Scene_BookMenu.prototype.imgExists = function(file){
    return $dataBooks.imgExists(file);
};

// Background image functions
Scene_BookMenu.prototype.createBackground = function(){
    var op = TAA.bm.Parameters.MenuBgImages.Option;
    var customBg = $dataBooks.customBg();
    if(customBg !== undefined && (customBg.mode & 2) !== 2) customBg = undefined;

    if(op === undefined) op = 1;
    if(op & 1){
        // For Luna Engine compatibility
        if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
            Scene_BookMenuBase.prototype.createBackground.call(this);
        else
            Scene_MenuBase.prototype.createBackground.call(this);
        this._bgStackSize++;
    }
    if(op & 2){
        this.createFullBackground();
    }

    if(Math.floor(op / 4) > 0){
        if(op & 4){
            this.customBgSinglePlusList(customBg);
        }
        if(op & 8){
            this.customBgSinglePlusTitle(customBg);
        }
        if(op & 16){
            this.customBgSinglePlusText(customBg);
        }
        if(op & 32){
            this.customBgMultiBgImages(customBg);
        }
        if(op & 64){
            this.createSingleBgImage(customBg);
            if(customBg !== undefined && customBg.mode & 8){
                this.createTitleAndTextBackground(customBg.file);
            }
            else if(customBg !== undefined && customBg.mode & 4){
                this.createTextBackground(customBg.file);
            }
        }
    }
    else{
        if(customBg !== undefined && customBg.mode & 8){
            this.createListAndTextBackground(customBg.file);
        }
        else if(customBg !== undefined && customBg.mode & 4){
            this.createTextBackground(customBg.file);
        }
    }

    TAA.bm.functions.log(2, "Scene_BookMenu: Stack Size = " + this._bgStackSize);
};

Scene_BookMenu.prototype.customBgSinglePlusList = function(customBg){
    if(customBg !== undefined && customBg.mode & 8){
        this.createBgImagesSinglePlusList(TAA.bm.Parameters.MenuBgImages["Multiple Images - List"], customBg.file, true);
    }
    else if(customBg !== undefined && customBg.mode & 4){
        this.createBgImagesSinglePlusList(TAA.bm.Parameters.MenuBgImages["Multiple Images - List"], customBg.file, false);
    }
    else{
        this.createBgImagesSinglePlusList(TAA.bm.Parameters.MenuBgImages["Multiple Images - List"], TAA.bm.Parameters.MenuBgImages["Single Image - Title / Text"], true);
    }
};

Scene_BookMenu.prototype.customBgSinglePlusTitle = function(customBg){
    if(customBg !== undefined && customBg.mode & 8){
        this.createBgImagesSinglePlusTitle(TAA.bm.Parameters.MenuBgImages["Single Image - Text / List"], undefined, customBg.file);
    }
    else if(customBg !== undefined && customBg.mode & 4){
        this.createBgImagesSinglePlusTitle(TAA.bm.Parameters.MenuBgImages["Single Image - Text / List"], TAA.bm.Parameters.MenuBgImages["Multiple Images - Title"], customBg.file);
    }
    else{
        this.createBgImagesSinglePlusTitle(TAA.bm.Parameters.MenuBgImages["Single Image - Text / List"], TAA.bm.Parameters.MenuBgImages["Multiple Images - Title"], undefined);
    }
};

Scene_BookMenu.prototype.customBgSinglePlusText = function(customBg){
    if(customBg !== undefined && customBg.mode & 8){
        this.createBgImagesSinglePlusText(TAA.bm.Parameters.MenuBgImages["Single Image - Title / List"], customBg.file, true);
    }
    else if(customBg !== undefined && customBg.mode & 4){
        this.createBgImagesSinglePlusText(TAA.bm.Parameters.MenuBgImages["Single Image - Title / List"], customBg.file, false);
    }
    else{
        this.createBgImagesSinglePlusText(TAA.bm.Parameters.MenuBgImages["Single Image - Title / List"], TAA.bm.Parameters.MenuBgImages["Multiple Images - Text"], false);
    }
};

Scene_BookMenu.prototype.customBgMultiBgImages = function(customBg){
    if(customBg !== undefined && customBg.mode & 8){
        this.createBgImagesSinglePlusList(TAA.bm.Parameters.MenuBgImages["Multiple Images - List"], customBg.file, true);
    }
    else if(customBg !== undefined && customBg.mode & 4){
        this.createMultiBgImages(TAA.bm.Parameters.MenuBgImages["Multiple Images - Title"], customBg.file, TAA.bm.Parameters.MenuBgImages["Multiple Images - List"]);
    }
    else{
        this.createMultiBgImages(TAA.bm.Parameters.MenuBgImages["Multiple Images - Title"], TAA.bm.Parameters.MenuBgImages["Multiple Images - Text"], TAA.bm.Parameters.MenuBgImages["Multiple Images - List"]);
    }
};

Scene_BookMenu.prototype.createFullBackground = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Full Background Image"];
    if(imgFile !== undefined && imgFile !== "" && this.imgExists(imgFile)){
        this._backgroundImage = new TilingSprite();
        this._backgroundImage.move(0, 0, Graphics.width, Graphics.height);
        this._backgroundImage.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._backgroundImage);
        this._bgStackSize++;
    }
};

Scene_BookMenu.prototype.createBgImagesSinglePlusList = function(listFile, imageFile, includeTitle){
    var imgFile = imageFile;
    var listImg = listFile;
    if(imgFile !== undefined && imgFile !== ""){
        if(includeTitle) this.createTitleAndTextBackground(imgFile);
        else{
            this.createTitleBackground(TAA.bm.Parameters.MenuBgImages["Single Image - Title / Text"]);
            this.createTextBackground(imgFile);
        }
    }
    if(listImg !== undefined && listImg !== ""){
        this.createListBackground(listImg);
    }
};

Scene_BookMenu.prototype.createBgImagesSinglePlusTitle = function(combinedFile, titleFile, textFile){
    var imgFile = combinedFile;
    var ttlImg = titleFile;
    var txtImg = textFile;
    if(txtImg === undefined && imgFile !== undefined && imgFile !== ""){
        this.createListAndTextBackground(imgFile);
    }
    if(txtImg !== undefined && txtImg !== ""){
        if(ttlImg === undefined){
            if(combinedFile !== undefined && combinedFile !== "")
                this.createListBackground(combinedFile);
            this.createTitleAndTextBackground(txtImg);
        } 
        else{
            if(combinedFile !== undefined && combinedFile !== "")
                this.createListBackground(combinedFile);
            this.createTextBackground(txtImg);
        }
    }
    if(ttlImg !== undefined && ttlImg !== ""){
        this.createTitleBackground(ttlImg);
    }
};

Scene_BookMenu.prototype.createBgImagesSinglePlusText = function(combinedFile, textFile, includeTitle){
    var imgFile = combinedFile;
    var textImg = textFile;
    if(imgFile !== undefined && imgFile !== ""){
        if(includeTitle) this.createListBackground(imgFile);
        else this.createTitleAndListBackground(imgFile);
    }
    if(textImg !== undefined && textImg !== ""){
        if(includeTitle) this.createTitleAndTextBackground(textImg);
        else this.createTextBackground(textImg);
    }
};

Scene_BookMenu.prototype.createMultiBgImages = function(titleFile, textFile, listFile){
    var ttlImgFile = titleFile;
    var txtImgFile = textFile;
    var lstImgFile = listFile;
    if(ttlImgFile !== undefined && ttlImgFile !== ""){
        this.createTitleBackground(ttlImgFile);
    }
    if(txtImgFile !== undefined && txtImgFile !== ""){
        this.createTextBackground(txtImgFile);
    }
    if(lstImgFile !== undefined && lstImgFile !== ""){
        this.createListBackground(lstImgFile);
    }
};

Scene_BookMenu.prototype.createSingleBgImage = function(){
    var imgFile = TAA.bm.Parameters.MenuBgImages["Single Image"];
    if(imgFile !== undefined && imgFile !== "" && this.imgExists(imgFile)){
        var x = Math.min(this._titleWindow.x, this._listWindow.x) + (Graphics.width - Graphics.boxWidth)/2;
        var y = Math.min(this._titleWindow.y, this._listWindow.y) + (Graphics.height - Graphics.boxHeight)/2;
        var width = this._listWindow.width + this._textWindow.width;
        if(this._titleWindow.y < this._listWindow.y){
            var height = this._titleWindow.height + this._textWindow.height;    
        }
        else{
            var height = this._listWindow.height;
        }

        this._windowBackground = new TilingSprite();
        this._windowBackground.move(x, y, width, height);
        this._windowBackground.bitmap = ImageManager.loadPicture(imgFile);
        this.addChild(this._windowBackground);
        this._bgStackSize++;
    }
};

Scene_BookMenu.prototype.createTitleBackground = function(imgFile){
    if(!this.imgExists(imgFile)) return;
    var window = this._titleWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._titleBackground = new TilingSprite();
    this._titleBackground.move(x, y, width, height);
    this._titleBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._titleBackground);
    this._bgStackSize++;
};

Scene_BookMenu.prototype.createTextBackground = function(imgFile, index){
    if(!this.imgExists(imgFile)) return;
    var window = this._textWindow;
    var x = window.x;
    if(Graphics.width - Graphics.boxWidth > 8)
        x += Math.floor((Graphics.width - Graphics.boxWidth) / 2);
    var y = window.y;
    if(Graphics.height - Graphics.boxHeight > 8)
        y += Math.floor((Graphics.height - Graphics.boxHeight) / 2);
    var width = window.width;
    var height = window.height;
    
    this._textBackground = new TilingSprite();
    this._textBackground.move(x, y, width, height);
    this._textBackground.bitmap = ImageManager.loadPicture(imgFile);
    if(index !== undefined) this.addChildAt(this._textBackground, index);
    else {
        this.addChild(this._textBackground);
        this._bgStackSize++;
    }
};

Scene_BookMenu.prototype.createListBackground = function(imgFile){
    if(!this.imgExists(imgFile)) return;
    var window = this._listWindow;
    var x = window.x;
    var y = window.y;
    var width = window.width;
    var height = window.height;
    
    this._listBackground = new TilingSprite();
    this._listBackground.move(x, y, width, height);
    this._listBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._listBackground);
    this._bgStackSize++;
};

Scene_BookMenu.prototype.createTitleAndTextBackground = function(imgFile, index){
    if(!this.imgExists(imgFile)) return;
    var x = this._titleWindow.x;
    var y = this._titleWindow.y;
    var width = Math.min(this._titleWindow.width, this._textWindow.width);
    var height = this._titleWindow.height + this._textWindow.height;

    this._titleTextBackground = new TilingSprite();
    this._titleTextBackground.move(x, y, width, height);
    this._titleTextBackground.bitmap = ImageManager.loadPicture(imgFile);
    if(index !== undefined) this.addChildAt(this._titleTextBackground, index);
    else {
        this.addChild(this._titleTextBackground);
        this._bgStackSize++;
    }
};

Scene_BookMenu.prototype.createTitleAndListBackground = function(imgFile){
    if(!this.imgExists(imgFile)) return;
    var x = Math.min(this._titleWindow.x, this._listWindow.x);
    var y = Math.min(this._titleWindow.y, this._listWindow.y);
    if(this._titleWindow.width === this._listWindow.width)
        var width = this._titleWindow.width;
    else
        var width = Math.min(this._titleWindow.width + this._listWindow.width, Graphics.boxWidth);
    var height = Math.min(this._titleWindow.height + this._listWindow.height, Graphics.boxHeight);

    this._titleListBackground = new TilingSprite();
    this._titleListBackground.move(x, y, width, height);
    this._titleListBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._titleListBackground);
    this._bgStackSize++;
};

Scene_BookMenu.prototype.createListAndTextBackground = function(imgFile){
    if(!this.imgExists(imgFile)) return;
    var x = this._listWindow.x;
    var y = this._listWindow.y;
    var width = this._listWindow.width + this._textWindow.width;
    var height = Math.max(this._listWindow.height, this._textWindow.height);

    this._textListBackground = new TilingSprite();
    this._textListBackground.move(x, y, width, height);
    this._textListBackground.bitmap = ImageManager.loadPicture(imgFile);
    this.addChild(this._textListBackground);
    this._bgStackSize++;
};

Scene_BookMenu.prototype.getWindowLayerIndex = function(){
    var index = this.children.length-1;
    var found = false;
    while(index >= 0 && !found){
        var obj = this.children[index];
        TAA.bm.functions.log(3, "Layer child at index " + index);
        TAA.bm.functions.log(3, obj);
        if(obj.children.length >= 3) {
            var i = obj.children.length-1;
            while(i >= 2 && !found){
                if(obj.children[i--].constructor.name === 'Window_BookList')
                    found = true;
            }
        }
        if(!found) index--;
    }

    if(index < 0) return this.children.length-1;
    else return index;
};

Scene_BookMenu.prototype.updateChildren = function(){
    var customBg = $dataBooks.customBgByKey(this._textWindow._bookKey);
    if(customBg !== undefined && (customBg.mode & 2) !== 2) customBg = undefined;
    var index = this.getWindowLayerIndex();
    // TAA.bm.functions.log(2, "WindowLayer index: " + index);
    if(this._previousBook !== this._textWindow._bookKey){
        this._previousBook = this._textWindow._bookKey;
        this._waitCounter = true;
    }
    else{
        if(this._waitCounter && this._textWindow._freezeFrames <= 0){
            TAA.bm.functions.log(2, "Scene_BookMenu: customBg:");
            TAA.bm.functions.log(2, customBg);
            TAA.bm.functions.log(2, "Scene_BookMenu: Children:");
            TAA.bm.functions.log(2, this.children);
            this.removeCustomBg(index);
            if(customBg !== undefined && customBg.mode & 8){
                this.createTitleAndTextBackground(customBg.file, this._bgStackSize);
            }
            else if(customBg !== undefined && customBg.mode & 4){
                this.createTextBackground(customBg.file, this._bgStackSize);
            }
            this._waitCounter = false;
        }
    }

    // For Luna Engine compatibility
    if(TAA.bmle && Utils.RPGMAKER_NAME === 'MV')
        Scene_BookBase.prototype.updateChildren.call(this);
    else
        Scene_Base.prototype.updateChildren.call(this);
};

Scene_BookMenu.prototype.removeCustomBg = function(index){
    TAA.bm.functions.log(2, "Scene_BookMenu: removeCustomBg call for index " + index);
    TAA.bm.functions.log(2, "Scene_BookMenu: Children:")
    TAA.bm.functions.log(2, this.children);
    TAA.bm.functions.log(2, "Scene_BookMenu: Child on index " + index);
    TAA.bm.functions.log(2, this.children[index]);
    TAA.bm.functions.log(2, "Scene_BookMenu: _bgStackSize: " + this._bgStackSize);

    while(index > this._bgStackSize){
        this.children.splice(--index, 1);
    }
};

// For Luna Engine compatibility
Scene_BookMenu.prototype.isAnimating = function(){
    return false;
};

//=============================================================================
// Scene_Menu
//=============================================================================

TAA.bm.alias.SceneMenu = TAA.bm.alias.SceneMenu || {};
TAA.bm.alias.SceneMenu.createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function(){
    TAA.bm.alias.SceneMenu.createCommandWindow.call(this);
    this._commandWindow.setHandler('books', this.commandBook.bind(this));
};

Scene_Menu.prototype.commandBook = function(){
    SceneManager.push(Scene_BookMenu);
};

//=============================================================================
// Input
//=============================================================================

TAA.bm.Parameters.Misc['Scroll Options'].HomeKey = parseInt(TAA.bm.Parameters.Misc['Scroll Options']['Home Key']);
if (!isNaN(TAA.bm.Parameters.Misc['Scroll Options'].HomeKey) && Input.keyMapper[TAA.bm.Parameters.Misc['Scroll Options'].HomeKey] === undefined && TAA.bm.Parameters.Misc['Scroll Options']['Enable Home/End'] === 'true'){
    Input.keyMapper[TAA.bm.Parameters.Misc['Scroll Options'].HomeKey] = 'home';
    TAA.bm.Parameters.Misc['Scroll Options'].HomeKeyName = 'home';
}
else{
    TAA.bm.Parameters.Misc['Scroll Options'].HomeKeyName = Input.keyMapper[TAA.bm.Parameters.Misc['Scroll Options'].HomeKey];
}

TAA.bm.Parameters.Misc['Scroll Options'].EndKey = parseInt(TAA.bm.Parameters.Misc['Scroll Options']['End Key']);
if (!isNaN(TAA.bm.Parameters.Misc['Scroll Options'].EndKey) && Input.keyMapper[TAA.bm.Parameters.Misc['Scroll Options'].EndKey] === undefined && TAA.bm.Parameters.Misc['Scroll Options']['Enable Home/End'] === 'true'){
    Input.keyMapper[TAA.bm.Parameters.Misc['Scroll Options'].EndKey] = 'end';
    TAA.bm.Parameters.Misc['Scroll Options'].EndKeyName = 'end';
}
else{
    TAA.bm.Parameters.Misc['Scroll Options'].EndKeyName = Input.keyMapper[TAA.bm.Parameters.Misc['Scroll Options'].EndKey];
}

//=============================================================================
// Utils
//=============================================================================

TAA.bm.alias.TouchInput = TAA.bm.alias.TouchInput || {};
TAA.bm.alias.TouchInput.onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event){
    TAA.bm.alias.TouchInput.onMouseMove.call(this, event);
    this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
    this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

// Trace can be a number between 0 and 4
// The higher the number, the more verbose is the plugin
TAA.bm.trace = 0;
TAA.bm.functions = {};
TAA.bm.functions.log = function(trace, msg){
    trace = trace | 0;
    if(trace <= TAA.bm.trace){
        console.log(msg);
    }
}