// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
var path = require("path");
var notes = require("../db/db.json");
var fs = require("fs");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    //Displays all notes

    app.get("/api/notes", function (req, res) {
        res.json(notes);
    });

    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        // creating code here to recieve a new note to save on the request body
        var note = req.body;
        //push to notes
        notes.push(note);
        //write to db.json file
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes),
            function (err, data) {
                if (err) throw err;

            })
        res.json(note)
    });

    // ---------------------------------------------------------------------------

    // Need a DELETE /api/notes/:id
    app.delete("/api/notes/:id", function (req, res) {
        // Read all notes from db.json
        var id = req.params.id;
        fs.readFile(path.join(__dirname, "../db/db.json"),"UTF-8", function(error, data) {
            if (error) throw error;
            //console.log(data);

            //parse data 
            var parsedData = JSON.parse(data);

            //Remove the note with the given id property
            var newData = parsedData.filter(parsedData => parsedData.id != id);
            
            //assign notes array with newData
            notes = newData;

            //Rewrite the notes to the db.json file
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes),
                function (err, data){
                    if(err) throw err;
                    res.json(true);
                })
        });
    });
};
