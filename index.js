firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // signed in
    console.log ('user logged in: ' , user)

    // let db = firebase.firestore()
    // db.collection('users').doc(user.uid).set ({
    //   name: user.displayName,
    //   email: user.email,
    // })

    const logout = document.querySelector('#sign-in-or-sign-out');
    logout.addEventListener('click', (event) => {
      event.preventDefault();
      firebase.auth().signOut()
      console.log("logged out");
      document.location.href = 'index.html'
    })

    // show welcome message
    let name = firebase.auth().currentUser.displayName
    console.log(name);
    document.querySelector(".welcome-message").insertAdjacentHTML("beforeend", `
      <h1 class="welcome-message text-3xl md:text-3xl p-8 text-white">Welcome, ${name}!</h1>
      `)

    // show navigation instructions

    // Build the URL for our posts API
    let url = `/.netlify/functions/get_nfts`
  
    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)
  
    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()
  
    // Write the json-formatted data to the console in Chrome
    console.log(json)
  
    // Grab a reference to the element with class name "posts" in memory
    let nftsDiv = document.querySelector(`.nfts`)
  
    // Loop through the JSON data, for each Object representing a nft:
    for (let i=0; i < json.length; i++) {
      // Store each object ("nft") in memory
      let nft = json[i]
  
  
      // Create some markup using the nft data, insert into the "nfts" element


      nftsDiv.insertAdjacentHTML(`beforeend`, `
        <div class="md:mt-16 mt-8">
          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${nft.nftTitle}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8">
             <span class="font-bold text-xl">${nft.owner}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${nft.sellPrice}</span>
         </div>
      
          <div class="my-8">
            <img src="${nft.nftImage}" class="w-full">
      `)
    }


  } else {
    // signed out
    console.log('signed out')

    // hide elements when signed out
    document.querySelector('.navigation').classList.add('hidden')
    document.querySelector('.page-title').classList.add('hidden')
    document.querySelector('.page-content').classList.add('hidden')

    // user is not logged-in, so show login
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: `index.html` // where to go after we're done signing up/in
    }

    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)
  }
  })