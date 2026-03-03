//cấu trúc dữ liệu của user,master là mảng các object 
let user = [
    {
        name: "dat",
        age: 20,
        job: "student",
        roomName : 101,
        master : "Vu"
    },
    {
        name: "minh",
        age: 20, 
        job: "student",
        roomName : 102,
        master : "Vu",
    },
]
let master =[
    {
        name: "Vu",
        age: 30,
    },
    {
        name : "quang",
        age : 30,
    }
]
// thông tin khách hàng 
console.log("Thong tin khach hang:");
for(let i =0;i<user.length;i++){
    console.log(user[i].name);
    console.log(user[i].age);
    console.log(user[i].job);
    console.log(user[i].roomName);
    console.log("-------------");
}

// hàm tính tiền phòng 
function countTheMoney(master, user){
    let userNumber = user.length;
    let i =0;
    let moneyEarn = 0;
    while(i<userNumber){
        if(master.name == user[i].master){
            moneyEarn += 100;
        }
        i++;
    }
    return moneyEarn;
    
}
//thông tin chủ phòng và số tiền thu được
console.log("Thong tin chu phong:");
for(let i =0;i<master.length;i++){
    console.log("Ten: "+ master[i].name);
    console.log("Tien thu duoc: " + countTheMoney(master[i], user));
    console.log("-------------");
}
console.log("***********************");

// lời giải 2 (OOP)
// user : người thuê 
class User{
    constructor(name, age, job, roomName){
        this.name = name;
        this.age = age;
        this.job = job;
        this.roomName = roomName;
    }
    getRentFee(){
        if(this.job=="student") return 900;
        else return 1000
    }
    getInfo(){
        return `${this.name} - ${this.age} - ${this.job} - ${this.roomName} `;
    }
}
//master : người cho thuê 
class Master{
    constructor(name){
        this.name = name;
        this.users = [];
    }
    addUser(user){
        this.users.push(user);
    }
    calculateRentMoney(){
        let total = 0;
        for(const i of this.users){
            total+= i.getRentFee();
        }
        return total;
    }
    showUsers(){
        console.log(`thong tin nguoi thue nha ${this.name}`);
        this.users.forEach(t=> console.log(t.getInfo()))
    }
}
// người quản lí 
class MasterManage{
    constructor(){
        this.masters = [];
    }
    addMaster(master){
        this.masters.push(master);
    }
    showReport(){
        console.log("bao cao thong tin chu tro");
        for(const i of this.masters){
            i.showUsers();
            console.log("Doanh thu :"+i.calculateRentMoney());
            console.log("-----------------");
        }
    }
}

const u1 = new User("dat",23,"student","101a");
const u2 = new User("minh",23,"student","101a");
const u3 = new User("abc",23,"student","101a");

const master1 = new Master("Quang");
master1.addUser(u1);
master1.addUser(u2);
master1.addUser(u3);

const manager1 = new MasterManage();
manager1.addMaster(master1);

manager1.showReport();
