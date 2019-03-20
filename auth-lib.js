var arrOfUsers = window.fakeData.users;
var arrOfDeletedUsers = window.fakeData.deletedUsers;
var arrOfGroups = window.fakeData.groups;
var arrOfRights = window.fakeData.rights;
var rightCounter = 0;
var groupCounter = 0;
var currentSession = {
    user: undefined,
    emulUser: undefined
};

function isGoodParams(arguments) {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] == null || arguments[i] == undefined) {
            return false;
        }
    }
    return true;
}

function findSubstabce(name, structure) {
    const structureToSearch = {
        arrOfUsers: function (name) {
            for (let i = 0; i < arrOfUsers.length; i++) {
                if (arrOfUsers[i].nickname == name) {
                    return arrOfUsers[i];
                }
            }
        },
        arrOfGroups: function (name) {
            for (let i = 0; i < arrOfGroups.length; i++) {
                if (arrOfGroups[i].name == name) {
                    return arrOfGroups[i];
                }
            }
        },
        arrOfRights: function (name) {
            for (let i = 0; i < arrOfRights.length; i++) {
                if (arrOfRights[i] == name) {
                    return arrOfRights[i];
                }
            }
        }
    }

    return structureToSearch[structure](name);
}

function createUser(username, password) {
    var newUser = {
        nickname: username,
        password: password,
        groups  : []
    }
    var newUserIndex = arrOfUsers.push(newUser) - 1;

    return arrOfUsers[newUserIndex];
};

function deleteUser(user) {
    var args = deleteUser.arguments;
    if (!isGoodParams(args)) {
        throw new Error('Аргументы не той системы.');
    }

    if (arrOfDeletedUsers.includes(user)) {
        throw new Error('Пользователь уже был удалён');
    }

    for(let i = 0; i < arrOfUsers.length; i++) {
        var isThisUser = arrOfUsers[i] == user;
        if(isThisUser) {
            var indexToDel = i;
        }
    }
    var userToDel = arrOfUsers.splice(indexToDel, 1);
    arrOfDeletedUsers = arrOfDeletedUsers.concat(userToDel);  
};

function users() {
    return arrOfUsers;
};

function createGroup(name = 'fakeGroup') {
    var groupName = name;
    arrOfGroups.forEach(function (it) {
        if (it.name == groupName) {
            groupName += groupCounter++;
        }
    });
    var newGroup = {
        name : groupName,
        groupRights : []
    };
    var newGroupIndex = arrOfGroups.push(newGroup) - 1;
    return arrOfGroups[newGroupIndex];
};

function deleteGroup(group) {
    var args = deleteGroup.arguments;
    if (!isGoodParams(args)) {
        throw new Error('Аргументы не той системы.');
    }

    if (!arrOfGroups.includes(group)) {
        throw new Error('Группы не существует/уже удалена.');
    }

    arrOfGroups.forEach(function (it, index, arr) {
        if (it == group) {
            arr.splice(index, 1);
        }
    });

    arrOfUsers.forEach(function (it) {
        if (it.groups.includes(group)) {
            it.groups.forEach(function (elem, index, arr) {
                if (elem == group) {
                    arr.splice(index, 1);
                }
            });
        }
    })
};

function groups() {
    return arrOfGroups;
};

function addUserToGroup(user, group) {
    var args = addUserToGroup.arguments;   

    if (!isGoodParams(args)) {
        throw new Error('Аргументы не той системы.');
    }
    if(!arrOfGroups.includes(group)) {
        throw new Error('Группы не существует.');
    }
    if(arrOfDeletedUsers.includes(user)) {
        throw new Error('Этот пользователь был удалён.');
    }

    arrOfUsers.forEach(function (it) {
        if (it == user) {
            it.groups.push(group);
        }
    });
};

function userGroups(user) {
    var userGroups;
    arrOfUsers.forEach(function (it) {
        if (it == user) {
            userGroups = it.groups;
        }
    });
    return userGroups;
};

function removeUserFromGroup(user, group) {
    var args = removeUserFromGroup.arguments;
    if(!isGoodParams(args)) {
        throw new Error('Аргументы не той системы.');
    }

    if(arrOfDeletedUsers.includes(user)) {
        throw new Error('Пользователь был удалён.');
    }

    if (!arrOfGroups.includes(group)) {
        throw new Error('Группы не существует/была удалена');
    }

    arrOfUsers.forEach(function(it) {
        if (it == user) {
            if (!it.groups.includes(group)) {
                throw new Error('Пользователь не состоит в этой группе');
            }
            for (let i = 0; i < it.groups.length; i++) {
                if (it.groups[i] == group) {
                    it.groups.splice(i, 1);
                }
            }
        }
    });
};

function createRight(right = 'fakeRight') {
    var newRight = right;
    if (arrOfRights.includes(newRight)) {
        newRight += rightCounter++;
    }
    var newRightIndex = arrOfRights.push(newRight) - 1;
    return arrOfRights[newRightIndex];
};

function deleteRight(right) {
    var args = deleteRight.arguments;
    if (!isGoodParams(args)) {
        throw new Error('Параметры не той системы.');
    }

    if(!arrOfRights.includes(right)) {
        throw new Error('Права не существует/уже удалено.');
    }

    for (let i = 0; i < arrOfRights.length; i++) {
        if (arrOfRights[i] == right) {
            arrOfRights.splice(i, 1);
        }
    }

    arrOfGroups.forEach(function (it) {
        if (it.groupRights.includes(right)) {
            it.groupRights.forEach(function (elem, index, arr) {
                if (elem == right) {
                    arr.splice(index, 1);
                }
            });
        }
    });
};

function groupRights(group) {
    return group.groupRights;
};

function rights() {
    return arrOfRights;
};

function addRightToGroup(right, group) {
    var args = addRightToGroup.arguments;
    if (!isGoodParams(args)) {
        throw new Error('Параметры не той системы.');
    }

    if (!arrOfGroups.includes(group)) {
        throw new Error('Группы не существует/уже удалена.');        
    }

    if (!arrOfRights.includes(right)) {
        throw new Error('Права не существует/уже удалено.');
    }

    arrOfGroups.forEach(function (it) {
        if (it == group) {
            it.groupRights.push(right);
        }
    });
};

function removeRightFromGroup(right, group) {
    if (!arrOfGroups.includes(group)) {
        throw new Error('Группы не существует/уже удалена.');
    }

    if (!arrOfRights.includes(right)) {
        throw new Error('Права не существует/уже удалено.');
    }

    if (!group.groupRights.includes(right)) {
        throw new Error('Права нет в группе');
    }

    arrOfGroups.forEach(function (it) {
        if (it == group) {
            it.groupRights.forEach(function (elem, index, arr) {
                if (elem == right) {
                    arr.splice(index, 1);
                }
            });
        }
    });
};

function login(username, password) {
    if (currentSession.user && currentSession.user.nickname == username) {
        return false;
    }

    var isTrueLogin = false;
    arrOfUsers.forEach(function (it) {
        if (username == it.nickname && password == it.password) {
            currentSession.user = it;
            isTrueLogin = true;
        }
    });
    return isTrueLogin;
};

function currentUser() {
    return currentSession.emulUser || currentSession.user;
};

function logout() {
    if (currentSession.emulUser) {
        currentSession.emulUser = undefined;
    } else currentSession.user = undefined;
};

function isAuthorized(user, right) {
    var args = isAuthorized.arguments;
    if (!isGoodParams(args)) {
        throw new Error('Параметры не той системы.');
    }

    var isUserDeleted = false;
    var isRightDeleted = false;
    if (arrOfDeletedUsers.includes(user)) {
        isUserDeleted == true;
    }
    if (!arrOfRights.includes(right)) {
        isRightDeleted = true
    }
    if (isUserDeleted) {
        throw new Error('Пользователь был удалён.');
    }
    if (isRightDeleted) {
        throw new Error('Права не существует/удалено.');
    }

    var isHaveRight = false;
    var userGroups;
    var userRights = [];
    arrOfUsers.forEach(function (it) {
        if (it == user) {
            userGroups = it.groups;
        }
    });
    arrOfGroups.forEach(function (it) {
        userGroups.forEach(function (elem) {
            if (it == elem) {
                userRights = userRights.concat(it.groupRights);
            }
        });
    });
    userRights.forEach(function (it) {
        if (it == right) {
            isHaveRight = true;
        }
    });

    return isHaveRight;
};
// Дополнительные задания
function guestsEnter() {
    const GUESTS_NICK = 'guest';
    const GUEST_PASSWORD = '';

    login(GUESTS_NICK, GUEST_PASSWORD);
}

function loginAs (user) {
    const session = currentUser();
    const necessaryRight = findSubstabce('login as', 'arrOfRights');
    if (isAuthorized(session, necessaryRight)) {
        currentSession.emulUser = user;
    }
}

function securityWrapper (action, right) {
    const session = currentUser();
    const returnedFunction = function () {
        action.apply(null, arguments);

        for (let i = 0; i < listOfListeners.length; i++) {
            listOfListeners[i](session, action);
        }
    }

    if (isAuthorized(session, right)) {
        return returnedFunction;
    } else console.log('Аутентификация не пройдена.');
}

const listOfListeners = [];

function addActionListener (listener) {
    listOfListeners.push(listener);
}