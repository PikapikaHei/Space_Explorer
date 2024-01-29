namespace SpriteKind {
    export const Asteroid = SpriteKind.create()
}
namespace StatusBarKind {
    export const Height = StatusBarKind.create()
}
function menu () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("1c - Rocky Body" + boughtItems[0])
    )
    myMenu.setTitle("SHOP")
    shopOpen = 1
}
statusbars.onStatusReached(StatusBarKind.Height, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    statusbar.max = statusbar.max * 10
})
info.onCountdownEnd(function () {
    let unlocked = 0
    if (unlocked == 0) {
        spawn(1)
    }
    info.startCountdown(spawnSpeed)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite, otherSprite) {
    statusbar.setColor(7, 13, 9)
    tmp = 1
    if (boughtItems[0] == " [Bought]") {
        tmp += 1
    }
    statusbar.value += 15 * tmp
    timer.after(500, function () {
        statusbar.setColor(2, 13, 4)
    })
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.fire, 200)
})
function spawn (_type: number) {
    if (_type == 1) {
        asteroid = sprites.createProjectileFromSide(assets.image`Asteroid`, randint(-10, 10), randint(-10, 10))
        asteroid.setKind(SpriteKind.Asteroid)
        asteroid.setPosition(randint(0, 160), randint(0, 120))
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shopOpen == 0) {
        menu()
    } else {
        myMenu.close()
        shopOpen = 0
    }
})
let heightTutorial = 0
let asteroid: Sprite = null
let tmp = 0
let shopOpen = 0
let myMenu: miniMenu.MenuSprite = null
let boughtItems: string[] = []
let spawnSpeed = 0
let statusbar: StatusBarSprite = null
effects.starField.startScreenEffect()
let mySprite = sprites.create(assets.image`Pointer`, SpriteKind.Player)
controller.moveSprite(mySprite, 50, 50)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
statusbar = statusbars.create(102, 6, StatusBarKind.Height)
statusbar.setColor(2, 13, 4)
statusbar.setBarBorder(1, 1)
statusbar.setLabel("0m", 1)
statusbar.positionDirection(CollisionDirection.Bottom)
statusbar.value = 0
statusbar.max = 100
let heightIncrease = 1
spawnSpeed = 1.5
info.startCountdown(spawnSpeed)
info.setScore(0)
boughtItems = [""]
for (let index = 0; index < 10000; index++) {
    boughtItems.push("")
}
forever(function () {
    if (shopOpen == 1) {
        myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                if (boughtItems[0] == "") {
                    if (info.score() >= 1) {
                        boughtItems[0] = " [Bought]"
                        game.splash("Asteroid payout x2!")
                        info.changeScoreBy(-1)
                    } else {
                        game.splash("NOT ENOUGH MONEY!")
                    }
                }
            }
            myMenu.close()
            menu()
        })
    }
})
forever(function () {
    if (heightTutorial == 0) {
        if (statusbar.value >= 1) {
            game.showLongText("Press Menu to open and close the shop.", DialogLayout.Bottom)
            game.showLongText("B = buy | Up/Down to move", DialogLayout.Bottom)
            heightTutorial = 1
        }
    }
})
game.onUpdateInterval(100, function () {
    statusbar.value += heightIncrease
    statusbar.setLabel("" + statusbar.value + "m", 1)
})
