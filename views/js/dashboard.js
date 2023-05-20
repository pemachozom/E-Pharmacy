import { showAlert } from './alert.js'

const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4001/api/v1/users/logout',
        })
        if(res.data.status === 'success'){
            location.reload(true)
        }
    }catch(err){
        showAlert('error', 'Error logging out! Try again.')
    }
}
var obj
if (document.cookie){
  console.log(document.cookie)  
//   obj = JSON.stringify(document.cookie.substring(6))
  obj = JSON.parse(document.cookie.substring(6))
  console.log(obj)
} else{
  obj = JSON.parse('{}')
}

var el = document.querySelector('.nav.nav--user')
if (obj._id){
    el.innerHTML = 
    '<a id = "logout" class="nav__el">Log out</a> <a href="/me" class="nav__el"><img src="../img/' +
    obj.photo + 
    ' "alt="Photo of ${user.name}" class="nav__user-img" /><span>'+
    obj.name +
    '</span> </a>' 
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
}else{
    el.innerHTML = 
    '<a class="nav__el nav__el--cta" href="/login">Log in</a> <a class="nav__el nav__el--cta" href="/signup">Sign up</a>'
}
