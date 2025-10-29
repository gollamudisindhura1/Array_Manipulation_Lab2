let shoppingList = [];
// DOM Manipulation

document.addEventListener('DOMContentLoaded', () => {

    const itemInput = document.getElementById("itemInput");
    const addItemBtn = document.getElementById("addItemBtn");
    const removeItemBtn = document.getElementById("removeItemBtn");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const itemcount = document.getElementById("itemcount");
    const listElement = document.getElementById("shoppingList");

    function spawnGhost() {
        const ghost = document.createElement('img');
        ghost.src = 'https://img.icons8.com/fluency/48/000000/ghost.png';
        ghost.className = 'ghost';
        ghost.style.left = `${Math.random() * 80 + 10}vw`;
        document.body.appendChild(ghost);
        setTimeout(() => ghost.remove(), 1600);
    }

    function spawnBats(e) {
        const bat = document.createElement('div');
        bat.textContent = 'bat';
        bat.className = 'bats';
        bat.style.left = `${e.clientX}px`;
        bat.style.top = `${e.clientY}px`;
        document.body.appendChild(bat);
        setTimeout(() => bat.remove(), 1100);
    }

    // I have started writing the functions
    function addItem(item) {
        shoppingList.push(item.trim());
    }

    function removeLastItem() {
        shoppingList.pop();
    }

    function displayList() {
        console.log("Shopping List:");
        shoppingList.forEach((item, index) => console.log(`${index + 1}.${item}`));
    }

    function filterItems(searchItems) {
        if (!searchItems) return shoppingList;
        return shoppingList.filter(item =>
            item.toLowerCase().includes(searchItems.toLowerCase())
        );
    }


    function renderList(items = shoppingList) {
        listElement.innerHTML = "";
        if (items.length === 0) {
            listElement.innerHTML = '<li class="list-group-item empty-message">No items in shopping list</li>';
        } else {
            items.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${item}`;
                li.className = 'list-group-item';
                listElement.appendChild(li);
            });
        }
        itemcount.textContent = items.length;
        displayList();
    }

    // writing Event Listeners

    addItemBtn.addEventListener("click", (e) => {
        e.preventDefault();
        //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.                   
        const item = itemInput.value.trim();
        if (item) {
            addItem(item);
            itemInput.value = "";
            renderList();
            // show full list again
        }
    });

    // Remove Last item
    removeItemBtn.addEventListener("click", () => {
        removeLastItem();
        renderList();
    });

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        renderList(filterItems(searchTerm));
    });

    //  Using keypress we can enter using keyboard for both add items and search

    itemInput.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItemBtn.click();
        }
    });

    searchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBtn.click();
        }
    });
    // Bats on any click (optional fun)
    document.body.addEventListener('click', spawnBats);
    // Render List
    renderList();   // will show empty list on load
});