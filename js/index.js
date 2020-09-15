let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);

const arrClassFruitsColors = new Map([['Мангустин', 'fruit_violet'], ['Дуриан', 'fruit_green'], ['Личи', 'fruit_carmazin'], ['Карамбола', 'fruit_yellow'], ['Тамаринд','fruit_lightbrown']]); 

//_____________________
// ОТОБРАЖЕНИЕ

const display = (arr) => {
  const fruitsList = $('.fruits__list');

  //удаляем предыдущий вариант
  var oldFruitsList = document.getElementById("fruits_list");

  if (oldFruitsList.children.length > 0)
  {
    while (oldFruitsList .firstChild) {
      oldFruitsList.removeChild(oldFruitsList.firstChild);
    }
  }

  for (let i = 0; i < arr.length; i++) {

    let fruitClass = arrClassFruitsColors.get(arr[i].kind);

    if (!!!fruitClass )
    {
      fruitClass  = "fruit_new";
    }
    // формируем новый элемент <li>, как указано в разметке и добавляем на страницу
    var sNewFruit = '<li class="fruit__item ' + fruitClass +'">\
			<div class="fruit__info">\
        <div> index:' + i +' </div>\
        <div> kind:' + arr[i].kind +' </div>\
        <div> color:' + arr[i].color  +' </div>\
        <div> weight (кг):' + arr[i].weight +' </div>\
      </div>\
      </li>';     

      fruitsList.append(sNewFruit);
  }

};

// первая отрисовка карточек
display(fruits);

//_____________________
// ПЕРЕМЕШИВАНИЕ

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = (arr) => {
  let result = [];
  let arrForChecking = [];

  for (let i = 0; i < arr.length - 1; i++)
  {
      arrForChecking.push(arr[i].kind);
  }

  while (arr.length > 0) {
    // подсказка: вырезаем случайный элемент из arr, используя getRandomInt и вставляем в result
   
    let i = getRandomInt(0,arr.length-1);
    result.push(arr[i]);
    arr.splice(i,1);    
  }
  arr = result;

  for (let j = 0; j < arr.length - 1; j++)
  {
    let arrMixed = false;    
    if (arr[j].kind != arrForChecking[j].kind) {
      arrMixed = true;
      break;  
    }

    if (arrMixed == false) {
      alert("Порядок элементов в массиве не изменился");
    }
  }
  return arr;
};

$('.shuffle__btn').click((e) => {
  fruits = shuffleFruits(fruits);
  display(fruits);
});

//_____________________
// ФИЛЬТРАЦИЯ

// фильтрация массива
const filterFruits = (arr) => {
  return arr.filter((item) => {
    // TODO: опишите функцию-фильтр
    const minWeight = document.getElementById('minweight').value;
    const maxWeight = document.getElementById('maxweight').value;

    const weight = item.weight;
    return weight >= minWeight && weight <= maxWeight;
  });
};

$('.filter__btn').click((e) => {
  fruits = filterFruits(fruits);
  display(fruits);
});

//_____________________
// СОРТИРОВКА

// инициализация состояния
let sortKind = 'bubbleSort';
let sortTime = '-';

// сравнение двух элементов
const comparationColor = (a, b) => {
  const priority = ['красный', 'розово-красный', 'оранжевый', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'светло-коричневый'];
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};

function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
};

function partition(items, left, right) {
  const priority = ['красный', 'розово-красный', 'оранжевый', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'светло-коричневый'];

  var pivot = items[Math.floor((right + left) / 2)],
      i = left;
      j = right;
  while (i <= j) {
      while (comparationColor(pivot,items[i])) {
          i++;
      }
      while (comparationColor(items[j],pivot)) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
};

  // быстрая сортировка
  function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;1;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
  };

// API блока сортировки
const sortAPI = {
  // вывести название сортировки
  setSortKind() {
    $('.sort__kind').text(sortKind);
  },

  // получить название сортировки
  getSortKind() {
    return sortKind;
  },

  // вывести время сортировки
  setSortTime() {
    $('.sort__time').text(sortTime);
  },

  // сортировка пузырьком
  bubbleSort(arr, comparation) {
    
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < n-1-i; j++) { 
        // сравниваем элементы
        if (comparationColor(arr[j], arr[j+1])) { 
          // делаем обмен элементов
          let temp = arr[j+1]; 
          arr[j+1] = arr[j]; 
          arr[j] = temp; 
        }
      }
    }                    
  },

  // выполняет сортировку и производит замер времени
  startSort(currentSort, arr, currentComparation) {
    const start = new Date().getTime();
    
    if (currentSort == 'bubbleSort') {
      currentSort(arr, currentComparation);
    }
    else {
      quickSort(arr,0,arr.length-1)
    }

    const end = new Date().getTime();
    return `${end - start} ms`;
  },
};

// инициализация полей при первом запуске ПО
sortAPI.setSortKind();
sortAPI.setSortTime();

$('.sort__action__btn').click((e) => {
  const sortKind = sortAPI.getSortKind();
  const currentSort = sortAPI[sortKind];
  const currentComparation = comparationColor;
  const timeSorting = sortAPI.startSort(currentSort, fruits, currentComparation);
  display(fruits);
  sortTime = timeSorting;
  sortAPI.setSortTime();
});

$('.sort__change__btn').click((e) => {
  
  sortKind = (sortKind == 'bubbleSort') ? 'quickSort':'bubbleSort';
  sortAPI.setSortKind(sortKind);
});

//_____________________
// ДОБАВИТЬ ФРУКТ

// создание и добавление нового фрукта
const addFruit = () => {
  const newKind = document.getElementById('kind_input').value;
  const newColor = document.getElementById('color_input').value;
  const newWeight = document.getElementById('weight_input').value;

  if (newKind == "" || newColor == "" || newWeight == "")
  {
    alert("Одно из полей пустое, фрукт не будет добавлен");
    return;
  }

  const elem = {kind: newKind, color: newColor, weight: newWeight};
  fruits.push(elem);

  display(fruits);
};

$('.add__action__btn').click((e) => addFruit());
