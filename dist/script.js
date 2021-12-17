import { TITLE, POSTERS, DESCRIPTION, GENRES, ACTORS } from "./const.js"

document.addEventListener('DOMContentLoaded', function () {
    const TOTAL_FILM = 60;
    const FILM_ON_PAGE = 20;
    const SHOWING_MORE = 10

    const app = document.querySelector('#app');
    const endOfList = document.getElementById('endofscreen')

    const getRandomBoolean = () => (Math.random() > 0.5);

    const getRandomIntegerNumber = (max, min = 0) => {
        return min + Math.floor(Math.random() * (max - min));
    };

    const getRandomArrayItem = (array) => {
        const randomIndex = getRandomIntegerNumber(0, array.length);

        return array[randomIndex];
    };

    const generateCard = () => {
        return {
            title: getRandomArrayItem(TITLE),
            poster: getRandomArrayItem(POSTERS),
            description: getRandomArrayItem(DESCRIPTION),
            genres: GENRES.filter(getRandomBoolean).slice(1, 4),
            actors: ACTORS.filter(getRandomBoolean).slice(0, getRandomIntegerNumber(4, 1))
        };
    };

    const generateCards = (count = FILM_ON_PAGE) => {
        return new Array(count)
            .fill(``)
            .map(generateCard);
    };

    const createFilmCardTemplate = (card) => {
        const { title, poster, description, genres, actors } = card;

        const listItemTemplate = function (array) {
            return `
                <span>
                    ${array.map((it) => {
                return `${it}`
            }).join(', ')}
                </span>
            `
        }

        return (`
            <article class="film-card">
                <div class="film-card__header">
                    <h3 class="film-card__title">${title}</h3>
                    ${genres.length !== 0 ?
                `<div class="film-card__info">
                                <span>Genres: </span>
                                ${listItemTemplate(genres)}
                            </div>` : ``
            }
                </div>
                <div class="film-card__body">
                    <div class="film-card__poster">
                        <img src="${poster}" alt="${title}">
                    </div>
                </div>
                <div class="film-card__footer">
                    ${genres.length !== 0 ?
                `<div class="film-card__info">
                                <span>Actors: </span>
                                ${listItemTemplate(actors)}
                            </div>` : ``
            }
                    <p class="film-card__description">${description}</p>
                </div>
            </article>
        `);
    };

    const createElement = (template) => {
        const newElement = document.createElement(`div`);
        newElement.innerHTML = template;

        return newElement;
    };

    class AbstractComponent {
        constructor() {
            this._element = null;
        }

        getTemplate() {
            throw new Error(`Abstract method not implemented: getTemplate`);
        }

        getElement() {
            if (!this._element) {
                this._element = createElement(this.getTemplate());
            }

            return this._element;
        }
    }

    class Card extends AbstractComponent {
        constructor(card) {
            super();

            this._card = card;
        }

        get card() {
            return this._card
        }

        set card(value) {
            if (typeof value !== "undefined") {
                Object.values(value).forEach((it) => {
                    if (typeof it !== "string" && !Array.isArray(it)) {
                        throw new Error("Не верный тип данных")
                    }
                })
            }

            this._card = value;
        }

        getTemplate() {
            return createFilmCardTemplate(this.card);
        }
    }

    let showingFilmsCount = FILM_ON_PAGE;
    let dataFilm = [];

    function renderFilm(film) {
        const template = new Card(film);
        app.insertAdjacentHTML('beforeend', template.getTemplate())
    }

    function renderFilms(data) {
        data.slice(0, showingFilmsCount).forEach((film) => {
            renderFilm(film)
        });
    }

    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function checkAuthorization() {
        if (getCookie("user") === "isAuth") {
            if (localStorage.getItem("films")) {
                dataFilm = JSON.parse(localStorage.getItem('films'))
                renderFilms(dataFilm)
            } else {
                localStorage.setItem('films', JSON.stringify(generateCards(TOTAL_FILM)))
                dataFilm = JSON.parse(localStorage.getItem('films'))
                renderFilms(dataFilm)
            }
        } else {
            alert("You must be logged in. Click OK to continue.");
            const name = prompt('Enter you name please');
            document.cookie = "user=isAuth; path=/; max-age=3600"
            checkAuthorization();
            alert(`Great ${name}, you are logged in and now you can continue browsing the base.`)
        }
    }

    checkAuthorization();

    const observer = new IntersectionObserver(entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
            const prevFilmsCount = showingFilmsCount;
            showingFilmsCount = showingFilmsCount + SHOWING_MORE;
            try {
                if (showingFilmsCount >= dataFilm.length) {
                    throw new Error('Looks like that\'s all, please try again later')
                } else {
                    dataFilm.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
                        renderFilm(film)
                    });
                }
            } catch (err) {
                if (err.name === 'Error') {
                    alert(err.message)
                    endOfList.remove();
                }
            }
        }
    }, { rootMargin: '100px' });

    observer.observe(endOfList);

})

