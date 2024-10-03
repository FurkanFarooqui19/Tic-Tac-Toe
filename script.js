let boxes = document.querySelectorAll(".btn");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector("#newbtn");
let msgContent = document.querySelector(".msgcontent");
let msg = document.querySelector("#msg");

let turnO = true;

const winpatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],
];

const resetgame = () => {
    turnO = true;
    enable();
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContent.classList.add("hide");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContent.classList.remove("hide");
    disable();
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }

    // Check for a draw
    const allDisabled = [...boxes].every(box => box.disabled);
    if (allDisabled) {
        msg.innerText = "It's a Draw!";
        msgContent.classList.remove("hide");
    }
};

newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
