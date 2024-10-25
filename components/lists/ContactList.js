import React from "react";

const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name} - {contact.email}
          {/* Add buttons for edit and delete */}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
