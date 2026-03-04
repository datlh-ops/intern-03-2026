class Room{
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.isRented = false;
        this.user=null;
    }
    markAsRented(user){
        this.isRented = true;
        this.user=user ;
    }
    markAsAvailable(){
        this.isRented = false;
        this.user = null;
    }
    Income(){
        if(this.isRented){
            return this.price;
        }
    }
}
export default Room;