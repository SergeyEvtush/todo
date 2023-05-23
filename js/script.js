"use strict"
//todo-control
//header-input
//todo-list
//todo-completed
document.addEventListener("DOMContentLoaded", () => {

	const todoControl = document.querySelector('.todo-control'),
		headerInput = document.querySelector('.header-input'),
		todoList = document.querySelector('.todo-list'),
		todoCompleted = document.querySelector('.todo-completed');
	
	let toDoData = [
	];
			
		
	const render = () => {
		todoList.innerHTML = '';
		todoCompleted.innerHTML = '';
		toDoData.forEach(el => {
			const li = document.createElement('li');
			li.classList.add('todo-item');

			li.innerHTML = `
		<span class="text-todo">${el.text}</span>
		<div class="todo-buttons">
			<button class="todo-remove"></button>
			<button class="todo-complete"></button>
		</div>`;

			if (el.completed) {
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}
			li.querySelector('.todo-complete').addEventListener('click', () => {
				el.completed = !el.completed;
				render();
			});
			li.querySelector('.todo-remove').addEventListener('click', (e) => {
				const textTarget = li.innerText;
				toDoData.splice(toDoData.findIndex(el => el.text === textTarget), 1);
				render();
			});
		});
		localStorage.setItem('todoList', JSON.stringify(toDoData));
	};

	todoControl.addEventListener('submit', (e) => {
		e.preventDefault();
		const newToDo = {
			text: headerInput.value,
			completed: false
		};
		if (headerInput.value.trim().length === 0) {
			headerInput.value = '';
		} else {
			toDoData.push(newToDo);
			headerInput.value = '';
			render();
		}
	});

	if (localStorage.getItem('todoList')) {
		JSON.parse(localStorage.getItem('todoList')).forEach(el => {
			toDoData.push(el);
			render();
		});
	} else {
		toDoData = [];
	}
	
});
