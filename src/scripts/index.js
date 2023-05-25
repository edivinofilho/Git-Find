const getUser = () => {
    const button = document.querySelector('.aside__center > button')
    
    const userId = document.querySelector('.aside__center > input')

    button.addEventListener('click', async () => {
        const apiData = await fetch(`https://api.github.com/users/${userId.value}`, {
        method: 'GET'
        }) 

        .then ((res) => {
            if(res.ok){
                location.assign('./src/pages/profile.html');

                localStorage.setItem('userId', userId.value)

                return res.json();
            } else {
                throw new Error ('URL inválida')
            }
        })

        .catch ((error) => {

            console.log('Este é o erro que ocorreu: ' + error);
            
            location.assign('./src/pages/error.html');
            

        })
            userInput.value = '';
            return userId
        })
    
}

const user = getUser();