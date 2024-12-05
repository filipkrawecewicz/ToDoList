const state = {
    items: [
        { text: "item 1", isDone: true },
        { text: "item 2", isDone: false },
        { text: "item 3", isDone: true },
    ],
};

document.getElementById("addBtn").addEventListener("click", function (e) {
    const list = document.getElementById("todo-list");
    const title = document.getElementById("title").value;
    state.items.unshift({ text: title, isDone: false });

    draw();
});

function draw() {
    console.log("state", state.items);
    const ul = document.getElementById("todo-list");
    ul.innerHTML = "";
    for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i];
        // add item to list

        const li = document.createElement("li");
        li.className = "py-4 px-2 flex rounded justify-between hover:bg-gray-200";
        const span = document.createElement("span");
        span.innerText = item.text;
        const chkbox = document.createElement("input");
        const remBtn = document.createElement("button");
        remBtn.innerText = "remove";
        remBtn.className =
            "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";
        remBtn.addEventListener("click", function (e) {
            state.items.splice(i, 1);

            draw();
        });

        const editBtn = document.createElement("button");
        editBtn.innerText = "edit";
        editBtn.className =
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
        editBtn.addEventListener("click", function (e) {
            // remove span
            span.innerHTML = "";
            // add input with value=item.text
            const editIn = document.createElement("input");
            editIn.className = "bordered border-2 rounded";
            editIn.setAttribute("type", "text");
            editIn.value = item.text;

            // add event lsnr onkeypress enter -> save to state
            editIn.addEventListener("keypress", function (event) {
                // If the user presses the "Enter" key on the keyboard
                if (event.key === "Enter") {
                    item.text = event.target.value;
                    draw();
                }
            });
            li.prepend(editIn);
        });
        chkbox.setAttribute("type", "checkbox");
        chkbox.id = i;
        chkbox.checked = item.isDone;
        chkbox.addEventListener("change", function (e) {
            const newValue = e.target.checked;

            state.items[e.target.id].isDone = newValue;
        });

        li.appendChild(span);
        li.appendChild(chkbox);
        li.appendChild(editBtn);
        li.appendChild(remBtn);

        ul.appendChild(li);
    }
}

draw();
