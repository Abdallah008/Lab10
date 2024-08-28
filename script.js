let contacts = [
  { name: "Maxwell Wright", phone: "019171916495", email: "contact1@cctb.com" },
  { name: "Raja Villarreal", phone: "0863982895", email: "contact2@cctb.com" },
  { name: "Helen Richards", phone: "080031111", email: "contact3@cctb.edu" },
];

let newContacts = []; // Temporary storage for new contacts

// Display contacts with a delay and callback
function displayContacts(callback) {
  setTimeout(() => {
    const contactsList = document.getElementById("contacts-list");
    contactsList.innerHTML = "";
    contacts.forEach((contact) => {
      contactsList.innerHTML += `<p>Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}</p>`;
    });
    callback && callback();
  }, 1000); // Simulates a delay using setTimeout
}

// Add a new contact with input validation
function addContact() {
  do {
    const name = prompt("Enter contact name:");
    if (!name || name.trim() === "") {
      alert("Name cannot be empty.");
      continue;
    }

    const phone = prompt("Enter contact phone (numbers only):");
    if (!phone || !/^\d+$/.test(phone)) {
      alert("Please enter a valid phone number.");
      continue;
    }

    const email = prompt("Enter contact email:");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      continue;
    }

    // If all inputs are valid, store the contact in the temporary list
    newContacts.push({ name, phone, email });
    document.getElementById("status").textContent =
      'New contact(s) added. Click "Update" to save.';
  } while (confirm("Do you want to add another contact?"));
}

// Recursively search for a contact by name
function findContact() {
  const name = prompt("Enter the name of the contact to find:");
  const contact = searchContact(name);
  if (contact) {
    alert(
      `Found: Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`
    );
  } else {
    alert("Contact not found.");
  }
}

const searchContact = (name, index = 0) => {
  if (index >= contacts.length) return null;
  if (contacts[index].name.toLowerCase() === name.toLowerCase())
    return contacts[index];
  return searchContact(name, index + 1); // Recursion
};

// Change background color every 5 seconds
function changeBackgroundColor() {
  const colors = ["#e6ccff", "#ffcccb", "#d1ffc2", "#c2d1ff", "#fff8a3"];
  setInterval(() => {
    document.body.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
  }, 5000);
}

// Log the number of contacts every 5 seconds
setInterval(() => {
  console.log(`There are ${contacts.length} contacts.`);
}, 5000);

document.getElementById("update-contacts").addEventListener("click", () => {
  contacts = contacts.concat(newContacts); // Add the new contacts to the main list
  newContacts = []; // Clear the temporary list
  displayContacts(() => {
    document.getElementById("status").textContent = "Contacts updated!";
  });
});
document.getElementById("add-contact").addEventListener("click", addContact);
document.getElementById("find-contact").addEventListener("click", findContact);

// Initially display contacts and start changing background color
displayContacts();
changeBackgroundColor();
