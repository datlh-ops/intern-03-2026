class Master{
    constructor(name){
        this.name = name;
        this.users = [];
        this.rooms = [];
    }
    addUser(user){
        this.users.push(user);
    }
    addRoom(room){
        this.rooms.push(room);
    }
    kickUser(){
        this.users = this.users.filter(user => user.rent != "no");
    }
    calculateRentMoney(){
        let total = 0;
        for(const i of this.users){
            total+= i.getRentFee();
        }
        return total;
    }
    showMasterInfo(){
        console.log( `chu tro ${this.name}`);
    }
    showUsers(){
        console.log(`thong tin nguoi thue nha ${this.name}`);
        this.users.forEach(t=> console.log(t.getInfo()))
    }
    showHighestIncomeRoom(){
        if(this.rooms.length === 0){
            console.log("khong co phong tro nao");
            return;
        }
        let highestIncomeRoom = this.rooms[0];
        let highestIncome = highestIncomeRoom.price;
        for(const room of this.rooms){
            const income = room.price;
            if(income > highestIncome){
                highestIncome = income;
                highestIncomeRoom = room;
            }
        }
        console.log(`phong tro co doanh thu cao nhat: ${highestIncomeRoom.name} - Doanh thu: ${highestIncomeRoom.price}`);
    }
    showAvailableRooms(){
        const availableRooms = this.rooms.filter(room => !room.isRented);
        availableRooms.forEach(room => {
            console.log(`Phong trống: ${room.name}`);
        });
    }
}
export default Master;