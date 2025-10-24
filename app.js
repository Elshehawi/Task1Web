const modal = document.getElementById('product-modal');
const openModalBtn = document.getElementById('open-add-modal-btn');
const closeBtn = document.getElementsByClassName('close-btn')[0];
const productForm = document.getElementById('product-form');
const tableBody = document.querySelector('#product-table tbody');
const modalTitle = document.getElementById('modal-title');
const saveBtn = document.getElementById('save-product-btn');

let nextProductId = 3;


openModalBtn.onclick = function() {
    modalTitle.textContent = "Add New Product";
    saveBtn.textContent = "Add Product";
    productForm.reset();
    document.getElementById('product-id').value = '';
    modal.style.display = "block";
}
window.openEditModal = function(id) {
    const row = tableBody.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        modalTitle.textContent = "Edit Product";
        saveBtn.textContent = "Save Changes";
        document.getElementById('product-id').value = id;
        document.getElementById('name').value = row.querySelector('.product-name').textContent;
        document.getElementById('email').value = row.querySelector('.product-email').textContent;
        document.getElementById('owner').value = row.querySelector('.product-owner').textContent;

        modal.style.display = "block";
    }
}
closeBtn.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


productForm.onsubmit = function(e) {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const owner = document.getElementById('owner').value;

    if (id) {
        updateProduct(id, name, email, owner);
    } else {
        addProduct(name, email, owner);
    }

    modal.style.display = "none";
}


function createTableRow(id, name, email, owner) {
    return `
        <tr data-id="${id}">
            <td class="row-number"></td>
            <td>
                <img src="placeholder-smartwatch.png" alt="${name}" class="product-img">
            </td>
            <td class="product-name">${name}</td>
            <td class="product-email">${email}</td>
            <td class="product-owner">${owner}</td>
            <td>
                <button class="action-btn edit-btn" onclick="openEditModal(${id})"><i class="fa-solid fa-pencil"></i></button>
                <button class="action-btn delete-btn" onclick="deleteRow(${id})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
    `;
}
function addProduct(name, email, owner) {
    const newId = nextProductId++;
    const newRowHTML = createTableRow(newId, name, email, owner);
    tableBody.insertAdjacentHTML('beforeend', newRowHTML);
    renumberRows();
}
function updateProduct(id, name, email, owner) {
    const row = tableBody.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        row.querySelector('.product-name').textContent = name;
        row.querySelector('.product-email').textContent = email;
        row.querySelector('.product-owner').textContent = owner;
        alert(`Product ${id} updated!`);
    }
}
window.deleteRow = function(id) {
    if (confirm(`Are you sure you want to delete product ${id}?`)) {
        const row = tableBody.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
            renumberRows();
        }
    }
}
function renumberRows() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.querySelector('.row-number').textContent = index + 1;
    });
}

document.addEventListener('DOMContentLoaded', renumberRows);