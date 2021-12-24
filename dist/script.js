document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = `https://api.github.com`;
    const app = document.getElementById("app")

    function searchInputTemplate() {
        return `
            <form>
                <h3>Search for users in the GitHub database</h3>
                <input type="search" placeholder="Start typing user login...">
            </form>
        `
    }

    function usersListItemTemplate(id, avatar, login, url) {
        return`
        <div class="user" data-key="${id}">
            <div class="user__avatar"><img src="${avatar}"></div>
            <div class="user__login">${login}</div>
            <div class="user__button-wrap">
                <a href="${url}" class="user__page" target="_blank">User page on GitHub</a>
                <button class="user__detail">More detail</button>
            </div>
        </div>
        `
    }

    function userDetailTemplate(obj) {
        const {login, avatar_url: avatar, id, bio, blog, company, created_at, followers, html_url: link, name, public_repos: repos, updated_at: updated, twitter_username: twitter, email, following} = obj;
        return `
        <div class="user-detail">
            <span onclick="this.parentNode.remove()">Close</span>
            <div class="user-detail__left">
                <h3>${login}<span>(user id: ${id})</span></h3>
                <div class="user-detail__avatar"><img src="${avatar}"></div>
                ${name !== null ? `<p><span>User name: </span>${name}</p>` : ''}
                ${bio !== null ? `<p><span>Bio: </span>${bio}</p>` : ''}
            </div>
            <div class="user-detail__right">
                <div class="user-detail__info">
                    <p><span>Repos created at: </span>${created_at}</p>
                    <p><span>Last update: </span>${updated}</p>
                    ${company !== null ? `<p><span>User company: </span>${company}</p>` : ''}
                    <p><span>Followers count: </span>${followers}</p>
                    <p><span>Following: </span>${following}</p>
                    <p><span>Public repos: </span>${repos}</p>
                    ${blog !== "" ? 
                        `<a href="${blog}" target="_blank"><span>User blog: </span> ${blog}</a>` : ''}
                    <a href="${link}" target="_blank"><span>User page on GitHub: </span>${link}</a>
                    ${twitter !== null ?
                        `<a href="${twitter}" target="_blank"><span>User twitter: </span>${twitter}</a>` : ''}
                    ${email !== null ? 
                        `<a href="${email}" target="_blank"><span>User email: </span>${email}</a>` : ''}
                </div>
            </div>
        </div>
        `
    }

    app.insertAdjacentHTML('beforeend', searchInputTemplate());
    app.insertAdjacentHTML('beforeend', `<div id="result"></div>`)

    const searchInput = document.querySelector("input[type=\"search\"]")
    const result = document.getElementById("result");

    async function getUsers(query, per_page = 50) {
        let users = [];
        if(!query) {
            return false;
        }
        await fetch(`${BASE_URL}/search/users?q=${query}&per_page=${per_page}`, {
            headers: {
                'User-Agent': 'request'
            }})
            .then(response => {
                result.innerHTML = 'Waiting for response...';
                if(response.ok) {
                    return response;
                } throw Error(response.statusText);
            })
            .then( response => response.json() )
            .then( data => {
                users = data.items
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return users
    }

    async function getUser(query) {
        let user = {};
        if(!query) {
            return false;
        }
        await fetch(`${BASE_URL}/users/${query}`, {
            headers: {
                'User-Agent': 'request'
            }})
            .then(response => {
                if(response.ok) {
                    return response;
                } throw Error(response.statusText);
            })
            .then( response => response.json() )
            .then( data => {
                user = data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return user
    }

    function* pageIterator() {
        let index = 0;
        while (index < 3)
            yield index++;
    }

    let pageNumber = pageIterator();

    async function renderUserList(query) {
        const users = await getUsers(query);
        if(!users) return false;
        result.innerHTML = '';
        
        // result.insertAdjacentHTML('afterend', `<div class="endofscreen"></div>`)
        // const end = document.getElementById('endofscreen')

        users.map(user => {
            const {login, id, html_url, avatar_url} = user;
            return result.insertAdjacentHTML('beforeend', usersListItemTemplate(id, avatar_url, login, html_url))
        })

        const usersCard = document.querySelectorAll('.user')
        renderDetailUserCard(usersCard)
    }

    function renderDetailUserCard(listNode) {
        listNode.forEach(function(item) {
            item.querySelector('.user__detail').addEventListener('click', function() {
                const userLogin = item.querySelector(".user__login").textContent;
                (async () => {
                    const thisUser = await getUser(userLogin)
                    if(document.querySelector(".user-detail")) {
                        document.querySelector(".user-detail").remove();
                    }
                    return result.insertAdjacentHTML('afterend', userDetailTemplate(thisUser))
                })()
            })
        })
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const test = debounce(function(value){
        renderUserList(value);
    }, 300)

    searchInput.addEventListener('input', function() {
        test(this.value)
    })
})

