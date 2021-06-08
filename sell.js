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

      document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault()

        // declare variables

        // auth info
        let username = user.displayName

        // nftImage
        let nftImage = document.querySelector("#nftImage").value
        console.log(`Image URL is ${nftImage}`);

        // nftTitle
        let nftTitle = document.querySelector("#nftTitle").value
        console.log(`the NFT Title is ${nftTitle}`);

        // owner
        let owner = document.querySelector("#owner").value
        console.log(`the NFT owner is ${owner}`);

        // sellPrice
        let sellPrice = document.querySelector("#sellPrice").value
        console.log(`the Sell Price ${sellPrice}`); 

        let response = await fetch("/.netlify/functions/get_nfts", {
            method: "post",
            body: JSON.stringify({
                username: username,
                nftImage: nftImage,
                nftTitle: nftTitle,
                owner: owner,
                sellPrice: sellPrice,
            })
        })
        
        // log and repeat data sent to backend
        let nftPreview = await response.json()
        console.log(response);
        console.log(nftPreview);

        // clear form fields
        document.querySelector('#nftImage').value = ''
        document.querySelector('#nftTitle').value = ''
        document.querySelector('#owner').value = ''
        document.querySelector('#sellPrice').value = ''

        printNftPreview(nftPreview)
        })

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