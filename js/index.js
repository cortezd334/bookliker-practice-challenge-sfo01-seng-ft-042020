document.addEventListener("DOMContentLoaded", function() {

    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(json => json.forEach(book => showBooks(book)))

    const showBooks = (book) => {
        let list = document.getElementById('list')
        let li = document.createElement('li')
        li.textContent = book.title
        list.appendChild(li)

        li.addEventListener('click', (e) => bookInfo(e, book))
    }

    const bookInfo = (e, book) => {
        let show = document.getElementById('show-panel')
        show.innerHTML = ''
        let div = document.createElement('div')
        div.id = book.id
        div.innerHTML = `
        <img src=${book.img_url}>
        <h2> ${book.title} </h2>
        <h3> ${book.subtitle} </h3>
        <h4> ${book.author} </h4>
        <p> ${book.description} </p>
        `
        show.appendChild(div)

        let ul = document.createElement('ul')
        ul.id = 'user-list'
        let users = book.users.forEach(user => {
            let name = document.createElement('li')
            name.innerText = user.username
            name.addEventListener('click', (e) => deleteUser(e, name))
            ul.appendChild(name)
        })
        div.appendChild(ul)

        let btn = document.createElement('button')
        btn.innerText = 'Like'
        div.appendChild(btn)
        btn.addEventListener('click', (e) => likeBook(e, book))
    }

    const likeBook = (e, book) => {
        let users = book.users
        users.push({'id': 1, 'username': 'pouros'})
        data = {users}
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            let ul = document.getElementById('user-list')
            ul.innerText = ''
            let users = json.users.forEach(user => {
                let name = document.createElement('li')
                name.innerText = user.username
                name.addEventListener('click', (e) => deleteUser(e, name))
                ul.appendChild(name)
            })
        })
    }

    // const deleteUser = (e, book) => {
    //     fetch(`http://localhost:3000/books/${book.id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         let ul = document.getElementById('user-list')
    //         ul.innerText = ''
    //         let users = json.users.forEach(user => {
    //             let name = document.createElement('li')
    //             name.innerText = user.username
    //             name.addEventListener('click', (e) => deleteUser(e, book))
    //             ul.appendChild(name)
    //         })
    //     })
    // }

    //I'm accidentally deleting all the users
});











// fetch('http://localhost:3000/books')
// .then(res => res.json())
// .then(json => json.forEach(book => showList(book)))


// const showList = (book) => {
//     let ul = document.querySelector('ul')
//     let li = document.createElement('li')
//     li.innerText = book.title
//     li.addEventListener('click', (e) => showBook(e, book))
//     ul.appendChild(li)

// }

// const showBook = (e,book) => {
//     let showPanel = document.getElementById('show-panel')
//     showPanel.innerHTML = ''
//     let div = document.createElement('div')
//     div.className = 'card'
//     div.id = book.id
//     //Adding the book id here will let us grab 
//     //the card elm after we append it
  
//     div.innerHTML = `
//         <img src=${book.img_url} />
//         <h3>${book.title}</h3>
//         <h4>${book.author}</h4>
//         <p>${book.description}</p> 
//     `
//     showPanel.appendChild(div)
//     //Now that our div is on the Dom
//     //We can grab it by the book.id

//     let bookCard = document.getElementById(book.id)
//     book.users.forEach(user => {
//         let li = document.createElement('li')
//         li.innerText = user.username
//         bookCard.appendChild(li)
//     })
    
//     let btn = document.createElement('button')
//     btn.innerText = 'like'

//     btn.addEventListener('click', (e) => addLike(book))
//     showPanel.appendChild(btn)
// }

// const addLike = (book) => {
//     let arr = book.users
//     arr.push({"id":1, "username":"pouros"})
    
//     let list = document.getElementById(book.id)
//     let li = document.createElement('li')
//     li.textContent = 'pouros'
//     list.appendChild(li)

//     fetch(`http://localhost:3000/books/${book.id}`,{
//         method:'PATCH',
//         headers:{
//             'Content-Type':'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify({users:arr})
//     })
//     .then(res => res.json())    
// }