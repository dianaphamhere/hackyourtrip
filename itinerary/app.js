const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');
	let cross = document.createElement('div');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	cross.textContent = 'x';

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cross);

	cafeList.appendChild(li);

	// deleting data
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('cafes').doc(id).delete();
	})
}

// get data from firestore collection/ take out in lieu for real time listener
// db.collection('cafes').get().then((snapshot) => {
// 	snapshot.docs.forEach(doc => {
// 		renderCafe(doc);
// 	})
// })


// saving data 
form.addEventListener('submit', (e) => {
	e.preventDefault(); //prevents refreshing page
	db.collection('cafes').add({
		//name of field in firestore: value of form;
		name: form.name.value,
		city: form.city.value
	})
	form.name.value = '';
	form.city.value = '';
})

// order data "where"
// db.collection('cafes').where('city', '>', 'N').get().then((snapshot) => {
// 	snapshot.docs.forEach(doc => {
// 		renderCafe(doc);
// 	})
// })

// real-time listener / specifically the onSnapshot
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type == 'added'){
			renderCafe(change.doc);
		} else if (change.type == 'removed'){
			//get doc id of item removed and use it to get id of dom element
			let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
			cafeList.removeChild(li);
		}
	})
})

// updating data
// db.collection('cafes').doc('737AsJFWd7o6JBZBptl2').update({ city: 'Seattle' })
// .set() overrides all the of document. .update just updates the specific field.

