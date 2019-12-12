let loggedIn = false;

export const onLoad = function(root) {

    if (!false) {
        root.find(".container").replaceWith(`
            <form class="container">

                <div class="title-Container">Sport Report</div>

                <h1>Find your Club's Calendar</h1>

                <label for="clubName"><b>Enter Club Name</b></label>

                <div class="autocomplete">
                    <input type="text" placeholder="Club Name" name="club-name" class="club-Name">
                </div>

                <button type="submit" class="find-club btn">Find Club</button>

                <h1>Or Login</h1>
            
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

            <label for="club name"><b>Club Name</b></label>
            <input type="text" placeholder="Enter Club Name" name="clubname" class="clubNameInput" required>

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

        <h1>Find your Club's Calendar</h1>

        <label for="clubName"><b>Enter Club Name</b></label>

        <div class="autocomplete">
            <input type="text" placeholder="Club Name" name="club-name" class="club-Name">
        </div>

        <button type="submit" class="find-club btn">Find Club</button>

        <h1>Or Login</h1>

        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" class="logusr" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" class="logpsw" required>

        <button type="submit" class="login btn">Login</button>
        <button type="button" class="signUp btn">Sign Up</button>
    </form>
    `);
}

export const completeAthleteSignUp = async function(event) {

    let pass = $(event.target).closest(".container").find(".pswInput")[0].value;
    let tomatch = $(event.target).closest(".container").find(".pswInputMatch")[0].value;
    let athleteName = $(event.target).closest(".container").find(".nameInput")[0].value;
    let clubName = $(event.target).closest(".container").find(".clubNameInput")[0].value;
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
                        "clubName": clubName,
                        "permission": "Athlete",
                    }    
                }
            });            
        } catch (error) {
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
                        "clubName": clubName,
                        "permission": "Coach",
                    }    
                }
            });
            response = await axios({
                method: 'POST',
                url: "http://localhost:3000/public/clubs/" + clubName,
                data: {
                    "data": {
                        "email": "0"
                    }
                },
                type: "merge"
            });           
        } catch (error) {
        }
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
            const response = await axios({
                method: 'POST',
                url: "http://localhost:3000/account/login",
                data: {
                    "name": username,
                    "pass": psw,   
                }
            });

            let emailResponse;

            try{
                emailResponse = await axios({
                    method: 'GET',
                    url: "http://localhost:3000/public/clubs/" + response.data.data.clubName,
                });
            }catch{
            }

            document.location.href = "./calendarView.html";
            localStorage.setItem('jwtKey', response.data.jwt);
            localStorage.setItem('username', username);
            if(emailResponse){
                localStorage.setItem('calendarEmail', emailResponse.data.result.email);  
            }else{
                localStorage.setItem('calendarEmail', "");
            }
                      

        } catch (error) {
            alert("Incorrect login details");
        }
    } else {
        alert("complete both fields");
    }
}

export const addWorkOutForm = async function() {
    event.preventDefault();
}

export const clubDebouncer = async function(event) {

    let typed = $(event.target)[0].value

    removeOptions(0);

    let response = 0;
    let club_arr = [];
    let final_arr = []

    if (typed != "") {
        try {

            response = await axios({
                method: 'GET',
                url: "http://localhost:3000/public/clubs",
            });

            let key

            for (key in response.data.result) {
                club_arr.push(key.toString())
            }
            
            club_arr.forEach(e => {
                if (typed.toUpperCase() == e.substring(0,typed.length).toUpperCase()) {
                    final_arr.push(e);
                }
            });
        
            if (final_arr.length > 0) {
                let max;

                if (final_arr.length < 5) {
                    max = final_arr.length;
                } else {
                    max = 5
                }

                let auto_complete_container = $(`<div class="auto-container"></div>`)

                for (let i = 0; i < max; i++) {
                    let auto_complete_option = $(`<div class="auto-option">${final_arr[i]}</div>`);
                    auto_complete_container.append(auto_complete_option);
                }

                $(event.target).closest(".autocomplete").append(auto_complete_container)
            }      
            
        } catch (error) {
        }
    } 
}

export const optionSelect = async function(event) {
    let new_input = $(event.target)[0].innerText;
    $(event.target).closest(".autocomplete").find('.club-Name')[0].value = new_input;
}

export const removeOptions = function(event) {
    if ($(".autocomplete").find(".auto-container").length > 0) {
        $(".autocomplete").find(".auto-container").remove();
    }
}

export const traverseAutoComplete = function(event) {
}

export const viewCalanderPublic = async function(event) {
    event.preventDefault();
 let userClub = $(event.target).closest('.container').find(".autocomplete").find('.club-Name')[0].value;
    if (userClub != "") {
        let response = [0];
        response = await axios({
            method: 'GET',
            url: "http://localhost:3000/public/clubs/" + userClub,
        });
        localStorage.setItem("calendarEmail", response.data.result.email);

        location.href = "./publicCalendar.html";
    }
}

export const startPage = async function() {

    const $root = $(document);

    onLoad($root);
    {
        $root.on('click', '.signUp', athleteSignUp);
        $root.on('click', '.cancel-signUp', cancelSignUp);
        $root.on('click', '.complete-ath-signUp', completeAthleteSignUp);
        $root.on('click', '.complete-coach-signUp', completeCoachSignUp);
        $root.on('click', '.coachbtn', coachSignUp);
        $root.on('click', '.athletebtn', athleteSignUp);
        $root.on('click', '.login', toLogin);
        $root.on('click', '.find-club', viewCalanderPublic);
        $root.on('keyup', '.club-Name', clubDebouncer);
        $root.on('click', '.auto-option', optionSelect);
        $root.on('click', document, removeOptions);
        $root.on('keydown', document, traverseAutoComplete);
    }
};

$(async function() {
    startPage();
});
