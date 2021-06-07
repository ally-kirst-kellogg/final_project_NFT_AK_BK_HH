let firebase = require('./firebase')

exports.handler = async function (event) {
    let db = firebase.firestore()
    let body = JSON.parse(event.body)

    let username = body.username

    let nftImage = body.nftImage
    let nftTitle = body.nftTitle
    let owner = body.owner
    let sellPrice = body.sellPrice

    console.log("Called create_nfts.js");
    console.log(`username is ${username}`)

    let nft = {
        nftImage: nftImage,
        nftTitle: nftTitle,
        owner: owner,
        sellPrice: sellPrice
    }
    // push and define new NFT from the database
    let newNft = await db.collection("nfts").add(nft)

    // log creation of new NFT
    console.log(newNft);

    // log new NFT ID
    console.log(newNft.id);

    // set ID of API to ID in firestore
    nft.id = newNft.id
    
    return {
        statusCode: 200,
        body: JSON.stringify(nft)
    }
}