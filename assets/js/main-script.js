document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.reasons__carousel', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 10,
        slidesPerView: 'auto',
    });

    new Swiper('.goods__carousel', {
        spaceBetween: 12,
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
        },
    });

    /* Form */
    const setCustomValidity = (input, message) => {
        input.setCustomValidity(message);
        if (message) {
            input.reportValidity();
        }
    }

    document.querySelectorAll('.form__select-city').forEach(select => {
        select.addEventListener('change', () => {
            select.classList.add('color_blue');
            select.setCustomValidity('');
        });
    });

    document.querySelectorAll('.form__input-name').forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^a-zA-Zа-яА-Я\s]/g, '');
            input.setCustomValidity('');
        });
    });

    document.querySelectorAll('.form__input-phone').forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9\+]/g, '');
            if (input.value.length > 13) {
                input.value = input.value.slice(0, 13);
            }
            input.setCustomValidity('');
        })
    });

    /* Submit form */
    const getField = (btnID, field) => btnID.closest('.form__container').querySelector(field);
    const validateAndSendForm = (btnID) => {
        const fieldCity = getField(btnID, '.form__select-city');
        const fieldName = getField(btnID, '.form__input-name');
        const fieldsPhone = getField(btnID, '.form__input-phone');
        let isValid = true;

        if (!fieldCity.value) {
            setCustomValidity(fieldCity, 'Будь ласка, заповніть це поле');
            isValid = false;
        } else {
            setCustomValidity(fieldCity, '');
        }

        if (!fieldName.value) {
            setCustomValidity(fieldName, 'Будь ласка, заповніть це поле');
            isValid = false;
        } else {
            setCustomValidity(fieldName, '');
        }

        if (!fieldsPhone.value) {
            setCustomValidity(fieldsPhone, 'Будь ласка, заповніть це поле');
            isValid = false;
        } else if (fieldsPhone.value.length < 13) {
            setCustomValidity(fieldsPhone, 'Будь ласка, введіть коректний номер телефону');
            isValid = false;
        } else {
            setCustomValidity(fieldsPhone, '');
        }

        if (isValid) {
            requestForm(fieldCity, fieldName, fieldsPhone);
        }
    }
    const mainBody = document.body;

    const requestForm = (city, name, phone) => {
        const data = {
            city: city.value,
            name: name.value,
            phone: phone.value,
            separator: '-------------------',
        }

        fetch('https://script.google.com/macros/s/AKfycbymo2_6-AP92symCOk1W7TdLw4ICmVTg_Ob6bBITgRqgJjBdrAABcqFDaAf7JgKMcth6A/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        })
        .then(() => {
            mainBody.classList.add('overflow');
            modalWindow.classList.remove('hidden');
            document.getElementById('formConsultBtn').closest('.form__container').reset();
        })
        .catch(error => {
            alert('Сталася помилка. Спробуйте ще раз');
        });
    }

    const submitForm = (btnElem) => {
        btnElem.addEventListener('click', e => {
            e.preventDefault();
            validateAndSendForm(btnElem);
        });
    }

    submitForm(document.getElementById('formConsultBtn'));

    /* Modal */
    const modalWindow = document.querySelector('.modal__window');

    document.querySelector('.modal__close').addEventListener('click', () => {
        mainBody.classList.remove('overflow');
        modalWindow.classList.add('hidden');
    });
});
