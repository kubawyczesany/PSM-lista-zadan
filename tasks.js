let firebaseConfig = {
apiKey: "AIzaSyDH0MWbz6gXmqaRT9roXMOdquc-ui8j-Xk",
  authDomain: "lista-zadan-ffbdf.firebaseapp.com",
  projectId: "lista-zadan-ffbdf",
  storageBucket: "lista-zadan-ffbdf.appspot.com",
  messagingSenderId: "934091931587",
  appId: "1:934091931587:web:b8f38d916365496ab0c776",
  measurementId: "G-D2SXLR3YKH"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function main() {
    const taskObj = new Task();

	const tasks = await taskObj.getAll();
	var arrayLength = tasks.length;

	const taskListUI = document.getElementById("task-list");
	taskListUI.innerHTML = "";
	for (var i = 0; i < arrayLength; i++) {
			let $li = document.createElement("li");
			html=`
				<button class="listedTask__button listedTask__button--doner js-done" id=${tasks[i].id}-update>
				<i${tasks[i].done? " class=\"fas fa-check\"" : " class=\"fas--none fa-check\""}></i>
				</button>
				<span
				${tasks[i].done ? " class=\"listedTask__content--done\"" : " class=\"listedTask__content\""}>${tasks[i].description}
				</span>
				<button class="listedTask__button listedTask__button--remover js-remove" id=${tasks[i].id}-delete>
				<span class="far fa-trash-alt"></span>
				</button>`
			$li.className = "listedTask"
			$li.innerHTML = html
			$li.id = tasks[i].id
			done = tasks[i].done
			// $li.append(editIconUI);
			// $li.append(deleteIconUI);

			// $li.addEventListener("click", userClicked)
			taskListUI.append($li);
			const removeButton = document.getElementById(`${tasks[i].id}-delete`)
			removeButton.addEventListener('click', async function(){
				await removeTask($li.id);
			})

			const updateButton = document.getElementById(`${tasks[i].id}-update`)
			updateButton.addEventListener('click', async function(){
				if(done)
					await updateTask($li.id, "done", false);
				else 
					await updateTask($li.id, "done", true);
			})

	}


}

async function addNewTask(newTaskContent) {
	const taskObj = new Task();
	await taskObj.add(newTaskContent, false);
	main();
}

async function removeTask(id){
	const taskObj = new Task();
	await taskObj.delete(id);
	main();
}

async function updateTask(id, field, value){
	const taskObj = new Task();
	await taskObj.update(id, field, value);
	main();
}

class Task {
    tasksRef = db.collection("tasks");

    async add(description, done) {
        const task = {description, done};

        try {
            const docRef = await this.tasksRef.add(task);
            task.id = docRef.id;

        } catch (error) {
            console.error('Error Adding Task: ', error)
        }

        return task;
    }

    async getAll() {
        const tasks = [];

        try {
            const snapshot = await this.tasksRef.get()
            snapshot.forEach(doc => tasks.push({id: doc.id, ...doc.data()}))
        } catch (err) {
            console.error('Error Getting Tasks: ', error);
        }

        return tasks;
    }

    async get(id) {
        let task;

        try {
            let doc = await this.tasksRef.doc(id).get();
            
            if(doc.exists) 
                task = {id: doc.id, ...doc.data()};
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting task: ', error);
        }

        return task;
    }

    async delete(id) {
        try {
            await this.tasksRef.doc(id).delete();
            console.log('Task is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting task: ', error);
        }
    }

    async update(id, field, value) {
        try {
            await this.tasksRef.doc(id).update({
			[field] : value
			});
            console.log('Updated task with id: ', id);
        } catch (error) {
            console.error('Error in updating task: ', error);
        }
    }
}

const init = () => {
	main();
	const formElement = document.querySelector(".js-form");

	formElement.addEventListener('reset', onFormReset);

};



const onFormReset = (event) => {
	const contentElement = document.querySelector(".js-input");
	const newTaskContent = contentElement.value.trim();

	if (newTaskContent === "") {
		return;
	};

	contentElement.focus();

	addNewTask(newTaskContent);

}

init();