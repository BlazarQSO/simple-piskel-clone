function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.getElementById("createSprite").innerHTML = profile.getName();
    document.getElementById("imgUser").style.display = "block";
    document.getElementById("imgUser").src = profile.getImageUrl();
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signOut").style.display = "block";
}
