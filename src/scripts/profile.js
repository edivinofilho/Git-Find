const changeUser = () => {
    const button = document.querySelector('button');

    button.addEventListener('click', () => {

        location.assign('../../index.html');
        
    })
}

changeUser();

const gettingDataFromApi = async () => {
    const user = localStorage.getItem('userId')
    
    const apiData = await fetch(`https://api.github.com/users/${user}`, {
        method: 'GET'
    }) 

    .then ((res) => {
        if(res.ok){
            return res.json();
        } else {
            throw new Error ('URL inválida')
        }
    })

    .catch ((error) => {

        console.log('Este é o erro que ocorreu' + error);

        window.location.href = './src/pages/error.html'
    })
    localStorage.clear();    
    return apiData;    
}

const dataFromApi = await gettingDataFromApi();

const loggedUser = (data) => {

    const userAvatar = document.body.querySelector('.user__avatar');

    userAvatar.src = data.avatar_url;

    const userName = document.querySelector('.user__name');
    userName.innerText = data.name;

    const login = data.login

    return login;
}

const actualUser = loggedUser(dataFromApi);

const userRepositories = async (user) => {
    const repositories = await fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET'
    })
    
    .then ((res) => {
        if(res.ok){
            return res.json();
        } else {
            throw new Error ('URL inválida')
        }
    })

    .catch ((error) => {

        console.log('Este é o erro que ocorreu ' + error);

        window.location.href = './src/pages/error.html'
    })

    return repositories; 
}

const repositories = await userRepositories(actualUser);

const creatingRepositoriesCards = async (repositoriesArray) => {
    const cardContainer = document.querySelector('.cards__container')
    cardContainer.innerHTML = ''

    repositoriesArray.map((repository) => {
        
        const card = document.createElement('li')
        card.classList.add('cards')

        const repositoryName = document.createElement('h2')
        repositoryName.innerText = repository.name

        const repositoryDescription = document.createElement('p')
        repositoryDescription.innerText = repository.description
        
        const button = document.createElement('button')
        button.innerText = 'Repositório'

        const link = document.createElement('a')
        link.target = '_blank'
        
        button.addEventListener('click', () => {
            link.href = repository.html_url
            link.click()
        })

        button.appendChild(link);

        card.append(repositoryName, repositoryDescription, button)

        cardContainer.appendChild(card)
    })
    return cardContainer
}

const repositoryCards = await creatingRepositoriesCards(repositories)
