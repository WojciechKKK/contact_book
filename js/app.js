// $('.showEverything').on('click', function(){
// 	let showEl = $('.showEverything').text();
// 	if(showEl == 'Pokaż książkę adresową') {
// 		$('.contactList').children().remove();
// 		downloadContact();
// 		$('.searchAndContact').slideDown();
// 		counterContact();
// 	$('.showEverything').text('Ukryj książkę adresową');
// 		//dodanie counter z iloscia kontaktow
// 	} else if(showEl == 'Ukryj książkę adresową'){
// 			$('.searchAndContact').slideUp();
// 		$('.showEverything').text('Pokaż książkę adresową');
		
// 	}
// })


	const contactList = $('.contactList');
	let adresUrl = 'http://localhost:3000/contacts';

	let showElement = () => {
		let showEl = $('.showEverything').text();
		if(showEl == 'Pokaż książkę adresową') {
			$('.contactList').children().remove();
			downloadContact();
			$('.searchAndContact').slideDown();
			counterContact();
		$('.showEverything').text('Ukryj książkę adresową');
			//dodanie counter z iloscia kontaktow
		} else if(showEl == 'Ukryj książkę adresową'){
				$('.searchAndContact').slideUp();
			$('.showEverything').text('Pokaż książkę adresową');
			
		}
	}

	//slider dla pokazania wszystkich kontaktow
	$('.showEverything').on('click', showElement)

	//slider dla  dodania kontaktu
	$('.sectionAddNewContact').on('click', function(){
		if($('.addNewContact').text() == 'Dodaj nowy kontakt') {
			clear();
			$('.formularz').slideDown();
			$('.sectionAddNewContact').addClass('hide');
			$('.sectionAddNewContact').css({'text-align': 'center'})
			//$('.addNewContact').css({'color': 'red'})
			$('.addNewContact').text('Anuluj');
		}
		//$('.addNewContact').text('Anuluj');
		// } else {
		// 	$('.formularz').slideUp();
		// 	$('.addImg').removeClass('hide');
		// 	$('.addNewContact').text('Dodaj nowy kontakt');
		// 	$('.sectionAddNewContact').css({ 'color': 'black','text-align': 'left'})
		// 	//$('.addNewContact').css({'color': 'black'})
		// }

	})

	$('#cancelAdd').on('click', function(){
			$('.formularz').slideUp();
			$('.sectionAddNewContact').removeClass('hide');
			$('.addNewContact').text('Dodaj nowy kontakt');
			$('.sectionAddNewContact').css({ 'color': 'black','text-align': 'left'})

	})


	
	//pobiera i wyświetla  kontakty
	function showContact(obiektKontakt) {
		obiektKontakt.forEach(function (element, index) {
			let newLi = $('<li>').attr('id', element.id);
			
			let newLogo = $('<span>',{
				class: 'logo',
				text: element.name[0]
			})
			let newName = $('<span>', {
				class: 'nameContact',
				text: element.name
			})

			let newSurname = $('<span>', {
				class: 'surnameContact',
				text: element.surname
			})

			//newH3.text(element.name +' ' + element.surname);

			let newTel = $('<span>', {
				class: 'telContact',
				text: element.telephone
			})

			let newEmail = $('<span>', {
				class: 'emailContact',
				text: element.email
			})

			//pokazuje
			let newBtn = $('<div>', {
				class: 'showChange',
				//text: 'show'
				title: 'Szczegóły'
			})

			//edytuje
			let editButton = $('<div>', {
				class: 'edit',
				text: 'edytuj'
			})

			let cancelButton = $('<div>', {
				class: 'cancel',
				text: 'anuluj'
			})

			//ukrywam buttony
			let newDiv = $('<div>', {
				class: 'list hide',
			})
			let delButton = $('<div>', {
				class: 'delete',
				//text: 'Usuń'
				title: 'Usuń'
			})
			
			newLi.append(newLogo);
			newLi.append(newName);
			newLi.append(newSurname);
			
			
			newLi.append(delButton);
			
			newLi.append(newBtn);
			contactList.append(newLi);
			
			newDiv.append(newEmail);
			newDiv.append(newTel);
			
			newDiv.append(editButton);
			newDiv.append(cancelButton);
			newLi.append(newDiv);

			//przelacza klase - ukrywanie buttonow edit/cancel
			newBtn.on('click', function(){
				//console.log('rozwin')
				newDiv.toggleClass('hide');
			});
		})
	}


	//pobiera kontakty z pliku
	function downloadContact() {
		$.ajax({
			url: adresUrl,
			mathod: 'GET',
			dataType: 'json'
		}).done(function (response) {
			showContact(response);
		}).fail(function (error) {
			console.log(error);
		})
		$('.searchValue').val('').attr('wpisz nazwe');
	};
	

	//odnajduje inputy i czyści 
	const clear = () => {
		let valName = $('.name').val('').attr('placeholder' , 'Imię');
		let valSurname = $('.surname').val('').attr('placeholder' , 'Nazwisko');
		let valEmail = $('.email').val('').attr('placeholder', 'E-mail')
		let valTel = $('.tel').val('').attr('placeholder', 'Numer telefonu')

	}

	//dodaje kontakty
	function addContact() {
		var sendBtn = $('#sendContact');
		var canelButton = $('#cancelAdd');
		let valName = $('.name');
		let valSurname = $('.surname');
		let valEmail = $('.email');
		let valTel = $('.tel');
		let btnAdd = $('.btnAdd');
		let btnReset = $('.reset');
		
		clear();
	
		sendBtn.on('click', function (event) {
			// console.log(valName);
			// console.log(valName.val());
			event.preventDefault();
			
			//obiekt do wysłania
			let newContact = {
				name: valName.val().toUpperCase(),
				surname: valSurname.val().toUpperCase(),
				email: valEmail.val().toUpperCase(),
				telephone: valTel.val().toUpperCase()
			}

			$.ajax({
				url: adresUrl,
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newContact), //konwertuje go w obiekt typu JSON
				dataType: 'json'
			}).done(function (response) {
				console.log(response);
				console.log('Dodano nowy konatakt')
			}).fail(function (error) {
				console.log(error)
			});


			//usuwa forma i wstawia ponownie 
			let info = $('<div>', {
				text: 'KONTAKT ZOSTAŁ DODANY',
				class: 'infoAdd'
			})
		


			$('.formularz').append(info);
			btnAdd.children().hide()
			
			setTimeout(()=>{
				$('.formularz').slideUp();
				//$('.addNewContact').text('Dodaj nowy kontakt');
				$('.formularz').children().slideDown();
				info.remove();
				btnAdd.children().show()
				clear();
				$('.formularz').slideUp();
				$('.formularz').slideUp();
			$('.sectionAddNewContact').removeClass('hide');
			$('.addNewContact').text('Dodaj nowy kontakt');
			$('.sectionAddNewContact').css({ 'color': 'black','text-align': 'left'})
			}, 2000)

			
			//aktualizuje widok;
			setTimeout(function () {
				$('.contactList').children().remove();
				downloadContact();
				counterContact();
			}, 1000);
			
		});
		
		//na reset
		btnReset.on('click', function(){
			clear();
		})
	}
	

	//usuwanie kontaktów
	function removeContact() {
		contactList.on('click', '.delete', function () {
			let question = confirm('Jesteś pewien, że chcesz usunąć kontakt?')
			//console.log(a)
			if(question == true){
			//pobieram id z li
			console.log($(this).parent());
			var idContact = $(this).parent().attr('id');
			
			$.ajax({
				url: adresUrl + '/' + idContact,
				method: 'DELETE',
				dataType: 'json',
			}).done(function (response) {
				console.log('Kontakt został usunięty');
				
			}).fail(function (error) {
				console.log(error)
			})

			//aktualizuje widok
			setTimeout(function () {
				$('.contactList').children().remove();
				downloadContact();
				counterContact();
			}, 1000);

		}
		})
	}
	


	//edycja kontaktów
	function changeContact() {
		contactList.on('click', '.edit', function () {
			if ($(this).text() == 'edytuj'){
				//$(this).next().next().removeClass('hide')
				$(this).parent().parent().find('span').attr('contenteditable', 'true').toggleClass('editable')
				$(this).parent().parent().find('span').css ({
					'border-bottom': '1px solid red',
					'background': 'white'
				})
				$(this).text('zapisz');
				$('.cancel').css({
					'cursor': 'pointer'
				})
			} else {
				//$(this).next().next().addClass('hide')
				$(this).parent().parent().find('span').attr('contenteditable', 'false').toggleClass('editable')
				$(this).text('edytuj');
				$(this).parent().parent().find('span').css ({
					'color': 'black',
					'border':'none'
				})
	
				//wysyłam nowe dane
				var newContact = {
					name: $(this).parent().parent().find('.nameContact').text().toUpperCase(),
					surname: $(this).parent().parent().find('.surnameContact').text().toUpperCase(),
					email: $(this).parent().find('.emailContact').text().toUpperCase(),
					telephone: $(this).parent().find('.telContact').text().toUpperCase()
				}
				var idContact = $(this).parent().parent().attr('id');

				$.ajax({
					url: adresUrl + '/' + idContact,
					method: 'PUT',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(newContact), //konwertuje go w obiekt typu JSON
					dataType: 'json'
				}).done(function (response) {
					console.log('Kontakt został wysłany')
				}).fail(function (error) {
					console.log(error)
				})
				//aktualizuje widok
				setTimeout(function () {
					$('.contactList').children().remove();
					downloadContact();
				}, 1000);
				//$(this).parent().toggleClass('hide');
			};
			//anulowanie edycji kontaktów
	$('.cancel').on('click', function(){
		
		$(this).parent().parent().find('span').attr('contenteditable', 'false').toggleClass('editable')
		$(this).prev().text('edytuj');
		$(this).parent().parent().find('span').css ({
			'color': 'black',
			'border':'none',
			'background': 'none'
		});
		$('.contactList').children().remove();
					downloadContact();
					
	})
		})
	}

	let searchValtoChange = document.querySelector('.searchValue');
	
	searchValtoChange.addEventListener('change', function(){
		console.log('ta')
	});

	
	//sortuje 
	const sort = () => {
		//sort NAME
		// let sortName = document.querySelector('.sortName');
		// let sortSurname = document.querySelector('.sortSurname');
		let select = document.querySelector('select[name="changeSorts"]');
		

		select.addEventListener('change', function() {
			//console.log(sortName)
			//wybor optiona: 1- imie, 2-nazwisko
			//console.log(select.selectedIndex); 
			if(select.selectedIndex == 1){

				
				//console.log('zrob cos z imieniem')
				$('.nameContact').sort(function(x, y){
					
				
					if (x.innerText < y.innerText){
						//console.log(x.innerText);
						//console.log(x.parentElement.parentElement)
						let a = x.parentElement;
						let b = y.parentElement;
						let d = x.parentElement.parentElement;
						d.insertBefore(a,b);
						return -1;
					} if (x.innerText > y.innerText){
						let a = x.parentElement;
						let b = y.parentElement;
						let d = x.parentElement.parentElement;
						d.insertBefore(b,a);
						return 1;
					}
						return 0;
					}); 

			}else if (select.selectedIndex == 2){
				//console.log('z nazwiskiem')
				$('.surnameContact').sort(function(x, y){
					
					if (x.innerText < y.innerText){
						//console.log(x.innerText);
						//console.log(x.parentElement.parentElement)
						let a = x.parentElement;
						let b = y.parentElement;
						let d = x.parentElement.parentElement;
						d.insertBefore(a,b);
						return -1;
					} if (x.innerText > y.innerText){
						let a = x.parentElement;
						let b = y.parentElement;
						let d = x.parentElement.parentElement;
						d.insertBefore(b,a);
						return 1;
					}
						return 0;
					}); 
				} else if (select.selectedIndex == 0){
					$('.contactList').children().remove();
					downloadContact();
			}
		});
	
	}




//eventy na zwykłe buttony do sortowania

	// 	sortName.addEventListener('click', function(){
	// 		$('.nameContact').sort(function(x, y){
	// 			if (x.innerText < y.innerText){
	// 				//console.log(x.innerText);
	// 				//console.log(x.parentElement.parentElement)
	// 				let a = x.parentElement;
	// 				let b = y.parentElement;
	// 				let d = x.parentElement.parentElement;
	// 				d.insertBefore(a,b);
	// 				return -1;
	// 			} if (x.innerText > y.innerText){
	// 				let a = x.parentElement;
	// 				let b = y.parentElement;
	// 				let d = x.parentElement.parentElement;
	// 				d.insertBefore(b,a);
	// 				return 1;
	// 			}
	// 				return 0;
	// 			}); 
	// 	});

	// 	//sort SURNAME
	// 	sortSurname.addEventListener('click', function(){
	// 		$('.surnameContact').sort(function(x, y){
					
	// 			if (x.innerText < y.innerText){
	// 				//console.log(x.innerText);
	// 				//console.log(x.parentElement.parentElement)
	// 				let a = x.parentElement;
	// 				let b = y.parentElement;
	// 				let d = x.parentElement.parentElement;
	// 				d.insertBefore(a,b);
	// 				return -1;
	// 			} if (x.innerText > y.innerText){
	// 				let a = x.parentElement;
	// 				let b = y.parentElement;
	// 				let d = x.parentElement.parentElement;
	// 				d.insertBefore(b,a);
	// 				return 1;
	// 			}
	// 				return 0;
	// 			}); 
	// 	});
	
sort();

	//wyszukuje elementy
	const searchElement = () => {
		$('.searchContact').on('click', function(){
		$('.searchAndContact').slideDown();
		$('.showEverything').text('Ukryj książkę adresową');

			let allContact = document.querySelectorAll('li');
			let searchValtoChange = document.querySelector('.searchValue').value;
			let searchVal = searchValtoChange.toUpperCase();
			console.log(allContact);
			for(var i = 0; i < allContact.length; i++){
				//wyszukuje po imie i nazwisko
				let name = allContact[i].querySelector('.nameContact');
				let surname = allContact[i].querySelector('.surnameContact');
				let sum = name.innerText.toUpperCase() + surname.innerText.toUpperCase();
				let email = allContact[i].querySelector('.emailContact').innerText.toUpperCase();
				let tel = allContact[i].querySelector('.telContact').innerText.toUpperCase();
				//console.log(sum);
				//imie +naziwsko
				if(sum.indexOf(searchVal) >= 0){
					allContact[i].style.display = 'block'
					//po emailu
				} else if (email.indexOf(searchVal) >= 0){
					allContact[i].style.display = 'block'
					//po tel
				} else if (tel.indexOf(searchVal) >= 0){
					allContact[i].style.display = 'block'
					//pozostale na none
				}  else {
					allContact[i].style.display = 'none'
				}
				//ukrywam dodatkwoe opcje
				$('.list').addClass('hide');
			}
		});
		$('.cancelSearchContact').on('click', function(){
			let allContact = document.querySelectorAll('li');
			for(var i = 0; i < allContact.length; i++){
				allContact[i].style.display = 'block';
				//ukrywam doatkowe ocpcje
				$('.list').addClass('hide');
			}
			$('.searchValue').val('').attr('Szukaj');

			//zeruje selecta
			let select = document.querySelector('select[name="changeSorts"]');
			select.selectedIndex = 0;
			$('.contactList').children().remove();
			downloadContact();
		});
		counterContact();
		
	}

	//ilosc kontaktow
	let counterContact = () => {
		setTimeout(()=> {
			let counter = $('li').length;
			//console.log(counter)
			$('.count').text(`Ilość wszystkich kontaktów: ${counter}`)
		}, 1000)
	}


	searchElement();
	downloadContact();
	addContact();
	removeContact();
	changeContact();
