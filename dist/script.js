const TITLE = ["Death Proof", "Django Unchained", "Kill Bill", "Inglorious Bastard", "Once upon a time in Hollywood"];
const DESCRIPTION = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const POSTERS = [
    'http://cdn.shopify.com/s/files/1/0037/8008/3782/products/Once_Upon_a_Time_in_Hollywood_French_Grande_Cropped_54ee920c-ef59-4b44-9369-661619dce53c-273171.jpg?v=1611688210',
    'https://plaqat.ru/images/10616.jpg',
    'https://i.pinimg.com/originals/c1/f1/b3/c1f1b3e0114944178461606dedb47383.jpg',
    'https://i.pinimg.com/originals/fd/24/63/fd24637188784e983f5500d18f46536e.jpg',
    'https://m.media-amazon.com/images/I/71t73NDu29L._AC_SL1000_.jpg',
    'https://cdn.shopify.com/s/files/1/1057/4964/products/once-upon-a-time-in-hollywood-vintage-movie-poster-original-48x72_5eca4e0d-9b47-4729-99cc-0d88104aa639_300x@2x.jpg?v=1587871194',
    'https://ae01.alicdn.com/kf/H8874655a44cd4f089c16f1400947f96dw/Canvas-painting-Quentin-Tarantino-Movie-Retro-Poster-Fiction-Reservoir-Dog-Inglourious-Basterds-Posters-Wall-Home-Room.jpg_Q90.jpg_.webp'
]
const GENRES = [`Biography`,`Comedy`,`Crime`,`Drama`,`Fantasy`,`History`,`Horror`,`Mystery`,`Sci-Fi`,`Thriller`,`War`];
const ACTORS = [`Robert De Niro`,`Leonardo DiCaprio`,`Tom Hanks`,`Anthony Hopkins`,`Liam Neeson`,`Salma Hayek`,`Anna De Armas`,`Keanu Reeves`];

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
        if (getCookie("user") === "isAuth" || localStorage.getItem("userAuth")) {
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

            if(location.protocol === "file:") {
            	localStorage.setItem('userAuth', "isAuth")
            } else {
				document.cookie = "user=isAuth; path=/; max-age=3600"
            }
            
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

