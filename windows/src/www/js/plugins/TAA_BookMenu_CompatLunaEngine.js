//=============================================================================
// TAA_BookMenu_CompatLunaEngine.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.bmle = TAA.bmle || {};
TAA.bmle.Version = "1.0.0";
TAA.bmle.PluginName = "TAA_BookMenu_CompatLunaEngine";
TAA.bmle.alias = TAA.bmle.alias || {};
var Luna = Luna || undefined;

/*:
 * @target MV
 * 
 * @plugindesc [1.0.0] Book Menu Luna Engine Compatibility module
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
 * A special noticed should be added that this module in no way gives you the
 * right to use Luna Engine on its own. You must abide to its author's original
 * terms of use, as well as this one.
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
 * 
 * -----------------------------------------------------------------------------
 * 
 * Luna Engine consists of a pack of plugins that changes a lot of the RPG Maker
 * MV's core code to create a layer for easier customization of its core scenes.
 * However, since TAA_BookMenu builds its own custom scenes, it is no compatible
 * by default. This module allows you to bypass Luna's customization for 
 * TAA_BookMenu only. That means you can use Luna's customization system for the
 * other scenes, but only TAA_BookMenu parameters will really affect the book
 * scenes (Luna won't work on it, but your game won't crash).
 * 
 * This plugin should be ignored by those that are not using Luna's plugins.
 * 
 * =============================================================================
 * Instructions
 * =============================================================================
 * 
 * Simply place and enable this plugin above TAA_BookMenu (which should be at
 * least version 1.6.4 to work).
 * 
 * - Reset read books, book list or both.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0:
 * - First version out!
 * 
 */

//=============================================================================
// Window_BookBase
//=============================================================================

function Window_BookBase() {
    this.initialize.apply(this, arguments);
}

Window_BookBase.prototype = Object.create(Window.prototype);
Window_BookBase.prototype.constructor = Window_BookBase;

Window_BookBase.prototype.initialize = function(x, y, width, height) {
    Window.prototype.initialize.call(this);
    this.loadWindowskin();
    this.move(x, y, width, height);
    this.updatePadding();
    this.updateBackOpacity();
    this.updateTone();
    this.createContents();
    this._opening = false;
    this._closing = false;
    this._dimmerSprite = null;
};

Window_BookBase._iconWidth  = 32;
Window_BookBase._iconHeight = 32;
Window_BookBase._faceWidth  = 144;
Window_BookBase._faceHeight = 144;

Window_BookBase.prototype.lineHeight = function() {
    return 36;
};

Window_BookBase.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
        return 'SimHei, Heiti TC, sans-serif';
    } else if ($gameSystem.isKorean()) {
        return 'Dotum, AppleGothic, sans-serif';
    } else {
        return 'GameFont';
    }
};

Window_BookBase.prototype.standardFontSize = function() {
    return 28;
};

Window_BookBase.prototype.standardPadding = function() {
    return 18;
};

Window_BookBase.prototype.textPadding = function() {
    return 6;
};

Window_BookBase.prototype.standardBackOpacity = function() {
    return 192;
};

Window_BookBase.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
};

Window_BookBase.prototype.updatePadding = function() {
    this.padding = this.standardPadding();
};

Window_BookBase.prototype.updateBackOpacity = function() {
    this.backOpacity = this.standardBackOpacity();
};

Window_BookBase.prototype.contentsWidth = function() {
    return this.width - this.standardPadding() * 2;
};

Window_BookBase.prototype.contentsHeight = function() {
    return this.height - this.standardPadding() * 2;
};

Window_BookBase.prototype.fittingHeight = function(numLines) {
    return numLines * this.lineHeight() + this.standardPadding() * 2;
};

Window_BookBase.prototype.updateTone = function() {
    var tone = $gameSystem.windowTone();
    this.setTone(tone[0], tone[1], tone[2]);
};

Window_BookBase.prototype.createContents = function() {
    this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
    this.resetFontSettings();
};

Window_BookBase.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = this.standardFontSize();
    this.resetTextColor();
};

Window_BookBase.prototype.resetTextColor = function() {
    this.changeTextColor(this.normalColor());
};

Window_BookBase.prototype.update = function() {
    Window.prototype.update.call(this);
    this.updateTone();
    this.updateOpen();
    this.updateClose();
    this.updateBackgroundDimmer();
};

Window_BookBase.prototype.updateOpen = function() {
    if (this._opening) {
        this.openness += 32;
        if (this.isOpen()) {
            this._opening = false;
        }
    }
};

Window_BookBase.prototype.updateClose = function() {
    if (this._closing) {
        this.openness -= 32;
        if (this.isClosed()) {
            this._closing = false;
        }
    }
};

Window_BookBase.prototype.open = function() {
    if (!this.isOpen()) {
        this._opening = true;
    }
    this._closing = false;
};

Window_BookBase.prototype.close = function() {
    if (!this.isClosed()) {
        this._closing = true;
    }
    this._opening = false;
};

Window_BookBase.prototype.isOpening = function() {
    return this._opening;
};

Window_BookBase.prototype.isClosing = function() {
    return this._closing;
};

Window_BookBase.prototype.show = function() {
    this.visible = true;
};

Window_BookBase.prototype.hide = function() {
    this.visible = false;
};

Window_BookBase.prototype.activate = function() {
    this.active = true;
};

Window_BookBase.prototype.deactivate = function() {
    this.active = false;
};

Window_BookBase.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};

Window_BookBase.prototype.normalColor = function() {
    return this.textColor(0);
};

Window_BookBase.prototype.systemColor = function() {
    return this.textColor(16);
};

Window_BookBase.prototype.crisisColor = function() {
    return this.textColor(17);
};

Window_BookBase.prototype.deathColor = function() {
    return this.textColor(18);
};

Window_BookBase.prototype.gaugeBackColor = function() {
    return this.textColor(19);
};

Window_BookBase.prototype.hpGaugeColor1 = function() {
    return this.textColor(20);
};

Window_BookBase.prototype.hpGaugeColor2 = function() {
    return this.textColor(21);
};

Window_BookBase.prototype.mpGaugeColor1 = function() {
    return this.textColor(22);
};

Window_BookBase.prototype.mpGaugeColor2 = function() {
    return this.textColor(23);
};

Window_BookBase.prototype.mpCostColor = function() {
    return this.textColor(23);
};

Window_BookBase.prototype.powerUpColor = function() {
    return this.textColor(24);
};

Window_BookBase.prototype.powerDownColor = function() {
    return this.textColor(25);
};

Window_BookBase.prototype.tpGaugeColor1 = function() {
    return this.textColor(28);
};

Window_BookBase.prototype.tpGaugeColor2 = function() {
    return this.textColor(29);
};

Window_BookBase.prototype.tpCostColor = function() {
    return this.textColor(29);
};

Window_BookBase.prototype.pendingColor = function() {
    return this.windowskin.getPixel(120, 120);
};

Window_BookBase.prototype.translucentOpacity = function() {
    return 160;
};

Window_BookBase.prototype.changeTextColor = function(color) {
    this.contents.textColor = color;
};

Window_BookBase.prototype.changePaintOpacity = function(enabled) {
    this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();
};

Window_BookBase.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};

Window_BookBase.prototype.textWidth = function(text) {
    return this.contents.measureTextWidth(text);
};

Window_BookBase.prototype.drawTextEx = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        this.resetFontSettings();
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

Window_BookBase.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

Window_BookBase.prototype.actorName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : '';
};

Window_BookBase.prototype.partyMemberName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : '';
};

Window_BookBase.prototype.processCharacter = function(textState) {
    switch (textState.text[textState.index]) {
    case '\n':
        this.processNewLine(textState);
        break;
    case '\f':
        this.processNewPage(textState);
        break;
    case '\x1b':
        this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
        break;
    default:
        this.processNormalCharacter(textState);
        break;
    }
};

Window_BookBase.prototype.processNormalCharacter = function(textState) {
    var c = textState.text[textState.index++];
    var w = this.textWidth(c);
    this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
};

Window_BookBase.prototype.processNewLine = function(textState) {
    textState.x = textState.left;
    textState.y += textState.height;
    textState.height = this.calcTextHeight(textState, false);
    textState.index++;
};

Window_BookBase.prototype.processNewPage = function(textState) {
    textState.index++;
};

Window_BookBase.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return '';
    }
};

Window_BookBase.prototype.obtainEscapeParam = function(textState) {
    var arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return parseInt(arr[0].slice(1));
    } else {
        return '';
    }
};

Window_BookBase.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'C':
        this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
        break;
    case 'I':
        this.processDrawIcon(this.obtainEscapeParam(textState), textState);
        break;
    case '{':
        this.makeFontBigger();
        break;
    case '}':
        this.makeFontSmaller();
        break;
    }
};

Window_BookBase.prototype.processDrawIcon = function(iconIndex, textState) {
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    textState.x += Window_BookBase._iconWidth + 4;
};

Window_BookBase.prototype.makeFontBigger = function() {
    if (this.contents.fontSize <= 96) {
        this.contents.fontSize += 12;
    }
};

Window_BookBase.prototype.makeFontSmaller = function() {
    if (this.contents.fontSize >= 24) {
        this.contents.fontSize -= 12;
    }
};

Window_BookBase.prototype.calcTextHeight = function(textState, all) {
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;

    for (var i = 0; i < maxLines; i++) {
        var maxFontSize = this.contents.fontSize;
        var regExp = /\x1b[\{\}]/g;
        for (;;) {
            var array = regExp.exec(lines[i]);
            if (array) {
                if (array[0] === '\x1b{') {
                    this.makeFontBigger();
                }
                if (array[0] === '\x1b}') {
                    this.makeFontSmaller();
                }
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
            } else {
                break;
            }
        }
        textHeight += maxFontSize + 8;
    }

    this.contents.fontSize = lastFontSize;
    return textHeight;
};

Window_BookBase.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_BookBase._iconWidth;
    var ph = Window_BookBase._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

Window_BookBase.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    width = width || Window_BookBase._faceWidth;
    height = height || Window_BookBase._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var pw = Window_BookBase._faceWidth;
    var ph = Window_BookBase._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

Window_BookBase.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
    var bitmap = ImageManager.loadCharacter(characterName);
    var big = ImageManager.isBigCharacter(characterName);
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var n = characterIndex;
    var sx = (n % 4 * 3 + 1) * pw;
    var sy = (Math.floor(n / 4) * 4) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Window_BookBase.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

Window_BookBase.prototype.hpColor = function(actor) {
    if (actor.isDead()) {
        return this.deathColor();
    } else if (actor.isDying()) {
        return this.crisisColor();
    } else {
        return this.normalColor();
    }
};

Window_BookBase.prototype.mpColor = function(actor) {
    return this.normalColor();
};

Window_BookBase.prototype.tpColor = function(actor) {
    return this.normalColor();
};

Window_BookBase.prototype.drawActorCharacter = function(actor, x, y) {
    this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
};

Window_BookBase.prototype.drawActorFace = function(actor, x, y, width, height) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

Window_BookBase.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(this.hpColor(actor));
    this.drawText(actor.name(), x, y, width);
};

Window_BookBase.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width);
};

Window_BookBase.prototype.drawActorNickname = function(actor, x, y, width) {
    width = width || 270;
    this.resetTextColor();
    this.drawText(actor.nickname(), x, y, width);
};

Window_BookBase.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 84, y, 36, 'right');
};

Window_BookBase.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    var icons = actor.allIcons().slice(0, Math.floor(width / Window_BookBase._iconWidth));
    for (var i = 0; i < icons.length; i++) {
        this.drawIcon(icons[i], x + Window_BookBase._iconWidth * i, y + 2);
    }
};

Window_BookBase.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(current, x3, y, valueWidth, 'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(current, x1, y, valueWidth, 'right');
    }
};

Window_BookBase.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
};

Window_BookBase.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                           this.mpColor(actor), this.normalColor());
};

Window_BookBase.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};

Window_BookBase.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
};

Window_BookBase.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_BookBase._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

Window_BookBase.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
};

Window_BookBase.prototype.paramchangeTextColor = function(change) {
    if (change > 0) {
        return this.powerUpColor();
    } else if (change < 0) {
        return this.powerDownColor();
    } else {
        return this.normalColor();
    }
};

Window_BookBase.prototype.setBackgroundType = function(type) {
    if (type === 0) {
        this.opacity = 255;
    } else {
        this.opacity = 0;
    }
    if (type === 1) {
        this.showBackgroundDimmer();
    } else {
        this.hideBackgroundDimmer();
    }
};

Window_BookBase.prototype.showBackgroundDimmer = function() {
    if (!this._dimmerSprite) {
        this._dimmerSprite = new Sprite();
        this._dimmerSprite.bitmap = new Bitmap(0, 0);
        this.addChildToBack(this._dimmerSprite);
    }
    var bitmap = this._dimmerSprite.bitmap;
    if (bitmap.width !== this.width || bitmap.height !== this.height) {
        this.refreshDimmerBitmap();
    }
    this._dimmerSprite.visible = true;
    this.updateBackgroundDimmer();
};

Window_BookBase.prototype.hideBackgroundDimmer = function() {
    if (this._dimmerSprite) {
        this._dimmerSprite.visible = false;
    }
};

Window_BookBase.prototype.updateBackgroundDimmer = function() {
    if (this._dimmerSprite) {
        this._dimmerSprite.opacity = this.openness;
    }
};

Window_BookBase.prototype.refreshDimmerBitmap = function() {
    if (this._dimmerSprite) {
        var bitmap = this._dimmerSprite.bitmap;
        var w = this.width;
        var h = this.height;
        var m = this.padding;
        var c1 = this.dimColor1();
        var c2 = this.dimColor2();
        bitmap.resize(w, h);
        bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
        bitmap.fillRect(0, m, w, h - m * 2, c1);
        bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
        this._dimmerSprite.setFrame(0, 0, w, h);
    }
};

Window_BookBase.prototype.dimColor1 = function() {
    return 'rgba(0, 0, 0, 0.6)';
};

Window_BookBase.prototype.dimColor2 = function() {
    return 'rgba(0, 0, 0, 0)';
};

Window_BookBase.prototype.canvasToLocalX = function(x) {
    var node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};

Window_BookBase.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};

Window_BookBase.prototype.reserveFaceImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.reserveFace(actor.faceName());
    }, this);
};

//=============================================================================
// Window_BookSelectable
//=============================================================================

function Window_BookSelectable() {
    this.initialize.apply(this, arguments);
}

Window_BookSelectable.prototype = Object.create(Window_BookBase.prototype);
Window_BookSelectable.prototype.constructor = Window_BookSelectable;

Window_BookSelectable.prototype.initialize = function(x, y, width, height) {
    Window_BookBase.prototype.initialize.call(this, x, y, width, height);
    this._index = -1;
    this._cursorFixed = false;
    this._cursorAll = false;
    this._stayCount = 0;
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this._scrollX = 0;
    this._scrollY = 0;
    this.deactivate();
};

Window_BookSelectable.prototype.index = function() {
    return this._index;
};

Window_BookSelectable.prototype.cursorFixed = function() {
    return this._cursorFixed;
};

Window_BookSelectable.prototype.setCursorFixed = function(cursorFixed) {
    this._cursorFixed = cursorFixed;
};

Window_BookSelectable.prototype.cursorAll = function() {
    return this._cursorAll;
};

Window_BookSelectable.prototype.setCursorAll = function(cursorAll) {
    this._cursorAll = cursorAll;
};

Window_BookSelectable.prototype.maxCols = function() {
    return 1;
};

Window_BookSelectable.prototype.maxItems = function() {
    return 0;
};

Window_BookSelectable.prototype.spacing = function() {
    return 12;
};

Window_BookSelectable.prototype.itemWidth = function() {
    return Math.floor((this.width - this.padding * 2 +
                       this.spacing()) / this.maxCols() - this.spacing());
};

Window_BookSelectable.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_BookSelectable.prototype.maxRows = function() {
    return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
};

Window_BookSelectable.prototype.activate = function() {
    Window_BookBase.prototype.activate.call(this);
    this.reselect();
};

Window_BookSelectable.prototype.deactivate = function() {
    Window_BookBase.prototype.deactivate.call(this);
    this.reselect();
};

Window_BookSelectable.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
};

Window_BookSelectable.prototype.deselect = function() {
    this.select(-1);
};

Window_BookSelectable.prototype.reselect = function() {
    this.select(this._index);
};

Window_BookSelectable.prototype.row = function() {
    return Math.floor(this.index() / this.maxCols());
};

Window_BookSelectable.prototype.topRow = function() {
    return Math.floor(this._scrollY / this.itemHeight());
};

Window_BookSelectable.prototype.maxTopRow = function() {
    return Math.max(0, this.maxRows() - this.maxPageRows());
};

Window_BookSelectable.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
};

Window_BookSelectable.prototype.resetScroll = function() {
    this.setTopRow(0);
};

Window_BookSelectable.prototype.maxPageRows = function() {
    var pageHeight = this.height - this.padding * 2;
    return Math.floor(pageHeight / this.itemHeight());
};

Window_BookSelectable.prototype.maxPageItems = function() {
    return this.maxPageRows() * this.maxCols();
};

Window_BookSelectable.prototype.isHorizontal = function() {
    return this.maxPageRows() === 1;
};

Window_BookSelectable.prototype.bottomRow = function() {
    return Math.max(0, this.topRow() + this.maxPageRows() - 1);
};

Window_BookSelectable.prototype.setBottomRow = function(row) {
    this.setTopRow(row - (this.maxPageRows() - 1));
};

Window_BookSelectable.prototype.topIndex = function() {
    return this.topRow() * this.maxCols();
};

Window_BookSelectable.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

Window_BookSelectable.prototype.itemRectForText = function(index) {
    var rect = this.itemRect(index);
    rect.x += this.textPadding();
    rect.width -= this.textPadding() * 2;
    return rect;
};

Window_BookSelectable.prototype.setHelpWindow = function(helpWindow) {
    this._helpWindow = helpWindow;
    this.callUpdateHelp();
};

Window_BookSelectable.prototype.showHelpWindow = function() {
    if (this._helpWindow) {
        this._helpWindow.show();
    }
};

Window_BookSelectable.prototype.hideHelpWindow = function() {
    if (this._helpWindow) {
        this._helpWindow.hide();
    }
};

Window_BookSelectable.prototype.setHandler = function(symbol, method) {
    this._handlers[symbol] = method;
};

Window_BookSelectable.prototype.isHandled = function(symbol) {
    return !!this._handlers[symbol];
};

Window_BookSelectable.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol]();
    }
};

Window_BookSelectable.prototype.isOpenAndActive = function() {
    return this.isOpen() && this.active;
};

Window_BookSelectable.prototype.isCursorMovable = function() {
    return (this.isOpenAndActive() && !this._cursorFixed &&
            !this._cursorAll && this.maxItems() > 0);
};

Window_BookSelectable.prototype.cursorDown = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.select((index + maxCols) % maxItems);
    }
};

Window_BookSelectable.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index >= maxCols || (wrap && maxCols === 1)) {
        this.select((index - maxCols + maxItems) % maxItems);
    }
};

Window_BookSelectable.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
        this.select((index + 1) % maxItems);
    }
};

Window_BookSelectable.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
        this.select((index - 1 + maxItems) % maxItems);
    }
};

Window_BookSelectable.prototype.cursorPagedown = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    if (this.topRow() + this.maxPageRows() < this.maxRows()) {
        this.setTopRow(this.topRow() + this.maxPageRows());
        this.select(Math.min(index + this.maxPageItems(), maxItems - 1));
    }
};

Window_BookSelectable.prototype.cursorPageup = function() {
    var index = this.index();
    if (this.topRow() > 0) {
        this.setTopRow(this.topRow() - this.maxPageRows());
        this.select(Math.max(index - this.maxPageItems(), 0));
    }
};

Window_BookSelectable.prototype.scrollDown = function() {
    if (this.topRow() + 1 < this.maxRows()) {
        this.setTopRow(this.topRow() + 1);
    }
};

Window_BookSelectable.prototype.scrollUp = function() {
    if (this.topRow() > 0) {
        this.setTopRow(this.topRow() - 1);
    }
};

Window_BookSelectable.prototype.update = function() {
    Window_BookBase.prototype.update.call(this);
    this.updateArrows();
    this.processCursorMove();
    this.processHandling();
    this.processWheel();
    this.processTouch();
    this._stayCount++;
};

Window_BookSelectable.prototype.updateArrows = function() {
    var topRow = this.topRow();
    var maxTopRow = this.maxTopRow();
    this.downArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
    this.upArrowVisible = topRow > 0;
};

Window_BookSelectable.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        }
        if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        }
        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        }
        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_BookSelectable.prototype.processHandling = function() {
    if (this.isOpenAndActive()) {
        if (this.isOkEnabled() && this.isOkTriggered()) {
            this.processOk();
        } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            this.processCancel();
        } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.processPagedown();
        } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.processPageup();
        }
    }
};

Window_BookSelectable.prototype.processWheel = function() {
    if (this.isOpenAndActive()) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.scrollDown();
        }
        if (TouchInput.wheelY <= -threshold) {
            this.scrollUp();
        }
    }
};

Window_BookSelectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};

Window_BookSelectable.prototype.isTouchedInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_BookSelectable.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
        if (hitIndex === this.index()) {
            if (triggered && this.isTouchOkEnabled()) {
                this.processOk();
            }
        } else if (this.isCursorMovable()) {
            this.select(hitIndex);
        }
    } else if (this._stayCount >= 10) {
        if (y < this.padding) {
            this.cursorUp();
        } else if (y >= this.height - this.padding) {
            this.cursorDown();
        }
    }
    if (this.index() !== lastIndex) {
        SoundManager.playCursor();
    }
};

Window_BookSelectable.prototype.hitTest = function(x, y) {
    if (this.isContentsArea(x, y)) {
        var cx = x - this.padding;
        var cy = y - this.padding;
        var topIndex = this.topIndex();
        for (var i = 0; i < this.maxPageItems(); i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                var rect = this.itemRect(index);
                var right = rect.x + rect.width;
                var bottom = rect.y + rect.height;
                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                    return index;
                }
            }
        }
    }
    return -1;
};

Window_BookSelectable.prototype.isContentsArea = function(x, y) {
    var left = this.padding;
    var top = this.padding;
    var right = this.width - this.padding;
    var bottom = this.height - this.padding;
    return (x >= left && y >= top && x < right && y < bottom);
};

Window_BookSelectable.prototype.isTouchOkEnabled = function() {
    return this.isOkEnabled();
};

Window_BookSelectable.prototype.isOkEnabled = function() {
    return this.isHandled('ok');
};

Window_BookSelectable.prototype.isCancelEnabled = function() {
    return this.isHandled('cancel');
};

Window_BookSelectable.prototype.isOkTriggered = function() {
    return Input.isRepeated('ok');
};

Window_BookSelectable.prototype.isCancelTriggered = function() {
    return Input.isRepeated('cancel');
};

Window_BookSelectable.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

Window_BookSelectable.prototype.playOkSound = function() {
    SoundManager.playOk();
};

Window_BookSelectable.prototype.playBuzzerSound = function() {
    SoundManager.playBuzzer();
};

Window_BookSelectable.prototype.callOkHandler = function() {
    this.callHandler('ok');
};

Window_BookSelectable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};

Window_BookSelectable.prototype.callCancelHandler = function() {
    this.callHandler('cancel');
};

Window_BookSelectable.prototype.processPageup = function() {
    SoundManager.playCursor();
    this.updateInputData();
    this.deactivate();
    this.callHandler('pageup');
};

Window_BookSelectable.prototype.processPagedown = function() {
    SoundManager.playCursor();
    this.updateInputData();
    this.deactivate();
    this.callHandler('pagedown');
};

Window_BookSelectable.prototype.updateInputData = function() {
    Input.update();
    TouchInput.update();
};

Window_BookSelectable.prototype.updateCursor = function() {
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

Window_BookSelectable.prototype.isCursorVisible = function() {
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow();
};

Window_BookSelectable.prototype.ensureCursorVisible = function() {
    var row = this.row();
    if (row < this.topRow()) {
        this.setTopRow(row);
    } else if (row > this.bottomRow()) {
        this.setBottomRow(row);
    }
};

Window_BookSelectable.prototype.callUpdateHelp = function() {
    if (this.active && this._helpWindow) {
        this.updateHelp();
    }
};

Window_BookSelectable.prototype.updateHelp = function() {
    this._helpWindow.clear();
};

Window_BookSelectable.prototype.setHelpWindowItem = function(item) {
    if (this._helpWindow) {
        this._helpWindow.setItem(item);
    }
};

Window_BookSelectable.prototype.isCurrentItemEnabled = function() {
    return true;
};

Window_BookSelectable.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_BookSelectable.prototype.drawItem = function(index) {
};

Window_BookSelectable.prototype.clearItem = function(index) {
    var rect = this.itemRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
};

Window_BookSelectable.prototype.redrawItem = function(index) {
    if (index >= 0) {
        this.clearItem(index);
        this.drawItem(index);
    }
};

Window_BookSelectable.prototype.redrawCurrentItem = function() {
    this.redrawItem(this.index());
};

Window_BookSelectable.prototype.refresh = function() {
    if (this.contents) {
        this.contents.clear();
        this.drawAllItems();
    }
};

//=============================================================================
// Window_BookCommand
//=============================================================================

function Window_BookCommand() {
    this.initialize.apply(this, arguments);
}

Window_BookCommand.prototype = Object.create(Window_BookSelectable.prototype);
Window_BookCommand.prototype.constructor = Window_BookCommand;

Window_BookCommand.prototype.initialize = function(x, y) {
    this.clearCommandList();
    this.makeCommandList();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_BookSelectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this.activate();
};

Window_BookCommand.prototype.windowWidth = function() {
    return 240;
};

Window_BookCommand.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_BookCommand.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_BookCommand.prototype.maxItems = function() {
    return this._list.length;
};

Window_BookCommand.prototype.clearCommandList = function() {
    this._list = [];
};

Window_BookCommand.prototype.makeCommandList = function() {
};

Window_BookCommand.prototype.addCommand = function(name, symbol, enabled, ext) {
    if (enabled === undefined) {
        enabled = true;
    }
    if (ext === undefined) {
        ext = null;
    }
    this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext});
};

Window_BookCommand.prototype.commandName = function(index) {
    return this._list[index].name;
};

Window_BookCommand.prototype.commandSymbol = function(index) {
    return this._list[index].symbol;
};

Window_BookCommand.prototype.isCommandEnabled = function(index) {
    return this._list[index].enabled;
};

Window_BookCommand.prototype.currentData = function() {
    return this.index() >= 0 ? this._list[this.index()] : null;
};

Window_BookCommand.prototype.isCurrentItemEnabled = function() {
    return this.currentData() ? this.currentData().enabled : false;
};

Window_BookCommand.prototype.currentSymbol = function() {
    return this.currentData() ? this.currentData().symbol : null;
};

Window_BookCommand.prototype.currentExt = function() {
    return this.currentData() ? this.currentData().ext : null;
};

Window_BookCommand.prototype.findSymbol = function(symbol) {
    for (var i = 0; i < this._list.length; i++) {
        if (this._list[i].symbol === symbol) {
            return i;
        }
    }
    return -1;
};

Window_BookCommand.prototype.selectSymbol = function(symbol) {
    var index = this.findSymbol(symbol);
    if (index >= 0) {
        this.select(index);
    } else {
        this.select(0);
    }
};

Window_BookCommand.prototype.findExt = function(ext) {
    for (var i = 0; i < this._list.length; i++) {
        if (this._list[i].ext === ext) {
            return i;
        }
    }
    return -1;
};

Window_BookCommand.prototype.selectExt = function(ext) {
    var index = this.findExt(ext);
    if (index >= 0) {
        this.select(index);
    } else {
        this.select(0);
    }
};

Window_BookCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_BookCommand.prototype.itemTextAlign = function() {
    return 'left';
};

Window_BookCommand.prototype.isOkEnabled = function() {
    return true;
};

Window_BookCommand.prototype.callOkHandler = function() {
    var symbol = this.currentSymbol();
    if (this.isHandled(symbol)) {
        this.callHandler(symbol);
    } else if (this.isHandled('ok')) {
        Window_BookSelectable.prototype.callOkHandler.call(this);
    } else {
        this.activate();
    }
};

Window_BookCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_BookSelectable.prototype.refresh.call(this);
};

//=============================================================================
// Scene_BookBase
//=============================================================================

function Scene_BookBase() {
    this.initialize.apply(this, arguments);
};

Scene_BookBase.prototype = Object.create(Stage.prototype);
Scene_BookBase.prototype.constructor = Scene_BookBase;

Scene_BookBase.prototype.initialize = function() {
    Stage.prototype.initialize.call(this);
    this._active = false;
    this._fadeSign = 0;
    this._fadeDuration = 0;
    this._fadeSprite = null;
    this._imageReservationId = Utils.generateRuntimeId();
};

Scene_BookBase.prototype.attachReservation = function() {
    ImageManager.setDefaultReservationId(this._imageReservationId);
};

Scene_BookBase.prototype.detachReservation = function() {
    ImageManager.releaseReservation(this._imageReservationId);
};

Scene_BookBase.prototype.create = function() {
    this.createBackground();
    this.updateActor();
    this.createWindowLayer();
};

Scene_BookBase.prototype.actor = function() {
    return this._actor;
};

Scene_BookBase.prototype.updateActor = function() {
    this._actor = $gameParty.menuActor();
};

Scene_BookBase.prototype.isActive = function() {
    return this._active;
};

Scene_BookBase.prototype.isReady = function() {
    return ImageManager.isReady();
};

Scene_BookBase.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
};

Scene_BookBase.prototype.setBackgroundOpacity = function(opacity) {
    this._backgroundSprite.opacity = opacity;
};

Scene_BookBase.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    this.addWindow(this._helpWindow);
};

Scene_BookBase.prototype.nextActor = function() {
    $gameParty.makeMenuActorNext();
    this.updateActor();
    this.onActorChange();
};

Scene_BookBase.prototype.previousActor = function() {
    $gameParty.makeMenuActorPrevious();
    this.updateActor();
    this.onActorChange();
};

Scene_BookBase.prototype.onActorChange = function() {
};

Scene_BookBase.prototype.start = function() {
    this._active = true;
};

Scene_BookBase.prototype.update = function() {
    this.updateFade();
    this.updateChildren();
};

Scene_BookBase.prototype.stop = function() {
    this._active = false;
};

Scene_BookBase.prototype.isBusy = function() {
    return this._fadeDuration > 0;
};

Scene_BookBase.prototype.terminate = function() {
};

Scene_BookBase.prototype.createWindowLayer = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._windowLayer = new WindowLayer();
    this._windowLayer.move(x, y, width, height);
    this.addChild(this._windowLayer);
};

Scene_BookBase.prototype.addWindow = function(window) {
    this._windowLayer.addChild(window);
};

Scene_BookBase.prototype.startFadeIn = function(duration, white) {
    this.createFadeSprite(white);
    this._fadeSign = 1;
    this._fadeDuration = duration || 30;
    this._fadeSprite.opacity = 255;
};

Scene_BookBase.prototype.startFadeOut = function(duration, white) {
    this.createFadeSprite(white);
    this._fadeSign = -1;
    this._fadeDuration = duration || 30;
    this._fadeSprite.opacity = 0;
};

Scene_BookBase.prototype.createFadeSprite = function(white) {
    if (!this._fadeSprite) {
        this._fadeSprite = new ScreenSprite();
        this.addChild(this._fadeSprite);
    }
    if (white) {
        this._fadeSprite.setWhite();
    } else {
        this._fadeSprite.setBlack();
    }
};

Scene_BookBase.prototype.updateFade = function() {
    if (this._fadeDuration > 0) {
        var d = this._fadeDuration;
        if (this._fadeSign > 0) {
            this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
        } else {
            this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
        }
        this._fadeDuration--;
    }
};

Scene_BookBase.prototype.updateChildren = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

Scene_BookBase.prototype.popScene = function() {
    SceneManager.pop();
};

Scene_BookBase.prototype.checkGameover = function() {
    if ($gameParty.isAllDead()) {
        SceneManager.goto(Scene_Gameover);
    }
};

Scene_BookBase.prototype.fadeOutAll = function() {
    var time = this.slowFadeSpeed() / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
    this.startFadeOut(this.slowFadeSpeed());
};

Scene_BookBase.prototype.fadeSpeed = function() {
    return 24;
};

Scene_BookBase.prototype.slowFadeSpeed = function() {
    return this.fadeSpeed() * 2;
};

//=============================================================================
// Scene_BookMenuBase
//=============================================================================

function Scene_BookMenuBase() {
    this.initialize.apply(this, arguments);
}

Scene_BookMenuBase.prototype = Object.create(Scene_BookBase.prototype);
Scene_BookMenuBase.prototype.constructor = Scene_BookMenuBase;

Scene_BookMenuBase.prototype.initialize = function() {
    Scene_BookBase.prototype.initialize.call(this);
};

Scene_BookMenuBase.prototype.create = function() {
    Scene_BookBase.prototype.create.call(this);
    this.createBackground();
    this.updateActor();
    this.createWindowLayer();
};

Scene_BookMenuBase.prototype.actor = function() {
    return this._actor;
};

Scene_BookMenuBase.prototype.updateActor = function() {
    this._actor = $gameParty.menuActor();
};

Scene_BookMenuBase.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
};

Scene_BookMenuBase.prototype.setBackgroundOpacity = function(opacity) {
    this._backgroundSprite.opacity = opacity;
};

Scene_BookMenuBase.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    this.addWindow(this._helpWindow);
};

Scene_BookMenuBase.prototype.nextActor = function() {
    $gameParty.makeMenuActorNext();
    this.updateActor();
    this.onActorChange();
};

Scene_BookMenuBase.prototype.previousActor = function() {
    $gameParty.makeMenuActorPrevious();
    this.updateActor();
    this.onActorChange();
};

Scene_BookMenuBase.prototype.onActorChange = function() {
};