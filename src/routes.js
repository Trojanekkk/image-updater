module.exports = function (app) {

    API_BASE = "/api/v1/"

    app.get(API_BASE + "containers", (req, res) => {
        console.log("hi")
        res.send("hi")
    })

}