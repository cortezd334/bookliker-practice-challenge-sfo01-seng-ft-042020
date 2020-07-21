document.addEventListener("DOMContentLoaded", function() {
fetch('http://localhost:3000/books')
.then(res => res.json())
.then(json => json.forEach(book => showList(book)))


const showList = (book) => {
    let ul = document.querySelector('ul')
    let li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', (e) => showBook(e, book))
    ul.appendChild(li)

}

const showBook = (e,book) => {
    let showPanel = document.getElementById('show-panel')
    showPanel.innerHTML = ''
    let div = document.createElement('div')
    div.className = 'card'
    div.id = book.id
    //Adding the book id here will let us grab 
    //the card elm after we append it
  
    div.innerHTML = `
        <img src=${book.img_url} />
        <h3>${book.title}</h3>
        <h4>${book.author}</h4>
        <p>${book.description}</p> 
    `
    showPanel.appendChild(div)
    //Now that our div is on the Dom
    //We can grab it by the book.id

    let bookCard = document.getElementById(book.id)
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.innerText = user.username
        bookCard.appendChild(li)
    })
    
    let btn = document.createElement('button')
    btn.innerText = 'like'

    btn.addEventListener('click', (e) => addLike(book))
    showPanel.appendChild(btn)
}

const addLike = (book) => {
    let arr = book.users
    arr.push({"id":1, "username":"pouros"})
    
    let list = document.getElementById(book.id)
    let li = document.createElement('li')
    li.textContent = 'pouros'
    list.appendChild(li)

    fetch(`http://localhost:3000/books/${book.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({users:arr})
    })
    .then(res => res.json())    
}
});