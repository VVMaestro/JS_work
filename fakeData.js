(function () {

    var users = [
        { nickname: "admin", password: "1234", groups: [] },
        { nickname: "sobakajozhec", password: "ekh228", groups: [] },
        { nickname: "patriot007", password: "russiaFTW", groups: [] },
        { nickname: "guest", password: "", groups: [] }
    ];

    var rights = ["manage content", "play games", "delete users", "view site", "login as"];

    var groups = [
        { 
            name: "admin", 
            groupRights: [rights[1], rights[2], rights[3], rights[4]]
        },
        {
            name: "manager",
            groupRights: [rights[0]]
        },
        {
            name: "basic",
            groupRights: [rights[1], rights[3]]
        }
    ]

    var deletedUsers = [];

    window.fakeData = {
        "users"        : users,
        "rights"       : rights,
        "groups"       : groups,
        "deletedUsers" : deletedUsers
    }

})();