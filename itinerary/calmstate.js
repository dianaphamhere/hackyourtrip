const yesCalm = document.querySelector('#yesCalm');
const noCalm = document.querySelector('#noCalm');

yesCalm.addEventListener('click', function(){
	db.collection('calmstate').doc('WLX99lmLTiiJu1ZLR9j5').set({ iscalm: 'true' })
	.then(() => {
		window.location.replace('test.html');
	})
})

noCalm.addEventListener('click', function(){
	db.collection('calmstate').doc('WLX99lmLTiiJu1ZLR9j5').set({ iscalm: 'false' }).then(() => {
		window.location.replace('test.html');
	});
})

function reloadPage(){
	window.location.href = "test.html";
}

function calmState(doc) {
	let iscalm = doc.data().iscalm;
	console.log(iscalm);

	if (iscalm == 'true'){
		console.log("Everyone is calm");
	} else {
		console.log("No one is calm");
	}
}

db.collection('calmstate').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		console.log(doc.data());
		calmState(doc);
	})
})

// if(!calmsate){
// 	send notification
// }