const fs = require('fs').promises;

async function readfile() {
    try {
        const data = await fs.readFile('C:/Users/luuda/Downloads/wishlist.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

readfile();

async function rewriteFile(){
    try{
        const data = await fs.writeFile('C:/Users/luuda/Downloads/wishlist.txt', '1 syr konrad, the grim')
        console.log("da ghi")
    }
    catch(error){
        console.log(error)
    }
}
rewriteFile();