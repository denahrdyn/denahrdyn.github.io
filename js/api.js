let base_url = "https://api.football-data.org/v2/";
let authToken = "e0a4841c03bd425da42f716f65100c46"

// Blok kode untuk melakukan request data json
function getTeam() {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    fetch(`${base_url}competitions/${idParam}/teams`, {
        headers: {
            'X-Auth-Token': authToken
        }
    })
    .then(res=>{
        return res.json()
    })
    .then(resjson=>{
        showTeam(resjson)
    })
}

function showTeam(data) {
    let dataTeamHTML = ''
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
    data.teams.forEach(function(team) {
        dataTeamHTML += `
                <tr>
                    <td width="10%">
                        <div class="team-image">
                            <img src="${team.crestUrl}" alt="${team.name}">
                        </div>
                    </td>
                    <td>
                        <a href="detail.html?id=${team.id}">
                            ${team.name} 
                            <span>${team.area.name}</span>
                        </a>
                    </td>
                </tr>
            `
    });
    document.getElementById("team").innerHTML = dataTeamHTML;
}

function getStanding() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(`${base_url}competitions/${idParam}/standings`).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    showStanding(data);
                });
            }
        });
    }

    fetch(`${base_url}competitions/${idParam}/standings`, {
        headers: {
            'X-Auth-Token': authToken
        }
    })
    .then(res=>{
        return res.json()
    })
    .then(resjson=>{
        showStanding(resjson)
    })
}

function showStanding(data) {
    let tableStandingHTML = ''
    data.standings.forEach(function(standing) {
       let dataTableStanding = ''
        standing.table.forEach(function(club) {
            club = JSON.parse(JSON.stringify(club).replace(/^http:\/\//i, 'https://'));
            dataTableStanding += `
                <tr>
                    <td class="group" colspan="8">${standing.group}</td>
                </tr>
                <tr>
                    <td width="10%">
                        <a href="detail.html?id=${club.team.id}">
                            <div class="team-image">
                                <img src="${club.team.crestUrl}" alt="${club.team.name}">
                            </div>
                            <span class="team-name">${club.team.name}</span>
                        </a>
                    </td>
                    <td width="10%">${club.position}</td>
                    <td width="10%">${club.won}</td>
                    <td width="10%">${club.draw}</td>
                    <td width="10%">${club.lost}</td>
                    <td width="10%">${club.goalsFor}</td>
                    <td width="10%">${club.goalsAgainst}</td>
                    <td width="10%">${club.points}</td>
                </tr>
            `
        })

        tableStandingHTML += `
            <div class="card-standing">
                <div class="card s12">
                    <table>
                        <thead>
                            <tr>
                                <td width="10%">Team</td>
                                <td width="10%">P</td>
                                <td width="10%">W</td>
                                <td width="10%">D</td>
                                <td width="10%">L</td>
                                <td width="10%">F</td>
                                <td width="10%">A</td>
                                <td width="10%">PT</td>
                            </tr>
                        </thead>
                        <tbody>` + dataTableStanding + `</tbody>
                    </table>
                </div>
            </div>
        `
    });
    document.getElementById("standing").innerHTML = tableStandingHTML;
}

function detailTeam() {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}`).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        detailTeamHTML(data)
                        resolve(data);
                    });
                }
            }); 
        }

        fetch(`${base_url}teams/${idParam}`, {
            headers: {
                'X-Auth-Token': authToken
            }
        })
        .then(res=>{
            return res.json()
        })
        .then(resjson=>{
            detailTeamHTML(resjson);
            resolve(resjson);
        })
    })
}

function detailTeamHTML(data) {
    let dataSquadHTML = ''
    let tabelSquadHTML = ''
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    document.getElementById("namaTeam").innerHTML = data.name;
    document.getElementById("area").innerHTML = data.area.name;
    document.getElementById("logoTeam").src = data.crestUrl;
    
    data.squad.forEach(function(squad) {
        dataSquadHTML += `
            <tr>
                <td>${squad.name}</td>
                <td>${squad.position}</td>
                <td>${squad.nationality}</td>
            </tr>
        `
    });
    tabelSquadHTML += `
        <div class="card-player">
            <div class="card s12"> 
                <table>
                    <thead>
                        <tr>
                            <th width="33%">Player Name</th>
                            <th width="33%">Position</th>
                            <th width="33%">Nationality</th>
                        <tr>
                    </thead>
                    <tbody> ${dataSquadHTML}</tbody>
                </table>
            </div>
        </div>
    `
    document.getElementById("detailTeam").innerHTML = tabelSquadHTML;
}

function getSavedFavorite() {
    getAllFavorite().then(teams => {
        let favoriteHTML = ""
        if (teams.length == 0)
            favoriteHTML += `
                <div class="empty-content">
                    <img src="/assets/blank.png" alt="Empty Content">
                    <h5>Empty Team Favorited</h5>
                    <span>You don't have a favorite team yet. choose your favorite team.</span>
                </div>
            `;
        teams.forEach(team => {
            favoriteHTML += `
            <tr>
                <td width="10%">
                    <div class="team-image">
                        <img src="${team.crestUrl}" alt="${team.name}">
                    </div>
                </td>
                <td>
                    ${team.name} 
                        <span>${team.area.name}</span>
                    </a>
                </td>
                <td>
                    <a onclick="deleteOnClick(${team.id})">Hapus</a>
            </tr>`
        });
        document.getElementById("favoriteDiv").innerHTML = favoriteHTML;
    });
}

let deleteOnClick = idteam => {
    let confir = confirm("Delete from Favorite?");
    if (confir == true) {
        deleteFavorite(idteam);
    }
};