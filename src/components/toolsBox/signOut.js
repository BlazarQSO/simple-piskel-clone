function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementById("createSprite").innerHTML = "Guest";
        document.getElementById("imgUser").style.display = "none";
        document.getElementById("signOut").style.display = "none";
        document.getElementById("signIn").style.display = "block";
    });
}

export { signOut }
