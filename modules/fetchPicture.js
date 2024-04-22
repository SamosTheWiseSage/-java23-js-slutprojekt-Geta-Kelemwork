// async function getRadnomDogImages(thumbnail){
//     const url = `https://image.tmdb.org/t/p/w500/`+thumbnail;
//     const response = await fetch(url)
//     const data = await response.json();
//     console.log(data);
//     return data.message;
// }
// async function displayImages(imgUrlArray){
//        for(const imgUrl of imgUrlArray){
//        const imgE1 = document.createElement('img')
//        imgE1.src = imgUrl;
//        document.body.append(imgE1);
//       }
//       }
//       async function getRadnomDogImages(thumbnail){
//         const url = `https://image.tmdb.org/t/p/w500/`+thumbnail;
//         const response = await fetch(url)
//         const data = await response.json();
//         console.log(data);
//         return data.message;
//       }
//       async function displayImages(imgUrlArray){
//            for(const imgUrl of imgUrlArray){
//            const imgE1 = document.createElement('img')
//            imgE1.src = imgUrl;
//            document.body.append(imgE1);
//           }
//           }
//       getRadnomDogImages(10).then( (urls) =>{
//         const imgUrls = utils.sortDecending(urls);
//         displayImages(imgUrls);
//       });