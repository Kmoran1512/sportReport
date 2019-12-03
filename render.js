let loggedIn = false;

export const onLoad = function(root) {

    if (!false) {
        root.find(".container").replaceWith(`
            <form class="container">
                <div class="title-Container">Sport Report</div>
                <h1>Login</h1>
            
                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" class="logusr" required>
            
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" class="logpsw" required>
            
                <button type="submit" class="login btn">Login</button>
                <button type="button" class="signUp btn">Sign Up</button>
            </form>
        `);
    } else {
       root.find(".container").replaceWith(`
            <form class="container">
                Logged in
            </form>
        `);
    }
    
}

export const coachSignUp = function(event) {
    $(event.target).closest(".container").replaceWith(`
        <form class="container">
            <div class="title-Container">Sport Report</div>
            <h1 class="bigTitle">Sign Up</h1>

            <br/>

            <button type="button" class="selectBtn coachbtn signed">Coach</button>
            <button type="button" class="selectBtn athletebtn unsigned">Athlete</button>

            <br/><br/>

            <label for="club name"><b>Club Name</b></label>
            <input type="text" placeholder="Enter Club Name" name="clubname" class="clubNameInput" required>
        
            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" class="usernameInput" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" class="pswInput" required>

            <label for="psw"><b>Confirm Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" class="pswInputMatch" required>
        
            <button type="button" class="cancel-signUp btn">Cancel</button>
            <button type="submit" class="complete-coach-signUp btn">Complete</button>
        </form>
    `);
}

export const athleteSignUp = function(event) {
    $(event.target).closest(".container").replaceWith(`
        <form class="container">
            <div class="title-Container">Sport Report</div>
            <h1 class="bigTitle">Sign Up</h1>

            <br/>

            <button type="button" class="selectBtn coachbtn unsigned">Coach</button>
            <button type="button" class="selectBtn athletebtn signed">Athlete</button>

            <br/><br/>

            <label for="name"><b>Athete Name</b></label>
            <input type="text" placeholder="Enter Name" name="name" class="nameInput" required>
        
            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" class="usernameInput" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" class="pswInput" required>

            <label for="psw"><b>Confirm Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" class="pswInputMatch" required>

            <button type="button" class="cancel-signUp btn">Cancel</button>
            <button type="submit" class="complete-ath-signUp btn">Complete</button>
        </form>
    `);
}

export const cancelSignUp = function(event) {
    $(event.target).closest(".container").replaceWith(`
        <form class="container">
            <div class="title-Container">Sport Report</div>
            <h1>Login</h1>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required>

            <button type="submit" class="login btn">Login</button>
            <button type="button" class="signUp btn">Sign Up</button>
        </form>
    `);
}

export const completeAthleteSignUp = async function(event) {
    event.preventDefault();

    let pass = $(event.target).closest(".container").find(".pswInput")[0].value;
    let tomatch = $(event.target).closest(".container").find(".pswInputMatch")[0].value;
    let athleteName = $(event.target).closest(".container").find(".nameInput")[0].value;
    let username = $(event.target).closest(".container").find(".usernameInput")[0].value;

    let response = [0];
    
    if (pass == tomatch && pass != "" && athleteName != "" && username != "") {

        try {
            response = await axios({
                method: 'POST',
                url: "http://localhost:3000/account/create",
                data: {
                    "name": username,
                    "pass": pass,  
                    "data": {
                        "name": athleteName,
                    }    
                }
            });
            console.log(response.status);
            
        } catch (error) {
            console.log(error);
        }
       
        //loadCoachPg2(event, response)
    } else { 
        if (pass != tomatch) {
            alert("passwords do not match");
        } else {
            alert("complete all fields");
        }
    }
    
}

export const completeCoachSignUp = async function(event) {
    event.preventDefault();


    let pass = $(event.target).closest(".container").find(".pswInput")[0].value;
    let tomatch = $(event.target).closest(".container").find(".pswInputMatch")[0].value;
    let clubName = $(event.target).closest(".container").find(".clubNameInput")[0].value;
    let username = $(event.target).closest(".container").find(".usernameInput")[0].value;

    let response = [0];
    
    if (pass == tomatch && pass != "" && clubName != "" && username != "") {
        try {
            response = await axios({
                method: 'POST',
                url: "http://localhost:3000/account/create",
                data: {
                    "name": username,
                    "pass": pass,  
                    "data": {
                        "club name": clubName,
                    }    
                }
            });

        } catch (error) {
            console.log(error);
        }
   
        //loadCoachPg2(event, response)
    } else { 
        if (pass != tomatch) {
            alert("passwords do not match");
        } else {
            alert("complete all fields");
        }
    }
    
}

export const toLogin = async function(event) {
    event.preventDefault();

    
    let psw = $(event.target).closest(".container").find(".logpsw")[0].value;
    let username = $(event.target).closest(".container").find(".logusr")[0].value;

    if (username != "" && psw != "") {
        try {
            console.log("h:")
            const response = await axios({
                method: 'POST',
                url: "http://localhost:3000/account/login",
                data: {
                    "name": username,
                    "pass": psw,   
                }
            });
            console.log("s")
            console.log(response)
        } catch (error) {
            console.log("e")
            console.log(error);
        }
    } else {
        alert("complete both fields");
    }
}

export const startPage = async function() {

    const $root = $(document);

    onLoad($root);

    {
        $root.on('click', '.signUp', athleteSignUp);
        $root.on('click', '.cancel-signUp', cancelSignUp);
        $root.on('click', '.complete-ath-signUp', await completeAthleteSignUp);
        $root.on('click', '.complete-coach-signUp', await completeCoachSignUp);
        $root.on('click', '.coachbtn', coachSignUp);
        $root.on('click', '.athletebtn', athleteSignUp);
        $root.on('click', '.login', toLogin);
    }

};

$(async function() {
    startPage();
});