//При завантаженні сторінки
setTimeout(function() {
    if (document.cookie) {
        console.log(document.cookie);
        alert(`${document.cookie}\nПісля натискання "Ок" інформація з кукі буде видалена`);
        document.cookie = `words_number=; max-age=0`;
        alert("Інформація з кукі успішно видалена");
        window.location.reload();
    }
}, 200);

if(localStorage.getItem('bgc')){
    const a = document.getElementById("c2");

    a.style.backgroundColor = localStorage.getItem('bgc');
}

for(let i = 1; i <= 6; i++) {
    const imageUrl = localStorage.getItem(`bgicontainer-${i}`)

    if(imageUrl){
        const a = document.getElementsByClassName(`container-${i}`)[0];
        a.style.backgroundImage = `url(${imageUrl})`;
        a.style.backgroundSize = 'cover';
        a.style.backgroundPosition = 'center';
        a.style.backgroundRepeat = 'no-repeat';
    }
}

//Методи при кліку
const changeContent = () => {
    const a = document.getElementById("firstDiv");
    const b = document.getElementById("secondDiv");

    [a.innerHTML, b.innerHTML] = [b.innerHTML, a.innerHTML];
}

const findArea = () => {
    const a = parseInt(document.getElementById("firstValue").value);
    const b = parseInt(document.getElementById("secondValue").value);

    if(!a || !b) {
        alert("Треба вводити цілі числові значення в діапазоні від 1 до 999")
        return;
    }

    const area = a * b;

    const c = document.getElementById("area-result");

    c.innerHTML = `Результат: ${area}`;
}

const findWordsNumber = () => {
    const a = document.getElementById("text").value;

    const result = a.trim().split(/\s+/);

    if(result[0].length === 0) {
        alert(`Кількість слів: 0`)
        return;
    }

    alert(`Кількість слів: ${result.length}`)
    document.cookie = `words_number=${result.length}`
}

const changeColor = () => {
    const a = document.getElementById("color").value;

    if(a.length === 0) {
        alert("Bad color");
        return;
    }

    const b = document.getElementById("c2");

    b.style.backgroundColor = a;
    localStorage.setItem("bgc", `${a}`)
}

let selectedContainer;

const changeImage = (container) => {
    selectedContainer = document.getElementsByClassName(container)[0];

    const isText = traverseAndCheckNodes(selectedContainer);

    if(isText) {
        let text = document.getElementById("enter_url");
        text.innerHTML = `Введіть url для ${container}`;
        document.getElementById('entering_url').style.display = 'flex';
    } else {
        alert("Немає текстових вузлів")
    }
}

const traverseAndCheckNodes = (element) => {

    if(element.nodeType === 3){
        return true;
    }

    for (let child of element.childNodes) {
        if (traverseAndCheckNodes(child)) {
            return true;
        }
    }

    return false;
};

const saveImage = () => {
    if (selectedContainer) {
        const imageUrl = document.getElementById('change-image').value;

        if (imageUrl) {
            selectedContainer.style.backgroundImage = `url(${imageUrl})`;
            selectedContainer.style.backgroundSize = 'cover';
            selectedContainer.style.backgroundPosition = 'center';
            selectedContainer.style.backgroundRepeat = 'no-repeat';

            localStorage.setItem(`bgi${selectedContainer.classList[0]}`, `${imageUrl}`);
        } else {
            alert("Будь ласка, введіть URL зображення!");
        }
    }
}

const deleteImage = () => {
    selectedContainer.style.backgroundImage = 'none';
    localStorage.removeItem(`bgi${selectedContainer.classList[0]}`);
}