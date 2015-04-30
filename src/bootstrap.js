const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");
var self = this, doc, window, thisAddon;
var BTN_ID = 'lolMatchHistory';

function include(addon, path) {
    Services.scriptloader.loadSubScript(addon.getResourceURI(path).spec, self);
}

function eachWindow(callback) {
    let enumerator = Services.wm.getEnumerator("navigator:browser");
    while (enumerator.hasMoreElements()) {
        let win = enumerator.getNext();
        if (win.document.readyState === "complete") {
            callback(win);
        } else {
            runOnLoad(win, callback);
        }
    }
}

function runOnLoad (win, callback) {
    win.addEventListener("load", function() {
        win.removeEventListener("load", arguments.callee, false);
        callback(win);
    }, false);
}

function loadIntoWindow(win) {
    if (!win) return;
    doc = win.document;
    var icon = thisAddon.getResourceURI("content/icon-btn.png").spec;
    addToolbarBtn(BTN_ID, "LOL stats", icon, 'Show match stats');
}

function startup(data, reason) AddonManager.getAddonByID(data.id, function(addon) {
    thisAddon = addon;
    include(addon, "content/main.js");

    eachWindow(loadIntoWindow);
});


function shutdown(aData, aReason) {
    doc.getElementById(BTN_ID).remove()
}

function install(aData, aReason) {}

function uninstall(aData, aReason) {}
