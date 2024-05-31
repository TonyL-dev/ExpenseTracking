//Guarantee random number gets generated. I don't want to use string a uid because it takes up too much space
export function uniqueId(){
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}