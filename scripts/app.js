import { saveToLocalStorage, getLocalStorage, removeLocalStorage } from "./localStorage.js";
let nameInputBox = document.getElementById("nameInputBox")
let addNameBtn = document.getElementById("addNameBtn")
let totalNameId = document.getElementById("totalNameId")
let groupSizeNumber = document.getElementById("groupSizeNumber")
let groupSizeSlider = document.getElementById("groupSizeSlider")
let getRandomBtn = document.getElementById("getRandomBtn")
let loadName = document.getElementById("loadName")
let displayGroupNames = document.getElementById("displayGroupNames")

addNameBtn.addEventListener("click", () => {
    let userName = nameInputBox.value;
    if (userName) {
        saveToLocalStorage(userName);
        DisplayGroupList();
        SetGroupSizeSlider();
    }
    nameInputBox.value = "";
});

const DisplayGroupList = () => {
    let count = 0;
    loadName.innerHTML = "";
    let saveNameArray = getLocalStorage();

    saveNameArray.map((name) => {
        let div1 = document.createElement("div");

        let div2 = document.createElement("div");
        div2.classList.add("row", "pt-3", "pb-3");

        let col1 = document.createElement("col");
        col1.classList.add("col", "text-center");
        col1.innerText = name;

        let col2 = document.createElement("col");
        col2.classList.add("col", "text-center");

        let button = document.createElement("button");
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.style.borderRadius = "5px";
        button.style.padding = "5px";
        button.style.border = "none";
        button.dataset.name = name;
        button.innerText = "Remove";

        button.addEventListener("click", (e) => {
            let removeName = e.target.dataset.name;
            div1.remove();
            removeLocalStorage(removeName);
            DisplayGroupList();
            SetGroupSizeSlider();
        });

        loadName.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(col1);
        div2.appendChild(col2);
        col2.appendChild(button);

        count++;
    })
    totalNameId.innerText = count;
}

const GetRandomGroups = (sliderValue) => {
    let saveNameArray = getLocalStorage();
    let numberOfPeople = saveNameArray.length;
    let groupSize = parseInt(sliderValue);
    let numberOfGroups = Math.ceil(numberOfPeople / groupSize);
    let randomNames = randomize(saveNameArray);
    let arrays = [];
    displayGroupNames.innerHTML = "";

    for (let i = 0; i < numberOfGroups; i++) {
        let firstIndex = i * groupSize;
        let lastIndex = (i + 1) * groupSize;
        let group = randomNames.slice(firstIndex, lastIndex);
        
        if (group.length === 1 && arrays.length > 0) {
            arrays[arrays.length - 1].push(group[0]);
        } else {
            arrays.push(group);
        }
        console.log(arrays)
        displayGroup(group, i + 1);
    }
}






function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function displayGroup(group, num) {
    let div = document.createElement("div");

    let p1 = document.createElement("p");
    p1.innerText = `Group ${num}:`;

    group.map(name => {
        let div2 = document.createElement("div");
        div2.innerText = name;
        p1.appendChild(div2);
    });
    
    div.appendChild(p1);
    displayGroupNames.appendChild(div);
}

getRandomBtn.addEventListener("click", () => {
    GetRandomGroups(groupSizeSlider.value)
})
const SetGroupSizeSlider = () => {
    let saveNameArray = getLocalStorage();
    groupSizeSlider.value = 1;
    groupSizeNumber.innerText = "1";
    groupSizeSlider.setAttribute("max", saveNameArray.length)
}

groupSizeSlider.addEventListener("change", () => {
    groupSizeNumber.innerText = groupSizeSlider.value;
})

DisplayGroupList();
SetGroupSizeSlider();
