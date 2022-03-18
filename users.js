let data = [
    {
        "id": 1,
        "first_name": "Diego",
        "last_name": "Fontalvo",
        "address": "Carrera 114"
    },
    {
        "id": 2,
        "first_name": "Andrés",
        "last_name": "Llinás",
        "address": "Carrera 115"
    },
    {
        "id": 3,
        "first_name": "Sergei",
        "last_name": "Suarez",
        "address": "Carrera 1"
    },
];

const btnLoad = document.getElementById('btnLoad');
const btnClean = document.getElementById('btnClean');
const form = document.getElementById('saveUserForm');
const table = document.getElementById('usersTable');

const saveUser = user => {
    if (validateEntries(user)) {
        user.id = parseInt(user.id);
        data.push(user);
        addRow(user);
        cleanForm();
    }
}

const addRow = user => {
    table.innerHTML += `<tr><td>${user.id}</td><td>${user.first_name}</td><td>${user.last_name}</td><td>${user.address}</td></tr>`
}

const loadRecords = () => {
    table.innerHTML = '';
    data.forEach(user => addRow(user));
}

const cleanForm = () => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(element => {
        element.value = '';
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    saveUser(values);
});

btnLoad.addEventListener('click', (e) => {
    e.preventDefault();
    loadRecords();
});

btnClean.addEventListener('click', (e) => {
    e.preventDefault();
    cleanForm();
})

//VALIDATIONS
//===================================
const idAvailable = id => !data.some(user => user.id == id);

const validId = id => {
    if (id.trim() === '') { alert('Debe ingresar un id '); return false; }
    if (parseInt(id) === NaN) { alert('El id debe ser un número'); return false; }
    if (!idAvailable(id)) { alert('Este id ya esta en uso'); return false; }
    return true;
}

const validFirstName = firstName => {
    if (!firstName || firstName.trim().length === 0) { alert('Debe ingresar un nombre'); return false; };
    return true;
}
const validLastName = lastName => {
    if (!lastName || lastName.trim().length === 0) { alert('Debe ingresar un apellido'); return false; };
    return true;
}
const validAddress = address => {
    if (!address || address.trim().length === 0) { alert('Debe ingresar una dirección'); return false; };
    return true;
}

const validateEntries = entries => {
    return validId(entries.id) &
        validFirstName(entries.first_name) &
        validLastName(entries.last_name) &
        validAddress(entries.address);
}
//===================================