export default class NotiError extends Error{
    constructor(message, name){
        this.name = name;
        this.message = message;
    }
    createNewError(message, name){
        
    }
}