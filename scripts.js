document.querySelector('#search').addEventListener('click',()=>{
    const xhr = new XMLHttpRequest();
  
    const searchValue = document.querySelector("#my-text").value;
    console.log(searchValue)
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBY4UXGcMkl2wfnWk1nRGbkJurRAim5suE&part=snippet&q=${searchValue}&maxResults=50`
    xhr.open('GET',url);

    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4&& xhr.status===200){
            const response = JSON.parse(xhr.responseText);
            console.log(response)

            let template =''
            for(let i=0; i<response.items.length; i++){
                let R;
                if(response.items[i].id.kind==='youtube#channel'){
                    let videoid = response.items[i].snippet.channelTitle
                    console.log(videoid)
                    R=videoid
                }
                else{
                    let videoid= response.items[i].id.videoId
                    R = `watch?v=${videoid}`
                }
            
                template+= 
                `<div class="video-items" style="width: 20%; margin: 1.2em; border: 12px solid green">
                    <a href="https://www.youtube.com/${R}" target="_blank">
                        <img style="width: 100%" src="${response.items[i].snippet.thumbnails.high.url}" />
                    </a>
                    <h5>${response.items[i].snippet.title}</h5>
                    <p style="color: gray">${response.items[i].snippet.description}</p>
                </div>
                `
            }
            document.querySelector('#my-container').innerHTML = template
        }
   
    }
    xhr.send()
})