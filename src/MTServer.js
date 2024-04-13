const express = require('express');
const cors = require('cors');
const app = express();
const port = 3214;
const mongoose = require('mongoose');

const MongoDBKey = require('./MongoDBKey');
console.log(MongoDBKey());

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://Aaroophan:'+MongoDBKey()+'@mend-tale-game.nqexw9n.mongodb.net/Mend-Tale-Game', { useNewUrlParser: true, useUnifiedTopology: true })
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

app.post('/Server/Register', async (req, res) => {
    let newUser = new User(req.body);

    console.log(newUser);

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
                        InteractionID: "1_DUMMY_2024_1_4_23_36",
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

app.put('/Server/UpdateGameProgress/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    let newGameProgress = req.body.GameProgress;
    console.log(newGameProgress);
    User.findOneAndUpdate({ "Username": CurrentUserName }, { GameProgress: newGameProgress }, { new: true })
    .then(user => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! INTERACTION UPDATED");
    })
    .catch(err => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
        console.log(err);
    });
});

app.put('/Server/UpdateProfile/:CurrentUserName', async (req, res) => {
    let CurrentUserName = req.params.CurrentUserName;
    let newUsername = req.body.Username;
    let newPassword = req.body.Password;
    let newEmail = req.body.Email;
    console.log(newUsername);
    console.log(newPassword);
    console.log(newEmail);
    User.findOneAndUpdate({ "Username": CurrentUserName }, { Username: newUsername, Password: newPassword, Email: newEmail }, { new: true })
    .then(user => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PROFILE UPDATED");
    })
    .catch(err => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
        console.log(err);
    });
});

app.delete('/Server/DeleteProfile/:CurrentUserName', async (req, res) => {
    let Name = req.params.CurrentUserName;
    User.findOneAndDelete({ "Username": Name })
        .then(user => {
            if(user) {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! user DELETED");
                res.json({ message: 'user deleted' });
            } else {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            console.log("Error:", err);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EEEERRRRRROOOORRRR");
            res.status(500).json({ error: err.toString() });
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
