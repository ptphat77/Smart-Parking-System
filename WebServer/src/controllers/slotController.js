
class SlotController {
    read(req, res) {
        // return res.send("Welcome to site!")
        return res.render("home")
    }
}

module.exports = new SlotController();