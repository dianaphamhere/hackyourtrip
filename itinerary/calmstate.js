const yesCalm = document.querySelector('#yesCalm');
const noCalm = document.querySelector('#noCalm');
const calmdown = document.querySelector('#calmdown');
const alertCont = document.querySelector('#alertCont');

yesCalm.addEventListener('click', function(){
	db.collection('calmstate').doc('WLX99lmLTiiJu1ZLR9j5').set({ iscalm: 'true' })
	.then(() => {
		window.location.replace('../steadymyself.html');
	})
})

noCalm.addEventListener('click', function(){
	db.collection('calmstate').doc('WLX99lmLTiiJu1ZLR9j5').set({ iscalm: 'false' }).then(() => {
		window.location.replace('../steadymyself.html');
	});
})

calmdown.addEventListener('click', function(){
	db.collection('calmstate').doc('WLX99lmLTiiJu1ZLR9j5').set({ iscalm: 'false' }).then(() => {
		window.location.replace('../steadymyself.html');
	});
})

function calmState(doc) {
	let iscalm = doc.data().iscalm;
	console.log(iscalm);

	if (iscalm == 'true'){
		console.log("Everyone is calm");
			alertCont.style.display = "none";
	} else {
		console.log("No one is calm");
		alertCont.style.display = "block";
	}
}

db.collection('calmstate').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		console.log(doc.data());
		calmState(doc);
	})
})

db.collection('calmstate').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type == 'added'){
			// renderCafe(change.doc);
		} else if (change.type == 'modified'){
			console.log('modified');
			calmState(change.doc);
			// //get doc id of item removed and use it to get id of dom element
			// let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
			// cafeList.removeChild(li);
		}
	})
})

// if(!calmsate){
// 	send notification
// }