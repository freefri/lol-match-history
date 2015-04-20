var MatchHistory = window.MatchHistory || {};

MatchHistory.round2 = function (num) {
    return Math.round(num * 100) / 100;
};

function Printable (data) {
    this.data = {};
    if (data !== undefined) {
        this.data = data;
    }
    this.addKey = function (key, data) {
        data[key] = data;
    };
    this.getHeader = function () {
        var open = "<tr>",
            close = "</tr>",
            inside = "<td>champion</td>";
        for (var key in this.data) {
            inside += "<td class='sortable'>"+key+"</td>";
        }
        return open + inside + close;
    };
    this.getTR = function () {
        var open = "<tr>",
            close = "</tr>",
            inside = "<td class='rowHead clickable'>"+this._getChampName(this.data.champId)+"</td>";
        for (var key in this.data) {
            inside += "<td class='bg"+this._getRange(key)+"' title='"+key+"'>"+this.data[key]+"</td>";
        }
        return open + inside + close;
    };
    this._getRange = function (key) {
        var value = this.data[key],
            thresholds = {
                length: [8, 16],
                gameDuration: [32, 38],
                win: [0.33, 0.66],
                kills: [5, 8],
                deaths: [8, 5],
                assists: [12, 16],
                goldEarned: [9000, 11000],
                dmgToChamps: [14000, 21000],
                totalCS: [160, 210],
                neutralCS: [35, 50],
                wardsPlaced: [7, 15],
                cs0010: [2, 4.5],
                cs1020: [3, 6],
                cs0020: [2.5, 5.3],
                csMin: [2.5, 5.3],
                kda: [1.5, 3.5]
            };
        if (!thresholds[key]) {
            return 0;
        }
        var	min = thresholds[key][0],
            max = thresholds[key][1],
            step = (max - min) / 4,
            isReverseScale = max < min,
            ranges = {
                1: min - 3 * step,
                2: min - step,
                3: min + step,
                4: min + 3 * step,
                5: min + 5 * step,
                6: min + 7 * step,
            };
        for (var key in ranges) {
            if (isReverseScale) {
                if (value > ranges[key]) {
                    return key;
                }
            } else {
                if (value < ranges[key]) {
                    return key;
                }
            }
        }
        return 7;
    };
    this._getChampName = function (id) {
        var champs = {
            1: 'Annie',
            2: 'Olaf',
            3: 'Galio',
            4: 'TwistedFate',
            5: 'XinZhao',
            6: 'Urgot',
            7: 'Leblanc',
            8: 'Vladimir',
            9: 'FiddleSticks',
            10: 'Kayle',
            11: 'MasterYi',
            12: 'Alistar',
            13: 'Ryze',
            14: 'Sion',
            15: 'Sivir',
            16: 'Soraka',
            17: 'Teemo',
            18: 'Tristana',
            19: 'Warwick',
            20: 'Nunu',
            21: 'MissFortune',
            22: 'Ashe',
            23: 'Tryndamere',
            24: 'Jax',
            25: 'Morgana',
            26: 'Zilean',
            27: 'Singed',
            28: 'Evelynn',
            29: 'Twitch',
            30: 'Karthus',
            31: 'Chogath',
            32: 'Amumu',
            33: 'Rammus',
            34: 'Anivia',
            35: 'Shaco',
            36: 'DrMundo',
            37: 'Sona',
            38: 'Kassadin',
            39: 'Irelia',
            40: 'Janna',
            41: 'Gangplank',
            42: 'Corki',
            43: 'Karma',
            44: 'Taric',
            45: 'Veigar',
            48: 'Trundle',
            50: 'Swain',
            51: 'Caitlyn',
            53: 'Blitzcrank',
            54: 'Malphite',
            55: 'Katarina',
            56: 'Nocturne',
            57: 'Maokai',
            58: 'Renekton',
            59: 'JarvanIV',
            60: 'Elise',
            61: 'Orianna',
            62: 'Wukong',
            63: 'Brand',
            64: 'LeeSin',
            67: 'Vayne',
            68: 'Rumble',
            69: 'Cassiopeia',
            72: 'Skarner',
            74: 'Heimerdinger',
            75: 'Nasus',
            76: 'Nidalee',
            77: 'Udyr',
            78: 'Poppy',
            79: 'Gragas',
            80: 'Pantheon',
            81: 'Ezreal',
            82: 'Mordekaiser',
            83: 'Yorick',
            84: 'Akali',
            85: 'Kennen',
            86: 'Garen',
            89: 'Leona',
            90: 'Malzahar',
            91: 'Talon',
            92: 'Riven',
            96: 'KogMaw',
            98: 'Shen',
            99: 'Lux',
            101: 'Xerath',
            102: 'Shyvana',
            103: 'Ahri',
            104: 'Graves',
            105: 'Fizz',
            106: 'Volibear',
            107: 'Rengar',
            110: 'Varus',
            111: 'Nautilus',
            112: 'Viktor',
            113: 'Sejuani',
            114: 'Fiora',
            115: 'Ziggs',
            117: 'Lulu',
            119: 'Draven',
            120: 'Hecarim',
            121: 'Khazix',
            122: 'Darius',
            126: 'Jayce',
            127: 'Lissandra',
            131: 'Diana',
            133: 'Quinn',
            134: 'Syndra',
            143: 'Zyra',
            150: 'Gnar',
            154: 'Zac',
            157: 'Yasuo',
            161: 'Velkoz',
            201: 'Braum',
            222: 'Jinx',
            236: 'Lucian',
            238: 'Zed',
            254: 'Vi',
            266: 'Aatrox',
            267: 'Nami',
            268: 'Azir',
            412: 'Thresh',
            421: 'RekSai',
            429: 'Kalista',
            432: 'Bard'
        };
        if (champs[id]) {
            return champs[id];
        } else {
            return id;
        }
    }
}

function Games () {
    this.games = [];
    this.push = function (x) {
        this.games.push(x);
    };
    this.getSumStats = function () {
        var sumStats = this.games[0];
        this.games.forEach(function (e,i) {
            if (i > 0) {
                sumStats.sum(e);
            }
        });
        return sumStats.getSumatory();
    };
    this.getAvgStats = function () {
        var avg = {},
            champSum = this.getSumStats();
        for (var key in champSum) {
            avg[key] = MatchHistory.round2(champSum[key] / champSum.length);
        }
        avg.length = champSum.length;
        return avg;
    };
    this.forEach = function (f, i) {
        this.games.forEach(f,i);
    }
}

function Download (amountQueries, callback) {
    this.callback = callback;
    this.games = new Games();
    this.queries = amountQueries;
    this.done = 0;
    this.isFinished = function () {
        return this.queries == this.done;
    };
    this.addQuery = function () {
        this.done++;
    };
    this.push = function (x) {
        this.games.push(x);
    };
    this.getLen = function () {
        return this.games.length;
    };
    this.getAvgByChamp = function () {
        var agvs = {},
            arrayRet = [],
            byChamp = this.getByChamp();
        for (var key in byChamp) {
            agvs[key] = byChamp[key].getAvgStats();
        }

        for (var champId in agvs) {
            agvs[champId].champId = champId;
            arrayRet.push(agvs[champId]);
        }
        return arrayRet;
    };
    this.getByChamp = function () {
        var byChamp = {};
        this.games.forEach(function (g) {
            if (byChamp[g.getChamp()] === undefined) {
                byChamp[g.getChamp()] = new Games();
            }
            byChamp[g.getChamp()].push(g);
        });
        return byChamp;
    }
}

function Game (data) {
    this.data = data;
    this.sumatory = undefined;
    this.isValid = function () {
        var d = this.getData();
        return d.seasonId >= 5 && d.gameMode === "CLASSIC" && d.queueId === 2;// && d.gameType === "MATCHED_GAME";
    };
    this.getChamp = function () {
        return this.data.participants[0].championId;
    };
    this.sum = function (sum) {
        this.sumatory = this.getSumatory();
        var statsToSum = sum.getSumStats();
        for (var key in this.sumatory) {
            this.sumatory[key] = this.sumatory[key] + statsToSum[key];
        }
        return this;
    };
    this.getSumatory = function () {
        if (this.sumatory === undefined) {
            return this.getSumStats();
        }
        return this.sumatory;
    };
    this.getSumStats = function () {
        var r = this.data,
            stats = r.participants[0].stats,
            t = r.participants[0].timeline,
            ret;
        ret = {
            'length' : 1,
            'gameDuration' : MatchHistory.round2(r.gameDuration / 60),
            'win' : stats.win,
            'kills' : stats.kills,
            'deaths' : stats.deaths,
            'assists' : stats.assists,
            'goldEarned' : stats.goldEarned,
            'dmgToChamps' : stats.totalDamageDealtToChampions,
            'totalCS' : stats.totalMinionsKilled,
            'neutralCS' : stats.neutralMinionsKilled,
            //'neutralMinionsKilledTeamJungle': stats.neutralMinionsKilledTeamJungle ? stats.neutralMinionsKilledTeamJungle : '',
            //'neutralMinionsKilledEnemyJungle' : stats.neutralMinionsKilledEnemyJungle ? stats.neutralMinionsKilledEnemyJungle : '',
            'wardsPlaced' : stats.wardsPlaced ? stats.wardsPlaced : '',
            'cs0010' : t && t.creepsPerMinDeltas ? t.creepsPerMinDeltas["0-10"] : 0,
            'cs1020' : t && t.creepsPerMinDeltas ? t.creepsPerMinDeltas["10-20"] : 0
        };
        ret.kda = (ret.kills + ret.assists) / (ret.deaths ? ret.deaths : 1);
        ret.csMin = ret.totalCS / ret.gameDuration;
        ret.cs0020 = (ret.cs0010 + ret.cs1020) / 2;
        return ret;
    };
    this.getData = function() {
        var r = this.data,
            p = r.participants[0];
        // TODO merge this.getSumStats()
        return {
            'id' : r.gameId,
            //'championName' : $this->_getChampName(r->participants[0]->championId),
            'championId' : p.championId,
            'gameCreation' : r.gameCreation,//(new DateTime())->setTimestamp(r->gameCreation),
            'mapId' : r.mapId,
            'seasonId' : r.seasonId,
            'gameVersion' : (r.gameVersion) ? r.gameVersion : '',
            'gameMode' : r.gameMode,
            'gameType' : r.gameType,
            'queueId' : r.queueId,
            'role' : (p.timeline && p.timeline.role) ? p.timeline.role : '',
            'lane' : (p.timeline && p.timeline.lane) ? p.timeline.lane : ''
            //'stats' : r->participants[0]->stats,
            //'timeline' : r->participants[0]->timeline,
        };
    };
}

MatchHistory.finished = function () {
    //console.log('downloadFinished', MatchHistory.fullResult);
    MatchHistory.resByChamp = MatchHistory.fullResult.getAvgByChamp();
    if (MatchHistory.fullResult.callback !== undefined) {
        MatchHistory.fullResult.callback(MatchHistory.resByChamp);
    }

    MatchHistory.printTable();
    console.log('MatchHistory.resByChamp', MatchHistory.resByChamp);
};
MatchHistory.sort = function (array, field) {
    var direction = 1;
    if (field === MatchHistory.lastSort) {
        direction *= -1;
    }
    MatchHistory.lastSort = field;
    if (field.substring(0,1) == '-') {
        direction *= -1;
        field = field.substring(1);
    }
    return array.sort(function (a, b) {
        if (a[field] < b[field]) {
            return -1 * direction;
        }
        if (a[field] > b[field]) {
            return direction;
        }
        // a must be equal to b
        return 0;
    })
};
MatchHistory.printTable = function (order) {
    if (!order) {
        order = '-win';
    }
    var table = (function () {
        document.getElementsByTagName('body').item(0).remove();
        var head = document.getElementsByTagName('head').item(0);
        head.parentNode.insertBefore(document.createElement('body'), head);
        var body = document.getElementsByTagName('body').item(0);
        body.innerHTML = "<table id='table' style='width:100%; background-color:white'></table>";
        var table = document.getElementById('table');
        head.innerHTML = "<title>LOL stats</title><style>tr.active{outline: 2px solid #000;} .sortable, .clickable { cursor: pointer;} .sortable:hover, .clickable:hover { text-decoration: underline; color: #0000EE;} .bg1 {background-color:#ff0000;} .bg2{background-color:#ff7700;} .bg3{background-color:#ffcc00;} .bg4{background-color:#ffff00;} .bg5{background-color:#aaff00;} .bg6{background-color:#55aa00;} .bg7{background-color:#00aa00;} </style>";
        return table
    })();
    
    var row,
        inTable = "",
        isHeaderPrinted = false,
        arrayToPrint = MatchHistory.sort(MatchHistory.resByChamp, order);

    arrayToPrint.forEach(function (element) {
        row = new Printable(element);
        if (!isHeaderPrinted) {
            inTable += row.getHeader();
            isHeaderPrinted = true;
        }
        inTable += row.getTR();
    });
    table.innerHTML = inTable;

    (function () {
        var list = document.getElementsByClassName('rowHead');
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function (e) {
                e.target.parentElement.className = (e.target.parentElement.className)
                    ? '' : 'active';
            });
        }
    })();

    (function () {
        var list = document.getElementsByClassName('sortable');
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function (e) {
                MatchHistory.printTable('-' + e.target.innerHTML);
            });
        }
    })();
};

MatchHistory.download = function (limit, callback) {
	var region = MatchHistory.region.toUpperCase(),
		id = MatchHistory.sumID;
	if (!id || id[1] === '{') {
		console.error('Input the summoner ID i.e. MatchHistory.sumID = "22266688"');
		return;
	}
	if (!region || region[1] === '{') {
		console.error('Input the region i.e. MatchHistory.region = "EUW"');
		return;
	}
	if (!MatchHistory.authorization || MatchHistory.authorization[1] === '{') {
		console.error('Input the auth code i.e. MatchHistory.authorization = "the code"');
		return;
	}
	if (!limit) {
		limit = 25;
	}
    var endpoint = 'https://acs.leagueoflegends.com/v1/stats/player_history/' +
    	region + '1/';
    var BIGGEST_QUERY = 20;
    var endParams2 = '&queue=0&queue=2&queue=4&queue=6&queue=7&queue=8&queue=9&queue=14&queue=16&queue=17&queue=25&queue=31&queue=32&queue=33&queue=41&queue=42&queue=52&queue=61&queue=65&queue=70&queue=73&queue=76&queue=78&queue=83&queue=91&queue=92&queue=93&queue=96&queue=98&queue=300';
    var endParams = '';
    var begin = currentBegin = 0;
    MatchHistory.fullResult = new Download(Math.ceil((limit - begin) / BIGGEST_QUERY), callback);

    function filterAllStats(array) {
        MatchHistory.fullResult.addQuery();
        var game;
        array.forEach(function (x) {
            game = new Game(x);
            if (game.isValid()) {
                MatchHistory.fullResult.push(game);
            }
        });
        if (MatchHistory.fullResult.isFinished()) {
            MatchHistory.finished();
        }
    }

    function _sendGet(url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    filterAllStats(myArr.games.games);
                } else {
                    console.error(xmlhttp.statusText, xmlhttp.response);
                }
            }
        };
        xmlhttp.open("GET",url,true);
        xmlhttp.setRequestHeader('Region', region);
        xmlhttp.setRequestHeader('Authorization', MatchHistory.authorization);
        xmlhttp.send();
    }
    var currentBegin = 0,
        currentEnd;
    for (var count = 1; count <= MatchHistory.fullResult.queries; count++) {
        currentEnd = count * BIGGEST_QUERY + begin;
        if (currentEnd > limit) {
            currentEnd = limit;
        }
        intervalParams = 'begIndex='+currentBegin+'&endIndex='+currentEnd;

        _sendGet(endpoint+id+'?'+intervalParams+endParams);
        currentBegin = currentEnd;
    }
};


// Autoload section
var MatchHistory = window.MatchHistory || {};
(function (url, id, cb) {
    if (MatchHistory.download) {return;}
    var d = document, s = 'script',
        js = d.createElement(s),
        fjs = d.getElementsByTagName(s)[0];
    js.id = id;js.src = '//' + url;
    if (!d.getElementById(id)) {
        if (cb) {js.addEventListener('load', function (e) {cb(null, e);}, false);}
        fjs.parentNode.insertBefore(js, fjs);
    } else {if(cb){cb();}}
})('raw.githubusercontent.com/freefri/lol-match-history/master/LOLmatch.js', 'lolmatch', function () {
	MatchHistory.authorization = "{AUTH_CODE}"
	MatchHistory.region = "{REGION}";
	MatchHistory.sumID = "{SUMMONER_ID}";
    MatchHistory.download();
});
