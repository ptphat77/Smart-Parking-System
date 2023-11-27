
class SlotController {
    read(req, res) {
        return res.send("Welcome to site!")
    }
}

module.exports = new SlotController();