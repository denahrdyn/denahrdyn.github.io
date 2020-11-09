var dbPromised = idb.open("TopScores", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("favTeam")) {
        upgradeDb.createObjectStore("favTeam", {
            keyPath: "id"
        });
    }
});

function saveFavorite(team) {
    dbPromised
    .then(db => {
        var tx = db.transaction("favTeam", "readwrite");
        var store = tx.objectStore("favTeam");
        store.put(team);
        return tx.complete;
    })
    .then(() => {
        M.toast({html: 'Team was successfully added'})
    })
}

function getAllFavorite() {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("favTeam", "readonly");
            var store = tx.objectStore("favTeam");
            return store.getAll();
        })
        .then(function (teams) {
            resolve(teams);
        });
    })
}

function deleteFavorite(idteam) {
    dbPromised.then(function (db) {
        var tx = db.transaction("favTeam", "readwrite");
        var store = tx.objectStore("favTeam");
        store.delete(idteam);
        return tx.complete;
    })
    .then(function () {
        M.toast({html: 'Team was successfully deleted!'})
        location.reload();
    });
}