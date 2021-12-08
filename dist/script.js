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

document.addEventListener('DOMContentLoaded', function() {

    const app = document.querySelector('#app');
    const end = document.getElementById('endofscreen')

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

    const generateCards = (count = 10) => {
        return new Array(count)
            .fill(``)
            .map(generateCard);
    };

    const createFilmCardTemplate = (card) => {
        const {title, poster, description, genres, actors} = card;

        const listItemTemplate = function (array) {
            return `
                <ul>
                    ${array.map((it) => {
                        return `<li class="film-card__list-item">${it}</li>`
                    }).join(', ')}
                </ul>
            `
        }

        return (`
            <article class="film-card">
                <h3 class="film-card__title">${title}</h3>
                <div class="film-card__info">
                    ${listItemTemplate(genres)}
                    ${listItemTemplate(actors)}
                </div>
                <div class="film-card__poster">
                    <img src="${poster}" alt="${title}">
                </div>
                <p class="film-card__description">${description}</p>
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

    class Card extends AbstractComponent{
        constructor(card) {
            super();

            this.card = card;
        }

        get card() {
            return this._card
        }

        set card(value) {
            if(typeof value !== "undefined") {
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

    function* pageGenerator(page = 10) {
        for (let i = 0; i <= page; i++) {
            yield generateCards();
        }
    }

    const generator = pageGenerator();

    const observer = new IntersectionObserver(entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
            try{
                if(generator.next().done === false) {
                    generator.next().value.forEach((card) => {
                        const template = new Card(card);
                        app.insertAdjacentHTML('beforeend', template.getTemplate())
                    });
                } else {
                    throw new Error("Sorry, this is the end of list")
                }
            }catch(err) {
                if (err.name === "Error") {
                    alert(err.message)
                }
            }
        }
    }, {rootMargin: '100px'});

    observer.observe(end);
    
})