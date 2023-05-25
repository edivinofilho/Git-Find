const newSearch = () => {
    const button = document.querySelector('button');

    button.addEventListener('click', () => {
        location.assign('../../index.html');
    })
}

newSearch();