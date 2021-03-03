document.addEventListener("DOMContentLoaded", onReady);

function onReady(){
    const aInput_RoomName = document.getElementById("idRoomName"),
    aButton_CreateRoom = document.getElementById("idCreateRoom"),
    aButton_JoinRoom = document.getElementById("idJoinRoom"),
    aButton_LoadRooms = document.getElementById("idLoadRooms"),
    aRooms= document.getElementById("idRooms"),
    aInfo = document.getElementById("idInfo");

    let aSelectedRoomID;

    aButton_JoinRoom.setAttribute("disabled", "disabled");

    aButton_CreateRoom.onclick = () => {
        const astrRoomName = aInput_RoomName.value;
        if(0 >= astrRoomName.length){
            return
        }

        aInfo.innerText = `Adding: ${astrRoomName}`
        runXHR(`php/createRoom.php?RoomName=${astrRoomName}`, () => {
            aInfo.innerText = `Added: ${astrRoomName}`
        })
    }

    aButton_LoadRooms.onclick = () => {
        aInfo.innerText = "Loading";

        runXHR("php/getRooms.php?nPage=0&nNumRowsOnPage=10", (data) => {
            aInfo.innerText = `Loaded`
        
            if(!data){
                return
            }

            const avRooms = data["vRooms"];
            if(!Array.isArray(avRooms)){
                return
            }
            aRooms.innerText = ""
            aButton_JoinRoom.setAttribute("disabled", "disabled");
            aSelectedRoomID = null;

            avRooms.forEach((akvRoom) => {
                const aDiv = document.createElement("div");
                aDiv.innerText = akvRoom.Name
                aDiv.setAttribute("room_id", akvRoom.ID)
                aDiv.setAttribute("room_joined", akvRoom.Joined)

                if("1" === akvRoom.Joined){
                    console.log('SPAN CRETATE')
                    const aSpan = document.createElement("span");

                    aSpan.innerText = "ZAJETY";
                    aSpan.style.backgroundColor = "green"
                    aDiv.append(aSpan);

                }

                aDiv.onclick = function () {
                    document.querySelectorAll("#idRooms div").forEach(function (aDivItem) {
                        aDivItem.style.backgroundColor = "white";
                    })
                    this.style.backgroundColor = "blue"

                    aSelectedRoomID = this.getAttribute("room_id")
                    if("1" === this.getAttribute("room_joined")){
                        console.log('SPAN CRETATE')

                        aButton_JoinRoom.setAttribute("disabled", "disabled")
                    } else {
                        aButton_JoinRoom.removeAttribute("disabled");
                    }
                

                }

                aRooms.append(aDiv)

            })


        })
    }

    aButton_JoinRoom.onclick = () => {
        if(!aSelectedRoomID){
            return
        }

        const aDiv = document.querySelectorAll(`#idRooms div[room_id="${aSelectedRoomID}"]`)[0]
        if(!aDiv){
            return
        }

        const astrRoomName = aDiv.innerText;
        aInfo.innerText = `Joining: ${astrRoomName}`
    
        runXHR(`php/joinRoom.php?RoomID=${aSelectedRoomID}`, () => {
            aInfo.innerText = `Joined: ${astrRoomName}`
    
        })
    }





}

function getHRSC(fn){

    return function(){
        if("function" === typeof fn){
            if(XMLHttpRequest.DONE === this.readyState && 200 === this.status){
                fn(this.response)
            }
        }
    }
}

function runXHR(astrURL, fn){
    const aXHR = new window.XMLHttpRequest();

    aXHR.onreadystatechange = getHRSC(fn);

    aXHR.open("GET", astrURL);
    aXHR.responseType = "json";
    aXHR.send();
}




