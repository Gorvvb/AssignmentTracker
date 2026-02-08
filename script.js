import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_DATABASE_URL,
	process.env.SUPABASE_ANON_KEY
);


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const signupBtn = document.getElementById("signupButton");
const loginBtn = document.getElementById("loginButton");
const logoutBtn = document.getElementById("logoutButton");
const userInfoDiv = document.getElementById("userInfo");
const userDataP = document.getElementById("userData");

signupBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const username = usernameInput.value;

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
    });

    if (authError) {
        alert("Signup error: " + authError.message);
        return;
    }

    const session = await supabase.auth.getSession();
    const userId = session.data.session.user.id;

    const { data, error } = await supabase
        .from("users")
        .insert([{ id: userId, username, email }]);

    if (error) {
        alert("Error creating user row: " + error.message);
        return;
    }

    alert("Signup successful! Please check your email for confirmation.");
});

loginBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) {
        alert("Login error: " + authError.message);
        return;
    }

    const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("*")
        .single();

    if (userError) {
        alert("Error fetching user row: " + userError.message);
        return;
    }

    userDataP.textContent = JSON.stringify(userRow, null, 2);
    userInfoDiv.style.display = "block";
    document.getElementById("auth").style.display = "none";
});

logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    userInfoDiv.style.display = "none";
    document.getElementById("auth").style.display = "block";
    emailInput.value = "";
    passwordInput.value = "";
    usernameInput.value = "";
});
