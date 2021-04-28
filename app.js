class Contact {
    constructor(name, number, email, comments) {
      this.name = name;
      this.number = number;
      this.email = email;
      this.comments = comments;
    }
  }

class UI {
  static displayContacts() {
    const contacts = Community.getContacts();

    contacts.forEach((contact) => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    const list = document.querySelector('#contact-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.number}</td>
      <td class="mobilehidden">${contact.email}</td>
      <td class="mobilehidden">${contact.comments}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteContact(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#maintable');
    const form = document.querySelector('#table');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#number').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#comments').value = '';
  }
}
  
  class Community {
    static getContacts() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }
  
    static addContact(contact) {
      const contacts = Community.getContacts();
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    static removeContact(name) {
      const contacts = Community.getContacts();
  
      contacts.forEach((contact, index) => {
        if(contact.name === name) {
          contacts.splice(index, 1);
          UI.showAlert('Contact Removed', 'danger');
        }
      });
      
      localStorage.setItem('contacts', JSON.stringify(contacts));

      
    }
  }
  
  document.addEventListener('DOMContentLoaded', UI.displayContacts);
  
  document.querySelector('#newcontact-form').addEventListener('submit', (e) => {

    e.preventDefault();

    const name = document.querySelector('#name').value;
    const number = document.querySelector('#number').value;
    const email = document.querySelector('#email').value;
    const comments = document.querySelector('#comments').value;

    const contacts = Community.getContacts();
    let double = false;
    contacts.forEach((contact) => {
      if(contact.name === name){
        double = true;
    }});
    if(name === '') {
      UI.showAlert('Please fill in Full Name', 'warning');
    }else if(double){
        UI.showAlert('This name already exists', 'warning');
    }else if (number === '' && email === '') {
        UI.showAlert('Please fill in Phone Number or Email', 'warning');
    } else {
      const contact = new Contact(name, number, email, comments);

      UI.addContactToList(contact);

      Community.addContact(contact);

      UI.showAlert('Contact Added', 'success');

      UI.clearFields();
      }
      
    });
  
  
  document.querySelector('#contact-list').addEventListener('click', (e) => {
 
    UI.deleteContact(e.target);
  

    Community.removeContact(e.target.parentElement.parentElement.firstElementChild.textContent);
  

    
  });