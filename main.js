//Пользователи
const eragon = createUser('eragon', 'sapphire');
const gendalf = createUser('gendalf', 'fireworks');
//Группы
const dragonRiders = createGroup('dragonRiders');
const wizards = createGroup('wizards');
const heroes = createGroup('heroes');
// Права
const rideDragon = createRight('rideDragon');
const castMagic = createRight('castMagic');
const giveAdvices = createRight('giveAdvices');
const travelALot = createRight('travelALot');

addRightToGroup(rideDragon, dragonRiders);
addRightToGroup(castMagic, dragonRiders);
addRightToGroup(giveAdvices, wizards);
addRightToGroup(castMagic, wizards);
addRightToGroup(travelALot, heroes);

addUserToGroup(eragon, dragonRiders);
addUserToGroup(eragon, heroes);
addUserToGroup(gendalf, wizards);
addUserToGroup(gendalf, heroes);

//Действия в системе

function tellSomethingWise () {
    const NEEDED_RIGHT = findSubstabce('giveAdvices', 'arrOfRights');
    const session = currentUser();

    if(!session) {
        console.log('Необходимо залогиниться!');
        return;
    }
    if(isAuthorized(session, NEEDED_RIGHT)) {
        console.log('...Неописуемо мудрое откровение...');
    } else {
        console.log('Вы не достаточно мудры для этого.');
    }
}

function flyOnDragon () {
    const NEEDED_RIGHT = findSubstabce('rideDragon', 'arrOfRights');
    const session = currentUser();

    if (!session) {
        console.log('Необходимо залогиниться!');
        return;
    }
    if (isAuthorized(session, NEEDED_RIGHT)) {
        console.log('...Отсюда прекрасный вид!...');
    } else {
        console.log('Вы не умеете летать на драконах.');
    }
}

//дополнительные задания
var loginAsRight = findSubstabce('login as', 'arrOfRights');
var adminsGroup = findSubstabce('admin', 'arrOfGroups');
var adminUser = findSubstabce('admin', 'arrOfUsers');
var patriotUser = findSubstabce('patriot007', 'arrOfUsers');

addRightToGroup(loginAsRight, adminsGroup);
addUserToGroup(adminUser, adminsGroup);

var secLoginAs = securityWrapper(loginAs, loginAsRight);

addActionListener(function (user, action) {
    console.log(`Пользователь ${user.nickname} только что сделал ${action.name}`);
});

addActionListener(function (user, action) {
    alert(`Пользователь ${user.nickname} только что сделал ${action.name}`);
});