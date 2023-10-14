const fs = require("fs")
const path = require("path")

async function readFileData(folder, url) {
    try {
        const file = await fs.promises.readFile(path.resolve(folder, url), "utf8")
        return file
    } catch (e) {
        console.log(e);
    }
}
// async function see() {
//     const a = await readFileData(__dirname, "./MailFiles/basicFormat.html")
//     console.log(a);



// }
// see()
module.exports = { readFileData }