document.addEventListener(`DOMContentLoaded`, async function(event) {

    // Build the URL for our posts API
    let url = `/.netlify/functions/nft_listing`
  
    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)
  
    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()
  
    // Write the json-formatted data to the console in Chrome
    console.log(json)
  
    // Grab a reference to the element with class name "posts" in memory
    let nftsDiv = document.querySelector(`.nft_listing`)
  
    // Loop through the JSON data, for each Object representing a nft:
    for (let i=0; i < json.length; i++) {
      // Store each object ("nft") in memory
      let nft = json[i]
  
  
      // Create some markup using the nft data, insert into the "nfts" element


      nftsDiv.insertAdjacentHTML(`beforeend`, `
        <div class="md:mt-16 mt-8">
          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${nft.nftName}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${nft.nftCreator}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8">
             <span class="font-bold text-xl">${nft.nftOwner}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${nft.sellPrice}</span>
         </div>
      
          <div class="my-8">
            <img src="${nft.imageUrl}" class="w-full">
      `)
    }
  })