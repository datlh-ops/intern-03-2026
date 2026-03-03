class User{
    constructor(name, age, job, rent, room, moveInDate, moveOutDate = null){
        this.name = name;
        this.age = age;
        this.job = job;
        this.rent = rent;
        this.room = room;
        this.moveInDate = new Date(moveInDate);
        this.moveOutDate = null;
    }
    getRentFee(){
        const monthlyPrice = this.room.price;
        const dailyPrice = 50;
        if(this.rent === "yes"){
            return monthlyPrice;
        }
        // update cách tính tiền phòng nếu người 
        if(this.moveOutDate){
            if(this.moveInDate.getMonth() === this.moveOutDate.getMonth() && this.moveInDate.getFullYear() === this.moveOutDate.getFullYear()){
                const daysStayed = Math.ceil(
                (this.moveOutDate - this.moveInDate) / (1000 * 60 * 60 * 24)
                );
                if(daysStayed < 15){
                    return daysStayed * dailyPrice;
                }
                else {
                    return monthlyPrice;
                }
            }
            else {
                const rentThisMonth = this.moveOutDate.getDate();
                if(rentThisMonth < 15){
                    return rentThisMonth * dailyPrice;
                }
                else {                    
                    return monthlyPrice;
                }
            }
        }
    }
    getInfo(){
        return `${this.name} - ${this.age} - ${this.job} - ${this.rent} - ${this.room.name} - ${this.moveInDate} - ${this.moveOutDate} } `;
    }
    showUserInfo(){
        console.log(this.getInfo());
    }
    showUserRentInformation(){
        console.log(`${this.name} - ${this.age} - ${this.job} - ${this.rent} - ${this.room.name} - ${this.moveInDate} - ${this.moveOutDate} } `);
    }
    updateRentStatus(){
    if(this.rent === "yes"){
        this.rent = "no";
        this.moveOutDate = new Date();
        this.room.markAsAvailable(); 
    } else {
        this.rent = "yes";
        this.moveInDate = new Date(); 
        this.moveOutDate = null;
        this.room.markAsRented();
        }
    }
}
export default User;