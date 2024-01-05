const express = require('express');
const cors = require('cors');
const app = express();
const port = 3214;
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://Aaroophan:AaroophanMT@mend-tale-game.nqexw9n.mongodb.net/Mend-Tale-Game', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('************************************************************* Current database:', mongoose.connection.db.databaseName);
})
.catch(err => console.log(err));

let User = mongoose.model('MendTale', new mongoose.Schema({
        Username: String,
        Password: String,
        Email: String,
        GameProgress: [
            {
                InteractionID: String,
                UserResponse: String,
                JournalEntry: String,
                MachineLearningAnalysis: String,
                PersonalisedFeedback: String
            }
        ]
}));

/*let User = mongoose.model('MendTale', new mongoose.Schema({
        Username: String,
        Password: String,
        Email: String,
        GameProgress: Array
}));*/

app.post('/Server/Register', async (req, res) => {
    let newUser = new User({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        GameProgress: [
            {
                InteractionID: req.body.InteractionID,
                UserResponse: req.body.UserResponse,
                JournalEntry: req.body.JournalEntry,
                MachineLearningAnalysis: req.body.MachineLearningAnalysis,
                PersonalisedFeedback: req.body.PersonalisedFeedback
            }
        ]
    });

    newUser.save()
    .then(savedUser => {
        console.log("User saved to collection:", savedUser);
        res.status(200).json(savedUser);
    })
    .catch(err => {
        console.error(err);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA "+err);
        res.status(500).json({ error: err.toString() });
    });
});

app.get('/Server/UserProfile/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    console.log(CurrentUserName);
    User.findOne({ "Username": CurrentUserName })
    .then(user => {
        if (user) {
            console.log(user);
            console.log("HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHAHAHA USER IS  FOUND");
            res.json(user);
        } else {
            console.log("######################################################### USER NOT FOUND");
            res.json(user);
        }
    })
    .catch(err => {
        let DUMMY = {
                Username: "DUMMY",
                Password: "DUMMY",
                Email: "DUMMY@gmail.com",
                GameProgress: [
                    {
                        InteractionID: "DUMMY_20240104_2336",
                        UserResponse: "DUMMY",
                        JournalEntry: "DUMMY",
                        MachineLearningAnalysis: "DUMMY",
                        PersonalisedFeedback: "DUMMY"
                    }
                ]
        };
        res.json(DUMMY);
        console.log(err);
    });
});

app.put('/Server/UpdateUserResponse/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    let newBestTime = req.body.BestTime;
    User.findOneAndUpdate({ "Name": CurrentUserName }, { BestTime: newBestTime }, { new: true })
    .then(user => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BEST TIME UPDATED");
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
