import { StorageService } from './StorageService'
import { UtilService } from './UtilService'

var loggedInUser = null
var key = 'loggedinUser';

async function getUser() {
    // although we get the user from the localstorage, this function is set as async.
    loggedInUser = await StorageService.load(key);
    return loggedInUser ? loggedInUser : null;
}
function signup(newUserName) {
    loggedInUser = {
        name: newUserName,
        coins: 100,
        moves: [],
    };
    StorageService.save(key, loggedInUser);
    return loggedInUser;
}

function addMove(contact, amount) {
    const newMove = {
        _id: UtilService.makeId(),
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount,
    }
    loggedInUser.moves.unshift(newMove)
    _updateCoins(amount)
    StorageService.save(key, loggedInUser);
    return loggedInUser
}

function _updateCoins(amount) {
    loggedInUser.coins -= amount
}


export const UserService = {
    addMove,
    getUser,
    signup
}