// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/courses?courseNumber=KIEI-451
exports.handler = async function(event) {
  
 let returnValue = []
    // establish a connection to firebase in memory
  let db = firebase.firestore()
    // perform a query against firestore for all nfts, wait for it to return, store in memory
  let nftsQuery = await db.collection(`nfts`).get()
  
  // get the first document from the query
  
  let nfts = nftsQuery.docs
  // ask Firebase for the course that corresponds to the course number, wait for the response
   // loop to get the nft number being requested
   
   for (let i=0; i < nfts.length; i++) {
    // get the id from the document
    let nftId = nfts[i].id

    // get the data from the document
    let nftData = nfts[i].data()

    // "ID\tNFT_Title\tNFT_Creator\tOwner\tSell_Price\tNFT_Image": 
    // create an Object to be added to the return value of our lambda
    let nftObject = {
      id: nftId,
      nftImage: nftData.nftImage,
      nftTitle: nftData.nftTitle,
      owner: nftData.owner,
      sellPrice: nftData.sellPrice
    } 

  // add the Object to the return value
    returnValue.push(nftObject)
  
  }

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}