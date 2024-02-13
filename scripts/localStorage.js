const saveToLocalStorage = (name) => {
    let loadedNames = getLocalStorage();

    if(!loadedNames.includes(name)){
        loadedNames.push(name);
    }

    localStorage.setItem("Names", JSON.stringify(loadedNames));
}

const getLocalStorage = () => {

    let localStorageData = localStorage.getItem("Names");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

const removeLocalStorage = (name) => {

    let loadedNames = getLocalStorage();

    let namedIndex = loadedNames.indexOf(name);

    loadedNames.splice(namedIndex, 1);

    localStorage.setItem("Names", JSON.stringify(loadedNames))
}

export {saveToLocalStorage, getLocalStorage, removeLocalStorage}