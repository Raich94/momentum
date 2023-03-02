import playList from './playList.js';

const time = document.querySelector('.time');
const dateNow = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const quotesContainer = document.querySelector('.footer__center');
const player = document.querySelector('.player');
const weather = document.querySelector('.weather');
const greeting = document.querySelector('.greeting');
const youName = document.querySelector('.name') //имя
const city = document.querySelector('.city'); // город для погоды 
const languageBtns = document.querySelectorAll('.language__btn');
const itemNameLanguage = document.querySelector('.item__name_language');
const itemNameBg = document.querySelector('.item__name_bg');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let isGhImage = true;
let isFlickrAPI = false;
let isUnsplashAPI = false;

let randomNum;
const timeOfDay = getTimeOfDay();

const tagPhoto = document.querySelector('.tag');
let tag = timeOfDay[0];

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

const textQuotes = document.querySelector('.quote');
const authorQuotes = document.querySelector('.author');
const buttonQuotes = document.querySelector('.change-quote');

const playBtn = document.querySelector('.play');
const playBtnPrev = document.querySelector('.play-prev');
const playBtnNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const progressContainer = document.querySelector('.player__progress_container');
const progress = document.querySelector('.progress');
const playerTime = document.querySelector('.player__time');
const playerTitle = document.querySelector('.player__title');
const playerVolume = document.querySelector('.player__volume');

const audio = new Audio();

let isPlay = false;
let playNum = 0;

const settingsBtn = document.querySelector('.settings__btn');
const settingsPopup = document.querySelector('.settings__popup');
const settingTitle = document.querySelector('.setting__title');
const settingItems = document.querySelectorAll('.setting__item');

const settingItemTime = document.querySelector('.setting__item_time');
const itemCheckboxTime = document.querySelector('.item__checkbox_time');
const itemNameTime = document.querySelector('.item__name_time');

const settingItemDate = document.querySelector('.setting__item_date');
const itemCheckboxDate = document.querySelector('.item__checkbox_date');
const itemNameDate = document.querySelector('.item__name_date');

const settingItemGreeting = document.querySelector('.setting__item_greeting');
const itemCheckboxGreeting = document.querySelector('.item__checkbox_greeting');
const itemNameGreeting = document.querySelector('.item__name_greeting');

const settingItemQuotes = document.querySelector('.setting__item_quotes');
const itemCheckboxQuotes = document.querySelector('.item__checkbox_quotes');
const itemNameQuotes = document.querySelector('.item__name_quotes');

const settingItemPlayer = document.querySelector('.setting__item_player');
const itemCheckboxPlayer = document.querySelector('.item__checkbox_player');
const itemNamePlayer = document.querySelector('.item__name_player');

const settingItemWeather = document.querySelector('.setting__item_weather');
const itemCheckboxWeather = document.querySelector('.item__checkbox_weather');
const itemNameWeather = document.querySelector('.item__name_weather');

const btnGh = document.querySelector('.btn__gh');
const btnFlickr = document.querySelector('.btn__flickr');
const btnUnsplash = document.querySelector('.btn__unsplash');

const itemТameЕag = document.querySelector('.item__name_tag');

let isEN = true;
let randomQuotes;

let state = {
    time: true,
    date: true,
    greeting: true,
    quotes: true,
    player: true,
    weather: true,
}
getSettings();
// --------------------------------------------- время и дата --------------------------------------------------

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    if (!isEN) {
        showGreeting('ru');
    } else {
        showGreeting('en');
    } 
}
showTime();

function showDate() {
    const date = new Date();
    if (isEN) {
        let options = {weekday: 'long', month: 'long', day: 'numeric'};
        let currentDate = date.toLocaleDateString('en-US', options);
        dateNow.textContent = currentDate;
    } else {
        let options = {weekday: 'long', day: 'numeric', month: 'long',};
        let currentDate = date.toLocaleDateString('ru-RU', options);
        dateNow.textContent = currentDate;
    }
}

// --------------------------------------------- приветсвие --------------------------------------------------

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    
    if (hours < 6) {
        return ['night', 'Доброй ночи,']
    } else if (hours < 12) {
        return ['morning', 'Доброе утро,']
    } else if (hours < 18) {
        return ['afternoon', 'Добрый день,']
    } else {
        return ['evening', 'Добрый вечер,']
    }
}

function showGreeting(lang) {
    const timeOfDay = getTimeOfDay();
    const greetingTranslation = {
        en: `Good ${timeOfDay[0]},`,
        ru: `${timeOfDay[1]}`
    }

    if (lang == 'ru'){
        greeting.textContent = `${greetingTranslation.ru}`
        youName.placeholder = '[Введите имя]';
    } else {
        greeting.textContent = `${greetingTranslation.en}`;
        youName.placeholder = '[Enter name]';
    }
}
youName.addEventListener('change', function(e) {
    localStorage.setItem("name", e.target.value)
})


// ------------------------------------------------- фоновые изображиния -----------------------------------------------------

// рандомное число от 1 до 20
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
randomNum = getRandomNum(1, 20);
// const timeOfDay = getTimeOfDay();

// меняю фон
function setBg() {
    const bgNum = String(randomNum).padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Raich94/stage1-tasks/assets/images/${timeOfDay[0]}/${bgNum}.jpg`; 
    img.onload = () => {      
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/Raich94/stage1-tasks/assets/images/${timeOfDay[0]}/${bgNum}.jpg')`;
    }; 
}
if (isGhImage) {
    setBg();
}

// меняю фон при нажитии правой кнопки
function getSlideNext() {
    randomNum += 1;
    if (randomNum == 21) {
        randomNum = 1;
    }
    // setBg();
    if (isGhImage) {
        setBg();
    } 
    if (isFlickrAPI) {
        getLinkToImageFlickr();
    }
    if (isUnsplashAPI) {
        getLinkToImageUnsplash();
    }
}
// меняю фон при нажитии левой кнопки
function getSlidePrev() {
    randomNum -= 1;
    if (randomNum == 0) {
        randomNum = 20;
    }
    if (isGhImage) {
        setBg();
    }
    if (isFlickrAPI) {
        getLinkToImageFlickr();
    }
    if (isUnsplashAPI) {
        getLinkToImageUnsplash();
    }
}
// ивенты для кнопок
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

function getTag() {
    if (tagPhoto.value.length == 0) {
        tag = timeOfDay[0];
    } else {
        tag = tagPhoto.value
    }
    console.log(tag)
    getSlideNext()
}
tagPhoto.addEventListener('change', getTag)

// Unsplash API https://api.unsplash.com/photos/random?orientation=landscape&query=&client_id=i0loA9VONbSbVFv87EsQPmz41RI9e1igQdJ3x85IhpA

async function getLinkToImageUnsplash() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=i0loA9VONbSbVFv87EsQPmz41RI9e1igQdJ3x85IhpA`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)

    const img = new Image();
    img.src = data.urls.regular;
    console.log(img.src)
    img.onload = () => {      
        body.style.backgroundImage = `url(${img.src})`
    };
}
if (isFlickrAPI) {
    getLinkToImageUnsplash();
};

//Flickr API   https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=74dacc74d86aaf8661c6a4d8d58e92e1&tags=night&extras=url_l&format=json&nojsoncallback=1

async function getLinkToImageFlickr() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=74dacc74d86aaf8661c6a4d8d58e92e1&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    
    const img = new Image();
    img.src = data.photos.photo[randomNum].url_l;
    img.onload = () => {      
        body.style.backgroundImage = `url(${img.src})`
    };
    console.log(randomNum)
}
if (isFlickrAPI) {
    getLinkToImageFlickr();
};



// ------------------------------------------------------- погода -----------------------------------------------------
// мой API  https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=7e173e01f93893334b3111fb67596310&units=metric

async function getWeather(x) { 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${x}&appid=7e173e01f93893334b3111fb67596310&units=metric`;
    localStorage.setItem('city', city.value);
    const res = await fetch(url); //fetch() - способ делать сетевые запросы и получать информацию с сервера.
    const data = await res.json(); //.json() – декодирует ответ в формате JSON
    if (x == 'ru') {
        try {
            // и вывожу ее в нужные контейнеры
            weatherIcon.className = 'weather-icon owf'; // хз  удаляю все лишние классы перед добавлением нового, чтобы иконка погоды обновлялась корректно.
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            weatherIcon.style.display = 'block';
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            windSpeed.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
            weatherError.textContent = '';
        } catch { // если промис выдает ошибку
            weatherError.textContent = 'Нет информации об этом городе';
            weatherIcon.style.display = 'none';
            weatherIcon.textContent = '';
            temperature.textContent = '';
            weatherDescription.textContent = '';
            windSpeed.textContent = '';
            humidity.textContent = '';
        }
    } else {
        try {
            // и вывожу ее в нужные контейнеры
            weatherIcon.className = 'weather-icon owf'; // хз  удаляю все лишние классы перед добавлением нового, чтобы иконка погоды обновлялась корректно.
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            weatherIcon.style.display = 'block';
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            weatherError.textContent = '';
        } catch { // если промис выдает ошибку
            weatherError.textContent = 'No information about this city';
            weatherIcon.style.display = 'none';
            weatherIcon.textContent = '';
            temperature.textContent = '';
            weatherDescription.textContent = '';
            windSpeed.textContent = '';
            humidity.textContent = '';
        }
    }
}

function translateWeather() {
    if (isEN) {
        getWeather('en');
    } else {
        getWeather('ru');
    }
}
// ивент для инпута города
city.addEventListener('change', translateWeather)

// ------------------------------------------------------------ Цитаты -------------------------------------------------------------

async function getQuotes() {  
    const quotes = 'assets/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    if (isEN) {
        randomQuotes = getRandomNum(0, 19);
    } else {
        randomQuotes = getRandomNum(20, 39);
    }

    textQuotes.textContent = `"${data[randomQuotes].text}"`;
    authorQuotes.textContent = `${data[randomQuotes].author}`;
    
}
getQuotes();

function getRandomQuotes(){
    if (isEN) {
        randomQuotes += 1
        if (randomQuotes > 19) {
            randomQuotes = 0
        }
    } else {
        randomQuotes -= 1
        if (randomQuotes < 20) {
            randomQuotes = 39
        }
    }
    getQuotes();
}

buttonQuotes.addEventListener('click', getRandomQuotes)


// --------------------------------------------------- плеер --------------------------------------------------------------------

// добавляю трек в плеер
function playAudio() {
    audio.src = playList[playNum].src;
    playerTitle.textContent = playList[playNum].title;
    audio.onended = function(){ // автоматом включаю следующий трек
        playItem[playNum].classList.remove('item-active');// убираю класс включенной
        playNum ++;
        if (playNum > 3) {
            playNum = 0;
        }
        this.src = playList[playNum].src;
        this.play();
        playItem[playNum].classList.add('item-active');// добавляю класс включенной
    }

    playItem.forEach(el => {   // убераю класс со всех
        el.classList.remove('item-active');
    })
    if (!isPlay){ 
        audio.play();
        isPlay = true;
        playBtn.classList.add('pause');
        playItem[playNum].classList.add('item-active');// добавляю класс включенной
    } else {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
    }
}
let isValume = true;
playerVolume.addEventListener('click', function() {
    if (isValume) {
        isValume = false;
        playerVolume.classList.add('player__volume_deactive');
        audio.volume = 0;
    } else {
        isValume = true;
        playerVolume.classList.remove('player__volume_deactive');
        audio.volume = 1;
    }
})

// следующий трэк
function playNext() {
    playNum += 1;
    isPlay = false;
    if (playNum > 3) {
        playNum = 0;
    }
    playAudio();
}
// предыдущий трэк
function playPrev() {
    playNum -= 1;
    isPlay = false;
    if (playNum < 0) {
        playNum = 3;
    }
    playAudio();
}


// добавляем плейлист
for (let i = 0; i < playList.length; i++) { // циклом достаем каждый эл из массива плейлист
    const li = document.createElement('li'); // создаем новый ли
    li.classList.add('play-item'); // добовляем ему класс
    li.textContent = `${playList[i]['title']}`; // даем название
    playListContainer.append(li); // добовляем в ул
}
const playItem = document.querySelectorAll('.play-item');

// прогресс
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;

    console.log(duration)
    console.log(currentTime)
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`


    let timeCurrentTime = Math.round(currentTime);
    let timeDuration = playList[playNum].duration;

    if (timeCurrentTime < 10) {
        timeCurrentTime = '0' + timeCurrentTime
    }
    // console.log(timeCurrentTime)
    let hour = '00';
    
    if (timeCurrentTime > 59) {
        hour++
        if (hour < 10){
            hour = '0' + hour
        }
        if ((timeCurrentTime - 60) < 10) {
            timeCurrentTime = hour + ':' + '0' + (timeCurrentTime - 60)
        } else {
            timeCurrentTime = hour + ':' + (timeCurrentTime - 60)
        }
    } else {
        timeCurrentTime = hour + ':' + timeCurrentTime
    }

    
    playerTime.textContent = timeCurrentTime + ' / ' + timeDuration;
} 
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) { // мотаем нажатием
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)

// playerTime.textContent = 

playBtn.addEventListener('click', playAudio);
playBtnNext.addEventListener('click', playNext);
playBtnPrev.addEventListener('click', playPrev);

// ------------------------------------------------------- первод ------------------------------------------------

function changeButton() {
    if (isEN) {
        languageBtns.forEach(btn => btn.textContent = 'EN');
    } else {
        languageBtns.forEach(btn => btn.textContent = 'РУС');
    }
}

languageBtns.forEach(el => {
    el.addEventListener('click', function() {
        if (isEN){
            isEN = false;
            
            showGreeting('ru'); // меняю приветствие
            getWeather('ru'); // меняю погоду
        } else {
            isEN = true;
            showGreeting('en');
            getWeather('en');
        }
        changeButton()
        showDate(); // меняю дату
        getRandomQuotes(); // меняю цитату
        settingsTranslate();// меняю настройки
        localStorage.setItem('language', JSON.stringify(isEN));
    })

})








// --------------------------------------------------------- настройки ----------------------------------------------------------------

settingsBtn.addEventListener('click', function() {  // открываю настройки на кнопку 
    settingsPopup.classList.toggle('settings__popup_active');
    settingItems.forEach(el => {
        el.classList.toggle('setting__item_active');
    })
    settingTitle.classList.toggle('setting__item_active');
    settingsBtn.classList.toggle('settings__btn_active');
}); 

document.addEventListener( 'click', (e) => {  // скрываю настройки т к клик был за его пределами
	const withinBoundaries = e.composedPath().includes(settingsPopup);
    const withinBoundaries2 = e.composedPath().includes(settingsBtn);

	if ( ! withinBoundaries && ! withinBoundaries2 ) {
		settingsPopup.classList.remove('settings__popup_active');
        settingItems.forEach(el => {
            el.classList.remove('setting__item_active');
        })
        settingTitle.classList.remove('setting__item_active');
        settingsBtn.classList.remove('settings__btn_active');
	}
})

function stateTime() {
    if (state.time) {
        itemCheckboxTime.classList.remove('item__checkbox_deactive');
        time.style.visibility = 'visible';
        time.style.opacity = '1';
    } else {
        itemCheckboxTime.classList.add('item__checkbox_deactive');
        time.style.visibility = 'hidden';
        time.style.opacity = '0';
    }
}

settingItemTime.addEventListener('click', function() {
    time.style.transition = '0.8s';
    if (state.time) {
        state.time = false;
        stateTime()
    } else {
        state.time = true;
        stateTime()
    }
    localStorage.setItem('state', JSON.stringify(state));

})

// дата
function stateDate() {
    if (state.date) {
        itemCheckboxDate.classList.remove('item__checkbox_deactive');
        dateNow.style.visibility = 'visible';
        dateNow.style.opacity = '1';
    } else {
        itemCheckboxDate.classList.add('item__checkbox_deactive');
        dateNow.style.visibility = 'hidden';
        dateNow.style.opacity = '0';
    }
}

settingItemDate.addEventListener('click', function() {
    dateNow.style.transition = '0.8s';
    if (state.date) {
        state.date = false;
        stateDate()
    } else {
        state.date = true;
        stateDate()
    }
    localStorage.setItem('state', JSON.stringify(state));

})

// приветсвие
function stateGreeting() {
    if (state.greeting) {
        itemCheckboxGreeting.classList.remove('item__checkbox_deactive');
        greetingContainer.style.visibility = 'visible';
        greetingContainer.style.opacity = '1';
    } else {
        itemCheckboxGreeting.classList.add('item__checkbox_deactive');
        greetingContainer.style.visibility = 'hidden';
        greetingContainer.style.opacity = '0';
    }
}

settingItemGreeting.addEventListener('click', function() {
    greetingContainer.style.transition = '0.8s';
    if (state.greeting) {
        state.greeting = false;
        stateGreeting()
    } else {
        state.greeting = true;
        stateGreeting()
    }
    localStorage.setItem('state', JSON.stringify(state));

})

// цитаты
function stateQuotes() {
    if (state.quotes) {
        itemCheckboxQuotes.classList.remove('item__checkbox_deactive');
        quotesContainer.style.visibility = 'visible';
        quotesContainer.style.opacity = '1';
    } else {
        itemCheckboxQuotes.classList.add('item__checkbox_deactive');
        quotesContainer.style.visibility = 'hidden';
        quotesContainer.style.opacity = '0';
    }
}

settingItemQuotes.addEventListener('click', function() {
    quotesContainer.style.transition = '0.8s';
    if (state.quotes) {
        state.quotes = false;
        stateQuotes()
    } else {
        state.quotes = true;
        stateQuotes()
    }
    localStorage.setItem('state', JSON.stringify(state));

})
// плеер
function statePlayer() {
    if (state.player) {
        itemCheckboxPlayer.classList.remove('item__checkbox_deactive');
        player.style.visibility = 'visible';
        player.style.opacity = '1';
    } else {
        itemCheckboxPlayer.classList.add('item__checkbox_deactive');
        player.style.visibility = 'hidden';
        player.style.opacity = '0';
    }
}

settingItemPlayer.addEventListener('click', function() {
    player.style.transition = '0.8s';
    if (state.player) {
        state.player = false;
        statePlayer()
    } else {
        state.player = true;
        statePlayer()
    }
    localStorage.setItem('state', JSON.stringify(state));

})

// погода
function stateWeather() {
    if (state.weather) {
        itemCheckboxWeather.classList.remove('item__checkbox_deactive');
        weather.style.visibility = 'visible';
        weather.style.opacity = '1';
    } else {
        itemCheckboxWeather.classList.add('item__checkbox_deactive');
        weather.style.visibility = 'hidden';
        weather.style.opacity = '0';
    }
    localStorage.setItem('state', JSON.stringify(state));
}

settingItemWeather.addEventListener('click', function() {
    weather.style.transition = '0.8s';
    if (state.weather) {
        state.weather = false;
        stateWeather()
    } else {
        state.weather = true;
        stateWeather()
    }
    localStorage.setItem('state', JSON.stringify(state));
})

// перевожу настройки
function settingsTranslate() {
    if (isEN) {
        itemNameTime.textContent = 'Time';
        itemNameDate.textContent = 'Date';
        itemNameGreeting.textContent = 'Greeting';
        itemNameQuotes.textContent = 'Quotes';
        itemNamePlayer.textContent = 'Player';
        itemNameWeather.textContent = 'Weather';
        itemNameLanguage.textContent = 'Language:';
        settingTitle.textContent = 'Settings';
        itemNameBg.textContent = 'Photo source:';
        itemТameЕag.textContent = 'Photo tag:';
        tagPhoto.placeholder = 'Enter your tag';
    } else {
        itemNameTime.textContent = 'Время';
        itemNameDate.textContent = 'Дата';
        itemNameGreeting.textContent = 'Приветстие';
        itemNameQuotes.textContent = 'Цитаты';
        itemNamePlayer.textContent = 'Плеер';
        itemNameWeather.textContent = 'Погода';
        itemNameLanguage.textContent = 'Язык:';
        settingTitle.textContent = 'Настройки';
        itemNameBg.textContent = 'Источник фото:';
        itemТameЕag.textContent = 'Тег для фото:';
        tagPhoto.placeholder = 'Введите ваш тег';
    }
}

// выбор фона на кнопки

btnGh.classList.add('item__btn_active');

btnGh.addEventListener('click', function() {
    btnGh.classList.add('item__btn_active');
    btnFlickr.classList.remove('item__btn_active');
    btnUnsplash.classList.remove('item__btn_active');
    if (!isGhImage) {
        isGhImage = true;
        isFlickrAPI = false;
        isUnsplashAPI = false;
    }
    setBg();
})

btnFlickr.addEventListener('click', function() {
    btnFlickr.classList.add('item__btn_active');
    btnGh.classList.remove('item__btn_active');
    btnUnsplash.classList.remove('item__btn_active');
    if (!isFlickrAPI) {
        isFlickrAPI = true;
        isGhImage = false;
        isUnsplashAPI = false;
    }
    getLinkToImageFlickr();
})

btnUnsplash.addEventListener('click', function() {
    btnUnsplash.classList.add('item__btn_active');
    btnGh.classList.remove('item__btn_active');
    btnFlickr.classList.remove('item__btn_active');
    if (!isUnsplashAPI) {
        isUnsplashAPI = true;
        isFlickrAPI = false;
        isGhImage = false;
    }
    getLinkToImageUnsplash();
})



// ------------------------------------------------------------ local Storage -------------------------------------
// чтобы при перезагрузке сохранялись дынные

function getSettings() { //получаю из хранилища
    const localStorageName = localStorage.getItem('name');
    const localStorageCity = localStorage.getItem('city');
    const localStorageLanguage = localStorage.getItem('language');
    const localStorageStateData = localStorage.getItem('state');

    if(localStorageName) {
        youName.value = localStorageName;
    }
    if (localStorageCity) {
        city.value = localStorageCity;
        getWeather();
    } else {
        city.value = 'Minsk';
        getWeather();
    }
    if (localStorageLanguage) {
        isEN = JSON.parse(localStorageLanguage);
        translateWeather()
        showDate()
        showTime()
        getRandomQuotes()
        changeButton()
        settingsTranslate()
    }
    
    if (localStorageStateData) {
        state = JSON.parse(localStorageStateData);
        stateTime()
        stateDate()
        stateGreeting()
        stateQuotes()
        statePlayer()
        stateWeather()
    }
}