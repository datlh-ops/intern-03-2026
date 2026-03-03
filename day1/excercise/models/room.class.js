class Room{
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.isRented = false;
    }
    markAsRented(){
        this.isRented = true;
    }
    markAsAvailable(){
        this.isRented = false;
    }
    Income(){
        if(this.isRented){
            return this.price;
        }
    }
}
export default Room;