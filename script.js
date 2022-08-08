
let todoArray = [];

const createAppTitle = (title) => {
   const appTitle = document.createElement('h1');
   appTitle.classList.add('title');
   appTitle.innerHTML = title;

   return appTitle;
}

const form = document.querySelector('.todo__create');
const input = document.querySelector('.todo__input');
const addBtn = document.querySelector('.btn__add');

addBtn.disabled = !input.value.length;
input.addEventListener('input', () => {
   addBtn.disabled = !input.value.length;
});

const list = document.querySelector('.todo__list');

const createTodoItem = (name) => {
   const todoItem = document.createElement('li');
   const btnWrapper = document.createElement('div');
   const doneBtn = document.createElement('button');
   const deleteBtn = document.createElement('button');
   const span1 = document.createElement('span');
   const span2 = document.createElement('span');
   const span3 = document.createElement('span');
   const span4 = document.createElement('span');

   const randomId = Math.random() * 15.75;
   todoItem.id = randomId.toFixed(2);

   todoItem.classList.add('do');
   btnWrapper.classList.add('wrapper-btn');
   doneBtn.classList.add('btn', 'btn__done');
   deleteBtn.classList.add('btn', 'btn__delete');

   todoItem.textContent = name;

   todoItem.append(btnWrapper);
   btnWrapper.append(doneBtn, deleteBtn);
   doneBtn.append(span1, span2);
   deleteBtn.append(span3, span4);

   return {
      todoItem,
      doneBtn,
      deleteBtn,
      btnWrapper,
   }
}

const changeItemDone = (arr, item) => {
   arr.map(obj => {
      if (obj.id === item.id & obj.done === false) {
         obj.done = true;
      } else if (obj.id === item.id & obj.done === true) {
         obj.done = false;
      }
   });
}

const completeTodoItem = (item, btn, btn2) => {
   btn.addEventListener('click', () => {
      todoArray = JSON.parse(localStorage.getItem(key));

      item.classList.toggle('_success');
      btn2.classList.toggle('_delete');

      changeItemDone(todoArray, item);
      localStorage.setItem(key, JSON.stringify(todoArray));

      if (item.classList.contains('_success')) {
         list.append(item);
      } else {
         list.prepend(item);
      }

   });
}
const deleteTodoItem = (item, btn) => {
   btn.addEventListener('click', () => {
      if (confirm('Вы уверены?')) {
         todoArray = JSON.parse(localStorage.getItem(key));
         const newList = todoArray.filter(obj => obj.id !== item.id);
         localStorage.setItem(key, JSON.stringify(newList));

         item.remove();
      }
   });
}

const findLink = () => {
   const headerLinks = document.querySelectorAll('.header__link');

   headerLinks.forEach(function (link) {
      let linkActive = link.getAttribute('href');

      if (linkActive === '#') {
         link.classList.add('_active');
      }
   });
}

function createTodoApp(container, title, key) {
   const appTitle = createAppTitle(title);

   container.prepend(appTitle);

   findLink();

   if (localStorage.getItem(key)) {
      todoArray = todoArray = JSON.parse(localStorage.getItem(key));

      for (const obj of todoArray) {
         const item = createTodoItem(input.value);

         item.todoItem.textContent = obj.name;
         item.todoItem.id = obj.id;

         if (obj.done == true) {
            item.todoItem.classList.add('_success');
            item.deleteBtn.classList.add('_delete');
         } else if (obj.done == false) {
            item.todoItem.classList.remove('_success');
            item.deleteBtn.classList.remove('_delete');
         }

         completeTodoItem(item.todoItem, item.doneBtn, item.deleteBtn);
         deleteTodoItem(item.todoItem, item.deleteBtn);

         if (obj.done == true) {
            list.append(item.todoItem);
         } else if (obj.done == false) {
            list.prepend(item.todoItem);
         }
         item.todoItem.append(item.btnWrapper);
      }
   }

   form.addEventListener('submit', e => {
      e.preventDefault();

      const item = createTodoItem(input.value);

      if (!input.value) {
         return;
      }

      completeTodoItem(item.todoItem, item.doneBtn, item.deleteBtn);
      deleteTodoItem(item.todoItem, item.deleteBtn);

      let localStorageData = localStorage.getItem(key);
      if (localStorageData == null) {
         todoArray = [];
      } else {
         todoArray = JSON.parse(localStorageData);
      }

      const createItemObj = (arr) => {
         const itemObj = {};
         itemObj.name = input.value;
         itemObj.id = item.todoItem.id;
         itemObj.done = false;

         arr.push(itemObj);
      }
      createItemObj(todoArray);
      localStorage.setItem(key, JSON.stringify(todoArray));

      list.append(item.todoItem);
      input.value = '';
      addBtn.disabled = !addBtn.disabled;
   });

}