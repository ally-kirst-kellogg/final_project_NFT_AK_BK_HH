// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/courses?courseNumber=KIEI-451
exports.handler = async function(event) {
  
 let returnValue = []
    // establish a connection to firebase in memory
  let db = firebase.firestore()
    // perform a query against firestore for all nfts, wait for it to return, store in memory
  let nftQuery = await db.collection(`nfts`).get()
  
  // get the first document from the query
  
  let nfts = nftQuery.docs
  // ask Firebase for the course that corresponds to the course number, wait for the response
   // loop to get the nft number being requested
   
   for (let nftIndex=0; nftIndex < nfts.length; nftIndex++) {
    // get the id from the document
    let id = nfts[nftIndex].id

    // get the data from the document
    let nftData = nfts[nftIndex].data()

    // "ID\tNFT_Title\tNFT_Creator\tOwner\tSell_Price\tNFT_Image": 
    // create an Object to be added to the return value of our lambda
    let nftObject = {
      id: id,
      nftName: nftData.nftTitle,
      nftCreator: nftData.nftCreator,
      nftOwner: nftData.nftOwner,
      nftSellPrice: nftDataData.sellPrice
    } 


}
  // add the Object to the return value
    returnValue.push(nftObject)
  }


  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
